import { Input } from '@/shared/components/input-field';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-validator-sample',
  templateUrl: './validator.sample.html',
  imports: [ReactiveFormsModule, Input, ValidatorHint],
})
export class ValidatorSample {
  readonly emailControl = new FormControl<string>('', [Validators.required, Validators.email]);
}
