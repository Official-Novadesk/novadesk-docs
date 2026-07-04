---
title: Text UI element options, styling, and examples.
---

# Text Element
The Text element renders styled text via the UI script `win` object using the shared element options detailed in [General Elements Options](/api/ui/ui-elements/general-options/general-elements-options) and [General Tooltip Options](/api/ui/ui-elements/general-options/tooltip).

Use `ui.addText()` inside the UI script to create and configure a text element.

```js
ui.addText(options);
```

#### Table of Contents
[[toc]]

## Shared Options
- [General Element Options](/api/ui/ui-elements/general-options/general-elements-options) for layout, visibility, and interaction.
- [General Tooltip Options](/api/ui/ui-elements/general-options/tooltip) for tooltip appearance and behavior.
- [General Mouse Options](/api/ui/ui-elements/general-options/general-mouse-options) for mouse interaction and cursor settings.

## Text Element Options

### `text`

- **Type**: `string`
- **Default**: `""`
- **Description**: Content displayed by the element.

### `fontSize`

- **Type**: `number`
- **Default**: `12`
- **Description**: Font size in pixels.

### `fontFace`

- **Type**: `string`
- **Default**: `"Arial"`
- **Description**: Font face name.

### `fontColor`

- **Type**: `string`
- **Default**: `"rgb(0,0,0)"`
- **Description**: Color or gradient for the text.

### `fontWeight`

- **Type**: `string | number`
- **Default**: `"normal"` (400)
- **Description**: Font weight; numeric values `100-900` are supported.

#### Valid string values

- `"thin"` (100)
- `"extralight"`, `"ultralight"` (200)
- `"light"` (300)
- `"normal"`, `"regular"` (400)
- `"medium"` (500)
- `"semibold"`, `"demibold"` (600)
- `"bold"` (700)
- `"extrabold"`, `"ultrabold"` (800)
- `"black"`, `"heavy"` (900)

### `fontPath`

- **Type**: `string`
- **Default**: `""`
- **Description**: Path to a custom `.ttf` or `.otf` font file.

### `fontStyle`

- **Type**: `string`
- **Default**: `"normal"`
- **Description**: Font style.

#### Valid values

- `"normal"`
- `"italic"`

### `underLine`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Draws an underline.

### `strikeThrough`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Draws a strikethrough line.

### `case`

- **Type**: `string`
- **Default**: `"normal"`
- **Description**: Forces uppercase, lowercase, capitalization, or sentence case.

#### Valid values

- `"normal"`: Original casing
- `"upper"`: `THIS IS UPPERCASE`
- `"lower"`: `this is lowercase`
- `"capitalize"`: `Capitalizes Each Word`
- `"sentence"`: `Capitalizes the first letter only`

### `letterSpacing`

- **Type**: `number`
- **Default**: `0`
- **Description**: Spacing between characters in pixels.

### `fontShadow`

- **Type**: `object | object[]`
- **Default**: `[]`
- **Description**: Applies one or more shadows behind the text.

- **Shadow properties**
  - `x`: horizontal offset (default `0`)
  - `y`: vertical offset (default `0`)
  - `blur`: blur radius (default `0`)
  - `color`: color string (default `"rgba(0,0,0,1)"`)

#### Examples

```javascript
fontShadow: { x: 4, y: 4, blur: 8, color: "rgba(0,0,0,0.6)" }
```

```javascript
fontShadow: [
  { blur: 4, color: "#00ffff" },
  { blur: 10, color: "#00ffff" }
]
```

### `textAlign`

- **Type**: `string`
- **Default**: `"lefttop"`
- **Description**: Horizontal and vertical alignment.

### `textClip`

- **Type**: `string`
- **Default**: `"none"`
- **Description**: Controls clipping when content exceeds width.

#### Valid values

- `"none"`
- `"clip"`
- `"ellipsis"`
- `"wrap"`

### `textSelection`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Allows users to select and copy text from this element with the mouse. When enabled, selectable text uses the I-beam cursor, supports drag selection, double-click word selection, and copies the current selection with `Ctrl+C`.

