# Page Base

## Installation

```bash
kl install page-base
```

### TypeScript

```typescript
import { Component } from '@angular/core';
import { PageBase } from '@/shared/base/page.base';
import { Breadcrumb } from '@/shared/components/breadcrumb';

@Component({
  selector: 'app-users-page',
  template: `
    <app-breadcrumb [items]="breadcrumbs()" />
    <app-users-list [reload]="reload()" />
  `,
  imports: [Breadcrumb, UsersList],
})
export class UsersPage extends PageBase {
  onSaved() {
    this.reloadList();
  }
}
```

### Overview

PageBase is an abstraction resource for page components. It provides breadcrumb navigation and a reload signal to refresh child lists or tables.

## API

### Signals

- **reload**: Signal used to trigger a reload in child components.

### Methods

- **reloadList()**: Sets `reload` to `true` briefly so bound children can react.

### Properties

- **breadcrumbs**: Computed breadcrumb trail from the current `ActivatedRoute`.

## Usage

Use with the [Breadcrumb](./breadcrumb.md) component in your template.
