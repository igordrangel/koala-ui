import { Section } from '@/core/components/section';
import { Button } from '@/shared/components/button';
import { Tabs } from '@/shared/components/tabs';
import { Tooltip } from '@/shared/components/tooltip';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tooltip-page',
  templateUrl: './tooltip.page.html',
  imports: [Section, Button, Tooltip, Tabs],
})
export class TooltipPage {}
