import { Button } from '@/shared/components/button';
import { Tabs } from '@/shared/components/tabs';
import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  imports: [Button, RouterLink, Tabs, NgTemplateOutlet],
})
export class HomePage {}
