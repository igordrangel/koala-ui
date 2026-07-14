```html
<app-text-editor class="w-full" [formField]="editorForm.content" />

<pre>{{ editorForm.content().value() }}</pre>
<pre>{{ editorImageIds() | json }}</pre>
```
