import { Section } from '@/core/components/section';
import { Tabs } from '@/shared/components/tabs';
import { Component } from '@angular/core';
import { LoginPreviewSample } from './login-preview.sample';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  imports: [Section, Tabs, LoginPreviewSample],
})
export class LoginPage {}
