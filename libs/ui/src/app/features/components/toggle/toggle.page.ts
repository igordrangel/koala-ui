import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Tabs } from '@/shared/components/tabs';
import { Toggle } from '@/shared/components/toggle';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-toggle-page',
  templateUrl: './toggle.page.html',
  imports: [ReactiveFormsModule, Section, Tabs, Toggle],
})
export class TogglePage {
  private readonly docs = useDocsCopy('toggle');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;

  toggleControl = new FormControl<boolean>(true);
}
