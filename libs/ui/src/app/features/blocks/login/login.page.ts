import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Tabs } from '@/shared/components/tabs';
import { Component } from '@angular/core';
import { LoginPreviewSample } from './login-preview.sample';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  imports: [Section, Tabs, LoginPreviewSample],
})
export class LoginPage {
  private readonly docs = useDocsCopy('login');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;
}