### `selectionBackgroundColor`

- **Type**: `string`
- **Default**: `"#3390FF"` with partial opacity
- **Description**: Selection highlight color. Supports the same color formats as other text colors.

### `selectionTextColor`

- **Type**: `string`
- **Default**: unchanged text color
- **Description**: Optional color used for selected text.

## Runtime Notes

- Text hit testing uses the rendered glyph ink region instead of the full text layout box.
- This prevents false hover/click detection in empty areas above or below glyphs.
- Text selection is opt-in with `textSelection: true`; non-selectable text keeps normal hit testing and mouse behavior.
- Dragging selected text does not start widget dragging.

## Alignment Options

Both standard (non-hyphenated) and hyphenated CSS-like formats are supported.

### Left aligned

- `"lefttop"`, `"left"`, or `"left-top"`
- `"leftcenter"` or `"left-center"`
- `"leftbottom"` or `"left-bottom"`

### Center aligned

- `"centertop"`, `"center"`, or `"center-top"`
- `"centercenter"`, `"middlecenter"`, `"middle"`, `"center-center"`, or `"middle-center"`
- `"centerbottom"` or `"center-bottom"`

### Right aligned

- `"righttop"`, `"right"`, or `"right-top"`
- `"rightcenter"` or `"right-center"`
- `"rightbottom"` or `"right-bottom"`

## Inline Styling

Text supports HTML-like tags inside the `text` property.

### Supported tags

- `<b>`: bold
- `<i>`: italic
- `<u>`: underlined
- `<s>`: strikethrough
- `<color=value>`: color or gradient (e.g., `<color=#f00>Red</color>`)
- `<size=value>`: font size in pixels
- `<font=name>`: font face
- `<case=value>`: casing (`upper`, `lower`, `capitalize`, `sentence`, `normal`)

### Usage example

```javascript
ui.addText({
    text: "This is <b>Bold</b> and <color=#00ff00>Green</color> text.",
    fontSize: 18
});
```

## Example

:::tabs
== index.js (Main Script)
```javascript
import { widgetWindow } from "novadesk";

var sysWidget = new widgetWindow({
    id: "sysWidget",
    width: 450,
    height: 180,
    backgroundColor: "rgba(30, 30, 40, 0.9)",
    zPos: "ontop",
    draggable: true,
    script: "script.ui.js"
});
```
== script.ui.js (UI Script)
```javascript
ui.addText({
    id: "simpleText",
    text: "SimpleText",
    x: 10,
    y: 20,
    fontSize: 20,
    fontColor: "rgb(255, 255, 255)",
    fontFace: "consolas",
    fontWeight: "bold"
});
ui.addText({
    id: "SolidColorText",
    text: "Solid Color",
    x: 135,
    y: 15,
    width: 140,
    height: 30,
    fontSize: 20,
    fontColor: "rgb(255, 255, 255)",
    solidColor: "rgb(27, 213, 67)",
    textAlign: "centercenter"
});
ui.addText({
    id: "RoundSolidColor",
    text: "Round",
    x: 300,
    y: 15,
    width: 120,
    height: 30,
    fontSize: 20,
    fontColor: "rgb(255, 255, 255)",
    solidColor: "rgb(27, 117, 213)",
    solidColorRadius: 8,
    textAlign: "centercenter"
});
ui.addText({
    id: "RotateText",
    text: "Rotate 45",
    x: 10,
    y: 100,
    fontSize: 20,
    fontColor: "rgb(255, 255, 255)",
    rotate: 45,
    fontStyle: "italic"
});
ui.addText({
    id: "SelectableText",
    text: "Drag over this text, then press Ctrl+C.",
    x: 10,
    y: 140,
    width: 360,
    height: 30,
    fontSize: 14,
    fontColor: "#ffffff",
    textSelection: true,
    selectionBackgroundColor: "rgba(51, 144, 255, 0.45)",
    selectionTextColor: "#ffffff"
});
```
:::

## Preview

![Widget Preview](https://github.com/Official-Novadesk/novadesk-assets/blob/master/docs/textPreview.png?raw=true)

