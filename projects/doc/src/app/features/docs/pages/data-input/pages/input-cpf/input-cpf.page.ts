import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { InputCpfSample } from '../../components/input-cpf-sample/input-cpf-sample';

@Component({
  selector: 'app-input-cpf-page',
  templateUrl: './input-cpf.page.html',
  imports: [CodeViewer, OnThisPage, InputCpfSample],
})
export class InputCpfPage {}
