# Loading

## Installation

```bash
kl install loading
```

### Ball

```html
<app-loading variant="ball" size="xs">Extra Small</app-loading>
<app-loading variant="ball" size="sm">Small</app-loading>
<app-loading variant="ball" size="md">Medium</app-loading>
<app-loading variant="ball" size="lg">Large</app-loading>
<app-loading variant="ball" size="xl">Extra Large</app-loading>
```

```typescript
import { Component } from '@angular/core';
import { Loading } from '@/shared/components/loading';

@Component({
  selector: 'app-loading-sample',
  templateUrl: './loading.sample.html',
  imports: [Loading],
})
export class LoadingSample {}
```

### Bars

```html
<app-loading variant="bars" size="xs">Extra Small</app-loading>
<app-loading variant="bars" size="sm">Small</app-loading>
<app-loading variant="bars" size="md">Medium</app-loading>
<app-loading variant="bars" size="lg">Large</app-loading>
<app-loading variant="bars" size="xl">Extra Large</app-loading>
```

### Dots

```html
<app-loading variant="dots" size="xs">Extra Small</app-loading>
<app-loading variant="dots" size="sm">Small</app-loading>
<app-loading variant="dots" size="md">Medium</app-loading>
<app-loading variant="dots" size="lg">Large</app-loading>
<app-loading variant="dots" size="xl">Extra Large</app-loading>
```

### Infinity

```html
<app-loading variant="infinity" size="xs">Extra Small</app-loading>
<app-loading variant="infinity" size="sm">Small</app-loading>
<app-loading variant="infinity" size="md">Medium</app-loading>
<app-loading variant="infinity" size="lg">Large</app-loading>
<app-loading variant="infinity" size="xl">Extra Large</app-loading>
```

### Ring

```html
<app-loading variant="ring" size="xs">Extra Small</app-loading>
<app-loading variant="ring" size="sm">Small</app-loading>
<app-loading variant="ring" size="md">Medium</app-loading>
<app-loading variant="ring" size="lg">Large</app-loading>
<app-loading variant="ring" size="xl">Extra Large</app-loading>
```

### Spinner

```html
<app-loading variant="spinner" size="xs">Extra Small</app-loading>
<app-loading variant="spinner" size="sm">Small</app-loading>
<app-loading variant="spinner" size="md">Medium</app-loading>
<app-loading variant="spinner" size="lg">Large</app-loading>
<app-loading variant="spinner" size="xl">Extra Large</app-loading>
```
