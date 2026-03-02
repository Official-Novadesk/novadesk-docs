---
title: Launch files, apps, and URLs with execute from the system module.
---

# Execute

Launch an app, open a file, or open a URL using `execute` from the `system` module.

```javascript
import { execute } from "system";
```

#### Table of Contents
[[toc]]

## `execute(target[, parameters, workingDir, show])`

Executes a target through the OS shell.

### Parameters

- **`target`**
  - **Type**: `string`
  - **Required**: Yes
  - **Description**: Executable path, document/file path, folder path, or URL.
- **`parameters`**
  - **Type**: `string`
  - **Required**: No
  - **Description**: Command-line arguments passed when launching an executable.
- **`workingDir`**
  - **Type**: `string`
  - **Required**: No
  - **Description**: Working directory for the launched process.
- **`show`**
  - **Type**: `number`
  - **Required**: No
  - **Default**: `1` (`SW_SHOWNORMAL`)
  - **Description**: Window show mode passed to the shell.

### Return Value

- **Type**: `boolean`
- **Description**: `true` if launch succeeded; otherwise `false`.

### Errors

- Throws a `TypeError` when `target` is missing.

### Example: Launch Notepad

```javascript
import { execute } from "system";

const ok = execute("notepad.exe", "README.txt");
console.log("launched:", ok);
```

### Example: Open URL

```javascript
import { execute } from "system";

execute("https://novadesk.pages.dev/");
```

### Example: Launch Hidden (Show Flag)

```javascript
import { execute } from "system";

// 0 = SW_HIDE
execute("cmd.exe", "/c echo hello > out.txt", "C:\\temp", 0);
```
