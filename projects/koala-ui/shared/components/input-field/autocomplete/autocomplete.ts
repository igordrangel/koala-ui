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

  private positionOnScreen(container: HTMLDivElement) {
    const autocompleteField = this.viewContainerRef.element
      .nativeElement as HTMLElement;
    const currentTop = window.scrollY;
    const position = autocompleteField.getBoundingClientRect();

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
        height = Math.abs(screenHeight - (screenHeight - position.top));

        if (height > maxHeight) {
          height = maxHeight;
        }

        top = position.top - height;
      }

      top += currentTop;

      container.style.position = 'absolute';
      container.style.display = 'flex';
      container.style.top = `${top}px`;
      container.style.left = `${position.left}px`;
      container.style.width = `${position.width}px`;
      container.style.height = `auto`;
      container.style.maxHeight = `${height}px`;
      container.style.zIndex = '99';
      container.style.overflow = 'hidden';

      const selectedOptions =
        autocompleteField.querySelector<HTMLDivElement>('.selected-options');

      if (selectedOptions) {
        selectedOptions.onchange = () =>
          setTimeout(() => {
            this.positionOnScreen(container);
          }, 50);
      }
    }
  }

  open(data: AutocompleteOpenData) {
    const main = document.querySelector<HTMLElement>(
      GENERIC_COMPONENT_CONTAINER_NAME
    );

    if (main) {
      const elementId = this.generateElementId();
      const container = main.appendChild(document.createElement('div'));

      container.id = elementId;

      this.positionOnScreen(container);

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
    }
  }
}
