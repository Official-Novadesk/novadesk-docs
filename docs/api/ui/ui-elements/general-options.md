---
title: General Options
description: "Shared options for all UI elements: layout, visibility, tooltips, and mouse events."
---

# General Options

Options shared by every UI element. These properties apply to all `ui.add*()` calls — `addText`, `addImage`, `addButton`, `addBitmap`, `addBar`, `addLine`, `addAreaGraph`, `addHistogram`, `addRotator`, `addRoundLine`, `addShape`, `addInputBox`, and `addLayoutBox`.

For shared image-processing fields (`imageAlpha`, `imageTint`, `imageFlip`, `colorMatrix`, etc.) see [General Image Options](/api/ui/ui-elements/general-options#image-options) below.

```javascript
ui.addText({
  id: "label",
  x: 16, y: 14,
  width: 260, height: 28,
  fontSize: 14,
  fontColor: "rgb(230,230,230)"
});
```

#### Table of Contents
[[toc]]

## Layout and Positioning

<PropertyBox name="id" type="string">

Unique identifier for the element. While not technically required by the parser, it is needed in practice to update or remove the element later. Creating an element with an `id` that already exists replaces the previous element.

</PropertyBox>

<PropertyBox name="x" type="number" defaultValue="0">

Horizontal position in pixels, relative to the top-left corner of the widget window.

</PropertyBox>

<PropertyBox name="y" type="number" defaultValue="0">

Vertical position in pixels, relative to the top-left corner of the widget window.

</PropertyBox>

<PropertyBox name="width" type="number" defaultValue="0">

Element width in pixels. When `0` or omitted, the engine sizes the element to fit its content.

</PropertyBox>

<PropertyBox name="height" type="number" defaultValue="0">

Element height in pixels. When `0` or omitted, the engine sizes the element to fit its content.

</PropertyBox>

<PropertyBox name="padding" type="number | number[]" defaultValue="0">

Inner spacing between the element bounds and its rendered content. Accepts three forms:

- `padding: 10` — all four sides equal
- `padding: [horizontal, vertical]` — left/right = first, top/bottom = second
- `padding: [left, top, right, bottom]` — each side individually

Arrays shorter than 2 are ignored. Arrays of 3 are treated as 2.

```javascript
padding: 8                    // all sides
padding: [12, 4]              // left/right 12, top/bottom 4
padding: [8, 4, 8, 4]         // explicit per side
```

</PropertyBox>

<PropertyBox name="rotate" type="number" defaultValue="0">

Rotation angle in degrees, applied around the element center. When both `rotate` and `transformMatrix` are set, `transformMatrix` takes effect because it is applied last.

</PropertyBox>

<PropertyBox name="transformMatrix" type="number[]">

Six-element affine transformation matrix `[m11, m12, m21, m22, dx, dy]`. Enables translation, scaling, rotation, and shearing in a single operation. Requires exactly 6 values — fewer than 6 are silently ignored.

```javascript
// 45-degree shear
transformMatrix: [1, 0.5, 0, 1, 0, 0]
```

::: warning Overrides `rotate`
When both `rotate` and `transformMatrix` are present, `transformMatrix` is applied last and wins. Use one or the other, not both.
:::

</PropertyBox>

## Visibility

<PropertyBox name="show" type="boolean" defaultValue="true">

Controls element visibility. `false` hides the element without removing it. Hidden elements still occupy their position and receive no mouse events. Set `show: true` to reveal a hidden element.

```javascript
ui.setElementProperties("panel", { show: false });   // hide
ui.setElementProperties("panel", { show: true });    // show again
```

</PropertyBox>

## Grouping and Containers

<PropertyBox name="group" type="string" defaultValue='""'>

Logical group name for batch operations via `ui.setElementPropertiesByGroup()` and `ui.removeElementsByGroup()`. Grouping is organizational only and has no effect on rendering or clipping.

::: info Cannot be cleared via setElementProperties
The parser ignores empty strings for `group`. Passing `group: ""` does not remove an element from its group.
:::

```javascript
ui.addText({ id: "title", group: "stats", text: "CPU" });
ui.addBar({ id: "bar",   group: "stats", value: 0.5 });

// Update all elements in the group at once
ui.setElementPropertiesByGroup("stats", { show: false });
```

</PropertyBox>

<PropertyBox name="container" type="string" defaultValue='""'>

ID of an existing container element (`addLayoutBox`). The child element is clipped to the container bounds and moves with it.

The container must already exist when the child is created. An element cannot be its own container. Passing `container: ""` via `setElementProperties` has no effect.

</PropertyBox>

## Appearance

<PropertyBox name="antiAlias" type="boolean" defaultValue="true">

Enables anti-aliased rendering for smoother edges. Disable only when rendering pixel-perfect bitmaps where sub-pixel smoothing would cause blurring.

</PropertyBox>

<PropertyBox name="pixelHitTest" type="boolean" defaultValue="false">

Selects the hit-testing mode for mouse interactions.

- `false` — bounding-box hit testing. Fast and broad.
- `true` — pixel-aware hit testing that follows the visible shape of the element.

::: info Only set when explicitly present
Omitting `pixelHitTest` from an `add*` or `setElementProperties` call preserves the element's existing value. Only an explicit `true` or `false` changes it.
:::

</PropertyBox>

<PropertyBox name="backgroundColor" type="string" defaultValue='""'>

Background fill drawn behind all element content. Supports `rgb()`, `rgba()`, hex, `linearGradient()`, and `radialGradient()`. An empty string draws no background.

```javascript
backgroundColor: "rgba(30,30,40,0.9)"
backgroundColor: "rgb(20,20,28)"
backgroundColor: "#1e1e2c"
```

</PropertyBox>

<PropertyBox name="backgroundColorRadius" type="number" defaultValue="0">

Corner radius in pixels for the background fill. `0` produces square corners.

</PropertyBox>

<PropertyBox name="bevelType" type="string" defaultValue='"none"'>

Draws a decorative border effect around the element.

| Value | Appearance |
|---|---|
| `"none"` | No bevel (default) |
| `"raised"` | Raised button appearance |
| `"sunken"` | Sunken or pressed appearance |
| `"emboss"` | Embossed border |
| `"pillow"` | Pillow or cushion border |

Unrecognized non-empty strings map to no bevel.

</PropertyBox>

<PropertyBox name="bevelWidth" type="number" defaultValue="0">

Thickness of the bevel in pixels.

</PropertyBox>

<PropertyBox name="bevelColor" type="string">

Highlight edge color for the bevel (top and left edges when `bevelType` is `"raised"`). Defaults to `rgba(255,255,255,200)`. Only parsed when non-empty. Supports gradients.

</PropertyBox>

<PropertyBox name="bevelColor2" type="string">

Shadow edge color for the bevel (bottom and right edges when `bevelType` is `"raised"`). Defaults to `rgba(0,0,0,150)`. Only parsed when non-empty. Supports gradients.

</PropertyBox>

## Tooltip

Tooltips appear on hover. `tooltipText` must be non-empty for any tooltip to display — `tooltipTitle` or `tooltipIcon` alone will not show anything.

<PropertyBox name="tooltipText" type="string" defaultValue='""'>

Tooltip body text shown on hover. This is the gating condition — all other tooltip properties are ignored when this is empty.

```javascript
ui.addBar({
  id: "cpu",
  value: 0.72,
  tooltipText: "CPU usage: 72%"
});
```

</PropertyBox>

<PropertyBox name="tooltipTitle" type="string" defaultValue='""'>

Bold title line shown above `tooltipText`.

</PropertyBox>

<PropertyBox name="tooltipIcon" type="string" defaultValue='"none"'>

Icon displayed next to the tooltip title. Valid values: `"none"`, `"info"`, `"warning"`, `"error"`.

</PropertyBox>

<PropertyBox name="tooltipBalloon" type="boolean" defaultValue="false">

`true` renders a cartoon balloon-style tooltip instead of the standard flat style.

</PropertyBox>

<PropertyBox name="tooltipMaxWidth" type="number" defaultValue="0">

Maximum tooltip width in pixels. Text wraps beyond this limit. A value of `0` (the default) applies a runtime limit of 1000 px.

</PropertyBox>

<PropertyBox name="tooltipMaxHeight" type="number" defaultValue="0">

Maximum tooltip height in pixels. A value of `0` (the default) applies a runtime limit of 1000 px.

</PropertyBox>

<PropertyBox name="tooltipDisabled" type="boolean" defaultValue="false">

Disables tooltip display for this element even when `tooltipText` is set.

</PropertyBox>

## Cursor

Cursor options only take effect when the element has at least one mouse callback registered.

<PropertyBox name="mouseEventCursor" type="boolean" defaultValue="true">

`true` shows the cursor defined by `mouseEventCursorName` when hovering over an interactive element. `false` suppresses cursor changes even when callbacks are registered.

</PropertyBox>

<PropertyBox name="mouseEventCursorName" type="string" defaultValue='""'>

Name of the cursor to display on hover. When empty, defaults to the hand cursor.

Built-in cursor names: `hand`, `text`, `help`, `busy`, `cross`, `pen`, `no`, `size_all`, `size_nesw`, `size_ns`, `size_nwse`, `size_we`, `uparrow`, `wait`

When `cursorsDir` is set, this name is looked up as a file in that folder.

</PropertyBox>

<PropertyBox name="cursorsDir" type="string" defaultValue='""'>

Directory containing custom `.cur` or `.ani` cursor files. Relative paths are resolved against the widget's script directory. When set, `mouseEventCursorName` is looked up as a file inside this folder instead of using a built-in cursor.

</PropertyBox>

## Mouse Events

All mouse callbacks are optional. Each receives an event object — see [Global Variables](/api/global-variables.html#mouse-event-object) for the full list of event properties (`__clientX`, `__clientY`, `__screenX`, `__screenY`, `__offsetX`, `__offsetY`, `__offsetXPercent`, `__offsetYPercent`).

<CallbackBox
  name="onLeftMouseUp"
  signature="onLeftMouseUp(event): void"
  :optional="true"
>

Fired when the left mouse button is released over the element. This is the standard click handler.

```javascript
ui.addText({
  id: "btn",
  text: "Click me",
  onLeftMouseUp: (e) => {
    ipcRenderer.send("btn-clicked");
  }
});
```

</CallbackBox>

<CallbackBox
  name="onLeftMouseDown"
  signature="onLeftMouseDown(event): void"
  :optional="true"
>

Fired when the left mouse button is pressed down over the element.

</CallbackBox>

<CallbackBox
  name="onLeftDoubleClick"
  signature="onLeftDoubleClick(event): void"
  :optional="true"
>

Fired on a left-button double-click over the element.

</CallbackBox>

<CallbackBox
  name="onRightMouseUp"
  signature="onRightMouseUp(event): void"
  :optional="true"
>

Fired when the right mouse button is released over the element.

</CallbackBox>

<CallbackBox
  name="onRightMouseDown"
  signature="onRightMouseDown(event): void"
  :optional="true"
>

Fired when the right mouse button is pressed down over the element.

</CallbackBox>

<CallbackBox
  name="onRightDoubleClick"
  signature="onRightDoubleClick(event): void"
  :optional="true"
>

Fired on a right-button double-click over the element.

</CallbackBox>

<CallbackBox
  name="onMiddleMouseUp"
  signature="onMiddleMouseUp(event): void"
  :optional="true"
>

Fired when the middle mouse button is released over the element.

</CallbackBox>

<CallbackBox
  name="onMiddleMouseDown"
  signature="onMiddleMouseDown(event): void"
  :optional="true"
>

Fired when the middle mouse button is pressed down over the element.

</CallbackBox>

<CallbackBox
  name="onMiddleDoubleClick"
  signature="onMiddleDoubleClick(event): void"
  :optional="true"
>

Fired on a middle-button double-click over the element.

</CallbackBox>

<CallbackBox
  name="onX1MouseUp / onX1MouseDown / onX1DoubleClick"
  signature="onX1MouseUp(event): void"
  :optional="true"
>

Events for the X1 (Back) side button.

</CallbackBox>

<CallbackBox
  name="onX2MouseUp / onX2MouseDown / onX2DoubleClick"
  signature="onX2MouseUp(event): void"
  :optional="true"
>

Events for the X2 (Forward) side button.

</CallbackBox>

<CallbackBox
  name="onMouseOver"
  signature="onMouseOver(event): void"
  :optional="true"
>

Fired when the cursor enters the element bounds.

```javascript
onMouseOver: (e) => {
  ui.setElementProperties("btn", { backgroundColor: "rgba(255,255,255,0.1)" });
}
```

</CallbackBox>

<CallbackBox
  name="onMouseLeave"
  signature="onMouseLeave(event): void"
  :optional="true"
>

Fired when the cursor leaves the element bounds.

```javascript
onMouseLeave: (e) => {
  ui.setElementProperties("btn", { backgroundColor: "" });
}
```

</CallbackBox>

<CallbackBox
  name="onScrollUp"
  signature="onScrollUp(event): void"
  :optional="true"
>

Fired when the mouse wheel is scrolled up over the element.

</CallbackBox>

<CallbackBox
  name="onScrollDown"
  signature="onScrollDown(event): void"
  :optional="true"
>

Fired when the mouse wheel is scrolled down over the element.

</CallbackBox>

<CallbackBox
  name="onScrollLeft"
  signature="onScrollLeft(event): void"
  :optional="true"
>

Fired on horizontal scroll left over the element.

</CallbackBox>

<CallbackBox
  name="onScrollRight"
  signature="onScrollRight(event): void"
  :optional="true"
>

Fired on horizontal scroll right over the element.

</CallbackBox>

## Drag & Drop

Drag and drop properties control whether an element can be dragged or act as a drop target. Drag callbacks fire when the user holds a mouse button on the element and moves the mouse.

<PropertyBox name="dragArea" type="boolean" defaultValue="false">

`true` makes this element draggable. The user can click and drag the element to move it. The element does not snap or reposition automatically — use the `onDrag` callback to update the element position or send drag data via IPC.

```javascript
ui.addShape({
  id: "handle",
  dragArea: true,
  onDrag: (e) => {
    ui.setElementProperties("handle", {
      x: e.__screenX - e.__offsetX,
      y: e.__screenY - e.__offsetY
    });
  }
});
```

</PropertyBox>

<PropertyBox name="dropTarget" type="boolean" defaultValue="false">

`true` registers this element as a drop target. When another element is dragged over it, the drop-related callbacks fire. Use this for file drop zones, reordering lists, or any drag-and-drop interaction.

```javascript
ui.addShape({
  id: "drop-zone",
  dropTarget: true,
  backgroundColor: "rgba(0,180,255,0.1)",
  onDragEnter: () => {
    ui.setElementProperties("drop-zone", { backgroundColor: "rgba(0,180,255,0.3)" });
  },
  onDragLeave: () => {
    ui.setElementProperties("drop-zone", { backgroundColor: "rgba(0,180,255,0.1)" });
  },
  onDrop: (e) => {
    console.log("Dropped at:", e.__offsetX, e.__offsetY);
  }
});
```

</PropertyBox>

<CallbackBox
  name="onDrop"
  signature="onDrop(event): void"
  :optional="true"
>

Fired when the user releases a drag over this drop target element.

</CallbackBox>

<CallbackBox
  name="onDragEnter"
  signature="onDragEnter(event): void"
  :optional="true"
>

Fired when a dragged element enters the bounds of this drop target.

</CallbackBox>

<CallbackBox
  name="onDragOver"
  signature="onDragOver(event): void"
  :optional="true"
>

Fired continuously while a dragged element is over this drop target.

</CallbackBox>

<CallbackBox
  name="onDragLeave"
  signature="onDragLeave(event): void"
  :optional="true"
>

Fired when a dragged element leaves the bounds of this drop target.

</CallbackBox>

### Drag Events (on element being dragged)

Drag callbacks fire when the user holds a mouse button on the element and moves the mouse. They are useful for sliders, handles, and custom drag interactions.

<CallbackBox
  name="onDragStart"
  signature="onDragStart(event): void"
  :optional="true"
>

Fired once when a drag begins.

```javascript
onDragStart: (e) => {
  console.log("Drag started at", e.__offsetX, e.__offsetY);
}
```

</CallbackBox>

<CallbackBox
  name="onDrag"
  signature="onDrag(event): void"
  :optional="true"
>

Fired continuously while the user is dragging. Use `e.__offsetXPercent` and `e.__offsetYPercent` for normalized 0–100 position within the element.

```javascript
onDrag: (e) => {
  const value = Math.max(0, Math.min(100, e.__offsetXPercent)) / 100;
  ui.setElementProperty("vol-bar", "value", value);
  ipcRenderer.send("volume-change", { value });
}
```

</CallbackBox>

<CallbackBox
  name="onDragEnd"
  signature="onDragEnd(event): void"
  :optional="true"
>

Fired once when the mouse button is released after a drag.

```javascript
onDragEnd: (e) => {
  console.log("Drag ended at", e.__offsetXPercent.toFixed(1) + "%");
}
```

</CallbackBox>

## Scroll & Overflow

When child elements extend beyond the bounds of a container (or `addLayoutBox`), scroll and overflow properties control whether scrollbars appear and how content is clipped.

<PropertyBox name="overflow" type="string" defaultValue='"visible"'>

Shorthand that sets both `overflowX` and `overflowY` at once. Case-insensitive.

| Value | Behavior |
|---|---|
| `"visible"` | Content overflows the element bounds and is not clipped (default) |
| `"hidden"` | Content is clipped at the element bounds, no scrollbar |
| `"scroll"` | Content is clipped and scrollbars appear when needed |
| `"auto"` | Scrollbars appear only when content overflows |

</PropertyBox>

<PropertyBox name="overflowX" type="string" defaultValue='"visible"'>

Horizontal overflow mode. Same values as `overflow`. Overrides `overflow` for the horizontal axis.

</PropertyBox>

<PropertyBox name="overflowY" type="string" defaultValue='"visible"'>

Vertical overflow mode. Same values as `overflow`. Overrides `overflow` for the vertical axis.

</PropertyBox>

<PropertyBox name="scrollX" type="number" defaultValue="0">

Initial horizontal scroll offset in pixels.

</PropertyBox>

<PropertyBox name="scrollY" type="number" defaultValue="0">

Initial vertical scroll offset in pixels.

</PropertyBox>

<PropertyBox name="scrollStep" type="number" defaultValue="24">

Number of pixels scrolled per mouse wheel notch.

</PropertyBox>

<PropertyBox name="showScrollbar" type="boolean" defaultValue="true">

Shorthand that sets both `showScrollbarX` and `showScrollbarY` at once.

</PropertyBox>

<PropertyBox name="showScrollbarX" type="boolean" defaultValue="true">

Show the horizontal scrollbar when horizontal content overflows.

</PropertyBox>

<PropertyBox name="showScrollbarY" type="boolean" defaultValue="true">

Show the vertical scrollbar when vertical content overflows.

</PropertyBox>

### Scrollbar Styling

<PropertyBox name="scrollbarWidth" type="number" defaultValue="6">

Scrollbar thickness in pixels.

</PropertyBox>

<PropertyBox name="scrollbarHoverWidth" type="number" defaultValue="-1">

Scrollbar thickness when hovered. `-1` keeps the normal width.

</PropertyBox>

<PropertyBox name="scrollbarRadius" type="number" defaultValue="3">

Corner radius of the scrollbar thumb.

</PropertyBox>

<PropertyBox name="scrollbarTrackRadius" type="number" defaultValue="-1">

Corner radius of the scrollbar track. `-1` uses the default.

</PropertyBox>

<PropertyBox name="scrollbarInset" type="number" defaultValue="2">

Spacing between the scrollbar and the element edge in pixels.

</PropertyBox>

<PropertyBox name="scrollbarMinThumbLength" type="number" defaultValue="20">

Minimum thumb length in pixels.

</PropertyBox>

<PropertyBox name="scrollbarColor" type="string" defaultValue='"rgba(255,255,255,100)"'>

Scrollbar thumb color. Supports `rgb()`, `rgba()`, and hex.

</PropertyBox>

<PropertyBox name="scrollbarHoverColor" type="string" defaultValue='"rgba(255,255,255,180)"'>

Scrollbar thumb color when hovered.

</PropertyBox>

<PropertyBox name="scrollbarActiveColor" type="string" defaultValue='"rgba(255,255,255,240)"'>

Scrollbar thumb color when actively dragged.

</PropertyBox>

<PropertyBox name="scrollbarTrackColor" type="string" defaultValue='"rgba(0,0,0,0)"'>

Scrollbar track background color.

</PropertyBox>

<PropertyBox name="showScrollbarButtons" type="boolean" defaultValue="false">

Show arrow buttons at the ends of the scrollbar.

</PropertyBox>

<PropertyBox name="scrollbarButtonSize" type="number" defaultValue="14">

Size of the scrollbar arrow buttons in pixels.

</PropertyBox>

<PropertyBox name="scrollbarButtonRadius" type="number" defaultValue="2">

Corner radius of the scrollbar arrow buttons.

</PropertyBox>

<PropertyBox name="scrollbarArrowColor" type="string" defaultValue='"rgba(255,255,255,150)"'>

Color of the scrollbar arrow icons.

</PropertyBox>

<PropertyBox name="scrollbarArrowHoverColor" type="string" defaultValue='"rgba(255,255,255,220)"'>

Color of the scrollbar arrow icons when hovered.

</PropertyBox>

<PropertyBox name="scrollbarArrowActiveColor" type="string" defaultValue='"rgba(255,255,255,255)"'>

Color of the scrollbar arrow icons when pressed.

</PropertyBox>

<PropertyBox name="scrollbarButtonBgColor" type="string" defaultValue='"rgba(0,0,0,0)"'>

Background color of the scrollbar arrow buttons.

</PropertyBox>

<PropertyBox name="scrollbarButtonHoverBgColor" type="string" defaultValue='"rgba(255,255,255,30)"'>

Background color of the scrollbar arrow buttons when hovered.

</PropertyBox>

```javascript
// Scrollable container with custom scrollbar
ui.addLayoutBox({
  id: "scroll-area",
  x: 16, y: 16,
  width: 300, height: 200,
  overflow: "scroll",
  scrollbarWidth: 8,
  scrollbarColor: "rgba(255,255,255,80)",
  scrollbarHoverColor: "rgba(255,255,255,160)",
  scrollbarRadius: 4
});
```

## Practical Examples

**Hover highlight**

```javascript
ui.addShape({
  id: "btn",
  shapeType: "rectangle",
  x: 16, y: 16,
  width: 120, height: 36,
  radiusX: 6, radiusY: 6,
  fillColor: "rgba(60,120,200,0.8)",
  onMouseOver: () => {
    ui.setElementProperties("btn", { fillColor: "rgba(80,150,240,0.9)" });
  },
  onMouseLeave: () => {
    ui.setElementProperties("btn", { fillColor: "rgba(60,120,200,0.8)" });
  },
  onLeftMouseUp: () => {
    ipcRenderer.send("btn-action");
  }
});
```

**Drag slider**

```javascript
ui.addImage({
  id: "slider",
  path: "./assets/slider-track.png",
  x: 16, y: 60,
  width: 260, height: 20,
  tooltipText: "Drag to adjust volume",
  onDrag: (e) => {
    const value = Math.max(0, Math.min(100, e.__offsetXPercent)) / 100;
    ui.setElementProperty("vol-fill", "value", value);
    ipcRenderer.send("set-volume", { value });
  }
});
```

**Tooltip with title and icon**

```javascript
ui.addText({
  id: "cpu-label",
  text: "CPU",
  x: 16, y: 14,
  width: 60, height: 20,
  fontSize: 12,
  fontColor: "rgb(180,180,180)",
  tooltipTitle: "CPU Usage",
  tooltipText: "Current processor load as a percentage of total capacity.",
  tooltipIcon: "info"
});
```

**Grouped elements for batch show/hide**

```javascript
ui.beginUpdate();

ui.addText({ id: "stat-1", group: "stats", text: "CPU: 72%",  x: 16, y: 40, fontSize: 13, fontColor: "rgb(200,200,200)" });
ui.addText({ id: "stat-2", group: "stats", text: "RAM: 58%",  x: 16, y: 60, fontSize: 13, fontColor: "rgb(200,200,200)" });
ui.addText({ id: "stat-3", group: "stats", text: "Disk: 34%", x: 16, y: 80, fontSize: 13, fontColor: "rgb(200,200,200)" });

ui.endUpdate();

// Toggle all stats at once
ipcRenderer.on("toggle-stats", (event, payload) => {
  ui.setElementPropertiesByGroup("stats", { show: payload.visible });
});
```

---

## Image Options

Options shared by all image-based elements: `ui.addImage()`, `ui.addButton()`, `ui.addBitmap()`, and `ui.addRotator()`.

Use these alongside the [Element Options](#element-options) above which covers position, visibility, tooltip, mouse events, and more.

#### Table of Contents
[[toc]]

### Opacity and Visibility

<PropertyBox name="imageAlpha" type="number" defaultValue="255">

Image opacity in the range `0–255`. `255` is fully opaque, `0` is fully transparent. Values are clamped to this range.

```javascript
ui.addImage({
  id: "logo",
  path: "./assets/logo.png",
  x: 16, y: 16,
  width: 64, height: 64,
  imageAlpha: 180
});
```

</PropertyBox>

### Fallback

<PropertyBox name="fallbackPath" type="string" defaultValue='""'>

Path to an alternative image file shown when the primary image cannot be loaded. Supports local file paths and HTTP/HTTPS URLs. Relative paths are resolved against the widget's script directory.

```javascript
ui.addImage({
  id: "avatar",
  path: "./assets/user.png",
  fallbackPath: "./assets/default-avatar.png",
  x: 16, y: 16,
  width: 48, height: 48
});
```

</PropertyBox>

### Color Adjustments

<PropertyBox name="grayscale" type="boolean" defaultValue="false">

`true` renders the image without color — all pixels are converted to shades of gray. Useful for representing disabled or inactive states.

```javascript
ui.addImage({
  id: "icon",
  path: "./assets/icon.png",
  grayscale: true
});
```

</PropertyBox>

<PropertyBox name="imageTint" type="string" defaultValue='""'>

A color overlaid on the image. Accepts `rgb()`, `rgba()`, hex, `linearGradient()`, and `radialGradient()`. Only applied when the string is non-empty and parses as a valid color.

```javascript
ui.addImage({
  id: "icon",
  path: "./assets/icon.png",
  imageTint: "rgba(0,180,255,0.5)"   // blue tint at 50% opacity
});
```

</PropertyBox>

<PropertyBox name="colorMatrix" type="number[]" defaultValue="[]">

A Direct2D 5x4 color transformation matrix applied to the image. Enables advanced effects: hue rotation, saturation, brightness, contrast, channel swaps, and inversion.

Provide exactly **20 numbers** in row-major order. Fewer than 20 values are silently ignored and no matrix is applied.

The matrix layout is:
```
[ R→R, G→R, B→R, A→R, bias_R,
  R→G, G→G, B→G, A→G, bias_G,
  R→B, G→B, B→B, A→B, bias_B,
  R→A, G→A, B→A, A→A, bias_A ]
```

The identity matrix (no change):
```javascript
colorMatrix: [
  1, 0, 0, 0, 0,
  0, 1, 0, 0, 0,
  0, 0, 1, 0, 0,
  0, 0, 0, 1, 0
]
```

Invert all colors:
```javascript
ui.addImage({
  id: "inverted",
  path: "./photo.png",
  colorMatrix: [
    -1,  0,  0, 0, 1,
     0, -1,  0, 0, 1,
     0,  0, -1, 0, 1,
     0,  0,  0, 1, 0
  ]
});
```

Desaturate (grayscale via matrix):
```javascript
colorMatrix: [
  0.33, 0.33, 0.33, 0, 0,
  0.33, 0.33, 0.33, 0, 0,
  0.33, 0.33, 0.33, 0, 0,
  0,    0,    0,    1, 0
]
```

::: tip
The `grayscale` property is a simpler alternative to a desaturate matrix when you only need black-and-white rendering.
:::

</PropertyBox>

### Flip

<PropertyBox name="imageFlip" type="string" defaultValue='"none"'>

Mirrors the image before rendering. Matching is case-insensitive.

| Value | Effect |
|---|---|
| `"none"` | No flip (default) |
| `"horizontal"` | Mirror left to right |
| `"vertical"` | Mirror top to bottom |
| `"both"` | Mirror both horizontally and vertically |

```javascript
ui.addImage({
  id: "arrow-right",
  path: "./assets/arrow-left.png",
  imageFlip: "horizontal"   // reuse the left arrow as a right arrow
});
```

</PropertyBox>

### Crop

<PropertyBox name="imageCrop" type="number[]" defaultValue="[]">

Crops the source image to a rectangular region before rendering. Coordinates are in source image pixels.

**Accepted forms:**
- `[x, y, width, height]` — crop from the given origin (default: top-left)
- `[x, y, width, height, origin]` — crop with an explicit reference corner

The optional fifth element sets the reference corner for the `x`/`y` coordinates:

| Value | Reference corner |
|---|---|
| `0` | Top-left (default) |
| `1` | Top-right |
| `2` | Bottom-right |
| `3` | Bottom-left |
| `4` | Center |

Values outside the `0–4` range are clamped. An empty or missing array disables cropping.

::: warning Not supported on addBitmap or addRotator
`imageCrop` is accepted but **ignored** by `ui.addBitmap()` and `ui.addRotator()`. It only applies to `ui.addImage()` and `ui.addButton()`.
:::

```javascript
// Show only the top-left 64x64 region
ui.addImage({
  id: "sprite",
  path: "./assets/spritesheet.png",
  imageCrop: [0, 0, 64, 64]
});

// Crop 32x32 from the center of the source image
ui.addImage({
  id: "center-crop",
  path: "./assets/photo.png",
  imageCrop: [0, 0, 32, 32, 4]   // origin = center
});
```

</PropertyBox>

### Orientation

<PropertyBox name="useExifOrientation" type="boolean" defaultValue="false">

`true` applies the rotation/flip specified in the EXIF metadata embedded in the image file. Useful for photos taken on mobile devices that store their orientation in EXIF data rather than in the pixel arrangement.

```javascript
ui.addImage({
  id: "photo",
  path: "./assets/photo.jpg",
  useExifOrientation: true
});
```

</PropertyBox>

### Practical Examples

**Grayscale inactive icon that highlights on hover**

```javascript
ui.addImage({
  id: "settings-icon",
  path: "./assets/settings.png",
  x: 16, y: 16,
  width: 24, height: 24,
  grayscale: true,
  onMouseOver: () => {
    ui.setElementProperties("settings-icon", { grayscale: false });
  },
  onMouseLeave: () => {
    ui.setElementProperties("settings-icon", { grayscale: true });
  }
});
```

**Tinted status indicator updated from IPC**

```javascript
ui.addImage({
  id: "status-dot",
  path: "./assets/circle.png",
  x: 8, y: 8,
  width: 12, height: 12,
  imageTint: "rgba(100,100,100,1)"
});

ipcRenderer.on("status-update", (event, payload) => {
  const tint = payload.online
    ? "rgba(0,200,100,1)"
    : "rgba(200,60,60,1)";
  ui.setElementProperties("status-dot", { imageTint: tint });
});
```

**Sprite sheet crop for different states**

```javascript
// Single sprite sheet with frames at x=0, 64, 128
function setButtonState(state) {
  const frameX = state === "normal" ? 0 : state === "hover" ? 64 : 128;
  ui.setElementProperties("btn-img", {
    imageCrop: [frameX, 0, 64, 32]
  });
}

ui.addImage({
  id: "btn-img",
  path: "./assets/button-states.png",
  x: 16, y: 60,
  width: 64, height: 32,
  imageCrop: [0, 0, 64, 32],
  onMouseOver: () => setButtonState("hover"),
  onMouseLeave: () => setButtonState("normal"),
  onLeftMouseDown: () => setButtonState("pressed"),
  onLeftMouseUp: () => setButtonState("hover")
});
```

**Fallback for user-provided images**

```javascript
ui.addImage({
  id: "wallpaper",
  path: path.join(__mainScriptDirPath, "config", "wallpaper.jpg"),
  fallbackPath: "./assets/default-wallpaper.jpg",
  x: 0, y: 0,
  width: 400, height: 300,
  preserveAspectRatio: "crop"
});
```
