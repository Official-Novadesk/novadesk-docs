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

- **Type**: `Promise<string>`
- **Description**: Resolves with fetched text on success.

### Errors

- Throws a `TypeError` when `urlOrPath` is missing or invalid/empty.
- Promise rejects when fetch/read fails.

### Example: Fetch Web JSON

```javascript
import { webFetch } from "system";

async function load() {
  const text = await webFetch("https://api.github.com");
  console.log("length:", text.length);
}
load();
```

### Example: Read Local File (Relative)

```javascript
import { webFetch } from "system";

async function loadLocal() {
  const text = await webFetch("./data/config.json");
  console.log(text);
}
loadLocal();
```

### Example: Read Local File (file://)

```javascript
import { webFetch } from "system";

webFetch("file:///C:/Temp/sample.txt")
  .then((text) => console.log(text))
  .catch((err) => console.error("webFetch failed:", err));
```
