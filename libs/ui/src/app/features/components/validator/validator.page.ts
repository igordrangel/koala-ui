import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Input } from '@/shared/components/input-field';
import { Tabs } from '@/shared/components/tabs';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-validator-page',
  templateUrl: './validator.page.html',
  imports: [Section, Tabs, ReactiveFormsModule, Input, ValidatorHint],
})
export class ValidatorPage {
  private readonly docs = useDocsCopy('validator');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;

  readonly emailControl = new FormControl<string>('', [Validators.required, Validators.email]);
}
