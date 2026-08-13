---
title: Launch files, apps, and URLs with execute from the system module.
---

# Execute

Launch an app, open a file, folder, or URL through the OS shell.

```javascript
import { execute } from "system";
```

::: info Availability
Available in the [Main script](/guides/script-types.html#main-script-the-brain) only.
:::

#### Table of Contents
[[toc]]

## Methods

<MethodBox
  name="execute(target [, parameters, workingDir, show])"
  badge="system"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'target', type: 'string', description: 'Executable path, document path, folder path, or URL to open.' },
    { name: 'parameters', type: 'string', optional: true, description: 'Command-line arguments passed to the launched executable.' },
    { name: 'workingDir', type: 'string', optional: true, description: 'Working directory for the launched process.' },
    { name: 'show', type: 'number', optional: true, description: 'Window show mode (Win32 SW_* constant). Defaults to 1 (SW_SHOWNORMAL).' }
  ]"
>
<template #returns><code>true</code> if the OS shell accepted the request, <code>false</code> otherwise.</template>

Executes a target through the Windows shell — equivalent to double-clicking a file or typing a URL in the Run dialog. Uses `ShellExecute` internally to launch files, applications, or URLs.

**Common `show` values:**

| Value | Constant | Behavior |
|---|---|---|
| `0` | `SW_HIDE` | Launch hidden (no window) |
| `1` | `SW_SHOWNORMAL` | Normal window (default) |
| `2` | `SW_SHOWMINIMIZED` | Start minimized |
| `3` | `SW_SHOWMAXIMIZED` | Start maximized |

::: warning Parameters
All parameters except `target` are optional. When not provided:
- `parameters` defaults to empty string
- `workingDir` defaults to empty string (uses system default)  
- `show` defaults to `1` (`SW_SHOWNORMAL`)
:::

<template #example>

```javascript
import { execute } from "system";

// Open a file with its default app
execute("C:\\docs\\readme.txt");

// Launch an exe with arguments
execute("notepad.exe", "C:\\docs\\readme.txt");

// Open a URL in the default browser
execute("https://novadesk.pages.dev/");

// Run a command hidden
execute("cmd.exe", "/c echo hello > C:\\temp\\out.txt", "C:\\temp", 0);
```

</template>
</MethodBox>
