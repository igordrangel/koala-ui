import { Component } from '@angular/core';
import { Section } from '@/core/components/section';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rules-page',
  templateUrl: './rules.page.html',
  imports: [Section, RouterLink],
})
export class RulesPage {}
