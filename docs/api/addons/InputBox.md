---
title: Show styled text input overlays with the InputBox addon.
---

# InputBox Addon

The InputBox addon shows a lightweight input overlay window and returns user interaction through callbacks.

#### Table of Contents
[[toc]]

## Quick Start

```javascript
import { addon, widgetWindow } from "novadesk";

const inputBox = addon.load("D:/Novadesk-Project/InputBox/dist/x64/Debug/InputBox.dll");

const id = inputBox.show({
  widgetHwnd: widgetWindow.getHandle(),
  x: 16,
  y: 16,
  width: 320,
  defaultValue: "Type here...",
  onEnter: () => {
    console.log("Submitted:", inputBox.lastText());
  }
});

console.log("InputBox id:", id);
```

## Exported Functions

- `show(optionsOrDefaultValue)`  
  Opens an input box and returns numeric id.
- `open(optionsOrDefaultValue)`  
  Alias of `show(...)`.
- `close(id)`  
  Closes a specific input box id. Returns `true` when closed, otherwise `false`.
- `closeAll()`  
  Closes all open InputBox windows. Returns `true`.
- `lastText()`  
  Returns the latest event text as string.
- `lastReason()`  
  Returns latest event reason code as number.
- `lastId()`  
  Returns the input box id that produced the latest event.

## `show(optionsOrDefaultValue)`

### Parameter Forms

- `string`: sets initial text (`defaultValue`).
- `object`: full options object.

If the argument is neither string nor object, the addon throws:
`InputBox.show(options) expects object|string`.

### Return Value

- **Type**: `number`
- **Description**: InputBox instance id. Returns `0` if create fails.

## Options

### Position and Size

- `x` (`number`, default `100`)
- `y` (`number`, default `100`)
- `width` or `w` (`number`, default `300`, clamped `120..1200`)
- `height` or `h` (`number`, default `40`, clamped `28..800`)
- `widgetHwnd` or `hwnd` (`number`, optional)  
  If provided, `x/y` are treated as offsets from that window.

### Behavior

- `topMost` (`boolean`, default `true`)
- `unfocusDismiss` (`boolean`, default `true`)  
  Close on losing focus.
- `multiline` (`boolean`, default `false`)
- `password` (`boolean`, default `false`)  
  If `password` and `multiline` are both true, multiline is disabled.
- `allowScroll` (`boolean`, default `false`)  
  Enables vertical scroll when multiline.
- `maxLength` (`number`, default `0`, clamped `0..32766`)

### Input Validation

- `inputType` (`string`, default `"Any"`)  
  Supported values:
  - `Any`
  - `Integer` / `Int`
  - `Float` / `Number`
  - `Letters`
  - `Alphanumeric`
  - `Hex` / `Hexadecimal`
  - `Email`
  - `Custom`
- `allowedChars` (`string`, used when `inputType: "Custom"`)
- `minValue` (`number`, optional; enables numeric range checks)
- `maxValue` (`number`, optional; enables numeric range checks)

### Text and Styling

- `defaultValue` (`string`, optional)
- `fontFace` (`string`, default `"Segoe UI"`)
- `fontSize` (`number`, default `14`, clamped `8..72`)
- `bold` (`boolean`, default `false`)
- `italic` (`boolean`, default `false`)
- `align` (`string`, default `"LEFT"`)  
  Supported: `LEFT`, `CENTER`, `RIGHT`
- `borderVisible` (`boolean`, default `true`)
- `borderThickness` (`number`, default `1`, clamped `0..12`)
- `fontColor` or `textColor` (`string`)  
- `backgroundColor` or `bgColor` (`string`)
- `borderColor` (`string`)

Color strings are parsed via Novadesk color parser (`rgb(...)`, `rgba(...)`, hex formats, etc.).

## Callbacks

All callbacks are optional and receive no function arguments. Use `lastText()`, `lastReason()`, and `lastId()` to inspect latest event data.

- `onEnter`  
  Fired when Enter submits valid input.
- `onEsc`  
  Fired when Esc is pressed.
- `onDismiss`  
  Fired when box is dismissed (blur/close path).
- `onInvalid`  
  Fired when invalid character or invalid final value is submitted.
- `onChange`  
  Fired on edit updates.

## Event Reason Codes

- `0`: None
- `1`: Enter
- `2`: Esc
- `3`: Dismiss
- `4`: Invalid
- `5`: Change

## Keyboard Behavior

- `Esc` closes with reason `Esc`.
- `Enter` submits with reason `Enter`.
- In multiline mode, `Enter` submits only when `Ctrl+Enter` is pressed.

## Examples

### Integer Input with Range

```javascript
import { addon } from "novadesk";
const inputBox = addon.load("D:/Novadesk-Project/InputBox/dist/x64/Debug/InputBox.dll");

inputBox.show({
  defaultValue: "50",
  inputType: "Integer",
  minValue: 0,
  maxValue: 100,
  onEnter: () => console.log("Value:", inputBox.lastText()),
  onInvalid: () => console.log("Invalid:", inputBox.lastText())
});
```

### Custom Character Set

```javascript
import { addon } from "novadesk";
const inputBox = addon.load("D:/Novadesk-Project/InputBox/dist/x64/Debug/InputBox.dll");

inputBox.show({
  defaultValue: "FFAA00",
  inputType: "Custom",
  allowedChars: "0123456789ABCDEFabcdef"
});
```
