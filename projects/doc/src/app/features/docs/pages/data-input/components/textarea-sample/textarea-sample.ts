import { SampleContainer } from '@/app/shared/components/sample-container/sample-container';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Textarea } from '@koalarx/ui/shared/components/input-field/textarea';

@Component({
  selector: 'app-textarea-sample',
  templateUrl: './textarea-sample.html',
  imports: [SampleContainer, Textarea],
})
export class TextareaSample {
  textareaControl = new FormControl<string>(
    'This is a sample text area. You can type here to see how it behaves.'
  );
}
