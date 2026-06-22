import { Component } from '@angular/core';
import { Section } from '@/core/components/section';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-http-base-page',
  templateUrl: './http-base.page.html',
  imports: [Section, RouterLink],
})
export class HttpBasePage {}
