import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ai-agents',
  templateUrl: './ai-agents.page.html',
  imports: [Section],
})
export class AiAgentsPage {
  private readonly docs = useDocsCopy('ai-agents');
  readonly copy = this.docs.copy;
}
