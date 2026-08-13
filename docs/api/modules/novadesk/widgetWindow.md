---
title: widgetWindow
---

# widgetWindow

Create desktop widget windows. Each window hosts a UI script and supports drag, snap, transparency, context menus, and events.

```javascript
import { widgetWindow } from "novadesk";
```

::: info Availability
Available in the [Main script](/guides/script-types.html#main-script-the-brain) only.
:::

#### Table of Contents
[[toc]]

## Constructor

<MethodBox
  name="new widgetWindow(options)"
  badge="widgetWindow"
  badgeType="core"
  :parameters="[
    { name: 'options', type: 'object', description: 'Window configuration object. See options table below.' }
  ]"
>

Creates and shows a new desktop widget window.

If `id` is provided and a widget with the same `id` already exists, the existing widget is silently removed before the new one is created. If `id` matches a previously saved widget, the saved position and size are loaded as defaults (explicitly provided `x`, `y`, `width`, `height` override them).

**Options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `id` | `string` | `""` | Unique identifier. Saved position/size are loaded by this ID on creation. |
| `width` | `number` | — | Window width in pixels. |
| `height` | `number` | — | Window height in pixels. |
| `x` | `number` | — | Horizontal screen position in pixels. |
| `y` | `number` | — | Vertical screen position in pixels. |
| `script` | `string` | — | Path to the UI script. **Must end with `.ui.js`** (e.g. `"ui/clock.ui.js"`). Relative paths resolve from the entry script directory. |
| `backgroundColor` | `string` | `"rgba(0,0,0,0)"` | Window background color or gradient. Supports `rgb()`, `rgba()`, `linearGradient()`, `radialGradient()`. |
| `opacity` | `number \| string` | `1` | Master window opacity. Accepts `0.0–1.0`, `0–100`, `0–255`, or a percentage string like `"75%"`. Scales the **entire window** including all drawn elements. |
| `draggable` | `boolean` | `true` | Allow the user to drag the window. |
| `clickThrough` | `boolean` | `false` | Mouse events pass through the window to whatever is behind it. |
| `keepOnScreen` | `boolean` | `false` | Prevent dragging the window off-screen. |
| `snapEdges` | `boolean` | `true` | Snap to screen edges and other widgets while dragging. |
| `show` | `boolean` | `true` | Show the window immediately after creation. Pass `false` to create it hidden and call `win.show()` later. |
| `showInToolbar` | `boolean` | `false` | Show in the Windows taskbar. |
| `toolbarIcon` | `string` | `""` | Path to the taskbar icon. |
| `toolbarTitle` | `string` | `""` | Title shown in the Windows taskbar. |
| `zPos` | `string` | `"normal"` | Z-order position. See values below. |

**`zPos` values** (case-insensitive):

| Value | Behavior |
|---|---|
| `"ontopmost"` | Always on top of everything, including other topmost windows. |
| `"ontop"` | Above normal windows. |
| `"normal"` | Normal stacking order (default). |
| `"onbottom"` | Behind all app windows. Hidden when "Show Desktop" is triggered. |
| `"ondesktop"` | Sits over the desktop. Ideal for wallpaper-style widgets. |

::: warning Script must end with `.ui.js`
If `script` does not end with `.ui.js`, the window is created but the script is not executed. The UI will be blank. Valid examples: `"script.ui.js"`, `"ui/clock.ui.js"`.
:::

::: tip opacity vs backgroundColor alpha
`opacity` sets the Win32 layered window opacity — it scales the entire window including all UI elements. The alpha component of `backgroundColor` only affects the background fill. Setting `opacity: 0` makes everything invisible. Setting `backgroundColor: "rgba(0,0,0,0)"` only makes the background transparent while UI elements remain visible.
:::

<template #example>

```javascript
import { widgetWindow } from "novadesk";

const win = new widgetWindow({
  id: "my-widget",
  width: 400,
  height: 300,
  script: "script.ui.js",
  backgroundColor: "rgb(10,10,10)",
  snapEdges: true,
  showInToolbar: true,
  toolbarTitle: "My Widget"
});
```

</template>
</MethodBox>

## Window State

<MethodBox
  name="win.show()"
  badge="widgetWindow"
  badgeType="core"
  returns="widgetWindow"
>
<template #returns>The widget instance (chainable).</template>

