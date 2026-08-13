---
title: tray
---

# tray

Create and control a Windows system tray icon. Supports a tooltip, a right-click context menu with nested sub-menus, and event handlers for click, scroll, and double-click interactions.

```javascript
import { tray } from "novadesk";
```

::: info Availability
Available in the [Main script](/guides/script-types.html#main-script-the-brain) only.
:::

::: warning Keep a reference
Always store the tray instance in a variable. If the reference is garbage-collected, the tray icon disappears and all event handlers are lost.
:::

#### Table of Contents
[[toc]]

## Constructor

<MethodBox
  name="new tray([image])"
  badge="tray"
  badgeType="core"
  :parameters="[
    { name: 'image', type: 'string', optional: true, description: 'Path to an image file (preferably .ico). Relative paths resolve from the current script directory. The icon can be set or changed later with setImage().' }
  ]"
>

Creates and displays a new system tray icon. The icon appears in the taskbar notification area immediately. Passing a non-string argument throws a `TypeError`.

<template #example>

```javascript
import { tray } from "novadesk";

const appTray = new tray(path.join(__dirname, "assets", "icon.ico"));
appTray.setToolTip("My Widget");
```

</template>
</MethodBox>

## Methods

<MethodBox
  name="tray.setImage(image)"
  badge="tray"
  badgeType="core"
  :parameters="[
    { name: 'image', type: 'string', description: 'Path to the new image file. Relative paths resolve from the current script directory.' }
  ]"
>

Updates the tray icon image at runtime. Useful for reflecting different application states (active, idle, error, etc.). Throws `TypeError` if the argument is missing or not a string.

<template #example>

```javascript
// Show a different icon when connected
appTray.setImage(path.join(__dirname, "assets", "icon-active.ico"));

// Revert to idle state icon
appTray.setImage(path.join(__dirname, "assets", "icon.ico"));
```

</template>
</MethodBox>

<MethodBox
  name="tray.setToolTip(text)"
  badge="tray"
  badgeType="core"
  :parameters="[
    { name: 'text', type: 'string', description: 'Tooltip text shown when hovering over the tray icon.' }
  ]"
>

Sets the tooltip shown when the cursor hovers over the tray icon. Throws `TypeError` if the argument is missing or not a string.

<template #example>

```javascript
appTray.setToolTip("My Widget — Connected");
```

</template>
</MethodBox>

<MethodBox
  name="tray.setContextMenu(items)"
  badge="tray"
  badgeType="core"
  :parameters="[
    { name: 'items', type: 'object[]', description: 'Array of menu item definitions. Replaces the entire existing menu.' }
  ]"
>

Sets the right-click context menu. Replaces any previously set menu entirely. Throws `TypeError` if the argument is not an array or if any item is malformed.

Each item in the array is a plain object with these properties:

| Property | Type | Description |
|---|---|---|
| `text` | `string` | Label text for the menu item. |
| `action` | `function` | Callback invoked when the item is clicked. |
| `type` | `string` | Set to `"separator"` to insert a horizontal divider. When `type` is `"separator"`, all other properties are ignored. |
| `checked` | `boolean` | When `true`, renders a checkmark next to the item. |
| `items` | `object[]` | Nested array of child items to create a sub-menu. |

::: tip Updating menu state
To toggle a checkmark or change item labels, call `setContextMenu` again with the updated items array. The entire menu is replaced on each call.
:::

<template #example>

```javascript
let darkMode = true;

function updateMenu() {
  appTray.setContextMenu([
    { text: "Show", action: () => win.show() },
    { text: "Hide", action: () => win.hide() },
    {
      text: "Settings",
      items: [
        {
          text: "Dark Mode",
          checked: darkMode,
          action: () => {
            darkMode = !darkMode;
            updateMenu();
          }
        }
      ]
    },
    { type: "separator" },
    { text: "Exit", action: () => app.exit() }
  ]);
}

updateMenu();
```

</template>
</MethodBox>

