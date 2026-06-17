import { Section } from '@/core/components/section';
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { Tabs } from '@/shared/components/tabs';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';
import { Mask } from '@/shared/directives/mask.directive';
import { CpfValidator } from '@/shared/validators/cpf.validator';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-cpf-page',
  templateUrl: './input-cpf.page.html',
  imports: [Section, Tabs, ReactiveFormsModule, Fieldset, Input, Mask, ValidatorHint],
})
export class InputCpfPage {
  readonly cpfControl = new FormControl<string>('', [Validators.required, CpfValidator]);
}