Shows the widget window. Fires the `show` event.

<template #example>

```javascript
win.show();
```

</template>
</MethodBox>

<MethodBox
  name="win.hide()"
  badge="widgetWindow"
  badgeType="core"
  returns="widgetWindow"
>
<template #returns>The widget instance (chainable).</template>

Hides the widget window. Fires the `hide` event.

<template #example>

```javascript
win.hide();
```

</template>
</MethodBox>

<MethodBox
  name="win.close()"
  badge="widgetWindow"
  badgeType="core"
>

Destroys the widget window and releases all resources. Fires the `close` and `closed` events.

<template #example>

```javascript
win.close();
```

</template>
</MethodBox>

<MethodBox
  name="win.destroy()"
  badge="widgetWindow"
  badgeType="core"
>

Destroys the widget window immediately **without** firing the `close` event. Use `close()` for normal shutdown; use `destroy()` when you need to remove the window silently.

<template #example>

```javascript
win.destroy();
```

</template>
</MethodBox>

<MethodBox
  name="win.isVisible()"
  badge="widgetWindow"
  badgeType="core"
  returns="boolean"
>
<template #returns><code>true</code> if the window is currently visible.</template>

Returns whether the window is visible.

<template #example>

```javascript
if (!win.isVisible()) win.show();
```

</template>
</MethodBox>

<MethodBox
  name="win.isFocused()"
  badge="widgetWindow"
  badgeType="core"
  returns="boolean"
>
<template #returns><code>true</code> if the window currently has keyboard focus.</template>

Returns whether the window has keyboard focus.

<template #example>

```javascript
console.log("Focused:", win.isFocused());
```

</template>
</MethodBox>

<MethodBox
  name="win.isDestroyed()"
  badge="widgetWindow"
  badgeType="core"
  returns="boolean"
>
<template #returns><code>true</code> if the window has been destroyed.</template>

Returns whether the window has been destroyed. Safe to call even after the window is closed. Check this before calling other methods on a window that may have been closed elsewhere.

<template #example>

```javascript
if (!win.isDestroyed()) {
  win.setProperties({ width: 500 });
}
```

</template>
</MethodBox>

<MethodBox
  name="win.minimize()"
  badge="widgetWindow"
  badgeType="core"
>

Minimizes the widget window. Fires the `minimize` event.

<template #example>

```javascript
win.minimize();
```

</template>
</MethodBox>

<MethodBox
  name="win.unMinimize()"
  badge="widgetWindow"
  badgeType="core"
>

Restores a minimized widget window. Fires the `unMinimize` event.

<template #example>

```javascript
win.unMinimize();
```

</template>
</MethodBox>

<MethodBox
  name="win.setFocus()"
  badge="widgetWindow"
  badgeType="core"
>

Gives keyboard focus to the widget window.

<template #example>

```javascript
win.setFocus();
```

</template>
</MethodBox>

<MethodBox
  name="win.unFocus()"
  badge="widgetWindow"
  badgeType="core"
>

Removes keyboard focus from the widget window.

<template #example>

```javascript
win.unFocus();
```

</template>
</MethodBox>

<MethodBox
  name="win.refresh()"
  badge="widgetWindow"
  badgeType="core"
>

Clears all UI elements and re-executes the widget's UI script. Stale `ipcRenderer` listeners from the previous run are automatically cleaned up before the new script executes.

<template #example>

```javascript
win.refresh();
```

</template>
</MethodBox>

## Properties

<MethodBox
  name="win.setProperties(options)"
  badge="widgetWindow"
  badgeType="core"
  returns="widgetWindow"
  :parameters="[
    { name: 'options', type: 'object', description: 'Partial options object. Accepts the same keys as the constructor. Only the provided keys are changed.' }
  ]"
>
<template #returns>The widget instance (chainable).</template>

Updates one or more window properties at runtime.

<template #example>

```javascript
win.setProperties({ width: 600, height: 400 });
win.setProperties({ backgroundColor: "rgb(30,30,30)", draggable: false });
win.setProperties({ show: false }); // equivalent to win.hide()
```

</template>
</MethodBox>

<MethodBox
  name="win.getProperties()"
  badge="widgetWindow"
  badgeType="core"
  returns="object"
