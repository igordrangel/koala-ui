import { LocalePathPipe } from '@/core/i18n/locale-path.pipe';
import { LoginPreviewSample } from '@/features/blocks/login/login-preview.sample';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-authentication-showcase',
  host: { class: 'block w-full min-w-0' },
  templateUrl: './authentication-showcase.html',
  imports: [LoginPreviewSample, RouterLink, LocalePathPipe],
})
export class AuthenticationShowcase {}
