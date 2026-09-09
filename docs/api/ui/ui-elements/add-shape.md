---
title: addShape
description: "Add a 2D vector shape: rectangle, ellipse, line, arc, curve, or path."
---

# ui.addShape()

Draws 2D vector graphics using Direct2D. Supports six shape types — rectangle, ellipse, line, curve, arc, and path — plus a combine mode for boolean geometry operations. Shapes can be filled and stroked with solid colors or gradients, dashed, and given custom cap and join styles.

```javascript
ui.addShape(options);
```

::: info
Also accepts all [General Element Options](/api/ui/ui-elements/general-options) (position, size, visibility, tooltip, mouse events, rotation, etc.).
:::

#### Table of Contents
[[toc]]

## Quick Example

```javascript
// Rounded card background
ui.addShape({
  id: "card",
  shapeType: "rectangle",
  x: 16, y: 16,
  width: 280, height: 100,
  fillColor: "rgba(30,30,40,0.9)",
  strokeColor: "rgba(255,255,255,0.1)",
  strokeWidth: 1,
  radiusX: 8, radiusY: 8
});
```

## Shape Type

<PropertyBox name="type" type="string" defaultValue='"rectangle"'>

The geometry to draw. All shape properties are always parsed, but only the ones relevant to the selected type affect rendering.

| Value | Description |
|---|---|
| `"rectangle"` | Filled and/or stroked rectangle. Optional rounded corners via `radiusX`/`radiusY`. |
| `"ellipse"` | Filled and/or stroked ellipse or circle. |
| `"line"` | Straight line from (`startX`, `startY`) to (`endX`, `endY`). |
| `"curve"` | Quadratic or cubic Bézier curve. |
| `"arc"` | Elliptical arc segment between two angles. |
| `"path"` | Custom shape from an SVG-style path string. |
| `"combine"` | Boolean geometry operation between existing shapes. |

</PropertyBox>

## Fill and Stroke

<PropertyBox name="fillColor" type="string">

Fill color or gradient for the shape interior. Supports `rgb()`, `rgba()`, hex, `linearGradient()`, and `radialGradient()`. When not provided, no fill is drawn. Set to `"transparent"` or `"none"` to explicitly draw only the stroke.

```javascript
fillColor: "rgba(30,30,40,0.9)"
fillColor: "linearGradient(90, rgb(20,20,40), rgb(40,20,60))"
fillColor: "radialGradient(circle, rgba(255,255,255,0.15), rgba(0,0,0,0))"
```

</PropertyBox>

<PropertyBox name="strokeColor" type="string">

Stroke (outline) color or gradient. Only visible when `strokeWidth` is greater than `0`. When not provided, no stroke is drawn.

```javascript
strokeColor: "rgba(255,255,255,0.2)"
strokeColor: "linearGradient(0, rgb(0,120,255), rgb(0,220,180))"
```

</PropertyBox>

<PropertyBox name="strokeWidth" type="number" defaultValue="1">

Stroke thickness in pixels. `0` disables the stroke.

</PropertyBox>

## Corner Radius

<PropertyBox name="radiusX / radiusY / radius" type="number" defaultValue="0">

Corner radius for rectangles, and the horizontal/vertical radii for ellipses and arcs.

`radius` is a shorthand that sets both `radiusX` and `radiusY` to the same value. Explicitly setting `radiusX` or `radiusY` overrides the shorthand value for that axis.

For ellipses, when no radius is specified the engine calculates both radii from `width` and `height` automatically.

```javascript
// Uniformly rounded corners
radiusX: 8, radiusY: 8

// radius shorthand — equivalent to the above
radius: 8

// Asymmetric corners
radiusX: 20, radiusY: 6
```

</PropertyBox>

## Line and Curve Geometry

<PropertyBox name="startX, startY, endX, endY" type="number" defaultValue="0">

Start and end coordinates for `"line"` and `"curve"` types, in element-local coordinates.

Lines and curves use these properties for their geometry. The `width` and `height` properties only affect hit-testing bounds.

```javascript
// Diagonal line
ui.addShape({
  id: "divider",
  type: "line",
  startX: 0, startY: 0,
  endX: 200, endY: 60,
  strokeColor: "rgba(255,255,255,0.2)",
  strokeWidth: 1
});
```

</PropertyBox>

<PropertyBox name="curveType" type="string" defaultValue='"quadratic"'>

Bézier algorithm for the `"curve"` type. Case-insensitive.

