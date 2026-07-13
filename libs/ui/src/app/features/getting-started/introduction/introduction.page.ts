import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.page.html',
  imports: [Section],
})
export class IntroductionPage {
  private readonly docs = useDocsCopy('introduction');
  readonly copy = this.docs.copy;
}
