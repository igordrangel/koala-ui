import 'prismjs/prism';

import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/plugins/line-highlight/prism-line-highlight';
import 'prismjs/plugins/line-numbers/prism-line-numbers';

import {
  booleanAttribute,
  Component,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { Tooltip } from '@koalarx/ui/shared/directives';
import { MarkdownModule } from 'ngx-markdown';
import { CurrentTranslation } from '@koalarx/ui/core/translations/current-language';

export type CodeViewerLanguage =
  | 'bash'
  | 'typescript'
  | 'html'
  | 'css'
  | 'json'
  | 'other';

export interface CodeViewerConfig {
  label: string;
  code?: string;
  language?: CodeViewerLanguage;
  src?: string;
  checked?: boolean;
  lineHighlight?: string;
}

@Component({
  selector: 'kl-code-viewer',
  templateUrl: './code-viewer.html',
  imports: [MarkdownModule, Tooltip],
})
export class CodeViewer {
  readonly translations = CurrentTranslation.get().codeViewer;

  copied = signal(false);
  content = signal<string>('');

  name = input.required<string>();
  src = input.required<string>();
  language = input<CodeViewerLanguage>('other');
  lineHighlight = input<string>();
  lineNumbers = input(false, { transform: booleanAttribute });

  icon = linkedSignal(() => {
    const language = this.language();

    if (language) {
      switch (language) {
        case 'bash':
          return 'fa-solid fa-terminal p-1 text-[0.5rem]';
        case 'typescript':
          return 'fa-brands fa-angular py-0 px-[0.2rem] text-[1rem]';
        case 'html':
          return 'fa-brands fa-html5 py-[0.1rem] px-[0.2rem] text-[1rem]';
        case 'css':
          return 'fa-brands fa-css3 py-[0.1rem] px-[0.2rem] text-[1rem]';
        case 'json':
          return 'fa-regular fa-file-code py-[0.1rem] px-[0.2rem] text-[1rem]';
      }
    }

    return 'fa-solid fa-code';
  });

  clipboard(event: any) {
    this.content.set(event.replace(/^[^\n]*\n?/, '').replace(/`/g, ''));
  }

  copyCode() {
    const code = this.content();

    if (code) {
      navigator.clipboard.writeText(code).then(() => {
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2000);
      });
    }
  }
}
