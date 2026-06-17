import { Dropdown } from '@/shared/components/dropdown';
import { Tooltip } from '@/shared/components/tooltip';
import { Component } from '@angular/core';

@Component({
  selector: 'app-inline-filter-keyboard-shortcuts',
  templateUrl: './keyboard-shortcuts.html',
  imports: [Dropdown, Tooltip],
})
export class KeyboardShortcuts {}
