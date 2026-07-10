import { Component, input, output } from '@angular/core';
import { Editor } from '@tiptap/core';
import { ImageToUpload } from '../common/image-upload.service';
import { ToolDivider } from '../common/tool-divider';
import { AlignCenter } from '../tools/align-center';
import { AlignJustify } from '../tools/align-justify';
import { AlignLeft } from '../tools/align-left';
import { AlignRight } from '../tools/align-right';
import { BackgroundColor } from '../tools/background-color';
import { Blockquote } from '../tools/blockquote';
import { Bold } from '../tools/bold';
import { Code } from '../tools/code';
import { CodeBlock } from '../tools/code-block';
import { FontColor } from '../tools/font-color';
import { Heading } from '../tools/heading';
import { Highlight } from '../tools/highlight';
import { Image } from '../tools/image';
import { Italic } from '../tools/italic';
import { Link } from '../tools/link';
import { List } from '../tools/list';
import { Redo } from '../tools/redo';
import { Strike } from '../tools/strike';
import { Table } from '../tools/table';
import { Underline } from '../tools/underline';
import { Undo } from '../tools/undo';

@Component({
  selector: 'app-text-editor-toolbar',
  templateUrl: './text-editor-toolbar.html',
  imports: [
    ToolDivider,
    Undo,
    Redo,
    Heading,
    List,
    Blockquote,
    CodeBlock,
    Table,
    Bold,
    Italic,
    Strike,
    Code,
    Underline,
    FontColor,
    BackgroundColor,
    Highlight,
    Link,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Image,
  ],
})
export class TextEditorToolbar {
  editor = input.required<Editor>();
  files = input<ImageToUpload[]>([]);
  filesUploaded = output<void>();
}
