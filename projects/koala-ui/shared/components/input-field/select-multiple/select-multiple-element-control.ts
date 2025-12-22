import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  InjectionToken,
  Injector,
  inputBinding,
  Signal,
  ViewContainerRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { GENERIC_COMPONENT_CONTAINER_NAME } from '@koalarx/ui/core/config';
import { delay } from '@koalarx/utils/KlDelay';
import { randomString } from '@koalarx/utils/KlString';
import { SelectList } from '../select/select.type';
import { SelectMultipleOptions } from './select-multiple-options';
import {
  SELECT_MULTIPLE_REF_TOKEN,
  SelectMultipleRef,
} from './select-multiple-ref';
import { SelectMultipleValue } from './select-multiple-value';

export type SelectMultipleAfterCloseTrigger = string | Record<string, any>;
export type SelectMultipleAfterCloseTriggerFn = (
  trigger: SelectMultipleAfterCloseTrigger
) => void;
export const SELECT_MULTIPLE_APP_REF = new InjectionToken(
  'SelectMultipleAppRef'
);

export interface SelectOpenData {
  fieldId: string;
  options: Signal<SelectList>;
  control: FormControl<any>;
  selectMultipleValue: SelectMultipleValue;
  placeholderSearchField?: string;
  disableAutoTypeConversion?: boolean;
}

@Injectable()
export class SelectMultipleElementControl {
  private readonly appRef = inject(ApplicationRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly injector = inject(EnvironmentInjector);

  private generateElementId() {
    let elementId: string;

    do {
      elementId = randomString(50, {
        numbers: false,
        lowercase: true,
        uppercase: true,
        specialCharacters: false,
      });
    } while (document.getElementById(elementId));

    return elementId;
  }

  private calculatePosition(container: HTMLDivElement) {
    const selectMultiple = this.viewContainerRef.element
      .nativeElement as HTMLElement;
    const currentTop = window.scrollY;
    const position = selectMultiple.getBoundingClientRect();
    const optionsContainer = container.querySelector<HTMLDivElement>(
      '.kl-select-multiple-options-container'
    );
    const filterContainer = container?.querySelector<HTMLDivElement>(
      '.kl-select-multiple-filter'
    );
    const filterContainerHeight = (filterContainer?.clientHeight || 0) + 2;

    if (position) {
      const screenHeight = document.body.clientHeight;
      const maxHeight = (screenHeight * 40) / 100;
      let top = position.bottom;
      let height = Math.abs(screenHeight - top);

      if (height > maxHeight) {
        height = maxHeight;
      }

      const percentFillOnScreen = (height * 100) / screenHeight;

      if (percentFillOnScreen <= 20) {
        const optionsHeight = optionsContainer?.scrollHeight || 0;
        const currentHeight = optionsHeight + filterContainerHeight;

        if (optionsHeight > 0 && currentHeight <= maxHeight) {
          height = currentHeight;
        } else {
          height = Math.abs(screenHeight - (screenHeight - position.top));

          if (height > maxHeight) {
            height = maxHeight;
          }
        }

        top = position.top - height;
      }

      top += currentTop;

      container.style.top = `${top}px`;
      container.style.maxHeight = `${height}px`;

      return { top, left: position.left, width: position.width, height };
    }

    return null;
  }

  private async waitForButtonEnabled(
    buttonElement: HTMLButtonElement,
    timeout: number
  ) {
    const delayTime = 50;

    let ellapsedTime = 0;

    while (buttonElement.disabled && ellapsedTime <= timeout) {
      await delay(delayTime);
      ellapsedTime += delayTime;
    }
  }

  private async positionOnScreen(container: HTMLDivElement) {
    const autocompleteField = this.viewContainerRef.element
      .nativeElement as HTMLElement;
    const autocompleteFieldButton =
      autocompleteField.querySelector<HTMLButtonElement>('button');

    if (autocompleteFieldButton) {
      await this.waitForButtonEnabled(autocompleteFieldButton, 5000);
    }

    const position = this.calculatePosition(container);

    if (position) {
      const { left, width } = position;

      container.style.position = 'absolute';
      container.style.display = 'flex';
      container.style.left = `${left}px`;
      container.style.width = `${width}px`;
      container.style.height = `auto`;
      container.style.zIndex = '99';
      container.style.overflow = 'hidden';
      container.style.transition = 'all 0.1s ease-in-out';

      const selectedOptions =
        autocompleteField.querySelector<HTMLDivElement>('.selected-options');

      if (selectedOptions) {
        selectedOptions.onchange = () => this.positionOnScreen(container);
      }
    }
  }

  async open(data: SelectOpenData) {
    const main = document.querySelector<HTMLElement>(
      GENERIC_COMPONENT_CONTAINER_NAME
    );

    if (main) {
      const elementId = this.generateElementId();
      const container = main.appendChild(document.createElement('div'));

      container.id = elementId;

      await this.positionOnScreen(container);

      const componentRef = createComponent(SelectMultipleOptions, {
        environmentInjector: this.injector,
        hostElement: container,
        elementInjector: Injector.create({
          providers: [
            { provide: SELECT_MULTIPLE_APP_REF, useValue: this.appRef },
            {
              provide: SELECT_MULTIPLE_REF_TOKEN,
              useValue: () => componentRef,
            },
            {
              provide: SelectMultipleRef,
              deps: [SELECT_MULTIPLE_APP_REF, SELECT_MULTIPLE_REF_TOKEN],
            },
          ],
        }),
        bindings: [
          ...Object.keys(data).map((key) =>
            inputBinding(key, () => (data as any)[key])
          ),
        ],
      });

      this.appRef.attachView(componentRef.hostView);

      componentRef.changeDetectorRef.detectChanges();

      this.calculatePosition(container);
    }
  }
}
