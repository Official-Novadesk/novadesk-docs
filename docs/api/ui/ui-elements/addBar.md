---
title: Bar element options and example usage.
---

# Bar Element
The Bar element visualizes a value between `0.0` and `1.0` inside a UI script.

Use `ui.addBar()` to create the element and combine it with the shared [General Elements Options](/api/ui/ui-elements/general-options/general-elements-options), [General Tooltip Options](/api/ui/ui-elements/general-options/tooltip), and [Mouse Events Callback](/api/ui/ui-elements/general-options/mouse-events).

```js
ui.addBar(options);
```

#### Table of Contents
[[toc]]

## Bar Options

### `value`

- **Type**: `number`
- **Default**: `0.0`
- **Description**: Fill level of the bar.

### `orientation`

- **Type**: `string`
- **Default**: `"horizontal"`
- **Description**: Fill direction.

#### Valid values

- `"horizontal"`: Fills left to right
- `"vertical"`: Fills bottom to top

### `barCornerRadius`

- **Type**: `number`
- **Default**: `0`
- **Description**: Corner radius for the filled portion.

### `barColor`

- **Type**: `string`
- **Description**: Fill color or gradient.

## Example

:::tabs
== index.js
```javascript
import { widgetWindow } from "novadesk";

var exampleBarWindow = new widgetWindow({
    id: "exampleBar",
    width: 300,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 1)",
    script: "ui/script.ui.js"
});
```
== ui/script.ui.js
```javascript
ui.addBar({
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

