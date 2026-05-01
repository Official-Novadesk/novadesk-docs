---
title: Read disk usage metrics with the disk module.
---

# disk Module
Read disk space and usage metrics in Novadesk.

The `disk` module is exported from the `system` module.

```javascript
import { disk } from "system";
```

#### Table of Contents
[[toc]]

## `disk.totalBytes([path])`

Returns total disk capacity in bytes.

### Parameters

- **`path`**
  - **Type**: `string`
  - **Required**: No
  - **Description**: File or drive path to query (for example, `"C:\\"`).

### Return Value

- **Type**: `number`
- **Description**: Total bytes for the target volume. Returns `0` if unavailable.

## `disk.availableBytes([path])`

Returns available bytes for the current user on the target volume.

### Parameters

- **`path`**
  - **Type**: `string`
  - **Required**: No
  - **Description**: File or drive path to query.

### Return Value

- **Type**: `number`
- **Description**: Available bytes for the target volume. Returns `0` if unavailable.

## `disk.usedBytes([path])`

Returns used bytes for the target volume.

### Parameters

- **`path`**
  - **Type**: `string`
  - **Required**: No
  - **Description**: File or drive path to query.

### Return Value

- **Type**: `number`
- **Description**: Used bytes for the target volume. Returns `0` if unavailable.

## `disk.usagePercent([path])`

Returns disk usage percentage for the target volume.

### Parameters

- **`path`**
  - **Type**: `string`
  - **Required**: No
  - **Description**: File or drive path to query.

### Return Value

- **Type**: `number`
- **Description**: Usage percent (`0-100`) for the target volume. Returns `0` if unavailable.

::: info
If `path` is omitted, the API uses the current working drive/root.
:::

## `disk.readSpeed()`

Returns the current disk read speed in bytes per second.

### Return Value

- **Type**: `number`
- **Description**: Current read speed in bytes/sec using PDH (Performance Data Helper) counters from `PhysicalDisk(_Total)`. Returns `0` if unavailable.

### Example

```javascript
import { disk } from "system";

const readBytesPerSec = disk.readSpeed();
console.log("Read speed:", readBytesPerSec, "bytes/sec");
```

## `disk.writeSpeed()`

Returns the current disk write speed in bytes per second.

### Return Value

- **Type**: `number`
- **Description**: Current write speed in bytes/sec using PDH (Performance Data Helper) counters from `PhysicalDisk(_Total)`. Returns `0` if unavailable.

### Example

```javascript
import { disk } from "system";

const writeBytesPerSec = disk.writeSpeed();
console.log("Write speed:", writeBytesPerSec, "bytes/sec");
```

## Example

```javascript
import { disk } from "system";

const path = "C:\\";

const total = disk.totalBytes(path);
const available = disk.availableBytes(path);
const used = disk.usedBytes(path);
const percent = disk.usagePercent(path);

console.log("Total:", total);
console.log("Available:", available);
console.log("Used:", used);
console.log("Usage %:", percent);

// Disk I/O metrics (no path required)
const readSpeed = disk.readSpeed();
const writeSpeed = disk.writeSpeed();
console.log("Read speed:", readSpeed, "bytes/sec");
console.log("Write speed:", writeSpeed, "bytes/sec");
```
