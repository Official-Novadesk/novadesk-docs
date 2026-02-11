# RoundLine Element

Documentation for the Novadesk RoundLine element type.

## Adding a RoundLine Element

Use the `addRoundLine()` method on the `win` object within a [UI Script](/guides/script-types#ui-script-the-face):

```js
win.addRoundLine(options);
```

## RoundLine Options

The roundline element inherits all [General Element Options](/api/ui-elements-api/general-elements-options) and adds the following:

---

### `value`

- **Type**: `number`
- **Default**: `0.0`
- **Description**: The fill level of the roundline, from `0.0` (empty) to `1.0` (full).

---

### `radius`

- **Type**: `number`
- **Default**: `0`
- **Description**: Radius of the arc in pixels. If `0`, the radius is derived from `width`/`height`.

---

### `thickness`

- **Type**: `number`
- **Default**: `2`
- **Description**: Stroke thickness of the arc.

---

### `endThickness`

- **Type**: `number`
- **Default**: `-1`
- **Description**: End thickness for tapered arcs. Use `-1` to match `thickness`.

---

### `startAngle`

- **Type**: `number`
- **Default**: `0.0`
- **Description**: Start angle in degrees. `0` begins at the top (12 o'clock).

---

### `totalAngle`

- **Type**: `number`
- **Default**: `360.0`
- **Description**: Total sweep of the arc in degrees.

---

### `clockwise`

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Direction of the sweep. When `false`, the arc draws counterclockwise.

---

### `capType`

- **Type**: `string`
- **Default**: `"flat"`
- **Description**: Sets both start and end caps.
  - `"flat"`
  - `"round"`

---

### `startCap`

- **Type**: `string`
- **Default**: `"flat"`
- **Description**: Start cap style. Overrides `capType` for the start.
  - `"flat"`
  - `"round"`

---

### `endCap`

- **Type**: `string`
- **Default**: `"flat"`
- **Description**: End cap style. Overrides `capType` for the end.
  - `"flat"`
  - `"round"`

---

### `dashArray`

- **Type**: `string`
- **Default**: `""`
- **Description**: Comma-separated dash lengths (e.g. `"10, 5"`).

---

### `ticks`

- **Type**: `number`
- **Default**: `0`
- **Description**: Draws tick marks along the arc. `0` disables ticks.

---

### `lineColor`

- **Type**: `string`
- **Default**: `"rgb(0, 255, 0)"`
- **Description**: Color of the foreground arc. Supports both [Solid Color](/guides/colors#solid-colors) and [Gradient Color](/guides/colors#gradients).

---

### `lineColorBg`

- **Type**: `string`
- **Default**: `"rgb(50, 50, 50)"`
- **Description**: Color of the background arc. Supports both [Solid Color](/guides/colors#solid-colors) and [Gradient Color](/guides/colors#gradients).

## Example

:::tabs
== index.js
```javascript
var exampleRoundLineWindow = new widgetWindow({
    id: "exampleRoundLine",
    width: 300,
    height: 200,
    backgroundColor: "rgba(20, 20, 20, 1)",
    script: "ui/ui.js",
});
```
== ui/ui.js
```javascript
win.addRoundLine({
    id: "cpu-ring",
    x: 40,
    y: 20,
    width: 140,
    height: 140,
    radius: 60,
    thickness: 10,
    value: 0.75,
    lineColor: "linearGradient(90, #00f, #0ff)",
    lineColorBg: "rgba(255, 255, 255, 0.1)",
    capType: "round"
});
```
:::
