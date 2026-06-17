import { Section } from '@/core/components/section';
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { Tabs } from '@/shared/components/tabs';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';
import { Mask } from '@/shared/directives/mask.directive';
import { CnpjValidator } from '@/shared/validators/cnpj.validator';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-cnpj-page',
  templateUrl: './input-cnpj.page.html',
  imports: [Section, Tabs, ReactiveFormsModule, Fieldset, Input, Mask, ValidatorHint],
})
export class InputCnpjPage {
  readonly cnpjControl = new FormControl<string>('', [Validators.required, CnpjValidator]);
}
