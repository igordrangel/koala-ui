import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { TextareaSample } from '../../components/textarea-sample/textarea-sample';

@Component({
  selector: 'app-textarea-page',
  templateUrl: './textarea.page.html',
  imports: [CodeViewer, OnThisPage, TextareaSample],
})
export class TextareaPage {}