>
<template #returns>An object with <code>id</code>, <code>x</code>, <code>y</code>, <code>width</code>, <code>height</code>, <code>draggable</code>, <code>clickThrough</code>, <code>keepOnScreen</code>, <code>snapEdges</code>, <code>showInToolbar</code>, <code>toolbarIcon</code>, <code>toolbarTitle</code>, <code>show</code> (live visibility), <code>windowOpacity</code> (0–255), <code>backgroundColor</code>, <code>zPos</code> (as a number), and <code>script</code>.</template>

Returns the current state of all window properties. Note: `zPos` is returned as a number (`-2` to `2`), not a string.

<template #example>

```javascript
const props = win.getProperties();
console.log("Position:", props.x, props.y);
console.log("Size:", props.width, "x", props.height);
```

</template>
</MethodBox>

## Position and Size

<MethodBox
  name="win.setBounds(bounds)"
  badge="widgetWindow"
  badgeType="core"
  returns="widgetWindow"
  :parameters="[
    { name: 'bounds', type: 'object', description: 'Object with optional x, y, width, height properties. Omitted keys are left unchanged.' }
  ]"
>
<template #returns>The widget instance (chainable).</template>

Sets the position and/or size of the window in one call. Throws `TypeError` if the argument is not an object.

<template #example>

```javascript
win.setBounds({ x: 100, y: 100, width: 500, height: 400 });
win.setBounds({ width: 600 }); // change only width
```

</template>
</MethodBox>

<MethodBox
  name="win.getBounds()"
  badge="widgetWindow"
  badgeType="core"
  returns="object"
>
<template #returns>An object with <code>x</code>, <code>y</code>, <code>width</code>, and <code>height</code> in screen coordinates. Returns <code>null</code> if the window handle is not available.</template>

Returns the current position and size of the window using screen coordinates.

<template #example>

```javascript
const b = win.getBounds();
console.log("At:", b.x, b.y, "Size:", b.width, "x", b.height);
```

</template>
</MethodBox>

<MethodBox
  name="win.setSize(width, height)"
  badge="widgetWindow"
  badgeType="core"
  returns="widgetWindow"
  :parameters="[
    { name: 'width', type: 'number', description: 'New width in pixels.' },
    { name: 'height', type: 'number', description: 'New height in pixels.' }
  ]"
>
<template #returns>The widget instance (chainable).</template>

Sets the window size without changing its position. Throws `TypeError` if fewer than two number arguments are provided.

<template #example>

```javascript
win.setSize(800, 600);
```

</template>
</MethodBox>

<MethodBox
  name="win.getSize()"
  badge="widgetWindow"
  badgeType="core"
  returns="object"
>
<template #returns>An object with <code>width</code> and <code>height</code>. Returns <code>null</code> if the window handle is not available.</template>

Returns the current window size.

<template #example>

```javascript
const { width, height } = win.getSize();
console.log(width, "x", height);
```

</template>
</MethodBox>

## Color and Opacity

<MethodBox
  name="win.setBackgroundColor(color)"
  badge="widgetWindow"
  badgeType="core"
  returns="widgetWindow"
  :parameters="[
    { name: 'color', type: 'string', description: 'Color string. Supports rgb(), rgba(), linearGradient(), radialGradient().' }
  ]"
>
<template #returns>The widget instance (chainable).</template>

Sets the window background color or gradient.

<template #example>

```javascript
win.setBackgroundColor("rgba(20,20,30,0.95)");
```

</template>
</MethodBox>

<MethodBox
  name="win.getBackgroundColor()"
  badge="widgetWindow"
  badgeType="core"
  returns="string"
>
<template #returns>The current background color string.</template>

Returns the current background color.

<template #example>

```javascript
console.log("BG:", win.getBackgroundColor());
```

</template>
</MethodBox>

<MethodBox
  name="win.setOpacity(value)"
  badge="widgetWindow"
  badgeType="core"
  returns="widgetWindow"
  :parameters="[
    { name: 'value', type: 'number', description: 'Opacity as 0.0–1.0, 0–100, or 0–255. Auto-detected and normalized.' }
  ]"
>
<template #returns>The widget instance (chainable).</template>

Sets the master window opacity. Scales the entire window including all UI elements. Throws `TypeError` if the argument is not a number.

