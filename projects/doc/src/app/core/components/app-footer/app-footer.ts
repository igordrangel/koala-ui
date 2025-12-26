import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppFooter {}
