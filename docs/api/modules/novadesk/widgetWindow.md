---
title: Create and manage widget windows with widgetWindow
---

# widgetWindow

The `widgetWindow` constructor creates a new desktop widget window. Each window can host its own UI script and supports drag, snap, transparency, toolbar visibility, context menus, and event listeners.

`widgetWindow` is exported from the `novadesk` module.

```javascript
import { widgetWindow } from "novadesk";
```

#### Table of Contents

[[toc]]

## Constructor

### `new widgetWindow(options)`

Creates and displays a new widget window.

#### Options

- **`id`** (`string`, default: `""`): Unique identifier. Saved settings are loaded by this ID.
- **`width`** (`number`): Window width in pixels.
- **`height`** (`number`): Window height in pixels.
- **`x`** (`number`): Horizontal position.
- **`y`** (`number`): Vertical position.
- **`script`** (`string`): Path to the UI script (relative to entry script).
- **`backgroundColor`** (`string`, default: `"rgba(0,0,0,0)"`): Background color or gradient string.
- **`windowOpacity`** (`number`, default: `255`): Master window opacity (`0`–`255`).
- **`draggable`** (`boolean`, default: `true`): Allow the user to drag the window.
- **`clickThrough`** (`boolean`, default: `false`): Mouse events pass through the window.
- **`keepOnScreen`** (`boolean`, default: `false`): Prevent the window from being dragged off-screen.
- **`snapEdges`** (`boolean`, default: `true`): Snap to screen edges and other widgets when dragging.
- **`showInToolbar`** (`boolean`, default: `false`): Show this widget in the Windows toolbar/taskbar.
- **`toolbarIcon`** (`string`, default: `""`): Path to toolbar icon.
- **`toolbarTitle`** (`string`, default: `""`): Custom toolbar/taskbar title.
- **`show`** (`boolean`, default: `true`): Show the window immediately after creation.
- **`zPos`** (`string`, default: `"normal"`): Z-order position.
  - **`ontopmost`**: Remains visible even when showing the desktop (`Win + D`). Stays above all other windows.
  - **`ontop`**: Remains visible when showing the desktop. Sits above normal application windows but below other `ontopmost` widgets. Clicking brings it to the front among other widgets with the same setting.
  - **`normal`**: Remains visible when showing the desktop. Clicking brings it above other normal windows and widgets.
  - **`onbottom`**: Hidden when showing the desktop. Sits behind all application windows. Clicking does not change its stacking order among other `onbottom` widgets.
  - **`ondesktop`**: Remains visible when showing the desktop. Clicking does not change its stacking order relative to normal windows. Recommended for wallpaper-style widgets.

#### Example

```javascript
import { widgetWindow } from "novadesk";

const win = new widgetWindow({
  id: "my-widget",
  width: 400,
  height: 300,
  script: "ui.js",
  backgroundColor: "rgb(10,10,10)",
  draggable: true,
  snapEdges: true,
  showInToolbar: true,
  toolbarTitle: "My Widget",
});
```

## Window Methods

### `win.setProperties(options)`

Updates window properties at runtime. Accepts the same option keys as the constructor.

#### Example

```javascript
win.setProperties({
  width: 600,
  height: 400,
  backgroundColor: "rgb(30,30,30)",
});
```

### `win.getProperties()`

Returns an object with the current window state.

#### Return Value

An object containing: `id`, `x`, `y`, `width`, `height`, `draggable`, `clickThrough`, `keepOnScreen`, `snapEdges`, `showInToolbar`, `toolbarIcon`, `toolbarTitle`, `show`, `windowOpacity`, `backgroundColor`, `zPos`, `script`.

#### Example

```javascript
const props = win.getProperties();
console.log("Position:", props.x, props.y);
console.log("Size:", props.width, "x", props.height);
```

### `win.close()`

Destroys the widget window and releases its resources. Triggers the `close` and `closed` events.

### `win.destroy()`

Destroys the widget window immediately without triggering the `close` event.

### `win.show()`

Shows the widget window. Returns the widget instance for chaining.

### `win.hide()`

Hides the widget window. Returns the widget instance for chaining.

### `win.isFocused()`

Returns whether the widget window currently has keyboard focus.

#### Return Value

- **Type**: `boolean`

### `win.isVisible()`

Returns whether the widget window is currently visible.

#### Return Value

- **Type**: `boolean`

### `win.isDestroyed()`

Returns whether the widget window has been destroyed.

#### Return Value

- **Type**: `boolean`

### `win.setBounds(bounds)`

Sets the position and/or size of the widget window.

#### Parameters

- **`bounds`** (`object`): Object with optional properties:
  - **`x`** (`number`): New X position
  - **`y`** (`number`): New Y position
  - **`width`** (`number`): New width
  - **`height`** (`number`): New height

#### Example

```javascript
win.setBounds({ x: 100, y: 100, width: 500, height: 400 });
win.setBounds({ width: 600 }); // Only change width
```

### `win.getBounds()`

Returns the current window position and size.

#### Return Value

- **Type**: `object` with properties: `x`, `y`, `width`, `height`

#### Example

```javascript
const bounds = win.getBounds();
console.log("Position:", bounds.x, bounds.y);
console.log("Size:", bounds.width, "x", bounds.height);
```

### `win.setSize(width, height)`

Sets the window size.

#### Parameters

- **`width`** (`number`): New width in pixels
- **`height`** (`number`): New height in pixels

#### Example

```javascript
win.setSize(800, 600);
```

### `win.getSize()`

Returns the current window size.

#### Return Value

- **Type**: `object` with properties: `width`, `height`

### `win.setBackgroundColor(color)`

Sets the window background color.

#### Parameters

