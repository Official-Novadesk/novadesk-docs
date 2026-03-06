---
title: Access Windows clipboard text with the clipboard module.
---

# clipboard Module
Read and write plain text in the Windows clipboard from Novadesk.

The `clipboard` module is exported from the `system` module.

```javascript
import { clipboard } from "system";
```

#### Table of Contents
[[toc]]

## `clipboard.getText()`

Gets the current clipboard text.

### Return Value

- **Type**: `string`
- **Description**: Clipboard text. Returns an empty string (`""`) when text is unavailable.

## `clipboard.setText(text)`

Sets clipboard text.

### Parameters

- **`text`**
  - **Type**: `string`
  - **Description**: Text to write to the clipboard.

### Return Value

- **Type**: `boolean`
- **Description**: `true` if clipboard text was updated; otherwise `false`.

## Example

```javascript
import { clipboard } from "system";

const ok = clipboard.setText("Copied from Novadesk");
console.log("setText:", ok);

const value = clipboard.getText();
console.log("clipboard:", value);
```
