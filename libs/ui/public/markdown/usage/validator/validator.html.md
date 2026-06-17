```html
<input field appInput type="text" placeholder="Type here" [formControl]="emailControl" />

@if (emailControl.hasError('required')) {
  <span appValidatorHint>Email is required</span>
} @else if (emailControl.hasError('email')) {
  <span appValidatorHint>Invalid email</span>
}
```
