import { LocalePathPipe } from '@/core/i18n/locale-path.pipe';
import { Button } from '@/shared/components/button';
import { Tabs } from '@/shared/components/tabs';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationShowcase } from './showcase/authentication-showcase';
import { DashboardShowcase } from './showcase/dashboard-showcase';
import { ExamplesShowcase } from './showcase/examples-showcase';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  host: { class: 'block w-full min-w-0' },
  imports: [
    Button,
    RouterLink,
    Tabs,
    ExamplesShowcase,
    DashboardShowcase,
    AuthenticationShowcase,
    LocalePathPipe,
  ],
})
export class HomePage {}