| Value | Control points | Use for |
|---|---|---|
| `"quadratic"` | `controlX`, `controlY` | Simple arcs |
| `"cubic"` | `controlX`/`controlY` + `control2X`/`control2Y` | S-curves and complex shapes |

</PropertyBox>

<PropertyBox name="controlX, controlY, control2X, control2Y" type="number" defaultValue="0">

Control points for `"curve"` shapes. Quadratic curves use only `controlX`/`controlY`. Cubic curves use both sets.

```javascript
// Quadratic curve
ui.addShape({
  id: "wave",
  type: "curve",
  curveType: "quadratic",
  startX: 0, startY: 60,
  controlX: 100, controlY: 0,
  endX: 200, endY: 60,
  strokeColor: "rgb(0,180,255)",
  strokeWidth: 3
});

// Cubic S-curve
ui.addShape({
  id: "scurve",
  type: "curve",
  curveType: "cubic",
  startX: 0, startY: 0,
  controlX: 60, controlY: 100,
  control2X: 140, control2Y: -40,
  endX: 200, endY: 60,
  strokeColor: "rgb(255,120,0)",
  strokeWidth: 2
});
```

</PropertyBox>

## Arc Geometry

<PropertyBox name="startAngle, endAngle" type="number" defaultValue="startAngle: 0, endAngle: 90">

Start and end angles for the `"arc"` type, in degrees. `0°` is 3 o'clock (right). Positive values go clockwise.

```javascript
ui.addShape({
  id: "arc",
  type: "arc",
  x: 20, y: 20,
  width: 200, height: 200,
  radius: 90,
  startAngle: 0,
  endAngle: 270,
  clockwise: true,
  strokeColor: "rgb(0,180,255)",
  strokeWidth: 6
});
```

</PropertyBox>

<PropertyBox name="clockwise" type="boolean" defaultValue="true">

Sweep direction for `"arc"` type. `true` = clockwise, `false` = counter-clockwise.

</PropertyBox>

## Custom Path

<PropertyBox name="pathData" type="string" defaultValue='""'>

SVG-style path string for the `"path"` type. Coordinates are in element-local space, relative to the element's `x`/`y` position.

Supported commands:

| Command | Description |
|---|---|
| `M x y` | Move to (`x`, `y`), start new subpath |
| `L x y` | Line to (`x`, `y`) |
| `H x` | Horizontal line to `x` |
| `V y` | Vertical line to `y` |
| `C x1 y1 x2 y2 x y` | Cubic Bézier to (`x`, `y`) |
| `Q x1 y1 x y` | Quadratic Bézier to (`x`, `y`) |
| `A rx ry rot large-arc sweep x y` | Elliptical arc to (`x`, `y`) |
| `Z` | Close path |

```javascript
ui.addShape({
  id: "triangle",
  type: "path",
  x: 10, y: 10,
  pathData: "M100 10 L190 190 L10 190 Z",
  fillColor: "rgba(0,180,255,0.3)",
  strokeColor: "rgb(0,180,255)",
  strokeWidth: 2
});
```

</PropertyBox>

## Stroke Style

<PropertyBox name="strokeStartCap / strokeEndCap" type="string" defaultValue='"Flat"'>

Cap style at the start and end of open paths (lines, curves, open arcs). Case-insensitive. Has no effect on closed shapes.

| Value | Appearance |
|---|---|
| `"Flat"` | Ends exactly at the endpoint (default) |
| `"Round"` | Semicircle extending half the stroke width |
| `"Square"` | Square extending half the stroke width |
| `"Triangle"` | Pointed triangular end |

```javascript
strokeStartCap: "Round",
strokeEndCap: "Round"
```

</PropertyBox>

<PropertyBox name="strokeDashCap" type="string" defaultValue='"Flat"'>

Cap style for individual dashes when `strokeDashes` is set. Same valid values as `strokeStartCap`. Has no effect on solid strokes.

</PropertyBox>

<PropertyBox name="strokeLineJoin" type="string" defaultValue='"Miter"'>

How corners are rendered where two stroke segments meet. Case-insensitive.

| Value | Appearance |
|---|---|
| `"Miter"` | Sharp pointed corner (default) |
| `"Bevel"` | Corner cut with a straight edge |
| `"Round"` | Smooth circular arc at the corner |
| `"MiterOrBevel"` | Miter for wide angles, bevel for sharp angles |

</PropertyBox>

<PropertyBox name="strokeDashes" type="number[]" defaultValue="[]">

