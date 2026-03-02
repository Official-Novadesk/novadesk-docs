---
title: Read environment variables with getEnv from the system module.
---

# Environment Variables

Read process environment variables using `getEnv` from the `system` module.

```javascript
import { getEnv } from "system";
```

#### Table of Contents
[[toc]]

## `getEnv([name, defaultValue])`

Returns either:
- all environment variables as an object (when `name` is omitted), or
- a single environment variable value as a string (when `name` is provided).

### Parameters

- **`name`**
  - **Type**: `string`
  - **Required**: No
  - **Description**: Environment variable key (for example, `"PATH"`).
- **`defaultValue`**
  - **Type**: `string`
  - **Required**: No
  - **Description**: Fallback value used only when `name` is provided and the variable is missing or empty.

### Return Value

- **Type**: `object | string`
- **Description**:
  - `getEnv()` returns an object map of all env vars.
  - `getEnv(name)` returns a string (empty string when missing).
  - `getEnv(name, defaultValue)` returns `defaultValue` when the variable is missing/empty.

### Example: Read One Variable

```javascript
import { getEnv } from "system";

const user = getEnv("USERNAME", "unknown");
console.log("user:", user);
```

### Example: Read All Variables

```javascript
import { getEnv } from "system";

const vars = getEnv();
console.log("PATH:", vars.PATH);
console.log("HOME:", vars.HOME);
```

### Notes

- Environment variable names are platform-dependent (Windows commonly uses uppercase keys like `PATH`, `USERNAME`, `APPDATA`).
- `getEnv(name, defaultValue)` treats empty values the same as missing values.
