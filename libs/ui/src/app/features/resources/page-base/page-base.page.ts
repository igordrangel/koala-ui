import { Component } from '@angular/core';
import { Section } from '@/core/components/section';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-base-page',
  templateUrl: './page-base.page.html',
  imports: [Section, RouterLink],
})
export class PageBasePage {}
