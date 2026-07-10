```html
<app-text-editor class="w-full" [formControl]="editorControl" />

<pre>{{ editorValue() }}</pre>
<pre>{{ editorImageIds() | json }}</pre>
```
