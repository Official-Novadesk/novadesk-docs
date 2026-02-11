# widgetWindow()

Create and manage desktop widget windows in Novadesk. The `widgetWindow` class is the primary interface for creating and managing desktop widgets.

A `widgetWindow` creates a new desktop window that can display UI elements like text and images. Widget windows are transparent, layerable, and can be positioned anywhere on the desktop.

## Syntax

```javascript
var widget = new widgetWindow(options);
```

## Parameters

### options

- **Type**: `Object`
- **Description**: An object containing configuration options for the widget window.

## Position and Size Options

### id

- **Type**: `string`
- **Default**: `Required`
- **Description**: Unique identifier for the widget. This ID is also used as the window title.

::: info
`id` is mandatory. If you create a widget with an ID that already exists, the **existing widget will be closed and replaced** by the new one.
:::

### x

- **Type**: `number`
- **Default**: `0`
- **Description**: X-coordinate of the widget position.

### y

- **Type**: `number`
- **Default**: `0`
- **Description**: Y-coordinate of the widget position.

### width

- **Type**: `number`
- **Default**: `0 (Auto size to content)`
- **Description**: Width of the widget in pixels.

### height

- **Type**: `number`
- **Default**: `0 (Auto size to content)`
- **Description**: Height of the widget in pixels.

## Visual Options

### backgroundColor

- **Type**: `Color string`
- **Default**: `"rgba(0,0,0,0)"`
- **Description**: [Color](/guides/colors) of the background of the widget window.

::: info
When no background color is specified, the widget will be transparent.
:::

### opacity

- **Type**: `number`
- **Default**: `1`
- **Description**: Overall window opacity (0-1).

### zPos

Controls the widget's **Z-order (stacking order)** relative to other windows and widgets.

- **Type**: `string`
- **Default**: `"normal"`
- **Allowed values**: `"normal"`, `"onbottom"`, `"ondesktop"`, `"ontop"`, `"ontopmost"`

## Behavior Options

### draggable

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Whether the widget can be dragged by the user.

### clickThrough

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Whether mouse clicks pass through the widget.

### keepOnScreen

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Whether to keep the widget within screen bounds.

### snapEdges

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Whether to snap to other widgets and screen edges.

### show

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Controls the initial visibility of the widget.

### script

- **Type**: `string`
- **Default**: `None`
- **Description**: Path to a dedicated JavaScript file that manages the widget's UI elements.

::: warning
Novadesk uses a **Strict Separation of Concerns**:
- **UI Elements** (text, images, etc.) can **only** be created and modified within the dedicated UI script using the global `win` object.
- **Window Management** (position, opacity, etc.) can **only** be controlled from the main script via the widget object instance.
- Both scripts use the global [ipc](/api/widget-api/widget-methods#inter-process-communication-ipc) object for communication.
:::

## Z-Order Positions

Widgets can be positioned at different levels in the window stack:

### ontopmost

- The widget remains visible when showing the desktop `(Win + D)`.
- It actively stays above all other windows.

### ontop

- The widget remains visible when showing the desktop `(Win + D)`.
- It stays above normal application windows, but not above Topmost widgets.
- When multiple widgets use this setting, clicking one will bring it above the others.

### normal

- The widget remains visible when showing the desktop `(Win + D)`.
- Clicking the widget will bring it to the front of other normal windows and widgets.

### onbottom

- The widget is hidden when showing the desktop `(Win + D)`.
- It stays behind all application windows.
- Clicking does not change the stacking order between widgets using this setting.

### ondesktop

- The widget remains visible when showing the desktop `(Win + D)`.
- Clicking the widget does not bring it to the front of other normal windows or widgets.
- This is the recommended setting for wallpaper-like widgets.

## Widget Methods

Once a widget is created, you can use several methods. For more information, see [Widget Methods](/api/widget-api/widget-methods).

## Example

```javascript
// index.js
var widget = new widgetWindow({
  id: "myWidget",
  width: 300,
  height: 150,
  backgroundColor: "rgba(30, 30, 40, 0.9)"
});
```

## Preview

![Widget Preview](https://github.com/Official-Novadesk/novadesk-assets/blob/master/docs/widgetPreview.png?raw=true)

