```html
<div
  class="flex items-center justify-center w-full h-[26rem] border border-neutral-700 rounded-2xl mt-4"
>
  <kl-dropdown>
    <button klButton color="ghost" trigger>
      Click Me
    </button>

    <ng-container options>
      <div class="p-1 border-b border-neutral-200 dark:border-neutral-700">
        <button klButton
          class="w-full justify-start"
          size="small"
          color="ghost">
          <i class="fa-regular fa-pen-to-square"></i>
          Edit
        </button>
      </div>

      <div class="p-1">
        <button klButton
          class="w-full justify-start"
          color="error"
          size="small"
          soft>
          <i class="fa-regular fa-trash-can"></i>
          Delete
        </button>
      </div>
    </ng-container>
  </kl-dropdown>
</div>
```
