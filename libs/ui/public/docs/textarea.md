# Textarea

## Installation

```bash
kl install textarea
```

### Sizes

```html
<textarea appTextarea rows="4" size="xs" placeholder="Type here"></textarea>
<textarea appTextarea rows="4" size="sm" placeholder="Type here"></textarea>
<textarea appTextarea rows="4" size="md" placeholder="Type here"></textarea>
<textarea appTextarea rows="4" size="lg" placeholder="Type here"></textarea>
<textarea appTextarea rows="4" size="xl" placeholder="Type here"></textarea>
```

```typescript
import { Component } from '@angular/core';
import { Textarea } from '@/shared/components/textarea';

@Component({
  selector: 'app-textarea-sample',
  templateUrl: './textarea.sample.html',
  imports: [Textarea],
})
export class TextareaSample {}
```
