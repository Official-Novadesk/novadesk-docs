---
title: addLayoutBox
description: Add a flex layout container for positioning child elements.
---

# ui.addLayoutBox()

Creates a container element that clips and groups child elements within its bounds. Children can be defined inline via the `children` array or added separately using the `container` property.

```javascript
ui.addLayoutBox(options);
```

::: info
Also accepts all [General Element Options](/api/ui/ui-elements/general-options) (visibility, tooltip, mouse events, rotation, etc.).

`id` is required. Every layout box must have a unique `id` so children can reference it via `container`.
:::

::: warning One redraw on creation
`ui.addLayoutBox` always triggers one redraw to finalize layout metadata, even when called inside a `beginUpdate` / `endUpdate` block. This is expected.
:::

#### Table of Contents
[[toc]]

## Quick Example

```javascript
ui.addLayoutBox({
  id: "card",
  x: 16, y: 16,
  width: 280, height: 80,
  backgroundColor: "rgba(30,30,40,0.9)",
  borderRadius: 8,
  flexDirection: "column",
  gap: 6,
  padding: 12,
  boxShadow: { x: 0, y: 4, blur: 12, color: "rgba(0,0,0,0.4)" },
  children: [
    { elementType: "text", id: "card-title", text: "CPU", fontSize: 13, fontColor: "rgb(180,180,180)" },
    { elementType: "bar",  id: "card-bar",  value: 0.72, barColor: "rgb(0,180,255)", height: 6 }
  ]
});
```

## Children

<PropertyBox name="id" type="string">

Required. Unique identifier for the layout box. All elements in the `children` array are automatically assigned `container: id`, clipping and grouping them inside this box.

</PropertyBox>

<PropertyBox name="children" type="object[]" defaultValue="[]">

Elements to create inside the layout box. Each object must include an `elementType` property. All other properties follow the same rules as the corresponding `ui.add*()` call.

Supported `elementType` values:

| Value | Creates |
|---|---|
| `"text"` | `addText` |
| `"image"` | `addImage` |
| `"shape"` | `addShape` |
| `"button"` | `addButton` |
| `"inputbox"` | `addInputBox` |
| `"bitmap"` | `addBitmap` |
| `"rotator"` | `addRotator` |
| `"bar"` | `addBar` |
| `"line"` | `addLine` |
| `"histogram"` | `addHistogram` |
| `"roundline"` | `addRoundLine` |
| `"areagraph"` | `addAreaGraph` |
| `"layoutbox"` | Nested layout box |

Nested `"layoutbox"` children are supported. Each nested layout box can have its own `children`, `flexDirection`, `gap`, `padding`, etc.

::: warning Unknown elementType throws
Passing an unrecognized `elementType` string throws a `TypeError`.
:::

```javascript
children: [
  { elementType: "text",  id: "label", text: "Memory", fontSize: 12, fontColor: "rgb(200,200,200)" },
  { elementType: "bar",   id: "bar",   value: 0.5, barColor: "rgb(100,220,100)", height: 6 },
  { elementType: "layoutbox", id: "nested", flexDirection: "row", gap: 4, children: [
    { elementType: "text", id: "pct", text: "50%", fontSize: 11, fontColor: "rgb(160,160,160)" }
  ]}
]
```

</PropertyBox>

## Size

`width` and `height` are optional. When omitted, the layout box auto-sizes to fit its children:

- **Row layout:** width = sum of child widths + gaps, height = tallest child
- **Column layout:** height = sum of child heights + gaps, width = widest child

Padding is added on top of the calculated content size. Set `width` or `height` explicitly to override auto-sizing.

## Appearance

<PropertyBox name="backgroundColor" type="string" defaultValue="transparent">

Background fill drawn behind all children. Supports `rgb()`, `rgba()`, hex, `linearGradient()`, and `radialGradient()`.

