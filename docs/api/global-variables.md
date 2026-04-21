---
title: Global variables available in Novadesk scripts.
---

# Global Variables

Novadesk injects several globals into scripts. Some are available in both Main and UI scripts, while others are context-specific.

#### Table of Contents
[[toc]]

## `__dirname`

- **Type**: `string`
- **Available in**: Main script, UI script

Absolute directory path of the current script file.

### Example

```javascript
console.log(__dirname);
```

## `__filename`

- **Type**: `string`
- **Available in**: Main script, UI script

Absolute path to the current script file.

### Example

```javascript
console.log(__filename);
```

## `__widgetDir`

- **Type**: `string`
- **Available in**: Main script, UI script

Absolute path to the Widgets root directory.

### Example

```javascript
console.log(__widgetDir);
```

## `__addonsPath`

- **Type**: `string`
- **Available in**: Main script, UI script

Absolute path to the Addons directory.

### Example

```javascript
console.log(__addonsPath);
```

## `__mainScriptDirPath`

- **Type**: `string`
- **Available in**: Main script, UI script

Absolute directory path of the entry/main script file.

This is useful in UI scripts when you need to resolve assets relative to the main script location.

### Example

```javascript
console.log(__mainScriptDirPath);
```

## Mouse Event Object

Widget callbacks and element mouse handlers receive an event object with:

## `__clientX`, `__clientY`

- **Type**: `number`

Mouse coordinates in widget client space.

## `__screenX`, `__screenY`

- **Type**: `number`

Mouse coordinates in screen space.

## `__offsetX`, `__offsetY`

- **Type**: `number`

Offset relative to the target region.

## `__offsetXPercent`, `__offsetYPercent`

- **Type**: `number`
- **Range**: Usually `0` to `100`; may be outside this range during `mouseLeave`.

Percentage offsets within the target region.

### Example

:::tabs
== index.js
```javascript
import { widgetWindow } from "novadesk";

const win = new widgetWindow({
  id: "demo",
  width: 300,
  height: 200,
  script: "ui.js",
  backgroundColor: "rgb(10,10,10)"
});

win.on("mouseMove", (e) => {
  console.log("client:", e.__clientX, e.__clientY);
  console.log("screen:", e.__screenX, e.__screenY);
  console.log("offset:", e.__offsetX, e.__offsetY);
});
```
== ui.js
```javascript
ui.addShape({
  id: "box",
  shapeType: "rectangle",
  x: 16,
  y: 16,
  width: 260,
  height: 90,
  fillColor: "rgba(35,35,35,220)",
  onMouseOver: (e) => {
    console.log("hover:", e.__clientX, e.__clientY);
  },
  onMouseLeave: () => {
    console.log("left");
  }
});
```
:::

::: info
Mouse event fields are exposed as underscored properties (for example `__clientX`, `__offsetYPercent`).
:::
