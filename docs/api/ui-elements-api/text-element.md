
# Text Element

Text UI element in Novadesk with all options and methods.

## Adding a Text Element

Use the `addText()` method on the `win` object inside a **UI Script**:

```js
win.addText(options);
```

## General Element Options

See general element options [here](/api/ui-elements-api/general-elements-options).

---

## Text Element Options

### `text`

- **Type**: `string`
- **Default**: `""`
- **Description**: Text content to display.

---

### `fontSize`

- **Type**: `number`
- **Default**: `12`
- **Description**: Font size in pixels.

---

### `fontFace`

- **Type**: `string`
- **Default**: `"Arial"`
- **Description**: Font face name.

---

### `fontColor`

- **Type**: `string`
- **Default**: `"rgb(0,0,0)"`
- **Description**: [Color](/guides/colors) or [gradients](/guides/colors#gradients) of the text.

---

### `fontWeight`

- **Type**: `string | number`
- **Default**: `"normal"` (400)
- **Description**: Font weight of the text. Supports numerical weights (100-900) or descriptive strings.

**Valid string values:**

- `"thin"` (100)
- `"extralight"`, `"ultralight"` (200)
- `"light"` (300)
- `"normal"`, `"regular"` (400)
- `"medium"` (500)
- `"semibold"`, `"demibold"` (600)
- `"bold"` (700)
- `"extrabold"`, `"ultrabold"` (800)
- `"black"`, `"heavy"` (900)

**Numerical values:** Any value between `100` and `900`.

---

### `fontPath`

- **Type**: `string`
- **Default**: `""`
- **Description**: Path to a custom font file (`.ttf`, `.otf`). If provided, Novadesk will load and use this font instead of searching system fonts.

---

### `fontStyle`

- **Type**: `string`
- **Default**: `"normal"`
- **Description**: Font style of the text.

**Valid values:**

- `"normal"`
- `"italic"`

---

### `underLine`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Draws a line under the text.

---

### `strikeThrough`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Draws a line through the text.

---

### `case`

- **Type**: `string`
- **Default**: `"normal"`
- **Description**: Forces the text to a specific case.

**Valid values:**

- `"normal"`: Maintains original casing.
- `"upper"`: converts ALL TEXT TO UPPERCASE.
- `"lower"`: converts all text to lowercase.
- `"capitalize"`: Capitalizes The First Letter Of Each Word.
- `"sentence"`: Capitalizes the first letter of the first word.

---

### `letterSpacing`

- **Type**: `number`
- **Default**: `0`
- **Description**: Sets the spacing between characters in pixels. Can be positive (wider) or negative (tighter).

---

### `fontShadow`

- **Type**: `object | object[]`
- **Default**: `[]`
- **Description**: Adds one or more shadows behind the text. Each shadow supports:

- **`x`**: Horizontal offset in pixels (default `0`).
- **`y`**: Vertical offset in pixels (default `0`).
- **`blur`**: Blur radius in pixels (default `0`).
- **`color`**: Shadow color as a [color](/guides/colors) string (default `"rgba(0,0,0,1)"`).

Examples:

```javascript
// Single shadow
fontShadow: { x: 4, y: 4, blur: 8, color: "rgba(0,0,0,0.6)" }

// Multiple layered shadows
fontShadow: [
  { blur: 4, color: "#00ffff" },
  { blur: 10, color: "#00ffff" }
]
```

---

### `textAlign`

- **Type**: `string`
- **Default**: `"lefttop"`
- **Description**: Controls horizontal and vertical text alignment.

See **Alignment Options** below.

---

### `clipString`

- **Type**: `string`
- **Default**: `"none"`
- **Description**: Controls text clipping behavior when the content exceeds the available space.

- **Valid values**:
  - `"none"`: No clipping. Text will automatically wrap if a `width` is provided.
  - `"clip"`: Clips the text at the element's boundaries (Single line).
  - `"ellipsis"`: Clips the text and appends an ellipsis (`...`) (Single line).
  - `"wrap"`: Explicitly enables multiline word wrapping.

---

## Alignment Options

### Left aligned

- `"lefttop"` or `"left"`: Left aligned, top vertical
- `"leftcenter"`: Left aligned, center vertical
- `"leftbottom"`: Left aligned, bottom vertical

---

### Center aligned

- `"centertop"` or `"center"`: Center aligned, top vertical
- `"centercenter"`: Center aligned, center vertical
- `"centerbottom"`: Center aligned, bottom vertical

---

### Right aligned

- `"righttop"` or `"right"`: Right aligned, top vertical
- `"rightcenter"`: Right aligned, center vertical
- `"rightbottom"`: Right aligned, bottom vertical

---

## Inline Styling

Novadesk supports rich text formatting using HTML-like tags within the `text` property. These tags allow you to style specific segments of text differently.

### Supported Tags

- **`<b>`**: **Bold** text.
- **`<i>`**: *Italic* text.
- **`<u>`**: <ins>Underlined</ins> text.
- **`<s>`**: ~~Strikethrough~~ text.
- **`<color=value>`**: Changes text color or [gradient](/guides/colors#gradients).
  - Example: `<color=#f00>Red Text</color>`
  - Example: `<color=linearGradient(0,#f00,#0f0)>Gradient Text</color>`
- **`<size=value>`**: Changes font size in pixels.
  - Example: `<size=24>Large Text</size>`
- **`<font=name>`**: Changes font face.
  - Example: `<font=Consolas>Monospaced Text</font>`
- **`<case=value>`**: Changes text case.
  - Valid values: `upper`, `lower`, `capitalize`, `sentence`, `normal`.
  - Example: `<case=upper>this will be uppercase</case>`

### Usage Example

```javascript
win.addText({
    text: "This is <b>Bold</b> and <color=#00ff00>Green</color> text.",
    fontSize: 18
});
```

---

## Example

:::tabs
== index.js (Main Script)
```javascript
// create widget window
var sysWidget = new widgetWindow({
    id: "sysWidget",
    width: 450,
    height: 180,
    backgroundColor: "rgba(30, 30, 40, 0.9)",
    zPos: "ontop",
    draggable: true,
    script: "ui.js"
});
```
== ui.js (UI Script)
```javascript
// simple text
win.addText({
    id: "simpleText",
    text: "SimpleText",
    x: 10, 
    y: 20,
    fontSize: 20,
    fontColor: "rgb(255, 255, 255)",
    fontFace: "consolas",
    fontWeight: "bold"
});

// solid color text
win.addText({
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

// round solid color text   
win.addText({
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

// rotate text
win.addText({
    id: "RotateText",
    text: "Rotate 45",
    x: 10, 
    y: 100,
    fontSize: 20,
    fontColor: "rgb(255, 255, 255)",
    rotate: 45,
    fontStyle: "italic"
});
```
:::

## Preview

![Widget Preview](https://github.com/Official-Novadesk/novadesk-assets/blob/master/docs/textPreview.png?raw=true)




