import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
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
  private readonly docs = useDocsCopy('input-cnpj');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;

  readonly cnpjControl = new FormControl<string>('', [Validators.required, CnpjValidator]);
}
