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
import { AutocompleteOptions } from './autocomplete-options';
import { AUTOCOMPLETE_REF_TOKEN, AutocompleteRef } from './autocomplete-ref';
import { AutocompleteList, AutocompleteValue } from './autocomplete-value';

export type AutocompleteAfterCloseTrigger = string | Record<string, any>;
export type AutocompleteAfterCloseTriggerFn = (
  trigger: AutocompleteAfterCloseTrigger
) => void;
export const AUTOCOMPLETE_APP_REF = new InjectionToken('AutocompleteAppRef');

export interface AutocompleteOpenData {
  fieldId: string;
  options: Signal<AutocompleteList>;
  control: FormControl<any>;
  multiple: boolean;
  autocompleteValue: AutocompleteValue;
  placeholderSearchField?: string;
  disableAutoTypeConversion?: boolean;
}

@Injectable()
export class Autocomplete {
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
    const autocompleteField = this.viewContainerRef.element
      .nativeElement as HTMLElement;
    const currentTop = window.scrollY;
    const position = autocompleteField.getBoundingClientRect();
    const optionsContainer = container.querySelector<HTMLDivElement>(
      '.kl-autocomplete-options-container'
    );

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
        const currentHeight = optionsHeight + 38;

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

  private async positionOnScreen(container: HTMLDivElement) {
    const autocompleteField = this.viewContainerRef.element
      .nativeElement as HTMLElement;
    const autocompleteFieldButton =
      autocompleteField.querySelector<HTMLButtonElement>('button');

    if (autocompleteFieldButton) {
      while (autocompleteFieldButton.disabled) {
        await delay(50);
      }
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

  async open(data: AutocompleteOpenData) {
    const main = document.querySelector<HTMLElement>(
      GENERIC_COMPONENT_CONTAINER_NAME
    );

    if (main) {
      const elementId = this.generateElementId();
      const container = main.appendChild(document.createElement('div'));

      container.id = elementId;

      await this.positionOnScreen(container);

      const componentRef = createComponent(AutocompleteOptions, {
        environmentInjector: this.injector,
        hostElement: container,
        elementInjector: Injector.create({
          providers: [
            { provide: AUTOCOMPLETE_APP_REF, useValue: this.appRef },
            {
              provide: AUTOCOMPLETE_REF_TOKEN,
              useValue: () => componentRef,
            },
            {
              provide: AutocompleteRef,
              deps: [AUTOCOMPLETE_APP_REF, AUTOCOMPLETE_REF_TOKEN],
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
