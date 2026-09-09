---
title: Global Variables
description: Built-in global variables available in Novadesk scripts.
---

# Global Variables

Novadesk injects a set of globals into every script at load time. No import is needed — they are available as plain identifiers. Some globals are available in both the Main and UI script; others are context-specific.

#### Table of Contents
[[toc]]

## Availability Summary

| Global | Main script | UI script | Notes |
|---|---|---|---|
| `__filename` | Yes | Yes | Points to the current script file in both contexts |
| `__dirname` | Yes | Yes | Points to the current script's folder — differs between contexts |
| `__widgetDir` | Yes | Yes | The shared Widgets root directory |
| `__addonsPath` | Yes | No | Not available as a local in UI scripts |
| `__mainScriptDirPath` | Yes | No | Not injected into UI scripts |

## Path Globals

<PropertyBox name="__filename" type="string">

Absolute path to the currently executing script file.

In the Main script this is the path to `index.js`. In a UI script it is the path to the `.ui.js` file.

```javascript
console.log(__filename);
// Main:  "C:/Widgets/my-widget/index.js"
// UI:    "C:/Widgets/my-widget/ui/clock.ui.js"
```

</PropertyBox>

<PropertyBox name="__dirname" type="string">

Absolute path to the directory containing the currently executing script. Equivalent to `path.dirname(__filename)`.

::: warning Different value in UI scripts
In the Main script, `__dirname` is the widget root folder. In a UI script, `__dirname` is the folder containing the UI script, which may be a subdirectory. Use `__mainScriptDirPath` from the Main script if you need the widget root from both contexts, or pass it to the UI via IPC.
:::

```javascript
// Main script (index.js in widget root)
console.log(__dirname);
// "C:/Widgets/my-widget"

// UI script at ui/clock.ui.js
console.log(__dirname);
// "C:/Widgets/my-widget/ui"
```

</PropertyBox>

<PropertyBox name="__mainScriptDirPath" type="string">

Absolute path to the directory containing the widget's Main script (`index.js`). This is always the widget root, regardless of which script is currently executing.

Only available in the **Main script**. Not injected into UI scripts.

::: tip Stable widget root reference
In the Main script, `__mainScriptDirPath` and `__dirname` are always identical. The variable exists so that additional scripts loaded with `addon.load()` can still reliably resolve paths back to the original widget root, even when `__dirname` reflects a different directory.
:::

```javascript
// Build a path to a shared asset regardless of which script is running
const iconPath = path.join(__mainScriptDirPath, "assets", "icon.png");
```

</PropertyBox>

<PropertyBox name="__widgetDir" type="string">

Absolute path to the Widgets root directory — the folder that contains all widgets. This is the `Widgets` folder next to the Novadesk executable.

Available in both the Main script and UI scripts.

```javascript
console.log(__widgetDir);
// "C:/Program Files/Novadesk/Widgets/"

// List the path to another widget's folder
const otherWidget = path.join(__widgetDir, "other-widget", "index.js");
```

</PropertyBox>

<PropertyBox name="__addonsPath" type="string">

Absolute path to the Addons directory where native addon `.dll` files are stored.

Only available in the **Main script**. In UI scripts `__addonsPath` is not accessible as a bare local variable.

The resolution order is:
1. If `<NovadeskDir>/Addons/` exists, use it.
2. Else if `<Documents>/Novadesk/Addons/` exists, use it.
3. Otherwise returns the Documents path as a fallback without creating any directories.

```javascript
console.log(__addonsPath);
// "C:/Users/me/Documents/Novadesk/Addons/"
```

</PropertyBox>

## Mouse Event Object

Widget window event handlers (e.g. `win.on("mouseMove", ...)`) and UI element mouse callbacks (e.g. `onMouseOver`, `onDrag`) receive an event object as their first argument. All coordinate values are integers.

