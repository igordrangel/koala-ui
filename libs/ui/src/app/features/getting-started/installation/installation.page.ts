import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-installation',
  templateUrl: './installation.page.html',
  imports: [Section],
})
export class InstallationPage {
  private readonly docs = useDocsCopy('installation');
  readonly copy = this.docs.copy;
}
