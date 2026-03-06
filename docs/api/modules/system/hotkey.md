---
title: Register global keyboard hotkeys with the hotkey module.
---

# hotkey Module
Register and remove keyboard hotkeys in Novadesk.

The `hotkey` module is exported from the `system` module.

```javascript
import { hotkey } from "system";
```

#### Table of Contents
[[toc]]

## `hotkey.register(hotkeyString, handler)`

Registers a hotkey and returns its registration ID.

### Parameters

- **`hotkeyString`**
  - **Type**: `string`
  - **Description**: Hotkey expression like `"CTRL+SHIFT+M"` or `"ALT+F4"`.

- **`handler`**
  - **Type**: `function | object`
  - **Description**:
    - Function form: called on key down.
    - Object form: `{ onKeyDown?: function, onKeyUp?: function }`.

### Return Value

- **Type**: `number`
- **Description**: Registration ID. Returns `-1` if registration fails.

### Supported Tokens

- Modifiers: `CTRL` / `CONTROL`, `ALT`, `SHIFT`, `WIN` / `WINDOWS`
- Keys:
  - Letters: `A-Z`
  - Digits: `0-9`
  - Function keys: `F1-F24`
  - Named keys: `SPACE`, `ENTER` / `RETURN`, `TAB`, `ESC` / `ESCAPE`, `BACKSPACE`, `DELETE` / `DEL`, `INSERT` / `INS`, `HOME`, `END`, `PAGEUP` / `PGUP`, `PAGEDOWN` / `PGDN`, `LEFT`, `RIGHT`, `UP`, `DOWN`

## `hotkey.unregister(id)`

Unregisters a previously registered hotkey.

### Parameters

- **`id`**
  - **Type**: `number`
  - **Description**: Hotkey registration ID returned by `hotkey.register()`.

### Return Value

- **Type**: `boolean`
- **Description**: `true` if the hotkey was removed; otherwise `false`.

## Examples

```javascript
import { hotkey } from "system";

const id = hotkey.register("CTRL+SHIFT+M", function () {
    console.log("Hotkey pressed (key down)");
});

console.log("hotkey id:", id);
```

```javascript
import { hotkey } from "system";

const id = hotkey.register("ALT+F4", {
    onKeyDown: function () {
        console.log("ALT+F4 down");
    },
    onKeyUp: function () {
        console.log("ALT+F4 up");
    }
});

// Later
const removed = hotkey.unregister(id);
console.log("unregister:", removed);
```
