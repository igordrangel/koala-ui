import { Section } from '@/core/components/section';
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
  toggleControl = new FormControl<boolean>(true);
}
