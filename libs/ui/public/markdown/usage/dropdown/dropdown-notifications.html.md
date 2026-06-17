```html
<app-dropdown closeOnClick>
  <button appButton trigger>Notifications</button>
  <div class="flex flex-col w-100" options>
    <h2 class="p-4 border-b border-neutral-800 text-lg">Notificações</h2>
    <div class="flex items-center gap-2 p-4">
      <div class="avatar">
        <div class="w-10 rounded-full">
          <img src="https://ui-avatars.com/api/?name=John+Doe" alt="Avatar" />
        </div>
      </div>
      <div>
        <p class="font-bold">John Doe</p>
        <p class="text-sm opacity-50">New message received</p>
      </div>
    </div>
    <div class="flex items-center gap-2 p-4">
      <div class="avatar">
        <div class="w-10 rounded-full">
          <img src="https://ui-avatars.com/api/?name=Jane+Smith" alt="Avatar" />
        </div>
      </div>
      <div>
        <p class="font-bold">Jane Smith</p>
        <p class="text-sm opacity-50">Your order has been shipped</p>
      </div>
    </div>
  </div>
</app-dropdown>
```
