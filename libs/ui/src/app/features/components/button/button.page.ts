import { Button } from '@/shared/components/button';
import { Tabs } from '@/shared/components/tabs';
import { Component } from '@angular/core';
import { Section } from '@/core/components/section';

@Component({
  selector: 'app-button-page',
  templateUrl: './button.page.html',
  imports: [Section, Button, Tabs],
})
export class ButtonPage {}
