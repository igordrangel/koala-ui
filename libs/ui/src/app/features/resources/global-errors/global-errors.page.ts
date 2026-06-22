import { Component } from '@angular/core';
import { Section } from '@/core/components/section';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-global-errors-page',
  templateUrl: './global-errors.page.html',
  imports: [Section, RouterLink],
})
export class GlobalErrorsPage {}
