```html
<app-bottom-sheet>
  <ng-container title>Hello!</ng-container>
  <ng-container content> Press ESC key or click the button below to close </ng-container>
  <ng-container actions>
    <button appButton (click)="bottomSheet.dismiss()">Close</button>
  </ng-container>
</app-bottom-sheet>
```
