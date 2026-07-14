```html
<app-combobox
  placeholder="Select a state"
  [options]="localOptions"
  [formField]="comboboxForm.local"
/>

<app-combobox
  multiple
  placeholder="Select multiple states"
  [options]="localOptions"
  [formField]="comboboxForm.localMultiple"
/>
```
