import { AuthorizationService } from '@/core/security/authorization.service';
import { Loading } from '@/shared/components/loading';
import { Component, inject } from '@angular/core';
import { LoginFormSample } from './login-form.sample';
import { LoggedSample } from './logged-sample';

@Component({
  selector: 'app-login-preview-sample',
  templateUrl: './login-preview.sample.html',
  imports: [LoginFormSample, LoggedSample, Loading],
})
export class LoginPreviewSample {
  readonly authorization = inject(AuthorizationService);
}
