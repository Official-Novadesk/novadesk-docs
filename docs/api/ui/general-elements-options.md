---
title: Shared UI element options.
---

# General Elements Options
Options that apply to every UI element added via the global `win` object inside a UI script.

Use these settings with methods such as `ui.addText()`, `ui.addImage()`, `ui.addShape()`, `ui.addBar()`, and `ui.addRoundLine()` to control positioning, visibility, interactivity, and tooltips.

```js
ui.addText({
    id: "example",
    x: 10,
    y: 10,
    width: 200,
    height: 40
});
```

#### Table of Contents
[[toc]]

## Element Options

### `id`

- **Type**: `string`
- **Required**: `true`
- **Description**: Unique identifier for the element. Creating an element with an existing `id` replaces the previous element.

### `x`, `y`

- **Type**: `number`
- **Default**: `0`
- **Description**: Horizontal and vertical coordinates relative to the top-left of the widget window.

### `width`, `height`

- **Type**: `number`
- **Default**: `auto calculate`
- **Description**: Element dimensions in pixels.

### `container`

- **Type**: `string`
- **Default**: `""`
- **Description**: ID of a container element that clips and groups its children for rendering and hit testing.

::: info
- The container must already exist.
- Containers cannot nest.
- An element cannot be its own container, and cycles are not allowed.
:::

### `group`

- **Type**: `string`
- **Default**: `""`
- **Description**: Logical group name for batch updates/removals.

::: info
`group` operates independently from `container`; `container` affects rendering while `group` is purely organizational.
:::

### `backgroundColor`

- **Type**: `string`
- **Default**: `""`
- **Description**: Background color or gradient for the element.

### `backgroundColorRadius`

- **Type**: `number`
- **Default**: `0`
- **Description**: Corner radius for the background.

### `rotate`

- **Type**: `number`
- **Default**: `0`
- **Description**: Rotation angle in degrees.

### `antiAlias`

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Enables antialiasing for smoother rendering.

### `show`

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Controls element visibility without removing it.

### `bevelType`

- **Type**: `string`
- **Default**: `"none"`
- **Description**: Draws a bezel around the element.

#### Valid values

- `"none"`
- `"raised"`
- `"sunken"`
- `"emboss"`
- `"pillow"`

### `bevelWidth`

- **Type**: `number`
- **Default**: `1`
- **Description**: Bevel thickness.

### `bevelColor`, `bevelColor2`

- **Type**: `color string`
- **Default**: `bevelColor`: `"255,255,255,200"`; `bevelColor2`: `"0,0,0,150"`
- **Description**: Colors for highlights and shadows when a bevel is drawn.

### `padding`

- **Type**: `number | array`
- **Default**: `0`
- **Description**: Padding around the element content.

#### Syntax

- `padding: 10`
- `padding: [horizontal, vertical]`
- `padding: [left, top, right, bottom]`

#### Example

```js
padding: [5, 10, 5, 10]
```

### `transformMatrix`

- **Type**: `array` (6 numbers)
- **Default**: `[]`
- **Description**: Affine transformation matrix `[m11, m12, m21, m22, dx, dy]` for translation, scaling, rotation, and shearing.

#### Example

```js
transformMatrix: [1, 0.5, 0, 1, 0, 0]
```

## Tooltip Options

### `tooltipText`

- **Type**: `string`
- **Default**: `""`
- **Description**: Tooltip text. Empty string disables the tooltip.

### `tooltipTitle`

- **Type**: `string`
- **Default**: `""`
- **Description**: Bold title displayed above the tooltip text.

### `tooltipIcon`

- **Type**: `string`
- **Default**: `"none"`
- **Description**: Icon next to the title.

#### Valid values

- `"none"`
- `"info"`
- `"warning"`
- `"error"`

### `tooltipBalloon`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Displays the tooltip in a cartoon balloon style.

### `tooltipMaxWidth`

- **Type**: `number`
- **Default**: `1000`
- **Description**: Maximum tooltip width in pixels; text wraps beyond this.

### `tooltipMaxHeight`

- **Type**: `number`
- **Default**: `1000`
- **Description**: Maximum tooltip height hint.

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
