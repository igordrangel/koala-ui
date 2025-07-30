```html
<div
  class="flex items-center justify-center w-full h-[26rem] border border-neutral-700 rounded-2xl mt-4"
>
  @if (userInfo(); as user) {
    <div class="flex flex-col items-center justify-center gap-4">
      <div class="flex gap-4 items-center">
        <div class="avatar">
          <div class="ring-primary ring-offset-base-100 w-12 rounded-full ring-2 ring-offset-2">
            <img [src]="user.image" />
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <h4>{{user.firstName}} {{user.lastName}}</h4>
          <small>{{user.email}}</small>
        </div>
      </div>

      <button klButton color="error"
        class="w-full"
        size="small"
        (click)="logout()">
        Logout
      </button>
    </div>
  }
</div>
```
