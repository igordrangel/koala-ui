import { Component, input } from '@angular/core';
import { Editor } from '@tiptap/core';
import { TableAddCol } from './table-add-col';
import { TableAddRow } from './table-add-row';
import { TableColMenu } from './table-col-menu';
import { TableRowMenu } from './table-row-menu';

@Component({
  selector: 'app-text-editor-table-controls',
  templateUrl: './table-controls.html',
  imports: [TableColMenu, TableRowMenu, TableAddCol, TableAddRow],
})
export class TableControls {
  readonly editor = input.required<Editor>();
}
