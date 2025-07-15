import {
  Component,
  effect,
  ElementRef,
  inject,
  input,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { SnackbarType } from './snackbar';
import { SnackbarRef } from './snackbar-ref';
import { interval } from 'rxjs/internal/observable/interval';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'kl-snackbar-content',
  templateUrl: './snackbar-content.html',
})
export class SnackbarContent implements OnInit {
  private readonly alertContentRef =
    viewChild<ElementRef<HTMLDivElement>>('alertContent');
  private readonly alertIconRef =
    viewChild<ElementRef<HTMLElement>>('alertIcon');
  private readonly snackbarRef = inject(SnackbarRef);

  type = input.required<SnackbarType>();
  message = input.required<string>();
  timeout = input<number>(0);
  timePast = signal(0);

  constructor() {
    effect(() => this.addAlertClass());
    effect(() => this.addIconClass());
  }

  private addAlertClass() {
    const alertContent = this.alertContentRef()?.nativeElement;

    if (alertContent) {
      let className = `alert-${this.type()}`;

      switch (this.type()) {
        case 'info':
          className = 'alert-info';
          break;
        case 'success':
          className = 'alert-success';
          break;
        case 'warning':
          className = 'alert-warning';
          break;
        case 'error':
          className = 'alert-error';
          break;
      }

      alertContent.classList.add(className);
    }
  }

  private addIconClass() {
    const alertIcon = this.alertIconRef()?.nativeElement;

    if (alertIcon) {
      let className = '';

      switch (this.type()) {
        case 'info':
          className = 'fa-circle-info';
          break;
        case 'success':
          className = 'fa-circle-check';
          break;
        case 'warning':
          className = 'fa-triangle-exclamation';
          break;
        case 'error':
          className = 'fa-circle-xmark';
          break;
      }

      alertIcon.classList.add(className);
    }
  }

  ngOnInit(): void {
    const timeout = this.timeout();

    if (timeout > 0) {
      const timePastInterval = interval(1000)
        .pipe(
          startWith(0),
          map(() => this.timePast.update((past) => past + 1000)),
          map(() => this.timePast())
        )
        .subscribe((timePast) => {
          if (timePast > timeout) {
            timePastInterval?.unsubscribe();
            this.dismiss();
          }
        });
    }
  }

  dismiss() {
    this.snackbarRef.dismiss();
  }
}
