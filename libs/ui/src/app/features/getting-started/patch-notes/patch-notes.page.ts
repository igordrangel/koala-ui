import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-patch-notes',
  templateUrl: './patch-notes.page.html',
  imports: [Section],
})
export class PatchNotesPage {
  private readonly docs = useDocsCopy('patch-notes');
  readonly copy = this.docs.copy;
}
