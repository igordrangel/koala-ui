import { Section } from '@/core/components/section';
import { Button } from '@/shared/components/button';
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { Tabs } from '@/shared/components/tabs';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-fieldset-page',
  templateUrl: './fieldset.page.html',
  imports: [Section, Tabs, ReactiveFormsModule, Fieldset, Input, ValidatorHint, Button],
})
export class FieldsetPage {
  readonly emailControl = new FormControl<string>('', [Validators.required, Validators.email]);

  readonly loginForm = inject(FormBuilder).group({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
  });
}
