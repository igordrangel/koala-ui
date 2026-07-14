```html
<input field appInput type="text" placeholder="Type here" [formField]="emailForm.email" />

@if (emailForm.email().getError('required')) {
  <span appValidatorHint>Email is required</span>
} @else if (emailForm.email().getError('email')) {
  <span appValidatorHint>Invalid email</span>
}
```