<MethodBox
  name="tray.on(event, handler)"
  badge="tray"
  badgeType="core"
  :parameters="[
    { name: 'event', type: 'string', description: 'Event name. Must be one of the supported values listed below. Throws TypeError for unknown names.' },
    { name: 'handler', type: 'function', description: 'Callback invoked when the event fires.' }
  ]"
>

Registers an event listener on the tray icon. Throws `TypeError` if the event name is not one of the supported values, or if the handler is not a function.

**Supported events:**

| Event | Trigger |
|---|---|
| `"click"` | Left mouse button released on the tray icon |
| `"right-click"` | Right mouse button released on the tray icon |
| `"double-click"` | Left mouse button double-clicked on the tray icon |
| `"scroll-up"` | Mouse wheel scrolled up over the tray icon |
| `"scroll-down"` | Mouse wheel scrolled down over the tray icon |

Event names are case-sensitive. Passing any other string throws `TypeError: tray.on: unknown event`.

<template #example>

```javascript
// Toggle window visibility on left click
appTray.on("click", () => {
  if (win.isVisible()) {
    win.hide();
  } else {
    win.show();
  }
});

// Show context menu hint on right click (menu opens automatically)
appTray.on("right-click", () => {
  console.log("Right-clicked");
});

// Scroll to adjust a value
appTray.on("scroll-up", () => {
  ipcMain.send("volume-up");
});

appTray.on("scroll-down", () => {
  ipcMain.send("volume-down");
});
```

</template>
</MethodBox>

<MethodBox
  name="tray.destroy()"
  badge="tray"
  badgeType="core"
>

Removes the tray icon from the taskbar and clears all event handlers and context menu callbacks. After calling this, the tray instance is no longer active. Throws `TypeError` if called on an invalid tray instance.

<template #example>

```javascript
appTray.destroy();
```

</template>
</MethodBox>

## Practical Examples

**Basic tray with show/hide and exit**

```javascript
import { tray, app } from "novadesk";
import { widgetWindow } from "novadesk";

const win = new widgetWindow({
  id: "demo",
  width: 400,
  height: 300,
  script: "script.ui.js",
  backgroundColor: "rgb(10,10,10)"
});

const appTray = new tray(path.join(__dirname, "assets", "icon.ico"));
appTray.setToolTip("My Widget");

appTray.setContextMenu([
  { text: "Show", action: () => win.show() },
  { text: "Hide", action: () => win.hide() },
  { type: "separator" },
  { text: "Exit", action: () => app.exit() }
]);

appTray.on("click", () => win.show());
```

**Dynamic icon reflecting connection state**

```javascript
import { tray } from "novadesk";

const appTray = new tray(path.join(__dirname, "assets", "icon-offline.ico"));
appTray.setToolTip("Status: Offline");

ipcMain.on("status-change", (event, payload) => {
  if (payload.connected) {
    appTray.setImage(path.join(__dirname, "assets", "icon-online.ico"));
    appTray.setToolTip("Status: Connected");
  } else {
    appTray.setImage(path.join(__dirname, "assets", "icon-offline.ico"));
    appTray.setToolTip("Status: Offline");
  }
});
```

**Volume control via scroll wheel**

```javascript
import { tray } from "novadesk";

let volume = 50;

const appTray = new tray(path.join(__dirname, "assets", "speaker.ico"));
appTray.setToolTip("Volume: 50%");

appTray.on("scroll-up", () => {
  volume = Math.min(100, volume + 5);
  appTray.setToolTip("Volume: " + volume + "%");
  ipcMain.send("set-volume", { value: volume });
});

appTray.on("scroll-down", () => {
  volume = Math.max(0, volume - 5);
  appTray.setToolTip("Volume: " + volume + "%");
  ipcMain.send("set-volume", { value: volume });
});
```

**Destroy tray on widget close**

```javascript
import { tray } from "novadesk";
import { widgetWindow } from "novadesk";

const win = new widgetWindow({ id: "demo", width: 300, height: 200 });
const appTray = new tray(path.join(__dirname, "assets", "icon.ico"));

win.on("close", () => {
  appTray.destroy();
});
```
