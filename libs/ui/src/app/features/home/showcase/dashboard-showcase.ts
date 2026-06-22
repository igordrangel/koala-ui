import { DatatableSample } from '@/features/blocks/datatable/datatable.sample';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-showcase',
  host: { class: 'block w-full min-w-0' },
  templateUrl: './dashboard-showcase.html',
  imports: [DatatableSample, RouterLink],
})
export class DashboardShowcase {}
