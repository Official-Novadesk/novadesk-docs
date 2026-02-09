# Shape Element

Documentation for the Novadesk Shape element type.

## Adding a Shape Element

Use the `addShape()` method on the `win` object within a [UI Script](/guides/script-types#ui-script-the-face):

```js
win.addShape(options);
```

## Shape Options

The shape element inherits all [General Element Options](/api/ui-elements-api/general-elements-options) and adds the following:

###  type

- **Type**: `string`
- **Default**: `"rectangle"`
- **Description**: Shape type to render.

Valid values:
`"rectangle"`, `"ellipse"`, `"line"`, `"arc"`, `"path"`, `"curve"`, `"combine"`.

## Shape Types

### Rectangle

Use `type: "rectangle"`.

###  radiusX

- **Type**: `number`
- **Default**: `0`
- **Description**: Corner radius for rectangles on the X axis.

###  radiusY

- **Type**: `number`
- **Default**: `0`
- **Description**: Corner radius for rectangles on the Y axis.

###  radius

- **Type**: `number`
- **Default**: `0`
- **Description**: Convenience radius that sets both `radiusX` and `radiusY` if they are not set.

### Example

```javascript
win.addShape({
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

###  radiusX

- **Type**: `number`
- **Default**: `0`
- **Description**: Radius values for the ellipse on the X axis.

###  radiusY

- **Type**: `number`
- **Default**: `0`
- **Description**: Radius values for the ellipse on the Y axis.

###  radius

- **Type**: `number`
- **Default**: `0`
- **Description**: Convenience radius that sets both `radiusX` and `radiusY` if they are not set.

### Example

```javascript
win.addShape({
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

###  startX

- **Type**: `number`
- **Default**: `0`
- **Description**: Line start X coordinate.

###  startY

- **Type**: `number`
- **Default**: `0`
- **Description**: Line start Y coordinate.

###  endX

- **Type**: `number`
- **Default**: `0`
- **Description**: Line end X coordinate.

###  endY

- **Type**: `number`
- **Default**: `0`
- **Description**: Line end Y coordinate.

### Example

```javascript
win.addShape({
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

###  startAngle

- **Type**: `number`
- **Default**: `0`
- **Description**: Arc start angle in degrees.

###  endAngle

- **Type**: `number`
- **Default**: `90`
- **Description**: Arc end angle in degrees.

###  clockwise

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Arc direction.

### Example

```javascript
win.addShape({
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

###  curveType

- **Type**: `string`
- **Default**: `"quadratic"`
- **Description**: Curve type for `curve` shapes. Valid values: `"quadratic"`, `"cubic"`.

###  startX

- **Type**: `number`
- **Default**: `0`
- **Description**: Curve start X coordinate.

###  startY

- **Type**: `number`
- **Default**: `0`
- **Description**: Curve start Y coordinate.

###  endX

- **Type**: `number`
- **Default**: `0`
- **Description**: Curve end X coordinate.

###  endY

- **Type**: `number`
- **Default**: `0`
- **Description**: Curve end Y coordinate.

###  controlX

- **Type**: `number`
- **Default**: `0`
- **Description**: First control point X coordinate for curves.

###  controlY

- **Type**: `number`
- **Default**: `0`
- **Description**: First control point Y coordinate for curves.

###  control2X

- **Type**: `number`
- **Default**: `0`
- **Description**: Second control point X coordinate for cubic curves.

###  control2Y

- **Type**: `number`
- **Default**: `0`
- **Description**: Second control point Y coordinate for cubic curves.

### Example

```javascript
win.addShape({
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

###  pathData

- **Type**: `string`
- **Default**: `""`
- **Description**: SVG-style path data for `path` shapes.

### Example

```javascript
win.addShape({
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

See **Common Options** below for combine settings.

## Common Options

### Fill

###  fillColor

- **Type**: `string`
- **Default**: `"rgb(255, 255, 255)"`
- **Description**: Fill color. Supports both [Solid Color](/guides/colors#solid-colors) and [Gradient Color](/guides/colors#gradients).

### Stroke

###  strokeWidth

- **Type**: `number`
- **Default**: `1`
- **Description**: Stroke width in pixels.

###  strokeColor

- **Type**: `string`
- **Default**: `"rgb(0, 0, 0)"`
- **Description**: Stroke color. Supports both [Solid Color](/guides/colors#solid-colors) and [Gradient Color](/guides/colors#gradients).

###  strokeStartCap

- **Type**: `string`
- **Default**: `"flat"`
- **Description**: Start cap style for the stroke.

###  strokeEndCap

- **Type**: `string`
- **Default**: `"flat"`
- **Description**: End cap style for the stroke.

###  strokeDashCap

- **Type**: `string`
- **Default**: `"flat"`
- **Description**: Dash cap style for the stroke.

###  strokeLineJoin

- **Type**: `string`
- **Default**: `"miter"`
- **Description**: Line join style for the stroke.

###  strokeDashOffset

- **Type**: `number`
- **Default**: `0`
- **Description**: Offset into the stroke dash pattern.

###  strokeDashes

- **Type**: `array | string`
- **Default**: `[]`
- **Description**: Dash pattern for the stroke. Can be an array of numbers or a comma-separated string.

### Combine

###  base

- **Type**: `string`
- **Description**: Base shape ID used as the starting geometry for `combine`.

###  ops

- **Type**: `array`
- **Description**: List of combine operations applied to the base geometry.

Each op object:
`id` (string), `mode` (`"union"`, `"intersect"`, `"xor"`, `"exclude"`), `consume` (boolean).

###  consume

- **Type**: `boolean`
- **Default**: `false`
- **Description**: If `true`, consume all shapes used in the combine operations.

### Example

```javascript
win.addShape({
    id: "base",
    type: "rectangle",
    x: 260,
    y: 260,
    width: 120,
    height: 80,
    radius: 10,
    fillColor: "rgba(80, 80, 80, 1)"
});

win.addShape({
    id: "cutout",
    type: "ellipse",
    x: 280,
    y: 270,
    width: 80,
    height: 60,
    fillColor: "rgba(255, 255, 255, 1)"
});

win.addShape({
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
Use `fillColor` to fill closed shapes (rectangle, ellipse, path, combine). Lines and arcs are stroke-only.
:::
