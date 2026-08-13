---
title: addButton
---

# ui.addButton()

Renders an image-based button with automatic normal, clicked, and hovered states driven by a 3-frame sprite sheet. Click handling is built in via `buttonAction` or the standard `onLeftMouseUp` callback.

```javascript
ui.addButton(options);
```

::: info
Also accepts all [General Element Options](/api/ui/ui-elements/general-options/general-elements-options) and [General Image Options](/api/ui/ui-elements/general-options/general-image-options) (`imageAlpha`, `grayscale`, `imageTint`, `imageFlip`, `imageCrop`, `colorMatrix`, `fallbackPath`).
:::

#### Table of Contents
[[toc]]

## Quick Example

```javascript
ui.addButton({
  id: "close-btn",
  x: 360, y: 8,
  width: 24, height: 24,
  buttonImageName: "./assets/close.png",
  buttonAction: () => {
    ipcRenderer.send("window-close");
  }
});
```

## Sprite Sheet Format

A button image must contain exactly **3 frames** representing the three button states:

| Frame index | State | When displayed |
|---|---|---|
| `0` | Normal | Default idle state |
| `1` | Clicked | Mouse button held down |
| `2` | Hovered | Cursor over the button |

The three frames can be arranged in one of two layouts, detected automatically by the engine:

- **Horizontal** — frames side by side (total width ≥ height × 3). Each frame is `imageWidth / 3` wide.
- **Vertical** — frames stacked top to bottom (total width < height × 3). Each frame is `imageHeight / 3` tall.

A 72×24 image is treated as 3 horizontal frames of 24×24 each. A 24×72 image is treated as 3 vertical frames of 24×24 each.

::: tip Sizing without explicit width/height
When `width` and `height` are omitted, the element sizes itself to one frame from the sprite sheet automatically. You can still set them explicitly to scale the button.
:::

## Options

<PropertyBox name="buttonImageName" type="string">

Path to the 3-frame sprite sheet. Relative paths are resolved against the widget's script directory. HTTP/HTTPS URLs are supported and loaded asynchronously.

```javascript
buttonImageName: "./assets/close-btn.png"
buttonImageName: "./assets/play.png"
buttonImageName: "https://example.com/assets/btn.png"
```

The image can be swapped at runtime via `setElementProperties`:

```javascript
ui.setElementProperties("my-btn", {
  buttonImageName: "./assets/close-alt.png"
});
```

</PropertyBox>

<PropertyBox name="buttonAction" type="function">

Callback fired when the button is left-clicked (on mouse-up). This is a convenience alias — `buttonAction` and `onLeftMouseUp` write to the same internal callback slot.

::: warning Only one fires if both are set
`buttonAction` is parsed after `onLeftMouseUp` in the options object. If you provide both, `buttonAction` takes precedence. Use one or the other.
:::

```javascript
ui.addButton({
  id: "close-btn",
  buttonImageName: "./assets/close.png",
  x: 360, y: 8,
  buttonAction: () => {
    ipcRenderer.send("window-close");
  }
});
```

All other mouse events (`onRightMouseUp`, `onMouseOver`, `onMouseLeave`, etc.) are also available from the [General Element Options](/api/ui/ui-elements/general-options/general-elements-options).

</PropertyBox>

## Hit Testing

By default the button uses bounding-box hit testing. When `pixelHitTest: true` is set, the engine performs **per-pixel alpha testing** against the current frame — clicks on fully transparent pixels are ignored. This allows non-rectangular buttons with irregular shapes to work correctly.

```javascript
ui.addButton({
  id: "round-btn",
  buttonImageName: "./assets/circle-btn.png",
  x: 16, y: 16,
  pixelHitTest: true   // transparent corners are not clickable
});
```

## Practical Examples

**Toolbar button row**

```javascript
ui.beginUpdate();

const btnY = 8;
const btnSize = 24;

ui.addButton({ id: "btn-min",   x: 316, y: btnY, width: btnSize, height: btnSize, buttonImageName: "./assets/minimize.png",  buttonAction: () => ipcRenderer.send("minimize") });
ui.addButton({ id: "btn-max",   x: 340, y: btnY, width: btnSize, height: btnSize, buttonImageName: "./assets/maximize.png",  buttonAction: () => ipcRenderer.send("maximize") });
ui.addButton({ id: "btn-close", x: 364, y: btnY, width: btnSize, height: btnSize, buttonImageName: "./assets/close.png",     buttonAction: () => ipcRenderer.send("close") });

ui.endUpdate();
```

**Toggle button using state**

```javascript
let muted = false;

ui.addButton({
  id: "mute-btn",
  x: 16, y: 16,
  width: 32, height: 32,
  buttonImageName: "./assets/volume-on.png",
  buttonAction: () => {
    muted = !muted;
    ui.setElementProperties("mute-btn", {
      buttonImageName: muted ? "./assets/volume-off.png" : "./assets/volume-on.png"
    });
    ipcRenderer.send("set-mute", { muted });
  }
});
```

**Tinted button using imageTint**

```javascript
ui.addButton({
  id: "ok-btn",
  x: 16, y: 100,
  width: 80, height: 30,
  buttonImageName: "./assets/btn-base.png",
  imageTint: "rgba(0,180,100,0.6)",
  buttonAction: () => ipcRenderer.send("confirm")
});
```

**Grayscale disabled state**

```javascript
function setButtonEnabled(id, enabled) {
  ui.setElementProperties(id, {
    grayscale: !enabled,
    imageAlpha: enabled ? 255 : 140
  });
}

ui.addButton({
  id: "submit-btn",
  x: 16, y: 100,
  width: 80, height: 30,
  buttonImageName: "./assets/submit.png",
  buttonAction: () => ipcRenderer.send("submit")
});

// Disable it
setButtonEnabled("submit-btn", false);
```