```javascript
backgroundColor: "rgba(20,20,28,0.92)"
backgroundColor: "linearGradient(180, rgba(30,30,50,1), rgba(15,15,30,1))"
```

</PropertyBox>

<PropertyBox name="fillColor" type="string" defaultValue="transparent">

Secondary fill drawn inside the border (between the border and the children). Can be combined with `backgroundColor` for layered effects.

```javascript
fillColor: "rgba(255,255,255,0.04)"
```

</PropertyBox>

<PropertyBox name="opacity" type="number" defaultValue="1">

Overall transparency of the layout box, applied to the background, border, shadows, and all children. Values from `0.0` to `1.0` are treated as fractional opacity. Values greater than `1.0` are treated as a direct alpha value (`0–255`).

```javascript
opacity: 0.8      // 80% opacity
opacity: 204      // same as 0.8 in 0–255 range
```

</PropertyBox>

## Border

<PropertyBox name="borderWidth" type="number" defaultValue="0">

Border thickness in pixels. `0` hides the border. Accepts integer values.

</PropertyBox>

<PropertyBox name="borderRadius" type="number" defaultValue="0">

Corner radius in pixels, applied uniformly to all four corners of both the background and the border. Accepts integer values.

</PropertyBox>

<PropertyBox name="borderColor" type="string" defaultValue='"rgb(0,0,0)"'>

Color of the border. Only visible when `borderWidth` is greater than `0`. Does not support gradients — use a solid color.

```javascript
borderColor: "rgba(255,255,255,0.15)"
borderColor: "#444"
```

</PropertyBox>

<PropertyBox name="borderStyle" type="string | string[]" defaultValue='"solid"'>

Appearance of the border. Accepts a single string (all sides) or an array following CSS shorthand order (top, right, bottom, left). Case-insensitive.

Valid values: `"solid"`, `"none"`, `"hidden"`, `"dashed"`, `"dotted"`, `"double"`, `"inset"`, `"outset"`, `"groove"`, `"ridge"`

| Array length | Applied to |
|---|---|
| 1 | All sides |
| 2 | Top/bottom, left/right |
| 3 | Top, left/right, bottom |
| 4 | Top, right, bottom, left |

```javascript
borderStyle: "solid"
borderStyle: ["solid", "none"]               // top/bottom solid, left/right hidden
borderStyle: ["solid", "dashed", "none", "solid"]
```

</PropertyBox>

## Box Shadow

<PropertyBox name="boxShadow" type="object | object[]">

One or more drop shadows rendered behind the layout box. Pass a single shadow object or an array of objects. String syntax (CSS-style) is not supported.

Each shadow object:

| Property | Type | Default | Description |
|---|---|---|---|
| `x` | `number` | `0` | Horizontal offset in pixels |
| `y` | `number` | `0` | Vertical offset in pixels |
| `blur` | `number` | `0` | Blur radius in pixels |
| `spread` | `number` | `0` | Expansion radius in pixels |
| `color` | `string` | `"rgb(0,0,0)"` | Shadow color |
| `inset` | `boolean` | `false` | `true` renders an inner (inset) shadow |

```javascript
// Single shadow
boxShadow: { x: 0, y: 4, blur: 16, color: "rgba(0,0,0,0.5)" }

// Multiple layered shadows
boxShadow: [
  { x: 0, y: 2, blur: 4, color: "rgba(0,0,0,0.3)" },
  { x: 0, y: 8, blur: 20, color: "rgba(0,0,0,0.2)" }
]

// Inset shadow
boxShadow: { x: 0, y: 2, blur: 6, inset: true, color: "rgba(0,0,0,0.4)" }
```

</PropertyBox>

## Layout

<PropertyBox name="flexDirection" type="string" defaultValue='"row"'>

Main axis for child layout. Case-insensitive.

| Value | Behavior |
|---|---|
| `"row"` | Left to right (default) |
| `"column"` | Top to bottom |
| `"rowreverse"` | Right to left |
| `"columnreverse"` | Bottom to top |

