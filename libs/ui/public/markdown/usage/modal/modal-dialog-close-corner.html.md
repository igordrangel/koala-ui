```html
<app-modal>
  <div class="flex justify-between items-center" title>
    <span>Hello!</span>
    <button appButton circle variant="ghost" size="sm" (click)="modalRef.dismiss()">X</button>
  </div>
  <ng-container content> Press ESC key or click the button below to close </ng-container>
</app-modal>
```
