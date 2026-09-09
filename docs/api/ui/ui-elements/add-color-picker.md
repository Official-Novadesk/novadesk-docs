---
title: addColorPicker
description: Add an interactive color picker element.
---

# ui.addColorPicker()

Renders a color swatch that opens a full-featured HSV/RGB color picker popup when clicked. The popup includes a saturation/value gradient, hue bar, RGB inputs, hex input, an eyedropper tool, and format toggle.

```javascript
ui.addColorPicker(options);
```

::: info
Also accepts all [General Element Options](/api/ui/ui-elements/general-options).
:::

#### Table of Contents
[[toc]]

## Quick Example

```javascript
ui.addColorPicker({
  id: "my-picker",
  x: 16, y: 16,
  width: 40, height: 40,
  color: "#FF5500",
  borderRadius: 8,
  onChange: (color) => {
    console.log("Color changed:", color);
  }
});
```

Clicking the swatch opens a popup where the user can pick a color. The selected color is reflected back on the swatch automatically.

## Options

### Color

<PropertyBox name="color" type="string" defaultValue='"#000000"'>

Initial color of the swatch. Supports hex (`#RRGGBB`), `rgb(r,g,b)`, and `rgba(r,g,b,a)` formats.

```javascript
color: "#FF5500"
color: "rgb(255, 85, 0)"
color: "rgba(255, 85, 0, 0.8)"
```

</PropertyBox>

### Swatch Styling

<PropertyBox name="borderRadius" type="number" defaultValue="0">

Corner rounding radius in pixels. Set to `0` for sharp corners.

```javascript
borderRadius: 8
```

</PropertyBox>

<PropertyBox name="borderWidth" type="number" defaultValue="0">

Border width in pixels. Set to `0` for no border.

```javascript
borderWidth: 2
```

</PropertyBox>

<PropertyBox name="borderColor" type="string" defaultValue='"#000000"'>

Border color. Supports hex, `rgb()`, and `rgba()` formats.

```javascript
borderColor: "#333333"
borderColor: "rgba(0, 0, 0, 0.3)"
```

</PropertyBox>

<PropertyBox name="opacity" type="number" defaultValue="1.0">

Swatch opacity from `0.0` (fully transparent) to `1.0` (fully opaque).

```javascript
opacity: 0.8
```

</PropertyBox>

<PropertyBox name="shape" type="string" defaultValue='"rectangle"'>

Swatch shape. Either `"rectangle"` or `"circle"`.

```javascript
shape: "circle"
```

</PropertyBox>

### Popup Appearance

<PropertyBox name="popupBackground" type="string" defaultValue='"#FFFFFF"'>

Background color of the picker popup.

```javascript
popupBackground: "#1E1E1E"
popupBackground: "rgba(30, 30, 30, 0.95)"
```

</PropertyBox>

<PropertyBox name="popupAccentColor" type="string" defaultValue='"#000000"'>

Accent color used for the hue indicator, selection border, and interactive highlights in the popup.

```javascript
popupAccentColor: "#0078D4"
```

</PropertyBox>

<PropertyBox name="popupBorderColor" type="string" defaultValue='"#000000"'>

Border color of the popup window.

```javascript
popupBorderColor: "#444444"
```

</PropertyBox>

<PropertyBox name="popupInputBackground" type="string">

Background color of the RGB/hex input fields in the popup. Also accepts alias `popupInputBgColor`.

```javascript
popupInputBackground: "#2A2A2A"
```

</PropertyBox>

<PropertyBox name="popupInputColor" type="string">

Text color of the RGB/hex input fields in the popup. Also accepts alias `popupInputTextColor`.

```javascript
popupInputColor: "#FFFFFF"
```

</PropertyBox>

### Popup Behavior

<PropertyBox name="showEyedropper" type="boolean" defaultValue="true">

Whether to show the eyedropper button in the popup. The eyedropper lets the user pick a color from anywhere on screen.

```javascript
showEyedropper: false
```

</PropertyBox>

<PropertyBox name="showFormatToggle" type="boolean" defaultValue="true">

Whether to show the format toggle button (RGB / HEX) in the popup.

```javascript
showFormatToggle: false
```

</PropertyBox>

<PropertyBox name="defaultMode" type="string" defaultValue='"rgb"'>