</PropertyBox>

<PropertyBox name="direction" type="string" defaultValue='"ltr"'>

Reading direction for row layouts. Case-insensitive. Only `"ltr"` (left-to-right) and `"rtl"` (right-to-left) are valid.

</PropertyBox>

<PropertyBox name="gap" type="number" defaultValue="0">

Pixel gap between adjacent children along the main axis. Applied between items only, not before the first or after the last.

</PropertyBox>

<PropertyBox name="align / alignItems" type="string" defaultValue='"stretch"'>

Cross-axis alignment of children. `align` and `alignItems` are both accepted. Case-insensitive.

| Value | Behavior |
|---|---|
| `"start"` / `"flex-start"` | Align to the cross-axis start |
| `"center"` | Center on the cross axis |
| `"end"` / `"flex-end"` | Align to the cross-axis end |
| `"stretch"` | Stretch to fill cross-axis space (default) |

</PropertyBox>

<PropertyBox name="justify / justifyContent" type="string" defaultValue='"flex-start"'>

Main-axis distribution of children. `justify` and `justifyContent` are both accepted. Case-insensitive.

| Value | Behavior |
|---|---|
| `"start"` / `"flex-start"` | Pack at the start (default) |
| `"center"` | Center along the main axis |
| `"end"` / `"flex-end"` | Pack at the end |
| `"space-between"` | Equal space between children |
| `"space-around"` | Equal space around each child |

</PropertyBox>

<PropertyBox name="padding" type="number | number[]" defaultValue="0">

Inner spacing between the layout box edges and its children. Does not affect the outer size.

| Form | Applied to |
|---|---|
| `padding: 12` | All sides |
| `padding: [h, v]` | Left/right = h, top/bottom = v |
| `padding: [l, t, r, b]` | Each side individually |

```javascript
padding: 12
padding: [16, 8]
padding: [8, 4, 8, 4]
```

</PropertyBox>

## Display and List

<PropertyBox name="display" type="string" defaultValue='"flex"'>

Controls how the layout box is rendered. Case-insensitive.

| Value | Behavior |
|---|---|
| `"flex"` | Normal flex container (default) |
| `"none"` | Hidden — equivalent to `show: false` |
| `"list-item"` | Renders a list marker before each child |

</PropertyBox>

<PropertyBox name="listStyleType" type="string" defaultValue='"disc"'>

Marker style used when `display` is `"list-item"`. Case-insensitive. Marker size scales automatically with the child element's font size or height.

| Value | Marker |
|---|---|
| `"disc"` | Filled circle (default) |
| `"circle"` | Hollow circle |
| `"square"` | Filled square |
| `"decimal"` | 1, 2, 3, ... |
| `"lower-alpha"` | a, b, c, ... |
| `"upper-alpha"` | A, B, C, ... |
| `"lower-roman"` | i, ii, iii, ... |
| `"upper-roman"` | I, II, III, ... |
| `"none"` | No marker |

Counter values continue automatically from sibling list items with the same `listStyleType`.

</PropertyBox>

## style Object

Layout properties can also be provided inside a `style` object. Properties defined there are treated identically to their top-level equivalents.

Properties supported inside `style`: `direction`, `flexDirection`, `gap`, `alignItems`, `justifyContent`, `padding`, `paddingX`, `paddingY`, `display`, `listStyleType`.

`paddingX` and `paddingY` are only available inside the `style` object.

```javascript
ui.addLayoutBox({
  id: "box",
  style: {
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
    paddingX: 16,
    paddingY: 12
  },
  children: [
    { elementType: "text", id: "title", text: "Hello" }
  ]
});
```

## Practical Examples

**System monitor card**

