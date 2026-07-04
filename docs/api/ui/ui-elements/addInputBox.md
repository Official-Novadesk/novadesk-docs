---
title: ui.addInputBox(options)
---

# `ui.addInputBox(options)`

Creates a Direct2D-rendered text input element inside a UI script.

`InputBox` is a normal UI element, so it renders in element insertion order and can sit between other elements visually. It supports typing, caret movement, mouse selection, clipboard editing, undo/redo, placeholder text, validation, and focus/change callbacks.

```js
ui.addInputBox(options);
```

#### Table of Contents
[[toc]]

## Shared Options

- [General Element Options](/api/ui/ui-elements/general-options/general-elements-options) for layout, visibility, padding, grouping, and interaction.
- [General Tooltip Options](/api/ui/ui-elements/general-options/tooltip) for tooltip appearance and behavior.
- [General Mouse Options](/api/ui/ui-elements/general-options/general-mouse-options) for mouse callbacks.

## Parameters

### `options`

- **Type**: `Object`
- **Required**: `id`

## InputBox Options

### `text`

- **Type**: `string`
- **Default**: `""`
- **Description**: Initial input value.

### `placeholder`

- **Type**: `string`
- **Default**: `""`
- **Description**: Text shown when the input value is empty.

### `fontFace`

- **Type**: `string`
- **Default**: `"Segoe UI"`
- **Description**: Font face used for entered text and placeholder text.

### `fontSize`

- **Type**: `number`
- **Default**: `14`
- **Description**: Font size in pixels.

### `fontColor`

- **Type**: `string`
- **Default**: `"rgb(240,240,240)"`
- **Description**: Text color or gradient. `textColor` is also accepted as an alias.

### `fontWeight`

- **Type**: `number`
- **Default**: `400`
- **Description**: Numeric font weight.

### `italic`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Draws text in italic style.

### `fontPath`

- **Type**: `string`
- **Default**: `""`
- **Description**: Path to a custom `.ttf` or `.otf` font file.

### `align`

- **Type**: `string`
- **Default**: `"left"`
- **Description**: Horizontal text alignment.

#### Valid values

- `"left"`
- `"center"`
- `"right"`

### `placeholderColor`

- **Type**: `string`
- **Default**: `"rgb(150,150,150)"`
- **Description**: Placeholder color or gradient.

### `caretColor`

- **Type**: `string`
- **Default**: `"#ffffff"`
- **Description**: Caret color or gradient.

### `selectionColor`

- **Type**: `string`
- **Default**: `"rgba(135,206,235,0.5)"`
- **Description**: Highlight color or gradient for selected text.

### `fillColor`

- **Type**: `string`
- **Default**: `"rgb(30,30,34)"`
- **Description**: Input background fill color or gradient. Use `"none"` or `"transparent"` to clear the fill.

### `borderWidth`

- **Type**: `number`
- **Default**: `1`
- **Description**: Border thickness in pixels.

### `borderColor`

- **Type**: `string`
- **Default**: `"#000000"`
- **Description**: Border color or gradient.

### `borderFocusColor`

- **Type**: `string`
- **Default**: none
- **Description**: Optional border color or gradient used while the input is focused. Use `"none"` or `"transparent"` to clear it.

### `borderRadius`

- **Type**: `number`
- **Default**: `8`
- **Description**: Corner radius in pixels.

### `password`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Masks the displayed input value.

### `maxLength`

- **Type**: `number`
- **Default**: `0`
- **Description**: Maximum number of characters. `0` means unlimited.

### `multiline`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Enables multiline input behavior.

### `inputType`

- **Type**: `string`
- **Default**: `"any"`
- **Description**: Restricts which characters can be typed.

#### Valid values

- `"any"`: No restriction.
- `"integer"` or `"int"`: Digits with an optional leading minus sign.
- `"float"`, `"number"`, or `"decimal"`: Numeric value with optional decimal point.
- `"letters"` or `"alpha"`: Alphabetic characters.
- `"alphanumeric"` or `"alnum"`: Letters and digits.
- `"hex"` or `"hexadecimal"`: Hexadecimal characters.
- `"email"`: Email-friendly characters.
- `"custom"`: Only characters listed in `allowedChars`.

### `allowedChars`

- **Type**: `string`
- **Default**: `""`
- **Description**: Allowed character set when `inputType` is `"custom"`.

## Events

### `onTextChange`

- **Type**: `function`
- **Description**: Called when the input value changes. `e.data` contains the current text.

### `onChange`

- **Type**: `function`
- **Description**: Alias for `onTextChange`.

### `onEnter`

- **Type**: `function`
- **Description**: Called when the user presses Enter. `e.data` contains the current text.

### `onFocus`

- **Type**: `function`
- **Description**: Called when the input receives focus.

### `onBlur`

- **Type**: `function`
- **Description**: Called when the input loses focus.

### `onInvalidInput`

- **Type**: `function`
- **Description**: Called when typed input is rejected by `inputType`. `e.data` contains the rejected character.

## Editing Behavior

- Click to focus and position the caret.
- Drag to select text.
- Use `Shift` with arrow keys or mouse selection to extend a selection.
- `Ctrl+A`, `Ctrl+C`, `Ctrl+X`, `Ctrl+V`, `Ctrl+Z`, and `Ctrl+Y` are supported while focused.
- Right-click opens the input context menu for editing actions.
- `Escape` clears the current selection or blurs the input.

## Example

:::tabs
== index.js (Main Script)
```javascript
import { widgetWindow } from "novadesk";

var inputWidget = new widgetWindow({
    id: "inputWidget",
    width: 360,
    height: 180,
    backgroundColor: "rgba(24, 24, 28, 0.94)",
    draggable: true,
    script: "script.ui.js"
});
```
== script.ui.js (UI Script)
```javascript
ui.addInputBox({
    id: "searchInput",
    x: 24,
    y: 28,
    width: 300,
    height: 44,
    placeholder: "Type to search...",
    fontFace: "Segoe UI",
    fontSize: 14,
    fontColor: "#ffffff",
    placeholderColor: "rgba(180, 180, 190, 0.8)",
    fillColor: "rgba(45, 45, 52, 1)",
    caretColor: "#ffffff",
    selectionColor: "rgba(81, 188, 254, 0.4)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    borderFocusColor: "rgba(81, 188, 254, 1)",
    borderRadius: 8,
    padding: 10,
    align: "left",
    inputType: "any",
    onTextChange: function (e) {
        ui.setElementProperties("resultText", {
            text: "Current value: " + e.data
        });
    },
    onEnter: function (e) {
        ui.setElementProperties("resultText", {
            text: "Submitted: " + e.data
        });
    }
});

ui.addText({
    id: "resultText",
    x: 24,
    y: 92,
    width: 300,
    height: 28,
    text: "Current value: ",
    fontSize: 13,
    fontColor: "#cfd3da"
});
```
:::
