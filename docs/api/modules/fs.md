---
title: fs
---

# fs Module

File system operations for reading and writing files, creating directories, copying, renaming, and inspecting metadata. All methods are **synchronous** — they block until the operation completes and return the result directly.

```javascript
import * as fs from "fs";
```

::: info Availability
`fs` is available in the [Main script](/guides/script-types.html#main-script-the-brain) only. It is not available in UI scripts.
:::

::: info Path resolution
Both absolute and relative paths are accepted. Relative paths resolve from the **entry script directory** (the folder containing `index.js`), not the process working directory.
:::

#### Table of Contents
[[toc]]

## Methods

<MethodBox
  name="fs.readFile(path)"
  badge="fs"
  badgeType="core"
  returns="string | null"
  :parameters="[
    { name: 'path', type: 'string', description: 'File path to read. Relative paths resolve from the entry script directory.' }
  ]"
>
<template #returns>The full file contents as a string, or <code>null</code> if the file could not be opened.</template>

Reads the full contents of a file and returns it as a string. The file is read in binary mode — UTF-8 encoded files round-trip cleanly. Returns `null` if the file does not exist or cannot be opened. Does not throw on I/O failure.

<template #example>

```javascript
import * as fs from "fs";

const content = fs.readFile(path.join(__dirname, "config.json"));
if (content !== null) {
  const config = JSON.parse(content);
  console.log(config);
} else {
  console.warn("config.json not found");
}
```

</template>
</MethodBox>

<MethodBox
  name="fs.writeFile(path, data [, append])"
  badge="fs"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'path', type: 'string', description: 'Target file path.' },
    { name: 'data', type: 'string', description: 'Text content to write.' },
    { name: 'append', type: 'boolean', optional: true, description: 'true appends to the file. false (default) overwrites or creates the file.' }
  ]"
>
<template #returns><code>true</code> if the write succeeded, <code>false</code> if the file could not be opened or written.</template>

Writes text to a file. Creates the file if it does not exist. When `append` is `false` (the default), the file is truncated before writing. Returns `true` on success, `false` on failure. Does not throw on I/O failure.

::: tip No separate appendFile function
There is no `fs.appendFile()`. Pass `true` as the third argument to append instead of overwrite.
:::

<template #example>

```javascript
import * as fs from "fs";

// Create or overwrite
fs.writeFile(path.join(__dirname, "log.txt"), "Session started\n");

// Append subsequent entries
fs.writeFile(path.join(__dirname, "log.txt"), "Event fired\n", true);

const result = fs.readFile(path.join(__dirname, "log.txt"));
console.log(result); // "Session started\nEvent fired\n"
```

</template>
</MethodBox>

<MethodBox
  name="fs.exists(path)"
  badge="fs"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'path', type: 'string', description: 'File or directory path to test.' }
  ]"
>
<template #returns><code>true</code> if the path exists (file, directory, or symlink), <code>false</code> otherwise.</template>

Returns `true` if the path exists as any kind of filesystem entry (file, directory, or symlink), `false` otherwise or if an I/O error occurs.

<template #example>

```javascript
import * as fs from "fs";

if (!fs.exists(path.join(__dirname, "data"))) {
  fs.mkdir(path.join(__dirname, "data"));
}
```

</template>
</MethodBox>

<MethodBox
  name="fs.mkdir(path [, recursive])"
  badge="fs"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'path', type: 'string', description: 'Directory path to create.' },
    { name: 'recursive', type: 'boolean', optional: true, description: 'true (default) creates all intermediate directories. false creates only the final directory and requires the parent to already exist.' }
  ]"
>
<template #returns><code>true</code> if the directory exists after the call — including if it already existed before — <code>false</code> on failure.</template>

Creates a directory. When `recursive` is `true` (the default), all intermediate directories are created automatically. Returns `true` if the directory exists after the call, including when it already existed. Does not throw on I/O failure.

<template #example>

```javascript
import * as fs from "fs";

// Creates "data/cache/images" and all intermediate folders (recursive by default)
fs.mkdir(path.join(__dirname, "data", "cache", "images"));

// Non-recursive — parent directory must already exist
fs.mkdir(path.join(__dirname, "data", "logs"), false);
```

</template>
</MethodBox>

<MethodBox
  name="fs.readdir(path)"
  badge="fs"
  badgeType="core"
  returns="string[]"
  :parameters="[
    { name: 'path', type: 'string', description: 'Directory path to list.' }
  ]"
>
<template #returns>Array of entry names (filenames only, not full paths) inside the directory. Returns an empty array if the directory is empty or cannot be read. Never returns <code>null</code>.</template>

Returns a flat, non-recursive list of filenames and subdirectory names inside the given directory. Entry names are bare names, not full paths. The order is not guaranteed. Returns an empty array on error rather than throwing.

<template #example>

```javascript
import * as fs from "fs";

const entries = fs.readdir(path.join(__dirname, "data"));
console.log(entries); // ["config.json", "cache", "log.txt"]

// Build full paths
const fullPaths = entries.map(name => path.join(__dirname, "data", name));
```

</template>
</MethodBox>

<MethodBox
  name="fs.unlink(path)"
  badge="fs"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'path', type: 'string', description: 'Path to the file or empty directory to remove.' }
  ]"
>
<template #returns><code>true</code> if the entry was removed, <code>false</code> if it did not exist or could not be removed.</template>

Removes a single file or an empty directory. Returns `true` on success, `false` on failure. Does not throw on I/O failure.

::: warning Cannot remove non-empty directories
`fs.unlink` only removes a single entry. It fails silently on non-empty directories. Remove all contents first before calling `unlink` on a directory.
:::

<template #example>

