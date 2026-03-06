---
title: Read CPU usage with the cpu module.
---

# cpu Module
Read current system CPU usage in Novadesk.

The `cpu` module is exported from the `system` module.

```javascript
import { cpu } from "system";
```

#### Table of Contents
[[toc]]

## `cpu.usage()`

Returns current total CPU usage percentage.

### Return Value

- **Type**: `number`
- **Description**: CPU usage percentage in the range `0-100`. Returns `0` if stats are unavailable.

## Example

```javascript
import { cpu } from "system";

const value = cpu.usage();
console.log("CPU usage:", value + "%");
```
