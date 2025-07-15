```html
<div
  class="flex items-center justify-center w-full h-[26rem] border border-neutral-700 rounded-2xl mt-4"
>
  <kl-dropdown>
    <button klButton color="ghost" trigger>Click Me</button>

    <div class="p-1" options>
      <button klButton class="w-full justify-start gap-3" color="ghost">
        <i class="fa-regular fa-pen-to-square"></i>
        Edit
      </button>

      <span class="divider m-0"></span>

      <button klButton class="w-full justify-start gap-3" color="error" soft>
        <i class="fa-regular fa-trash-can"></i>
        Delete
      </button>
    </div>
  </kl-dropdown>
</div>
```
