import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Button } from '@/shared/components/button';
import { Dropdown } from '@/shared/components/dropdown';
import { Tabs } from '@/shared/components/tabs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown-page',
  templateUrl: './dropdown.page.html',
  imports: [Dropdown, Section, Button, Tabs],
})
export class DropdownPage {
  private readonly docs = useDocsCopy('dropdown');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;
}
