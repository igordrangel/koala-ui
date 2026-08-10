import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { Observable } from 'rxjs/internal/Observable';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';

export function fromObservableWithSignal<T>(
  observable$: Observable<T>,
  signal: AbortSignal,
): Promise<T> {
  const cancel$ = new Subject<void>();

  if (signal.aborted) {
    return Promise.reject(new DOMException('Aborted', 'AbortError'));
  }

  signal.addEventListener('abort', () => {
    cancel$.next();
    cancel$.complete();
  });

  return firstValueFrom(observable$.pipe(takeUntil(cancel$)));
}