| Property | Type | Description |
|---|---|---|
| `__clientX` | `number` | X coordinate relative to the top-left corner of the widget window. |
| `__clientY` | `number` | Y coordinate relative to the top-left corner of the widget window. |
| `__screenX` | `number` | Absolute X coordinate on the screen. |
| `__screenY` | `number` | Absolute Y coordinate on the screen. |
| `__offsetX` | `number` | X offset in pixels relative to the element or region that received the event. |
| `__offsetY` | `number` | Y offset in pixels relative to the element or region that received the event. |
| `__offsetXPercent` | `number` | X offset as a percentage of the element's width. Normally `0–100`, but may exceed this range during `mouseLeave` events. |
| `__offsetYPercent` | `number` | Y offset as a percentage of the element's height. Normally `0–100`, but may exceed this range during `mouseLeave` events. |
| `widgetId` | `string` | The `id` of the widget window that owns the element receiving the event. |

::: info Default values
All coordinate properties default to `0` when mouse data is not applicable for the event (for example, keyboard-triggered or programmatic events). `widgetId` is set whenever a widget context is available.
:::

<PropertyBox name="__clientX / __clientY" type="number">

Mouse position relative to the top-left corner of the widget window. Use these when you need position within your widget's own coordinate space.

```javascript
win.on("mouseMove", (e) => {
  console.log("client position:", e.__clientX, e.__clientY);
});
```

</PropertyBox>

<PropertyBox name="__screenX / __screenY" type="number">

Absolute mouse position on the screen in pixels. Use these when you need to position a popup, tooltip, or external window at the cursor location.

```javascript
win.on("click", (e) => {
  console.log("screen position:", e.__screenX, e.__screenY);
});
```

</PropertyBox>

<PropertyBox name="__offsetX / __offsetY" type="number">

Mouse position in pixels relative to the element or region that received the event. Use these when you need to know where within a specific element the user interacted.

```javascript
ui.addShape({
  id: "box",
  shapeType: "rectangle",
  x: 16, y: 16, width: 260, height: 90,
  fillColor: "rgba(35,35,35,220)",
  onMouseOver: (e) => {
    console.log("offset within box:", e.__offsetX, e.__offsetY);
  }
});
```

</PropertyBox>

<PropertyBox name="__offsetXPercent / __offsetYPercent" type="number">

Mouse position as a percentage of the element's dimensions. `0` is the left/top edge, `100` is the right/bottom edge. Values outside `0–100` are possible when the cursor exits the element boundary during a `mouseLeave` event.

Useful for implementing sliders or proportional hit detection without manual division.

```javascript
ui.addImage({
  id: "slider",
  path: "./track.png",
  x: 10, y: 10, width: 200, height: 20,
  onDrag: (e) => {
    const pct = Math.max(0, Math.min(100, e.__offsetXPercent));
    ipcRenderer.send("slider-change", { value: pct });
  }
});
```

</PropertyBox>

## Practical Examples

**Building asset paths reliably**

```javascript
// Main script — use __dirname or __mainScriptDirPath
const configPath = path.join(__dirname, "config", "config.json");
const iconPath   = path.join(__dirname, "assets", "icon.png");
```

**Sending path context to a UI script**

Because `__mainScriptDirPath` is not available in UI scripts, pass it over IPC if the UI script needs to resolve paths relative to the widget root:

```javascript
// index.js
ipcMain.send("init", { widgetRoot: __mainScriptDirPath });
```

```javascript
// ui.js
ipcRenderer.on("init", (event, payload) => {
  const iconPath = path.join(payload.widgetRoot, "assets", "icon.png");
  ui.setElementProperties("logo", { path: iconPath });
});
```

**Using screen coordinates to follow the cursor**

```javascript
import { widgetWindow } from "novadesk";

const win = new widgetWindow({ id: "demo", width: 300, height: 200 });

win.on("mouseMove", (e) => {
  console.log(
    "client:", e.__clientX, e.__clientY,
    "screen:", e.__screenX, e.__screenY
  );
});
```

**Percentage-based interaction**

```javascript
// UI script — track normalized drag position on a progress bar
ui.addShape({
  id: "progress",
  shapeType: "rectangle",
  x: 10, y: 50, width: 280, height: 16,
  fillColor: "rgba(60,120,200,200)",
  onDrag: (e) => {
    const value = Math.max(0, Math.min(100, e.__offsetXPercent));
    ipcRenderer.send("value-changed", { value });
  }
});
```

## Related Pages

- [Script Types](/guides/script-types) — which globals are available in each script context
- [IPC](/api/ipc) — message passing between Main and UI scripts
- [UI Object](/api/ui/ui-object) — creating and managing widget elements
