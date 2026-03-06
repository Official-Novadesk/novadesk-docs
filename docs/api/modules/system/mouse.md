---
title: Read mouse cursor coordinates with the mouse module.
---

# mouse Module
Read the current mouse position in screen coordinates.

The `mouse` module is exported from the `system` module.

```javascript
import { mouse } from "system";
```

#### Table of Contents
[[toc]]

## `mouse.clientX()`

Returns the current cursor X coordinate.

### Return Value

- **Type**: `number`
- **Description**: Cursor X position. Returns `0` if unavailable.

## `mouse.clientY()`

Returns the current cursor Y coordinate.

### Return Value

- **Type**: `number`
- **Description**: Cursor Y position. Returns `0` if unavailable.

## Example

```javascript
import { mouse } from "system";

const x = mouse.clientX();
const y = mouse.clientY();

console.log("Mouse:", x, y);
```
