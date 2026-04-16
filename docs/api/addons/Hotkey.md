---
title: Register global keyboard hotkeys with the Hotkey addon.
---

# Hotkey Addon

The Hotkey addon registers global keyboard shortcuts and delivers key down/up callbacks.

#### Table of Contents

[[toc]]

## Quick Start

Load the addon DLL and call `register()` / `unregister()` directly.

```javascript
import { addon } from "novadesk";

const hotkey = addon.load("D:/Novadesk-Project/Hotkey/dist/x64/Debug/Hotkey.dll");

const id = hotkey.register("CTRL+SHIFT+M", () => {
  console.log("Hotkey pressed");
});

hotkey.unregister(id);
```

## `register(hotkeyString, handler)`

Registers a hotkey and returns its registration ID.

### Parameters

- `hotkeyString` (`string`)
  - Hotkey expression like `"CTRL+SHIFT+M"` or `"ALT+F4"`.

- `handler` (`function | object`)
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

## `unregister(id)`

Unregisters a previously registered hotkey.

### Parameters

- `id` (`number`)
  - Hotkey registration ID returned by `register()`.

### Return Value

- **Type**: `boolean`
- **Description**: `true` if the hotkey was removed; otherwise `false`.

## Beginner Tips

- Always store the ID returned by `register()` so you can remove it later.
- Use `onKeyDown` for single-shot actions and `onKeyUp` for toggles.
- Avoid common OS shortcuts to prevent conflicts.

## Examples

### Simple

```javascript
import { addon } from "novadesk";

const hotkey = addon.load("D:/Novadesk-Project/Hotkey/dist/x64/Debug/Hotkey.dll");

const id = hotkey.register("CTRL+SHIFT+M", () => {
  console.log("Hotkey pressed (down)");
});

console.log(`Registered ID: ${id}`);
```

### With Key Up

```javascript
import { addon } from "novadesk";

const hotkey = addon.load("D:/Novadesk-Project/Hotkey/dist/x64/Debug/Hotkey.dll");

const id = hotkey.register("ALT+F4", {
  onKeyDown: () => console.log("ALT+F4 down"),
  onKeyUp: () => console.log("ALT+F4 up")
});

const removed = hotkey.unregister(id);
console.log(`Unregister success: ${removed}`);
```
