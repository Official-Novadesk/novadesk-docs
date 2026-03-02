---
title: Read text from web URLs or files with webFetch from the system module.
---

# webFetch

Read text content from HTTP/HTTPS/file sources using `webFetch` from the `system` module.

```javascript
import { webFetch } from "system";
```

#### Table of Contents
[[toc]]

## `webFetch(urlOrPath)`

Fetches text from:
- `http://...`
- `https://...`
- `file://...`
- local file paths

Relative local paths are resolved from the widget entry script directory.

### Parameters

- **`urlOrPath`**
  - **Type**: `string`
  - **Required**: Yes
  - **Description**: URL or filesystem path to load.

### Return Value

- **Type**: `string | null`
- **Description**: Fetched text on success, otherwise `null`.

### Errors

- Throws a `TypeError` when `urlOrPath` is missing or invalid/empty.

### Example: Fetch Web JSON

```javascript
import { webFetch } from "system";

const text = webFetch("https://api.github.com");
if (text !== null) {
  console.log("length:", text.length);
}
```

### Example: Read Local File (Relative)

```javascript
import { webFetch } from "system";

const text = webFetch("./data/config.json");
if (text !== null) {
  console.log(text);
}
```

### Example: Read Local File (file://)

```javascript
import { webFetch } from "system";

const text = webFetch("file:///C:/Temp/sample.txt");
console.log(text);
```