```javascript
import * as fs from "fs";

const removed = fs.unlink(path.join(__dirname, "temp.txt"));
if (!removed) {
  console.log("File did not exist or could not be removed");
}
```

</template>
</MethodBox>

<MethodBox
  name="fs.rename(from, to)"
  badge="fs"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'from', type: 'string', description: 'Existing file or directory path.' },
    { name: 'to', type: 'string', description: 'New path. Can be in a different directory to move the entry.' }
  ]"
>
<template #returns><code>true</code> if the rename or move succeeded, <code>false</code> on failure.</template>

Renames or moves a file or directory. When `from` and `to` are in different directories, this acts as a move. Returns `true` on success, `false` on failure. Does not throw on I/O failure.

<template #example>

```javascript
import * as fs from "fs";

// Rename in place
fs.rename(
  path.join(__dirname, "old.txt"),
  path.join(__dirname, "new.txt")
);

// Move to a different folder
fs.rename(
  path.join(__dirname, "temp.txt"),
  path.join(__dirname, "archive", "temp.txt")
);
```

</template>
</MethodBox>

<MethodBox
  name="fs.copyFile(from, to [, overwrite])"
  badge="fs"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'from', type: 'string', description: 'Source file path.' },
    { name: 'to', type: 'string', description: 'Destination file path.' },
    { name: 'overwrite', type: 'boolean', optional: true, description: 'true (default) overwrites the destination if it exists. false returns false without copying if the destination already exists.' }
  ]"
>
<template #returns><code>true</code> if the copy succeeded, <code>false</code> on failure or if <code>overwrite</code> is <code>false</code> and the destination already exists.</template>

Copies a file from `from` to `to`. Returns `true` on success, `false` on failure. Does not throw on I/O failure.

<template #example>

```javascript
import * as fs from "fs";

// Copy and overwrite destination if it exists (default)
fs.copyFile(
  path.join(__dirname, "config.json"),
  path.join(__dirname, "config.backup.json")
);

// Copy only if destination does not already exist
const ok = fs.copyFile(
  path.join(__dirname, "defaults.json"),
  path.join(__dirname, "config.json"),
  false
);
if (!ok) {
  console.log("config.json already exists, skipped");
}
```

</template>
</MethodBox>

<MethodBox
  name="fs.stat(path)"
  badge="fs"
  badgeType="core"
  returns="object | null"
  :parameters="[
    { name: 'path', type: 'string', description: 'File or directory path to inspect.' }
  ]"
>
<template #returns>A metadata object, or <code>null</code> if the path does not exist or cannot be accessed.</template>

Returns metadata for the given path, or `null` if the path does not exist. Does not throw on I/O failure.

::: info Symlink behavior
`fs.stat` uses `symlink_status` internally, so it does not follow symlinks. A symlink will have `isSymlink: true` and `isFile: false`, regardless of what the symlink points to.
:::

The returned object has these properties:

| Property | Type | Description |
|---|---|---|
| `isFile` | `boolean` | `true` when the path is a regular file |
| `isDirectory` | `boolean` | `true` when the path is a directory |
| `isSymlink` | `boolean` | `true` when the path is a symbolic link |
| `size` | `number` | File size in bytes. `0` for directories and symlinks |
| `mode` | `number` | Raw filesystem permission value |

<template #example>

```javascript
import * as fs from "fs";

const info = fs.stat(path.join(__dirname, "config.json"));
if (info === null) {
  console.warn("File not found");
} else {
  console.log("isFile:", info.isFile);      // true
  console.log("size:", info.size, "bytes"); // e.g. 512 bytes
}

// Distinguish files from directories
const entries = fs.readdir(__dirname);
for (const name of entries) {
  const s = fs.stat(path.join(__dirname, name));
  if (s && s.isDirectory) {
    console.log("dir:", name);
  }
}
```

</template>
</MethodBox>

## Practical Examples

**Read and parse a JSON config file**

```javascript
import * as fs from "fs";

function loadConfig(filename) {
  const raw = fs.readFile(path.join(__dirname, filename));
  if (raw === null) return null;
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to parse", filename, err.message);
    return null;
  }
}

const config = loadConfig("config.json") ?? { theme: "dark" };
```

**Write a JSON config file**

```javascript
import * as fs from "fs";

function saveConfig(filename, data) {
  const json = JSON.stringify(data, null, 2);
  const ok = fs.writeFile(path.join(__dirname, filename), json);
  if (!ok) console.error("Failed to write", filename);
  return ok;
}

saveConfig("config.json", { theme: "dark", refreshRate: 5000 });
```

**Ensure a data directory exists before writing**

```javascript
import * as fs from "fs";

const dataDir = path.join(__dirname, "data");
fs.mkdir(dataDir);   // safe to call even if it already exists

fs.writeFile(path.join(dataDir, "log.txt"), "Session started\n");
```

**Append a timestamped log entry**

```javascript
import * as fs from "fs";

function appendLog(message) {
  const timestamp = new Date().toISOString();
  fs.writeFile(
    path.join(__dirname, "app.log"),
    timestamp + "  " + message + "\n",
    true   // append
  );
}

appendLog("Widget started");
appendLog("Connected to data source");
```

**List files in a directory and filter by extension**

```javascript
import * as fs from "fs";

const assetsDir = path.join(__dirname, "assets");
const images = fs.readdir(assetsDir).filter(name => name.endsWith(".png"));
console.log("PNG files:", images);
```

**Back up a config file before overwriting**

```javascript
import * as fs from "fs";

const configPath  = path.join(__dirname, "config.json");
const backupPath  = path.join(__dirname, "config.backup.json");

if (fs.exists(configPath)) {
  fs.copyFile(configPath, backupPath);
}

fs.writeFile(configPath, JSON.stringify({ theme: "dark" }, null, 2));
```
