---
title: Time formatting and timestamp utilities from the system module.
---

# time

`time` is exported by the `system` module and provides date/time formatting helpers.

```javascript
import { time } from "system";
```

#### Table of Contents
[[toc]]

## `time.time(format, locale?)`

Formats current local time.

- **`format`** (`string`, required): Format pattern.
- **`locale`** (`string`, optional): Locale name (for example `en-US`).

### Return Value

- **Type**: `string`

## `time.timeStamp()`

Returns current Unix timestamp.

### Return Value

- **Type**: `number`

## `time.timeStampFormat(timestamp, format, locale?)`

Formats a timestamp.

- **`timestamp`** (`number`, required)
- **`format`** (`string`, required)
- **`locale`** (`string`, optional)

### Return Value

- **Type**: `string`

## `time.timeStampLocale(text, format, locale)`

Parses text into a timestamp.

- **`text`** (`string`, required)
- **`format`** (`string`, required)
- **`locale`** (`string`, required)

### Return Value

- **Type**: `number | null`
- **Description**: Returns parsed timestamp, or `null` when parsing fails.

## `time.formatLocale(timestamp, format, locale)`

Locale-aware timestamp formatting helper.

- **`timestamp`** (`number`, required)
- **`format`** (`string`, required)
- **`locale`** (`string`, required)

### Return Value

- **Type**: `string`

## `time.daylightSavingTime()`

Checks if local time is currently in daylight saving time.

### Return Value

- **Type**: `boolean`

## Example

```javascript
import { time } from "system";

const now = time.time("%Y-%m-%d %H:%M:%S", "en-US");
const ts = time.timeStamp();
const asText = time.timeStampFormat(ts, "%d/%m/%Y %H:%M:%S", "en-US");
const dst = time.daylightSavingTime();

console.log(now, ts, asText, dst);
```
