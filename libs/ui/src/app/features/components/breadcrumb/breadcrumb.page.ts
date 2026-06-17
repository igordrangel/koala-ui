import { Section } from '@/core/components/section';
import { Breadcrumb } from '@/shared/components/breadcrumb';
import { Tabs } from '@/shared/components/tabs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-breadcrumb-page',
  templateUrl: './breadcrumb.page.html',
  imports: [Section, Tabs, Breadcrumb],
})
export class BreadcrumbPage {}
