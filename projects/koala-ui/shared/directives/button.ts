import {
  ApplicationRef,
  booleanAttribute,
  ComponentRef,
  createComponent,
  Directive,
  effect,
  ElementRef,
  EnvironmentInjector,
  inject,
  input,
  inputBinding,
  OnInit,
} from '@angular/core';
import { Loader } from '@koalarx/ui/core/components/loader';

export type ButtonColor =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'ghost';

export type ButtonSize =
  | 'extraSmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'extraLarge';

@Directive({ selector: 'button[klButton], a[klButton]' })
export class Button implements OnInit {
  private readonly elementRef = inject<ElementRef<HTMLButtonElement>>(
    ElementRef<HTMLButtonElement>
  );
  private readonly appRef = inject(ApplicationRef);
  private readonly injector = inject(EnvironmentInjector);
  private loaderComponent: ComponentRef<Loader> | null = null;

  color = input<ButtonColor>('neutral');
  type = input<'button' | 'submit'>('button');
  circle = input(false, { transform: booleanAttribute });
  outline = input(false, { transform: booleanAttribute });
  soft = input(false, { transform: booleanAttribute });
  showLoader = input(false, { transform: booleanAttribute });
  disabled = input(false, { transform: booleanAttribute });
  size = input<ButtonSize>('medium');

  constructor() {
    effect(() => this.toggleLoader(this.showLoader()));
    effect(() => {
      const disabled = this.disabled();
      this.elementRef.nativeElement.disabled = disabled;
    });
  }

  private createLoaderComponent() {
    const spanContainer = this.elementRef.nativeElement.insertBefore(
      document.createElement('span'),
      this.elementRef.nativeElement.firstChild
    );
    spanContainer.classList.add(
      'flex',
      'items-center',
      'justify-center',
      'h-full'
    );
    this.loaderComponent = createComponent(Loader, {
      environmentInjector: this.injector,
      hostElement: spanContainer,
      bindings: [inputBinding('size', () => this.size())],
    });

    return this.loaderComponent;
  }

  private toggleLoader(show: boolean) {
    if (show) {
      const loaderComponent = this.createLoaderComponent();

      this.elementRef.nativeElement.disabled = true;
      this.appRef.attachView(loaderComponent.hostView);
    } else {
      if (!this.disabled()) {
        this.elementRef.nativeElement.disabled = false;
      }

      if (this.loaderComponent) {
        this.appRef.detachView(this.loaderComponent.hostView);
        this.loaderComponent.destroy();
        this.loaderComponent = null;
      }
    }
  }

  private getColorClass(color: ButtonColor): string {
    switch (color) {
      case 'neutral':
        return 'btn-neutral';
      case 'primary':
        return 'btn-primary';
      case 'secondary':
        return 'btn-secondary';
      case 'accent':
        return 'btn-accent';
      case 'info':
        return 'btn-info';
      case 'success':
        return 'btn-success';
      case 'warning':
        return 'btn-warning';
      case 'error':
        return 'btn-error';
      case 'ghost':
        return 'btn-ghost';
      default:
        throw new Error(`Unknown button color: ${color}`);
    }
  }

  private getSizeClass(size: ButtonSize): string {
    switch (size) {
      case 'extraSmall':
        return 'btn-xs';
      case 'small':
        return 'btn-sm';
      case 'medium':
        return 'btn-md';
      case 'large':
        return 'btn-lg';
      case 'extraLarge':
        return 'btn-xl';
      default:
        throw new Error(`Unknown button size: ${size}`);
    }
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.type = this.type();
    this.elementRef.nativeElement.classList.add('btn');
    this.elementRef.nativeElement.classList.add(
      this.getColorClass(this.color())
    );
    this.elementRef.nativeElement.classList.add(this.getSizeClass(this.size()));

    if (this.outline()) {
      this.elementRef.nativeElement.classList.add('btn-outline');
    }

    if (this.circle()) {
      this.elementRef.nativeElement.classList.add('btn-circle');
    }

    if (this.soft()) {
      this.elementRef.nativeElement.classList.add('btn-soft');
    }
  }
}