- **`color`** (`string`): Color string (e.g., `"rgb(10,10,10)"`, `"rgba(0,0,0,128)"`)

#### Example

```javascript
win.setBackgroundColor("rgba(20, 20, 30, 200)");
```

### `win.getBackgroundColor()`

Returns the current background color string.

### `win.setOpacity(value)`

Sets the window opacity.

#### Parameters

- **`value`** (`number`): Opacity value. Accepts:
  - `0–1` range (e.g., `0.5` for 50%)
  - `0–100` range (e.g., `50` for 50%)
  - `0–255` range (e.g., `128` for ~50%)

#### Example

```javascript
win.setOpacity(0.75); // 75% opaque
```

### `win.refresh()`

Clears all UI elements and re-executes the widget’s UI script.

### `win.setFocus()`

Gives keyboard focus to the widget window.

### `win.unFocus()`

Removes keyboard focus from the widget window.

### `win.minimize()`

Minimizes the widget window and triggers the `minimize` event.

### `win.unMinimize()`

Restores a minimized widget window and triggers the `unMinimize` event.

### `win.getHandle()`

Returns the native window handle (`HWND`) as a number.

### `win.getInternalPointer()`

Returns the internal native Widget pointer as a number. Primarily useful for addon interop.

### `win.getTitle()`

Returns the window title string.

## Context Menu

### `win.setContextMenu(items)`

Sets the right-click context menu for this widget. Replaces any previous menu.

#### Parameters

- **`items`** (`Array<object>`): Menu item definitions. Each object can include:
  - **`text`** (`string`): Label.
  - **`action`** (`function`): Click callback.
  - **`type`** (`string`): `"separator"` for dividers.
  - **`checked`** (`boolean`): Check state.
  - **`items`** (`Array<object>`): Nested sub-menu.

#### Example

```javascript
win.setContextMenu([
  { text: "Refresh", action: () => win.refresh() },
  { type: "separator" },
  {
    text: "Tools",
    items: [
      { text: "Ping", checked: false, action: () => console.log("ping") },
    ],
  },
]);
```

### `win.clearContextMenu()`

Removes all custom context menu items.

### `win.disableContextMenu(disable)`

Enables or disables the right-click context menu entirely.

#### Parameters

- **`disable`** (`boolean`): `true` to disable, `false` to enable.

### `win.showDefaultContextMenuItems(show)`

Controls whether the built-in default context menu entries are shown.

#### Parameters

- **`show`** (`boolean`): `true` to show, `false` to hide.

## Events

### `win.on(eventName, callback)`

Registers an event listener. Returns the widget instance for chaining.

#### Parameters

- **`eventName`** (`string`): Event name.
- **`callback`** (`function`): Handler receiving a [Mouse Event Object](/api/global-variables#mouse-event-object) for mouse events.

Available Events

| Event Name   | Description                           |
| ------------ | ------------------------------------- |
| show         | Widget became visible.                |
| focus        | Widget gained keyboard focus.         |
| mouseOver    | Mouse entered the widget area.        |
| mouseMove    | Mouse moved over the widget.          |
| mouseDown    | Any mouse button pressed.             |
| mouseUp      | Any mouse button released.            |
| click        | Left click released on widget.        |
| right-click  | Right click released on widget.       |
| double-click | Left button double click on widget.   |
| scroll-up    | Mouse wheel scrolled up on widget.    |
| scroll-down  | Mouse wheel scrolled down on widget.  |
| mouseLeave   | Mouse left the widget area.           |
| unFocus      | Widget lost keyboard focus.           |
| minimize     | Widget minimized.                     |
| unMinimize   | Widget restored from minimized state. |
| move         | Widget position changed.              |
| refresh      | Widget UI was refreshed.              |
| close        | Widget is about to close.             |
| closed       | Widget has been destroyed.            |
| hide         | Widget was hidden.                    |

## Runtime Overrides (Ctrl key)

When the Ctrl key is held, widget runtime interaction temporarily overrides some options:

- Dragging can be initiated even when `draggable` is `false`.
- Click-through widgets become interactable while Ctrl is held.
- Snap behavior can be bypassed while dragging (useful for precise placement).

#### Example

```javascript
win.on("mouseMove", (e) => {
  console.log("client:", e.clientX, e.clientY);
  console.log("screen:", e.screenX, e.screenY);
});

win.on("show", () => console.log("Widget visible"));
win.on("close", () => console.log("Widget closing"));
```

## Full Example

:::tabs
== index.js

```javascript
import { widgetWindow, app } from "novadesk";

const win = new widgetWindow({
  id: "demo",
  width: 400,
  height: 300,
  script: "ui.js",
  backgroundColor: "rgb(10,10,10)",
  snapEdges: true,
});

win.on("mouseOver", (e) => {
  console.log("mouse entered", e.clientX, e.clientY);
});

win.disableContextMenu(false);
win.showDefaultContextMenuItems(true);
win.setContextMenu([
  { text: "Refresh", action: () => win.refresh() },
  { type: "separator" },
  { text: "Close", action: () => win.close() },
]);
```

== ui.js

```javascript
ui.beginUpdate();

ui.addText({
  id: "title",
  text: "Hello Widget",
  x: 16,
  y: 14,
  width: 260,
  height: 28,
  fontSize: 16,
  fontColor: "rgb(230,230,230)",
});

ui.addShape({
  id: "box",
  shapeType: "rectangle",
  x: 16,
  y: 52,
  width: 260,
  height: 90,
  fillColor: "rgba(35,35,35,220)",
  strokeColor: "rgba(255,255,255,40)",
  strokeWidth: 1,
  backgroundColorRadius: 10,
});

ui.endUpdate();
```

:::
