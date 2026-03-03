---
title: Create and manage widget windows with the widget-window module.
---

# widget-window Module
Create and manage desktop widget windows in Novadesk. The `widgetWindow` class is the primary interface for building layered, transparent widget windows.

The widget-window module can be accessed using `require("widget-window")`.

```javascript
const widgetWindow = require("widget-window");
```

#### Table of Contents
[[toc]]

## `new widgetWindow(options)`

Creates a new desktop widget window and applies the provided configuration.

### Options

- **Type**: `Object`
- **Description**: Configuration options for the widget window.

### Position and Size Options

#### `id`

- **Type**: `string`
- **Description**: Unique identifier for the widget; also used as the window title.

::: info
`id` is mandatory. Creating a widget with an existing ID closes the previous widget and replaces it with the new one.
:::

#### `x`

- **Type**: `number`
- **Default**: `0`
- **Description**: X-coordinate of the widget position.

#### `y`

- **Type**: `number`
- **Default**: `0`
- **Description**: Y-coordinate of the widget position.

#### `width`

- **Type**: `number`
- **Default**: `0` (auto size to content)
- **Description**: Width of the widget in pixels.

#### `height`

- **Type**: `number`
- **Default**: `0` (auto size to content)
- **Description**: Height of the widget in pixels.

### Visual Options

#### `backgroundColor`

- **Type**: `Color string`
- **Default**: `"rgba(0,0,0,0)"`
- **Description**: Background color of the widget window.

::: info
Omitting the background color results in a fully transparent window.
:::

#### `opacity`

- **Type**: `number`
- **Default**: `1`
- **Description**: Overall window opacity (`0-1`).

#### `zPos`

- **Type**: `string`
- **Default**: `"normal"`
- **Allowed values**: `"normal"`, `"onbottom"`, `"ondesktop"`, `"ontop"`, `"ontopmost"`
- **Description**: Controls the widget's stacking order relative to other windows.

### Behavior Options

#### `draggable`

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Enables or disables user dragging.

#### `clickThrough`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Allows mouse clicks to pass through the widget window.

#### `keepOnScreen`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Keeps the widget within screen bounds.

#### `snapEdges`

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Snaps the widget to other widgets or screen edges.

#### `show`

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Controls the initial visibility of the widgetWindow.

#### `script`

- **Type**: `string`
- **Description**: Path to a UI script that manages the widget's UI elements.

::: warning
Novadesk enforces a strict separation of concerns:
- **UI Elements** (text, images, etc.) must be created/updated inside the dedicated UI script via the global `win` object.
- **Window Management** (position, opacity, etc.) must be managed in the main script through the widget object instance.
- Both scripts communicate using the global [ipc](/api/ui/widget-api/win-object#inter-process-communication-ipc) object.
:::

## Widget Management Methods

::: info
These methods are available on a [`widgetWindow`](../widget-window.md) instance inside the Main script. They are unavailable from UI scripts.
:::

### `widgetWindow.setProperties(options)`

Updates widget configuration.

- **`options`**
  - **Type**: `Object`
  - **Description**: Properties to apply. Cannot change `id`.

Refer to [Widget Options](/api/ui/widget-api/widget-window#options-object).

#### Example

```javascript
widgetWindow.setProperties({ x: 200, y: 200 });
```

### `widgetWindow.getProperties()`

Returns the current widget configuration.

#### Return Value

- **Type**: `Object`

### `widgetWindow.close()`

Closes and destroys the widgetWindow.

### `widgetWindow.refresh()`

Reloads scripts and redraws the widgetWindow.

### `widgetWindow.setFocus()` / `widgetWindow.unFocus()`

Controls window focus.

### `widgetWindow.getHandle()`

Returns the native window handle.

#### Return Value

- **Type**: `pointer | null`

### `widgetWindow.getInternalPointer()`

Returns an internal pointer to the widget instance.

#### Return Value

- **Type**: `pointer | null`

### `widgetWindow.getTitle()`

Returns the widget window title.

#### Return Value

- **Type**: `string`

### `widgetWindow.on(eventName, callback)`

Registers lifecycle or mouse events.

- **`eventName`** (`string`): See list above (refresh, close, mouse events, etc.)
- **`callback`** (`function`): Receives event payloads such as mouse coordinates (`__clientX`, `__clientY`, `__offsetX`, `__offsetY`, `__screenX`, `__screenY`).

#### Available events

- `refresh`
- `close`
- `closed`
- `show`
- `hide`
- `move`
- `focus`
- `unFocus`
- `mouseOver`
- `mouseLeave`
- `mouseMove`
- `mouseDown`
- `mouseUp`

#### Example

```javascript
widgetWindow.on("mouseMove", function (e) {
  console.log("Mouse:", e.__clientX, e.__clientY);
});
```

## Context Menu Methods

::: info
Only accessible from the Main script.
:::

### `widgetWindow.setContextMenu(items)`

Replaces the custom context menu.

- **`items`**
  - **Type**: `Array`
  - **Description**: Menu configuration (text, action, separators, nested lists).

### `widgetWindow.clearContextMenu()`

Removes custom menu items.

### `widgetWindow.disableContextMenu(disabled)`

Enables or disables the context menu.

- **`disabled`** (`boolean`)

### `widgetWindow.showDefaultContextMenuItems(show)`

Controls default menu visibility.

- **`show`** (`boolean`)

## Z-Order Positions

Widgets support several stacking positions:

### `ontopmost`

- Remains visible even when showing the desktop (`Win + D`).
- Stays above all other windows.

### `ontop`

- Remains visible when showing the desktop.
- Sits above normal application windows but below other `ontopmost` widgets.
- Clicking brings it to the front among other widgets with the same setting.

### `normal`

- Remains visible when showing the desktop.
- Clicking brings it above other normal windows and widgets.

### `onbottom`

- Hidden when showing the desktop.
- Sits behind all application windows.
- Clicking does not change its stacking order among other `onbottom` widgets.

### `ondesktop`

- Remains visible when showing the desktop.
- Clicking does not change its stacking order relative to normal windows.
- Recommended for wallpaper-style widgets.

## Example

```javascript
// index.js
const widgetWindow = require("widget-window");

var widget = new widgetWindow({
  id: "myWidget",
  width: 300,
  height: 150,
  backgroundColor: "rgba(30, 30, 40, 0.9)"
});
```

## Preview

![Widget Preview](https://github.com/Official-Novadesk/novadesk-assets/blob/master/docs/widgetPreview.png?raw=true)
