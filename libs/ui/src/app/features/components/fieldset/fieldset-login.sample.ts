import { Button } from '@/shared/components/button';
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-fieldset-login-sample',
  templateUrl: './fieldset-login.sample.html',
  imports: [ReactiveFormsModule, Fieldset, Input, ValidatorHint, Button],
})
export class FieldsetLoginSample {
  readonly loginForm = inject(FormBuilder).group({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
  });
}
