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

## Drag Events

Drag events enable slider-like interactions on any element. They fire when the user clicks and drags within the element's bounds.

### `onDragStart`

- **Type**: `function`
- **Description**: Fired when a drag interaction begins (mouse button down on element).

#### Example

```js
onDragStart: function (e) {
  console.log("Drag started at", e.offsetX, e.offsetY);
}
```

### `onDrag`

- **Type**: `function`
- **Description**: Fired continuously while dragging (mouse move with button held).

#### Example

```js
onDrag: function (e) {
  console.log("Dragging:", e.offsetXPercent, "% horizontal");
}
```

### `onDragEnd`

- **Type**: `function`
- **Description**: Fired when the drag interaction ends (mouse button released).

#### Example

```js
onDragEnd: function (e) {
  console.log("Drag ended");
}
```

### Drag Event Data

All drag callbacks receive an event object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `offsetX` | `number` | Mouse X position relative to the element |
| `offsetY` | `number` | Mouse Y position relative to the element |
| `offsetXPercent` | `number` | X position as a percentage of element width (0.0–1.0) |
| `offsetYPercent` | `number` | Y position as a percentage of element height (0.0–1.0) |

### Full Drag Example

```js
ui.addImage({
  id: "slider",
  x: 10,
  y: 10,
  width: 200,
  height: 20,
  path: "slider.png",
  onDragStart: function (e) {
    console.log("Drag started at", e.offsetX, e.offsetY);
  },
  onDrag: function (e) {
    console.log("Position:", (e.offsetXPercent * 100).toFixed(1) + "%");
  },
  onDragEnd: function () {
    console.log("Drag ended");
  }
});
```
