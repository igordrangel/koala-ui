# Collapse

## Installation

```bash
kl install collapse
```

### HTML

```html
<app-collapse class="w-full" type="collapse">
  <ng-container title>How do I create an account?</ng-container>

  Click the "Sign Up" button in the top right corner and follow the registration process.
</app-collapse>
```

```typescript
import { Component } from '@angular/core';
import { Collapse } from '@/shared/components/collapse';

@Component({
  selector: 'app-collapse-sample',
  templateUrl: './collapse.sample.html',
  imports: [Collapse],
})
export class CollapseSample {}
```

### Accordion

```html
<app-collapse type="accordion" name="help">
  <ng-container title>How do I create an account?</ng-container>

  Click the "Sign Up" button in the top right corner and follow the registration process.
</app-collapse>

<app-collapse type="accordion" name="help">
  <ng-container title>I forgot my password. What should I do?</ng-container>

  Click on "Forgot Password" on the login page and follow the instructions sent to your email.
</app-collapse>

<app-collapse type="accordion" name="help">
  <ng-container title>How do I update my profile information?</ng-container>

  Go to "My Account" settings and select "Edit Profile" to make changes.
</app-collapse>
```

```typescript
import { Component } from '@angular/core';
import { Collapse } from '@/shared/components/collapse';

@Component({
  selector: 'app-accordion-sample',
  templateUrl: './accordion.sample.html',
  imports: [Collapse],
})
export class AccordionSample {}
```
