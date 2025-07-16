import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { InputCnpjSample } from '../../components/input-cnpj-sample/input-cnpj-sample';

@Component({
  selector: 'app-input-cnpj-page',
  templateUrl: './input-cnpj.page.html',
  imports: [CodeViewer, OnThisPage, InputCnpjSample],
})
export class InputCnpjPage {}
