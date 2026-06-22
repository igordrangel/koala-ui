import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-fieldset-sample',
  templateUrl: './fieldset.sample.html',
  imports: [ReactiveFormsModule, Fieldset, Input, ValidatorHint],
})
export class FieldsetSample {
  readonly emailControl = new FormControl<string>('', [Validators.required, Validators.email]);
}
