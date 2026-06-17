```html
<app-modal>
  <ng-container title>Hello!</ng-container>
  <div class="w-200" content>Press ESC key or click the button below to close</div>
  <ng-container actions>
    <button appButton (click)="modalRef.dismiss()">Close</button>
  </ng-container>
</app-modal>
```
