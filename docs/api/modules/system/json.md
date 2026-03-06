---
title: Parse, stringify, read, and write JSON with the json module.
---

# json Module

Work with JSON values and JSON files from the `system` module.

```javascript
import { json } from "system";
```

#### Table of Contents
[[toc]]

## `json.parse(text)`

Parses JSON text into a JS value.

### Parameters

- **`text`**
  - **Type**: `string`
  - **Description**: JSON source text.

### Return Value

- **Type**: `any`
- **Description**: Parsed object/array/value.

### Errors

- Throws if text is invalid JSON.

### Example

```javascript
import { json } from "system";

const obj = json.parse('{ "name": "Novadesk", "v": 1 }');
console.log(obj.name, obj.v);
```

## `json.stringify(value[, space])`

Converts a JS value to JSON text.

### Parameters

- **`value`**
  - **Type**: `any`
- **`space`**
  - **Type**: `number | string`
  - **Required**: No
  - **Description**: Pretty-print indentation.

### Return Value

- **Type**: `string`

### Example

```javascript
import { json } from "system";

const s = json.stringify({ name: "Novadesk", ok: true }, 2);
console.log(s);
```

## `json.read(path)`

Reads a JSON file and parses it.

### Parameters

- **`path`**
  - **Type**: `string`
  - **Description**: Absolute path or path relative to entry script directory.

### Return Value

- **Type**: `object | array | null`
- **Description**:
  - Returns parsed JSON value on success.
  - Returns `{}` when file is empty/whitespace.
  - Returns `null` if file cannot be read.

### Errors

- Throws if file exists but contains invalid JSON.

### Example

```javascript
import { json } from "system";

const data = json.read("./data/settings.json");
if (data !== null) {
    console.log("theme:", data.theme);
}
```

## `json.write(path, value[, merge])`

Writes JSON to file.

### Parameters

- **`path`**
  - **Type**: `string`
  - **Description**: Absolute path or path relative to entry script directory.
- **`value`**
  - **Type**: `any`
  - **Description**: Value to serialize as JSON.
- **`merge`**
  - **Type**: `boolean`
  - **Required**: No
  - **Default**: `false`
  - **Description**:
    - `false`: overwrite file with pretty JSON.
    - `true`: apply JSON merge-patch behavior against existing file.

### Return Value

- **Type**: `boolean`
- **Description**: `true` on success; otherwise `false`.

### Example (overwrite)

```javascript
import { json } from "system";

const ok = json.write("./data/settings.json", {
    theme: "dark",
    refreshMs: 500
});
console.log("write:", ok);
```

### Example (merge patch)

```javascript
import { json } from "system";

// Patch only one field in existing JSON file
const ok = json.write("./data/settings.json", { refreshMs: 1000 }, true);
console.log("merge write:", ok);
```
