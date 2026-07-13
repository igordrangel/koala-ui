import { inject, Pipe, PipeTransform } from '@angular/core';
import { LocaleService } from './locale.service';

@Pipe({ name: 'localePath', pure: false })
export class LocalePathPipe implements PipeTransform {
  private readonly localeService = inject(LocaleService);

  transform(routePath: string): string {
    return this.localeService.path(routePath);
  }
}
