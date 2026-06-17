import { Section } from '@/core/components/section';
import { Input } from '@/shared/components/input-field';
import { Tabs } from '@/shared/components/tabs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-input-field-page',
  templateUrl: './input-field.page.html',
  imports: [Section, Tabs, Input],
})
export class InputFieldPage {}