```javascript
ui.addLayoutBox({
  id: "cpu-card",
  x: 16, y: 16,
  width: 280,
  backgroundColor: "rgba(24,24,32,0.95)",
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.08)",
  boxShadow: { x: 0, y: 6, blur: 20, color: "rgba(0,0,0,0.5)" },
  flexDirection: "column",
  gap: 6,
  padding: 14,
  children: [
    { elementType: "text", id: "cpu-label", text: "CPU",  fontSize: 12, fontColor: "rgba(180,180,180,1)" },
    { elementType: "bar",  id: "cpu-bar",  value: 0,     barColor: "rgb(0,180,255)", height: 6, barCornerRadius: 3, backgroundColor: "rgba(255,255,255,0.07)", backgroundColorRadius: 3 },
    { elementType: "text", id: "cpu-pct",  text: "0%",   fontSize: 11, fontColor: "rgba(120,180,255,1)" }
  ]
});

ipcRenderer.on("stats", (event, payload) => {
  ui.beginUpdate();
  ui.setElementProperties("cpu-bar", { value: payload.cpu / 100 });
  ui.setElementProperties("cpu-pct", { text: payload.cpu + "%" });
  ui.endUpdate();
});
```

**Row of icon buttons**

```javascript
ui.addLayoutBox({
  id: "toolbar",
  x: 0, y: 0,
  width: 400, height: 40,
  backgroundColor: "rgba(20,20,28,1)",
  flexDirection: "row",
  align: "center",
  justify: "flex-end",
  gap: 4,
  padding: [0, 0, 8, 0],
  children: [
    { elementType: "button", id: "btn-min",   x: 0, y: 0, width: 24, height: 24, buttonImageName: "./assets/minimize.png",  buttonAction: () => ipcRenderer.send("minimize") },
    { elementType: "button", id: "btn-max",   x: 0, y: 0, width: 24, height: 24, buttonImageName: "./assets/maximize.png",  buttonAction: () => ipcRenderer.send("maximize") },
    { elementType: "button", id: "btn-close", x: 0, y: 0, width: 24, height: 24, buttonImageName: "./assets/close.png",     buttonAction: () => ipcRenderer.send("close") }
  ]
});
```

**Nested column inside a row**

```javascript
ui.addLayoutBox({
  id: "stats-row",
  x: 16, y: 60,
  width: 360,
  flexDirection: "row",
  gap: 12,
  padding: 0,
  children: [
    {
      elementType: "layoutbox", id: "stat-cpu",
      width: 110,
      backgroundColor: "rgba(30,30,42,0.9)",
      borderRadius: 8,
      flexDirection: "column",
      gap: 4,
      padding: 10,
      children: [
        { elementType: "text", id: "stat-cpu-label", text: "CPU",  fontSize: 11, fontColor: "rgba(160,160,160,1)" },
        { elementType: "text", id: "stat-cpu-value", text: "0%",   fontSize: 18, fontColor: "rgb(255,255,255)" }
      ]
    },
    {
      elementType: "layoutbox", id: "stat-ram",
      width: 110,
      backgroundColor: "rgba(30,30,42,0.9)",
      borderRadius: 8,
      flexDirection: "column",
      gap: 4,
      padding: 10,
      children: [
        { elementType: "text", id: "stat-ram-label", text: "RAM",  fontSize: 11, fontColor: "rgba(160,160,160,1)" },
        { elementType: "text", id: "stat-ram-value", text: "0%",   fontSize: 18, fontColor: "rgb(255,255,255)" }
      ]
    }
  ]
});
```

**Bullet list**

```javascript
const items = ["Widget auto-launches on startup", "Uses Direct2D rendering", "Runs on any Windows 10+ PC"];

items.forEach((item, i) => {
  ui.addLayoutBox({
    id: "list-item-" + i,
    x: 16, y: 60 + i * 28,
    width: 300,
    display: "list-item",
    listStyleType: "disc",
    children: [
      { elementType: "text", id: "list-text-" + i, text: item, fontSize: 13, fontColor: "rgb(200,200,200)" }
    ]
  });
});
```
