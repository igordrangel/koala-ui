```typescript
import { Component, inject, signal } from '@angular/core';
import { AuthorizationService } from '@/core/security/authorization.service';
import { Button } from '@/shared/components/button';
import { Skeleton } from '@/shared/components/skeleton';

@Component({
  selector: 'app-logged-sample',
  templateUrl: './logged-sample.html',
  imports: [Button, Skeleton],
})
export class LoggedSample {
  readonly avatarLoading = signal(true);
  readonly authorization = inject(AuthorizationService);
}
```
