---
title: Read system memory metrics with the memory module.
---

# memory Module
Read physical memory statistics in Novadesk.

The `memory` module is exported from the `system` module.

```javascript
import { memory } from "system";
```

#### Table of Contents
[[toc]]

## `memory.totalBytes()`

Returns total physical memory in bytes.

### Return Value

- **Type**: `number`
- **Description**: Total RAM bytes. Returns `0` if unavailable.

## `memory.availableBytes()`

Returns available physical memory in bytes.

### Return Value

- **Type**: `number`
- **Description**: Available RAM bytes. Returns `0` if unavailable.

## `memory.usedBytes()`

Returns used physical memory in bytes.

### Return Value

- **Type**: `number`
- **Description**: Used RAM bytes. Returns `0` if unavailable.

## `memory.usagePercent()`

Returns memory usage percentage.

### Return Value

- **Type**: `number`
- **Description**: Usage percentage (`0-100`). Returns `0` if unavailable.

## Example

```javascript
import { memory } from "system";

const total = memory.totalBytes();
const available = memory.availableBytes();
const used = memory.usedBytes();
const percent = memory.usagePercent();

console.log("Total:", total);
console.log("Available:", available);
console.log("Used:", used);
console.log("Usage %:", percent);
```
