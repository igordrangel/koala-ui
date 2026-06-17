```html
@if (authorization.loggedUser(); as loggedUser) {
  <div class="flex flex-col items-center justify-center gap-4 py-20">
    <div class="avatar">
      @if (avatarLoading()) {
        <app-skeleton variant="circle" class="w-24 h-24 absolute inset-0" />
      }

      <div
        class="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2 relative transition-opacity duration-300"
        [class.opacity-0]="avatarLoading()"
      >
        <img [src]="loggedUser.avatar" (load)="avatarLoading.set(false)" />
      </div>
    </div>

    <span>{{ loggedUser.name }}</span>
    <div class="join">
      <button appButton btnVariant="primary" (click)="authorization.updateToken().subscribe()">
        Refresh Token
      </button>
      <button appButton btnVariant="error" (click)="authorization.logout()">Logout</button>
    </div>
  </div>
}
```