| Range | Interpretation |
|---|---|
| `0.0–1.0` | Fractional opacity (e.g. `0.75` = 75%) |
| `1.0–100.0` | Percentage (e.g. `75` = 75%) |
| `100.0–255.0` | Raw byte (e.g. `191` = 75%) |

<template #example>

```javascript
win.setOpacity(0.75); // 75% opacity
win.setOpacity(128);  // ~50% opacity
```

</template>
</MethodBox>

## Context Menu

<MethodBox
  name="win.setContextMenu(items)"
  badge="widgetWindow"
  badgeType="core"
  returns="widgetWindow"
  :parameters="[
    { name: 'items', type: 'object[]', description: 'Array of menu item definitions. Replaces the entire existing menu. Throws TypeError if not an array.' }
  ]"
>
<template #returns>The widget instance (chainable).</template>

Sets the right-click context menu. Replaces any previous menu and clears all previous action callbacks.

**Menu item properties:**

| Property | Type | Description |
|---|---|---|
| `text` | `string` | Label text. |
| `action` | `function` | Callback invoked when the item is clicked. |
| `type` | `string` | `"separator"` inserts a horizontal divider. Separator items ignore all other properties. |
| `checked` | `boolean` | Shows a checkmark when `true`. |
| `items` | `object[]` | Nested sub-menu items (recursively supports the same schema). |

<template #example>

```javascript
win.setContextMenu([
  { text: "Refresh", action: () => win.refresh() },
  {
    text: "Tools",
    items: [
      { text: "Debug", checked: false, action: () => app.enableDebugging(true) }
    ]
  },
  { type: "separator" },
  { text: "Close", action: () => win.close() }
]);
```

</template>
</MethodBox>

<MethodBox
  name="win.clearContextMenu()"
  badge="widgetWindow"
  badgeType="core"
  returns="widgetWindow"
>
<template #returns>The widget instance (chainable).</template>

Removes all custom context menu items and clears their registered callbacks.

<template #example>

```javascript
win.clearContextMenu();
```

</template>
</MethodBox>

<MethodBox
  name="win.disableContextMenu(disable)"
  badge="widgetWindow"
  badgeType="core"
  returns="widgetWindow"
  :parameters="[
    { name: 'disable', type: 'boolean', description: 'true to disable the right-click menu entirely. false to re-enable it. Defaults to true if omitted.' }
  ]"
>
<template #returns>The widget instance (chainable).</template>

Enables or disables the right-click context menu.

<template #example>

```javascript
win.disableContextMenu(true);   // no right-click menu
win.disableContextMenu(false);  // restore menu
```

</template>
</MethodBox>

<MethodBox
  name="win.showDefaultContextMenuItems(show)"
  badge="widgetWindow"
  badgeType="core"
  returns="widgetWindow"
  :parameters="[
    { name: 'show', type: 'boolean', description: 'true to include the built-in Novadesk default menu items. false to hide them.' }
  ]"
>
<template #returns>The widget instance (chainable).</template>

Controls whether built-in Novadesk context menu entries (e.g. Refresh, Close) are shown alongside custom items.

<template #example>

```javascript
win.showDefaultContextMenuItems(false); // custom items only
```

</template>
</MethodBox>

## Events

<MethodBox
  name="win.on(event, callback)"
  badge="widgetWindow"
  badgeType="core"
  returns="widgetWindow"
  :parameters="[
    { name: 'event', type: 'string', description: 'Event name. See supported events below.' },
    { name: 'callback', type: 'function', description: 'Handler. Mouse events receive a Mouse Event Object.' }
  ]"
>
<template #returns>The widget instance (chainable).</template>

