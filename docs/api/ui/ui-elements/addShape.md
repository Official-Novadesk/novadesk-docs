---
title: Shape element types, properties, and examples.
---

# Shape Element
Draw shapes (rectangles, ellipses, lines, arcs, paths, curves, combines) using `ui.addShape()` inside a UI script.

```js
ui.addShape(options);
```

#### Table of Contents
[[toc]]

## Shape Options

The shape element inherits all [General Elements Options](/api/ui/ui-elements/general-elements-options) and adds the following fields.

### `type`

- **Type**: `string`
- **Default**: `"rectangle"`
- **Description**: Determines the shape to render.

#### Valid values

- `"rectangle"`
- `"ellipse"`
- `"line"`
- `"arc"`
- `"path"`
- `"curve"`
- `"combine"`

## Shape Types

### Rectangle

Use `type: "rectangle"`.

#### `radiusX`

- **Type**: `number`
- **Default**: `0`
- **Description**: Corner radius along the X axis.

#### `radiusY`

- **Type**: `number`
- **Default**: `0`
- **Description**: Corner radius along the Y axis.

#### `radius`

- **Type**: `number`
- **Default**: `0`
- **Description**: Sets both `radiusX` and `radiusY` when the individual values are unset.

#### Example

```javascript
ui.addShape({
    id: "rect1",
    type: "rectangle",
    x: 20,
    y: 20,
    width: 160,
    height: 90,
    radius: 12,
    fillColor: "rgba(30, 30, 30, 1)",
    strokeColor: "rgba(255, 255, 255, 0.2)",
    strokeWidth: 1
});
```

### Ellipse

Use `type: "ellipse"`.

#### `radiusX`

- **Type**: `number`
- **Default**: `0`
- **Description**: Radius on the X axis.

#### `radiusY`

- **Type**: `number`
- **Default**: `0`
- **Description**: Radius on the Y axis.

#### `radius`

- **Type**: `number`
- **Default**: `0`
- **Description**: Sets both radii when the individual values are unset.

#### Example

```javascript
ui.addShape({
    id: "ellipse1",
    type: "ellipse",
    x: 200,
    y: 20,
    width: 120,
    height: 80,
    radiusX: 60,
    radiusY: 40,
    fillColor: "rgba(0, 120, 255, 0.4)",
    strokeColor: "rgba(0, 120, 255, 1)",
    strokeWidth: 2
});
```

### Line

Use `type: "line"`.

#### `startX`

- **Type**: `number`
- **Default**: `0`
- **Description**: Starting X coordinate.

#### `startY`

- **Type**: `number`
- **Default**: `0`
- **Description**: Starting Y coordinate.

#### `endX`

- **Type**: `number`
- **Default**: `0`
- **Description**: Ending X coordinate.

#### `endY`

- **Type**: `number`
- **Default**: `0`
- **Description**: Ending Y coordinate.

#### Example

```javascript
ui.addShape({
    id: "line1",
    type: "line",
    x: 20,
    y: 130,
    width: 200,
    height: 40,
    startX: 0,
    startY: 20,
    endX: 200,
    endY: 20,
    strokeColor: "rgba(255, 200, 0, 1)",
    strokeWidth: 3
});
```

### Arc

Use `type: "arc"`.

#### `startAngle`

- **Type**: `number`
- **Default**: `0`
- **Description**: Start angle in degrees.

#### `endAngle`

- **Type**: `number`
- **Default**: `90`
- **Description**: End angle in degrees.

#### `clockwise`

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Sweep direction.

#### Example

```javascript
ui.addShape({
    id: "arc1",
    type: "arc",
    x: 240,
    y: 120,
    width: 120,
    height: 120,
    startAngle: 0,
    endAngle: 270,
    clockwise: true,
    strokeWidth: 6,
    strokeColor: "rgba(0, 200, 255, 1)"
});
```

### Curve

Use `type: "curve"`.

#### `curveType`

- **Type**: `string`
- **Default**: `"quadratic"`
- **Description**: Curve type (`"quadratic"` or `"cubic"`).

#### `startX`, `startY`, `endX`, `endY`

- **Type**: `number`
- **Default**: `0`
- **Description**: Start and end coordinates.

#### `controlX`, `controlY`

- **Type**: `number`
- **Default**: `0`
- **Description**: Control point for the curve.

#### `control2X`, `control2Y`

- **Type**: `number`
- **Default**: `0`
- **Description**: Second control point for cubic curves.

#### Example

```javascript
ui.addShape({
    id: "curve1",
    type: "curve",
    x: 20,
    y: 190,
    width: 200,
    height: 80,
    curveType: "quadratic",
    startX: 0,
    startY: 60,
    controlX: 100,
    controlY: 0,
    endX: 200,
    endY: 60,
    strokeColor: "rgba(150, 255, 100, 1)",
    strokeWidth: 3
});
```

### Path

Use `type: "path"`.

#### `pathData`

- **Type**: `string`
- **Default**: `""`
- **Description**: SVG-style path data.

#### Example

```javascript
ui.addShape({
    id: "path1",
    type: "path",
    x: 20,
    y: 290,
    width: 200,
    height: 80,
    pathData: "M 10 40 Q 60 10 110 40 T 210 40",
    strokeWidth: 3,
    strokeColor: "rgba(255, 200, 0, 1)"
});
```

### Combine

Use `type: "combine"`.

See the **Common Options** section below for `combine` settings.

## Common Options

### Fill

#### `fillColor`

- **Type**: `string`
- **Default**: `"rgb(255, 255, 255)"`
- **Description**: Fill color or gradient.

### Stroke

#### `strokeWidth`

- **Type**: `number`
- **Default**: `1`
- **Description**: Stroke width in pixels.

#### `strokeColor`

- **Type**: `string`
- **Default**: `"rgb(0, 0, 0)"`
- **Description**: Stroke color or gradient.

#### `strokeStartCap`, `strokeEndCap`, `strokeDashCap`

- **Type**: `string`
- **Default**: `"flat"`
- **Description**: Cap styles for the stroke.

#### `strokeLineJoin`

- **Type**: `string`
- **Default**: `"miter"`
- **Description**: Line join style.

#### `strokeDashOffset`

- **Type**: `number`
- **Default**: `0`
- **Description**: Offset into the dash pattern.

#### `strokeDashes`

- **Type**: `array | string`
- **Default**: `[]`
- **Description**: Dash pattern expressed as an array or comma-delimited string.

### Combine Options

#### `base`

- **Type**: `string`
- **Description**: ID of the base shape.

#### `ops`

- **Type**: `array`
- **Description**: Combine operations (objects with `id`, `mode`, `consume`).

#### `consume`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: When `true`, removes the shapes used in the combine operations.

#### Example

```javascript
ui.addShape({
    id: "base",
    type: "rectangle",
    x: 260,
    y: 260,
    width: 120,
    height: 80,
    radius: 10,
    fillColor: "rgba(80, 80, 80, 1)"
});

ui.addShape({
    id: "cutout",
    type: "ellipse",
    x: 280,
    y: 270,
    width: 80,
    height: 60,
    fillColor: "rgba(255, 255, 255, 1)"
});

ui.addShape({
    id: "combined",
    type: "combine",
    base: "base",
    ops: [
        { id: "cutout", mode: "exclude", consume: true }
    ],
    consume: true
});
```

::: info
Use `fillColor` with closed shapes. Line-based shapes (line/arc) rely on stroke settings.
:::
