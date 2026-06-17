import { Component, inject } from '@angular/core';
import { Section } from '@/core/components/section';
import { AuthorizationService } from '@/core/security/authorization.service';
import { Loading } from '@/shared/components/loading';
import { Tabs } from '@/shared/components/tabs';
import { LoggedSample } from './logged-sample';
import { LoginFormSample } from './login-form.sample';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  imports: [Section, Tabs, LoginFormSample, LoggedSample, Loading],
})
export class LoginPage {
  readonly authorization = inject(AuthorizationService);
}