Registers an event listener on the widget window. Mouse events pass a [Mouse Event Object](/api/global-variables#mouse-event-object) to the callback. Throws `TypeError` if the callback is not a function or the event name is empty.

**Supported events:**

| Event | Trigger |
|---|---|
| `show` | Window became visible |
| `hide` | Window was hidden |
| `focus` | Window gained keyboard focus |
| `unFocus` | Window lost keyboard focus |
| `minimize` | Window was minimized |
| `unMinimize` | Window was restored from minimized state |
| `move` | Window position changed |
| `refresh` | UI script was refreshed |
| `close` | Window is about to close (fired by `close()`, not by `destroy()`) |
| `closed` | Window has been fully destroyed |
| `mouseOver` | Mouse entered the window area |
| `mouseLeave` | Mouse left the window area |
| `mouseMove` | Mouse moved over the window |
| `mouseDown` | Any mouse button was pressed |
| `mouseUp` | Any mouse button was released |
| `click` | Left click released on the window |
| `right-click` | Right click released on the window |
| `double-click` | Left button double-clicked |
| `scroll-up` | Mouse wheel scrolled up |
| `scroll-down` | Mouse wheel scrolled down |

<template #example>

```javascript
win.on("click", (e) => {
  console.log("Clicked at:", e.__clientX, e.__clientY);
});

win.on("mouseMove", (e) => {
  console.log("Mouse:", e.__clientX, e.__clientY);
});

win.on("close", () => {
  console.log("Window closing");
  cleanup();
});
```

</template>
</MethodBox>

## Native Interop

<MethodBox
  name="win.getHandle()"
  badge="widgetWindow"
  badgeType="core"
  returns="number"
>
<template #returns>The native Windows <code>HWND</code> as a number.</template>

Returns the native window handle. Useful when passing to a native addon that needs a parent window.

<template #example>

```javascript
const hwnd = win.getHandle();
```

</template>
</MethodBox>

<MethodBox
  name="win.getInternalPointer()"
  badge="widgetWindow"
  badgeType="core"
  returns="number"
>
<template #returns>The internal native Widget pointer as a number.</template>

Returns the raw Widget pointer. Useful when passing the widget reference to a native addon.

<template #example>

```javascript
const ptr = win.getInternalPointer();
```

</template>
</MethodBox>

<MethodBox
  name="win.getTitle()"
  badge="widgetWindow"
  badgeType="core"
  returns="string"
>
<template #returns>The window title string.</template>

Returns the current window title.

<template #example>

```javascript
console.log("Title:", win.getTitle());
```

</template>
</MethodBox>

## Runtime Overrides

When the **Ctrl key** is held down, the runtime temporarily overrides some interaction settings:

- Dragging works even when `draggable: false`
- Click-through widgets become interactable
- Snap behavior can be bypassed for precise placement

## Practical Examples

**Basic widget with tray and context menu**

:::tabs
== index.js
```javascript
import { widgetWindow, tray, app } from "novadesk";

const win = new widgetWindow({
  id: "demo",
  width: 400,
  height: 300,
  script: "script.ui.js",
  backgroundColor: "rgb(10,10,10)",
  snapEdges: true
});

const appTray = new tray(path.join(__dirname, "assets", "icon.ico"));
appTray.setToolTip("My Widget");
appTray.on("click", () => win.show());

win.setContextMenu([
  { text: "Refresh", action: () => win.refresh() },
  { type: "separator" },
  { text: "Exit", action: () => app.exit() }
]);
```
== script.ui.js
```javascript
ui.beginUpdate();

ui.addText({
  id: "title",
  text: "Hello Widget",
  x: 16, y: 14,
  width: 260, height: 28,
  fontSize: 16,
  fontColor: "rgb(230,230,230)"
});

ui.addShape({
  id: "card",
  shapeType: "rectangle",
  x: 16, y: 52,
  width: 260, height: 80,
  fillColor: "rgba(35,35,35,220)",
  strokeColor: "rgba(255,255,255,40)",
  strokeWidth: 1,
  radiusX: 8, radiusY: 8
});

ui.endUpdate();
```
:::

**Hidden window revealed on demand**

```javascript
const win = new widgetWindow({
  id: "popup",
  width: 300,
  height: 200,
  script: "popup.ui.js",
  show: false   // start hidden
});

ipcMain.on("show-popup", () => win.show());
ipcMain.on("hide-popup", () => win.hide());
```

**Resize window based on content**

```javascript
const win = new widgetWindow({
  id: "dynamic",
  width: 300,
  height: 100,
  script: "dynamic.ui.js"
});

ipcMain.on("content-changed", (event, payload) => {
  const newHeight = 60 + payload.itemCount * 30;
  win.setSize(300, newHeight);
});
```

**Dynamic opacity on hover**

```javascript
const win = new widgetWindow({
  id: "fade",
  width: 300,
  height: 200,
  script: "fade.ui.js",
  opacity: 0.4
});

win.on("mouseOver", () => win.setOpacity(1.0));
win.on("mouseLeave", () => win.setOpacity(0.4));
```
