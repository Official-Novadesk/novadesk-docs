---
title: Register global keyboard hotkeys with the Hotkey addon.
---

# Hotkey Addon

Register and remove keyboard hotkeys in Novadesk via the Hotkey addon.

The `hotkey` API is provided by the Hotkey addon (not the `system` module).

```javascript
import { addon } from "novadesk";
const hotkeyAddon = addon.load("path/to/Hotkey.dll");
const { hotkey } = hotkeyAddon;
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

### First

```javascript
import { addon } from "novadesk";

const hotkeyAddon = await addon.load("path/to/Hotkey.dll");

const id = hotkeyAddon.register("CTRL+SHIFT+M", () => {
  console.log("Hotkey pressed (key down)");
});

console.log(`Hotkey registered with ID: ${id}`);
```

### Second

```javascript
import { addon } from "novadesk";

const hotkey = await addon.load("path/to/Hotkey.dll");

const id = hotkey.register("ALT+F4", {
  onKeyDown: () => console.log("ALT+F4 down"),
  onKeyUp: () => console.log("ALT+F4 up"),
});

const removed = hotkey.unregister(id);
console.log(`Unregister success: ${removed}`);
```

   <!-- Filled Style (Default) -->

   <CustomButton href="/guide/getting-started" text="Get Started" />

   

   <!-- Outline Style -->

   <CustomButton href="/guide/api" theme="outline">API Reference</CustomButton>

   

   <!-- Custom Content -->

   <CustomButton href="https://github.com" theme="filled">View on GitHub</CustomButton>
