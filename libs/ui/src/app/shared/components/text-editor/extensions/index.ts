import { TableKit } from '@tiptap/extension-table';
import StarterKit from '@tiptap/starter-kit';
import { ImageDefs } from '../extensions/image';
import { TableWithBorder } from '../extensions/table-border';
import { TextAlign } from '../extensions/text-align';
import { TextBackgroundColor } from '../extensions/text-background-color';
import { TextColor } from '../extensions/text-color';
import { Highlight } from '../extensions/text-highlight';

export const TextEditorExtensions = [
  StarterKit,
  TableKit.configure({
    table: false,
  }),
  TableWithBorder.configure({
    resizable: true,
  }),
  Highlight,
  TextColor,
  TextBackgroundColor,
  TextAlign,
  ...ImageDefs.extensions,
];
