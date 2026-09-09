---
title: Extract file icons to ICO files with the fileIcon module.
description: Extract file icons and save them as ICO files.
---

# fileIcon Module

Extract a file's associated icon and save it as an `.ico` file.

```javascript
import { fileIcon } from "system";
```

::: info Availability
Available in the [Main script](/guides/script-types.html#main-script-the-brain) only.
:::

#### Table of Contents
[[toc]]

## Methods

<MethodBox
  name="fileIcon.extractIcon(filePath, outIcoPath [, size])"
  badge="fileIcon"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'filePath', type: 'string', description: 'Source file path (.exe, .dll, or any file with an associated icon).' },
    { name: 'outIcoPath', type: 'string', description: 'Output path for the extracted .ico file.' },
    { name: 'size', type: 'number', optional: true, description: 'Preferred icon size in pixels. Defaults to 48.' }
  ]"
>
<template #returns><code>true</code> if the icon was extracted and written successfully, <code>false</code> otherwise.</template>

Extracts the shell icon associated with a file and writes it to an `.ico` file on disk. Uses Windows Shell APIs to retrieve the icon, supporting both embedded icons (like those in .exe/.dll files) and file type associations.

::: tip Icon Sources
- Executable files (.exe, .dll) may contain embedded icons
- Other files use the icon associated with their file type registration in Windows
- The function attempts to get the best quality icon available at the requested size
:::

::: warning File Paths
Both `filePath` and `outIcoPath` should be absolute paths or relative to the current working directory. The output directory must exist before calling this function.
:::

<template #example>

```javascript
import { fileIcon } from "system";

const ok = fileIcon.extractIcon(
  "C:\\Windows\\System32\\notepad.exe",
  __dirname + "\\notepad.ico",
  48
);
console.log("Extracted:", ok);
```

</template>
</MethodBox>

<MethodBox
  name="fileIcon.extractFileIcon(filePath, outIcoPath [, size])"
  badge="fileIcon"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'filePath', type: 'string', description: 'Source file path.' },
    { name: 'outIcoPath', type: 'string', description: 'Output path for the extracted .ico file.' },
    { name: 'size', type: 'number', optional: true, description: 'Preferred icon size in pixels. Defaults to 48.' }
  ]"
>
<template #returns><code>true</code> if the icon was extracted and written successfully, <code>false</code> otherwise.</template>

Alias of `fileIcon.extractIcon()`. Identical behavior.

<template #example>

```javascript
import { fileIcon } from "system";

fileIcon.extractFileIcon("C:\\Windows\\System32\\calc.exe", __dirname + "\\calc.ico");
```

</template>
</MethodBox>
