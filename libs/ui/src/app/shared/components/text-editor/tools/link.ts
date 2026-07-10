import { afterRenderEffect, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dropdown } from '../../dropdown';
import { Tooltip } from '../../tooltip';
import { ToolDivider } from '../common/tool-divider';
import { ToolBase } from '../common/tool.base';

@Component({
  selector: 'app-text-editor-tool-link',
  imports: [Dropdown, Tooltip, ToolDivider, ReactiveFormsModule],
  template: `<app-dropdown insideClick>
    <button
      trigger
      class="btn btn-xs size-9! rounded-xl hover:dark:bg-neutral-900! hover:bg-neutral-100!"
      type="button"
      appTooltip="Link"
      [class.btn-primary]="isActive()"
      [class.btn-ghost]="!isActive()"
      [class.btn-soft]="isActive()"
      [disabled]="!canToggle()"
    >
      <i class="fa-solid fa-link text-base" [class.opacity-70!]="!isActive()"></i>
    </button>

    <form
      [formGroup]="formLink"
      (submit)="toggleLink()"
      class="flex items-center justify-between p-2 gap-1"
      options
    >
      <div class="flex items-center gap-1 pr-2">
        <input
          class="outline-none p-2"
          type="url"
          placeholder="Cole um link..."
          [formControl]="formLink.controls.link"
        />
        <i class="app-icon enter opacity-50"></i>
      </div>

      <app-text-editor-tool-divider />

      <a
        class="btn btn-md btn-circle rounded-full"
        (click)="openLink()"
        [class.opacity-70!]="formLink.controls.link.invalid"
        [class.pointer-events-none]="formLink.controls.link.invalid"
      >
        <i class="fa-solid fa-arrow-up-right-from-square text-base"></i>
      </a>
      <a
        class="btn btn-md btn-circle rounded-full"
        (click)="toggleLink(true)"
        [class.opacity-70!]="formLink.controls.link.invalid"
        [class.pointer-events-none]="formLink.controls.link.invalid"
      >
        <i class="app-icon trash size-5!"></i>
      </a>
    </form>
  </app-dropdown>`,
})
export class Link extends ToolBase {
  formLink = inject(FormBuilder).group({
    link: ['', [Validators.required, Validators.pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i)]],
  });

  protected checkCanToggle(): boolean {
    return true;
  }

  protected checkIsActive(): boolean {
    return this.editor().isActive('link');
  }

  constructor() {
    super();

    afterRenderEffect(() => {
      this.editor().on('selectionUpdate', () => {
        if (this.isActive()) {
          const attrs = this.editor().getAttributes('link') as any;
          this.formLink.controls.link.setValue(attrs.href || '');
        } else {
          this.formLink.controls.link.reset('');
        }
      });
    });
  }

  openLink() {
    const href = this.formLink.controls.link.value;

    if (href) {
      window.open(href, '_blank');
    }
  }

  toggleLink(remove = false) {
    const href = this.formLink.controls.link.value;

    if (remove || !href) {
      this.editor().chain().focus().unsetLink().run();
      this.formLink.controls.link.reset('');
      return;
    }

    this.editor()
      .chain()
      .focus()
      .setLink({
        href,
        target: '_blank',
      })
      .run();
  }
}
