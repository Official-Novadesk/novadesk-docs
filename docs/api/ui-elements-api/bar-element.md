# Bar Element

Documentation for the Novadesk Bar element type.

## Adding a Bar Element

Use the `addBar()` method on the `win` object within a [UI Script](/guides/script-types#ui-script-the-face):

```js
win.addBar(options);
```

## Bar Options

The bar element inherits all [General Element Options](/api/ui-elements-api/general-elements-options) and adds the following:

### value

- **Type**: `number`
- **Default**: `0.0`
- **Description**: The fill level of the bar, from `0.0` (empty) to `1.0` (full).

### orientation

- **Type**: `string`
- **Default**: `"horizontal"`
- **Description**: The direction in which the bar fills.
  - `"horizontal"`: Fills from left to right
  - `"vertical"`: Fills from bottom to top

### barCornerRadius

- **Type**: `number`
- **Default**: `0`
- **Description**: Corner radius applied to the bar fill.

### barColor

- **Type**: `string`
- **Description**: The Color of the filled portion of the bar. Support both [Solid Color](/guides/colors#solid-colors) and [Gradient Color](/guides/colors#gradients) .

## Example

:::tabs
== index.js
```javascript
var exampleBarWindow = new widgetWindow({
    id: "exampleBar",
    width: 300,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 1)",
    script: "ui/ui.js",
});
```
== ui/ui.js
```javascript
win.addBar({
    id: "cpu-Bar",
    x: 50,
    y: 10,
    width: 200,
    height: 20,
    value: 0.5,
    barColor: "rgba(20, 232, 115, 1)",
    backgroundColor: "rgba(241, 216, 19, 1)",
    backgroundColorRadius: 8,
    barCornerRadius: 8
});
```
:::

## Preview

![Widget Preview](https://github.com/Official-Novadesk/novadesk-assets/blob/master/docs/barPreview.png?raw=true)




