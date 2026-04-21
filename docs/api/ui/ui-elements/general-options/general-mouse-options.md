---
title: Shared mouse events and cursor options for UI elements.
---

# General Mouse Options
Options and callbacks to handle mouse interactions and cursor styling for UI elements.

Use these settings with methods such as `ui.addText()`, `ui.addImage()`, `ui.addButton()`, etc. together with [General Element Options](/api/ui/ui-elements/general-options/general-elements-options).

#### Table of Contents
[[toc]]

## Cursor Options

### `mouseEventCursor`

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Enables custom cursor behavior when the element has mouse callbacks.

::: info
Cursor options only apply when mouse action callbacks (e.g., `onLeftMouseUp`) are registered.
:::

### `mouseEventCursorName`

- **Type**: `string`
- **Default**: `""`
- **Description**: Cursor style (defaults to hand for interactive elements).

#### Built-in values

- `hand`
- `text`
- `help`
- `busy`
- `cross`
- `pen`
- `no`
- `size_all`
- `size_nesw`
- `size_ns`
- `size_nwse`
- `size_we`
- `uparrow`
- `wait`

### `cursorsDir`

- **Type**: `string`
- **Default**: `""`
- **Description**: Directory for custom cursor files (`.cur`/`.ani`).

## Mouse Actions

### `onLeftMouseUp`, `onLeftMouseDown`, `onLeftDoubleClick`

- **Type**: `function`
- **Description**: Events for the left mouse button.

#### Example

```js
onLeftMouseUp: function () { console.log("Left click!"); }
```

### `onRightMouseUp`, `onRightMouseDown`, `onRightDoubleClick`

- **Type**: `function`
- **Description**: Events for the right mouse button.

#### Example

```js
onRightMouseUp: function () { console.log("Right click!"); }
```

### `onMiddleMouseUp`, `onMiddleMouseDown`, `onMiddleDoubleClick`

- **Type**: `function`
- **Description**: Events for the middle mouse button.

#### Example

```js
onMiddleMouseUp: function () { console.log("Middle click!"); }
```

### `onX1MouseUp`, `onX1MouseDown`, `onX1DoubleClick`

- **Type**: `function`
- **Description**: Events for the X1 (Back) button.

#### Example

```js
onX1MouseUp: function () { console.log("Back button clicked"); }
```

### `onX2MouseUp`, `onX2MouseDown`, `onX2DoubleClick`

- **Type**: `function`
- **Description**: Events for the X2 (Forward) button.

#### Example

```js
onX2MouseUp: function () { console.log("Forward button clicked"); }
```

### `onMouseOver`, `onMouseLeave`

- **Type**: `function`
- **Description**: Triggered when the cursor enters or leaves the element.

#### Example

```js
onMouseOver: function () { console.log("Mouse entered!"); }
```

### `onScrollUp`, `onScrollDown`

- **Type**: `function`
- **Description**: Triggered by vertical scrolling.

#### Example

```js
onScrollUp: function () { console.log("Scrolled up"); }
```

### `onScrollLeft`, `onScrollRight`

- **Type**: `function`
- **Description**: Triggered by horizontal scrolling.

#### Example

```js
onScrollLeft: function () { console.log("Scrolled left"); }
```
