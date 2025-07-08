import {
  Component,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  Signal,
  signal,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteList, AutocompleteValue } from './autocomplete-value';
import { AutocompleteRef } from './autocomplete-ref';

@Component({
  selector: 'kl-autocomplete-options',
  templateUrl: './autocomplete-options.html',
  imports: [ReactiveFormsModule],
})
export class AutocompleteOptions implements OnInit, OnDestroy {
  private readonly autocompleteRef = inject(AutocompleteRef);
  private readonly viewContainerRef =
    inject<ViewContainerRef>(ViewContainerRef);
  private firstLoad = true;

  fieldId = input.required<string>();
  options = input.required<Signal<AutocompleteList>>();
  control = input.required<FormControl>();
  multiple = input.required<boolean>();
  autocompleteValue = input.required<AutocompleteValue>();
  placeholderSearchField = input<string | undefined>();

  optionFocused = signal(0);

  searchInputRef = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  constructor() {
    effect(() => {
      const hasValue = !!this.autocompleteValue().currentValue();

      if (this.firstLoad) {
        this.firstLoad = false;
        return;
      }

      if (hasValue && !this.multiple()) {
        this.close();
      }
    });

    effect(() => {
      const options = this.options()();
      if (options.length > 0) {
        this.optionFocused.set(0);
      }
    });
  }

  private updateScrollPosition(direction: 'down' | 'up' = 'down') {
    setTimeout(() => {
      const containerElement =
        this.viewContainerRef.element.nativeElement.querySelector(
          '.kl-autocomplete-options-container'
        ) as HTMLDivElement;
      const focusedOptionElement = containerElement.querySelector(
        'label.active'
      ) as HTMLDivElement;

      if (focusedOptionElement) {
        containerElement.scrollTo({
          top:
            direction === 'down'
              ? containerElement.scrollTop +
                focusedOptionElement.getBoundingClientRect().height
              : containerElement.scrollTop -
                focusedOptionElement.getBoundingClientRect().height,
        });
      }
    });
  }

  private onKeyDown = (event: KeyboardEvent) => {
    event.stopPropagation();
    event.preventDefault();

    switch (event.key) {
      case 'ArrowDown': {
        this.optionFocused.update((value) => {
          if (value < this.options()().length - 1) {
            return value + 1;
          }
          return value;
        });
        this.updateScrollPosition('down');
        break;
      }
      case 'ArrowUp': {
        this.optionFocused.update((value) => {
          if (value > 0) {
            return value - 1;
          }
          return value;
        });
        this.updateScrollPosition('up');
        break;
      }
    }
  };

  private onKeyup = (event: KeyboardEvent) => {
    event.stopPropagation();
    event.preventDefault();

    const containerElement: HTMLDivElement =
      this.viewContainerRef.element.nativeElement;

    switch (event.key) {
      case 'Enter': {
        const focusedOption = this.options()()[this.optionFocused()];

        if (focusedOption) {
          containerElement
            .querySelectorAll<HTMLInputElement>('input')
            .item(this.optionFocused() + 1)
            .click();
        }
        break;
      }
      case 'Escape': {
        this.close();
        break;
      }
    }
  };

  private onClick = (event: MouseEvent) => {
    const containerElement: HTMLDivElement =
      this.viewContainerRef.element.nativeElement;
    const insideClick = containerElement.contains(event.target as Node);

    if (!insideClick) {
      event.stopPropagation();
      event.preventDefault();
      this.close();
    }
  };

  private close() {
    this.autocompleteValue().filterControl.reset();
    this.autocompleteRef.close();
  }

  ngOnDestroy() {
    document.removeEventListener('keyup', this.onKeyup);
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('click', this.onClick);
  }

  ngOnInit() {
    this.searchInputRef()?.nativeElement.focus();

    setTimeout(() => {
      document.addEventListener('keyup', this.onKeyup);
      document.addEventListener('keydown', this.onKeyDown);
      document.addEventListener('click', this.onClick);
    }, 150);
  }

  setValue(event: Event) {
    const target = event.target as HTMLInputElement;

    let value: string | number = target.value;

    if (!Number.isNaN(parseInt(value as any))) {
      value = Number(value);
    }

    if (this.multiple()) {
      const check = target.checked;

      let currentValue = this.control().value;

      if (!Array.isArray(currentValue)) {
        currentValue = [currentValue];
      }

      if (check) {
        this.control().setValue([...currentValue, value]);
      } else {
        this.control().setValue(currentValue.filter((v: any) => v !== value));
      }
    } else {
      this.control().setValue(value);
    }
  }
}