Repeating dash/gap pattern for the stroke. Values alternate between dash length and gap length in pixels. An empty array draws a solid stroke.

```javascript
strokeDashes: [8, 4]           // 8px dash, 4px gap
strokeDashes: [2, 2, 8, 2]     // short-short-long
```

</PropertyBox>

<PropertyBox name="strokeDashOffset" type="number" defaultValue="0">

Shifts the start position of the dash pattern along the stroke. Useful for aligning dashes or animating them by incrementing the offset over time.

</PropertyBox>

## Boolean Combine

The `"combine"` type produces a new shape by applying one or more boolean geometry operations to existing shapes. All referenced shapes must already exist when the combine shape is created.

<PropertyBox name="base" type="string">

ID of the existing shape used as the starting geometry for the combine operation. Required when `type` is `"combine"`.

</PropertyBox>

<PropertyBox name="ops" type="object[]" defaultValue="[]">

Sequence of boolean operations applied to the base geometry. Each operation references an existing shape by `id` and combines it with the current geometry using the specified `mode`. Operations are applied in array order.

Each operation object:

| Property | Type | Description |
|---|---|---|
| `id` | `string` | ID of an existing shape to combine with. |
| `mode` | `string` | Boolean operation. See values below. |
| `consume` | `boolean` | `true` hides the source shape after use. |

Valid `mode` values:

| Value | Result |
|---|---|
| `"union"` | Merges both shapes (default for unrecognized strings) |
| `"intersect"` | Keeps only the overlapping region |
| `"xor"` | Keeps only the non-overlapping portions |
| `"exclude"` | Subtracts the second shape from the first |

</PropertyBox>

<PropertyBox name="consume" type="boolean" defaultValue="false">

When `true`, hides the `base` shape after its geometry has been used. To hide shapes from `ops`, set their individual `consume: true`.

</PropertyBox>

## Practical Examples

**Rounded card with gradient fill**

```javascript
ui.addShape({
  id: "card",
  type: "rectangle",
  x: 16, y: 16,
  width: 280, height: 80,
  fillColor: "linearGradient(135, rgba(30,30,50,0.95), rgba(20,20,40,0.95))",
  strokeColor: "rgba(255,255,255,0.08)",
  strokeWidth: 1,
  radiusX: 10, radiusY: 10
});
```

**Horizontal divider line**

```javascript
ui.addShape({
  id: "divider",
  type: "line",
  x: 16, y: 100,
  startX: 0, startY: 0,
  endX: 268, endY: 0,
  strokeColor: "rgba(255,255,255,0.1)",
  strokeWidth: 1
});
```

**Circular progress track (arc)**

```javascript
ui.addShape({
  id: "track",
  type: "arc",
  x: 40, y: 40,
  width: 120, height: 120,
  radius: 50,
  startAngle: -135,
  endAngle: 135,
  clockwise: true,
  strokeColor: "rgba(255,255,255,0.07)",
  strokeWidth: 8
});
```

**Dashed border rectangle**

```javascript
ui.addShape({
  id: "dashed-rect",
  type: "rectangle",
  x: 16, y: 16,
  width: 260, height: 80,
  strokeColor: "rgba(100,180,255,0.6)",
  strokeWidth: 2,
  strokeDashes: [8, 4],
  strokeDashCap: "Round",
  radiusX: 6, radiusY: 6
});
```

**Custom polygon via path**

```javascript
ui.addShape({
  id: "arrow",
  type: "path",
  x: 16, y: 16,
  pathData: "M0 20 L60 20 L60 0 L100 30 L60 60 L60 40 L0 40 Z",
  fillColor: "rgba(0,180,255,0.3)",
  strokeColor: "rgb(0,180,255)",
  strokeWidth: 1.5
});
```

**Boolean combine — punch a hole**

```javascript
// Base circle
ui.addShape({
  id: "outer",
  type: "ellipse",
  x: 60, y: 60,
  width: 120, height: 120,
  fillColor: "rgb(0,180,255)"
});

// Inner circle (will be punched out)
ui.addShape({
  id: "inner",
  type: "ellipse",
  x: 85, y: 85,
  width: 70, height: 70,
  fillColor: "rgb(255,0,0)"
});

// Ring = outer minus inner
ui.addShape({
  id: "ring",
  type: "combine",
  base: "outer",
  consume: true,
  ops: [{ id: "inner", mode: "exclude", consume: true }],
  fillColor: "rgb(0,180,255)"
});
```