Default input mode when the popup opens. Either `"rgb"` or `"hex"`.

```javascript
defaultMode: "hex"
```

</PropertyBox>

### Callbacks

<PropertyBox name="onChange" type="function">

Fired whenever the user selects a new color (while dragging or typing). Receives the color as a hex string (`"#RRGGBB"`).

```javascript
onChange: (color) => {
  console.log("New color:", color);
}
```

</PropertyBox>

<PropertyBox name="onOpen" type="function">

Fired when the picker popup opens.

```javascript
onOpen: () => {
  console.log("Picker opened");
}
```

</PropertyBox>

<PropertyBox name="onClose" type="function">

Fired when the picker popup closes (user clicks outside or presses Escape).

```javascript
onClose: () => {
  console.log("Picker closed");
}
```

</PropertyBox>

<PropertyBox name="onCancel" type="function">

Fired when the user cancels the color selection (the color reverts to what it was before the popup opened).

```javascript
onCancel: () => {
  console.log("Selection cancelled");
}
```

</PropertyBox>

<PropertyBox name="onEyedropperOpen" type="function">

Fired when the eyedropper tool is activated.

```javascript
onEyedropperOpen: () => {
  console.log("Eyedropper started");
}
```

</PropertyBox>

<PropertyBox name="onEyedropperPick" type="function">

Fired when the eyedropper picks a color from the screen. Receives the picked color as a hex string.

```javascript
onEyedropperPick: (color) => {
  console.log("Picked from screen:", color);
}
```

</PropertyBox>

## Reading and Updating at Runtime

### Get current color

```javascript
const currentColor = ui.getElementProperty("my-picker", "color");
console.log(currentColor); // "#FF5500"
```

### Set color programmatically

```javascript
ui.setElementProperties("my-picker", {
  color: "#00FF00"
});
```

### Open / close the popup

```javascript
// Open the picker popup
ui.setElementProperties("my-picker", { isOpen: true });

// Close the picker popup
ui.setElementProperties("my-picker", { isOpen: false });

// Check if open
const open = ui.getElementProperty("my-picker", "isOpen");
```

### Update styling at runtime

```javascript
ui.setElementProperties("my-picker", {
  borderRadius: 12,
  shape: "circle",
  opacity: 0.9
});
```

## Practical Examples

### Basic color picker with live preview

```javascript
ui.addColorPicker({
  id: "color-picker",
  x: 16, y: 16,
  width: 40, height: 40,
  color: "#FF5500",
  borderRadius: 8,
  onChange: (color) => {
    // Update a background preview with the selected color
    ui.setElementProperties("preview", { backgroundColor: color });
  }
});

// A shape that shows the selected color
ui.addShape({
  id: "preview",
  x: 70, y: 16,
  width: 200, height: 40,
  backgroundColor: "#FF5500",
  borderRadius: 6
});
```

### Dark-themed picker

```javascript
ui.addColorPicker({
  id: "dark-picker",
  x: 16, y: 16,
  width: 36, height: 36,
  color: "#0078D4",
  shape: "circle",
  borderWidth: 2,
  borderColor: "#555555",
  popupBackground: "#1E1E1E",
  popupAccentColor: "#0078D4",
  popupBorderColor: "#444444",
  popupInputBackground: "#2A2A2A",
  popupInputColor: "#FFFFFF",
  defaultMode: "hex",
  onChange: (color) => console.log("Selected:", color)
});
```

### Eyedropper color sampling

```javascript
ui.addColorPicker({
  id: "eyedropper-demo",
  x: 16, y: 16,
  width: 48, height: 48,
  color: "#FFFFFF",
  shape: "circle",
  borderRadius: 24,
  showEyedropper: true,
  onEyedropperPick: (color) => {
    console.log("Picked from screen:", color);
    // Use the picked color for something
    ui.setElementProperties("target", { backgroundColor: color });
  }
});
```

### Multiple pickers for a palette

```javascript
const palette = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"];

palette.forEach((color, i) => {
  ui.addColorPicker({
    id: `palette-${i}`,
    x: 16 + i * 48, y: 16,
    width: 40, height: 40,
    color: color,
    borderRadius: 6,
    onChange: (newColor) => {
      console.log(`Palette ${i} changed:`, newColor);
    }
  });
});
```
