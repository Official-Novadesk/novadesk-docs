---
title: System Module APIs - Disk, Display, Environment, Execute, File Icons, and JSON
---

# System Module APIs Reference

This comprehensive guide covers essential Novadesk system APIs for disk operations, display management, environment variables, process execution, file icon extraction, and JSON handling.

```javascript
import { 
  disk, 
  displayMetrics, 
  getEnv, 
  execute, 
  fileIcon, 
  json 
} from "system";
```

::: info Availability
All system APIs are available in the [Main script](/guides/script-types.html#main-script-the-brain) only.
:::

#### Table of Contents
[[toc]]

---

## Disk Module

Read disk space, usage percentages, and I/O performance metrics.

### Space and Usage Functions

<MethodBox
  name="disk.totalBytes([path])"
  badge="disk"
  badgeType="core"
  returns="number"
  :parameters="[
    { name: 'path', type: 'string', optional: true, description: 'File or drive path to query (e.g. C:\\). Defaults to the current working drive.' }
  ]"
>
<template #returns>Total capacity of the volume in bytes. Returns <code>0</code> if unavailable.</template>

Returns the total storage capacity of the volume containing the given path.

<template #example>

```javascript
import { disk } from "system";

const total = disk.totalBytes("C:\\");
console.log("Total:", total, "bytes");
```

</template>
</MethodBox>

<MethodBox
  name="disk.availableBytes([path])"
  badge="disk"
  badgeType="core"
  returns="number"
  :parameters="[
    { name: 'path', type: 'string', optional: true, description: 'File or drive path to query. Defaults to the current working drive.' }
  ]"
>
<template #returns>Available bytes for the current user on the target volume. Returns <code>0</code> if unavailable.</template>

Returns the bytes available to the current user on the target volume.

<template #example>

```javascript
import { disk } from "system";

const free = disk.availableBytes("C:\\");
console.log("Free:", free, "bytes");
```

</template>
</MethodBox>

<MethodBox
  name="disk.usedBytes([path])"
  badge="disk"
  badgeType="core"
  returns="number"
  :parameters="[
    { name: 'path', type: 'string', optional: true, description: 'File or drive path to query. Defaults to the current working drive.' }
  ]"
>
<template #returns>Used bytes on the target volume. Returns <code>0</code> if unavailable.</template>

Returns the used storage bytes on the target volume.

<template #example>

```javascript
import { disk } from "system";

const used = disk.usedBytes("C:\\");
console.log("Used:", used, "bytes");
```

</template>
</MethodBox>

<MethodBox
  name="disk.usagePercent([path])"
  badge="disk"
  badgeType="core"
  returns="number"
  :parameters="[
    { name: 'path', type: 'string', optional: true, description: 'File or drive path to query. Defaults to the current working drive.' }
  ]"
>
<template #returns>Usage percentage in the range <code>0–100</code>. Returns <code>0</code> if unavailable.</template>

Returns the disk usage percentage for the target volume.

<template #example>

```javascript
import { disk } from "system";

const pct = disk.usagePercent("C:\\");
console.log("Usage:", pct + "%");
```

</template>
</MethodBox>

### Performance Monitoring Functions

<MethodBox
  name="disk.readSpeed()"
  badge="disk"
  badgeType="core"
  returns="number"
>
<template #returns>Current disk read throughput in bytes per second. Returns <code>0</code> if unavailable.</template>

Returns the current disk read speed sampled from Windows Performance Data Helper (PDH) `PhysicalDisk(_Total)` counters. The value is cached and updated every 400ms to reduce performance overhead.

<template #example>

```javascript
import { disk } from "system";

const readBps = disk.readSpeed();
console.log("Read:", readBps, "bytes/sec");
```

</template>
</MethodBox>

<MethodBox
  name="disk.writeSpeed()"
  badge="disk"
  badgeType="core"
  returns="number"
>
<template #returns>Current disk write throughput in bytes per second. Returns <code>0</code> if unavailable.</template>

Returns the current disk write speed sampled from Windows Performance Data Helper (PDH) `PhysicalDisk(_Total)` counters. The value is cached and updated every 400ms to reduce performance overhead.

<template #example>

```javascript
import { disk } from "system";

const writeBps = disk.writeSpeed();
console.log("Write:", writeBps, "bytes/sec");
```

</template>
</MethodBox>

::: info Path Parameter Details
For all disk space functions (`totalBytes`, `availableBytes`, `usedBytes`, `usagePercent`), the `path` parameter can be:
- A drive root like `"C:\\"` or `"D:\\"` 
- Any file or folder path on the target volume
- If omitted or empty, defaults to the current working drive

The function determines which volume contains the specified path and returns statistics for that entire volume.
:::

::: tip Performance Notes
Both `readSpeed()` and `writeSpeed()` use the same cached measurement that updates every 400ms. Multiple calls within this window return the same cached value.
:::

---

## Display Metrics Module

Get virtual desktop bounds and connected monitor information.

<MethodBox
  name="displayMetrics.getMetrics()"
  badge="displayMetrics"
  badgeType="core"
  returns="object"
>
<template #returns>An object with virtual desktop bounds, primary monitor data, and a <code>monitors</code> array.</template>

Returns the full display configuration — virtual desktop bounds and an entry for each connected monitor.

The returned object has these properties:

| Property | Type | Description |
|---|---|---|
| `virtualScreen` | `object` | Virtual desktop bounds with `x`, `y`, `width`, `height` properties. |
| `primary` | `object` | Primary monitor data with `workArea` and `screenArea` objects. |
| `monitors` | `object[]` | Array of monitor entries (see below). |

Each entry in `monitors`:

| Property | Type | Description |
|---|---|---|
| `id` | `number` | Monitor identifier. |
| `workArea` | `object` | Work area bounds (excludes taskbar) with `x`, `y`, `width`, `height` properties. |
| `screenArea` | `object` | Full screen bounds with `x`, `y`, `width`, `height` properties. |

Each area object (`workArea`, `screenArea`) contains:

| Property | Type | Description |
|---|---|---|
| `x` | `number` | Left coordinate of the area. |
| `y` | `number` | Top coordinate of the area. |
| `width` | `number` | Width of the area in pixels. |
| `height` | `number` | Height of the area in pixels. |

<template #example>

```javascript
import { displayMetrics } from "system";

const m = displayMetrics.getMetrics();

console.log("Virtual desktop:", m.virtualScreen.width, "x", m.virtualScreen.height);
console.log("Primary work area:", m.primary.workArea);

for (const monitor of m.monitors) {
  console.log("Monitor", monitor.id, "screen:", monitor.screenArea);
  console.log("Monitor", monitor.id, "work area:", monitor.workArea);
}
```

</template>
</MethodBox>

<MethodBox
  name="displayMetrics.get()"
  badge="displayMetrics"
  badgeType="core"
  returns="object"
>
<template #returns>Same as <code>displayMetrics.getMetrics()</code>.</template>

Alias of `displayMetrics.getMetrics()`.

<template #example>

```javascript
import { displayMetrics } from "system";

const m = displayMetrics.get();
console.log("Virtual screen:", m.virtualScreen);
console.log("Monitors:", m.monitors.length);
```

</template>
</MethodBox>

---

## Environment Variables

Read process environment variables with the `getEnv` function.

<MethodBox
  name="getEnv([name [, defaultValue]])"
  badge="system"
  badgeType="core"
  returns="object | string"
  :parameters="[
    { name: 'name', type: 'string', optional: true, description: 'Environment variable key (e.g. PATH, USERNAME). If omitted, all variables are returned.' },
    { name: 'defaultValue', type: 'string', optional: true, description: 'Fallback value returned when the variable is missing or empty. Only used when name is provided.' }
  ]"
>
<template #returns>An <code>object</code> map of all env vars when called with no arguments, or a <code>string</code> value for a specific variable.</template>

Returns environment variable data depending on how it is called:

- `getEnv()` — returns an object containing all environment variables as key/value pairs
- `getEnv(name)` — returns the value of the named variable, or an empty string if missing or empty
- `getEnv(name, defaultValue)` — returns the variable value, or `defaultValue` if the variable is missing or empty

<template #example>

```javascript
import { getEnv } from "system";

// Single variable with fallback
const user = getEnv("USERNAME", "unknown");
console.log("User:", user);

// Single variable, no fallback
const appdata = getEnv("APPDATA");
console.log("AppData:", appdata);

// All variables
const all = getEnv();
console.log("PATH:", all.PATH);
console.log("TEMP:", all.TEMP);
```

</template>
</MethodBox>

::: info Windows Environment Variables
On Windows, environment variable names are case-insensitive but typically stored in uppercase (`PATH`, `USERNAME`, `APPDATA`). Empty values are treated the same as missing when a `defaultValue` is provided.
:::

---

## Execute Function

Launch applications, open files, folders, or URLs through the Windows shell.

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

::: warning Parameter Details
All parameters except `target` are optional. When not provided:
- `parameters` defaults to empty string
- `workingDir` defaults to empty string (uses system default)  
- `show` defaults to `1` (`SW_SHOWNORMAL`)
:::

---

## File Icon Module

Extract file icons and save them as ICO files.

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

::: tip Icon Sources
- Executable files (.exe, .dll) may contain embedded icons
- Other files use the icon associated with their file type registration in Windows
- The function attempts to get the best quality icon available at the requested size
:::

::: warning File Paths
Both `filePath` and `outIcoPath` should be absolute paths or relative to the current working directory. The output directory must exist before calling this function.
:::

---

## JSON Module

Work with JSON values and JSON files with enhanced path resolution and merge capabilities.

### Parsing and Stringifying

<MethodBox
  name="json.parse(text)"
  badge="json"
  badgeType="core"
  returns="any"
  :parameters="[
    { name: 'text', type: 'string', description: 'JSON source text to parse.' }
  ]"
>
<template #returns>The parsed JavaScript value — object, array, string, number, boolean, or null.</template>

Parses a JSON string into a JavaScript value. Throws if the text is not valid JSON.

<template #example>

```javascript
import { json } from "system";

const obj = json.parse('{"name":"Novadesk","version":1}');
console.log(obj.name);    // "Novadesk"
console.log(obj.version); // 1
```

</template>
</MethodBox>

<MethodBox
  name="json.stringify(value [, space])"
  badge="json"
  badgeType="core"
  returns="string"
  :parameters="[
    { name: 'value', type: 'any', description: 'The JavaScript value to serialize.' },
    { name: 'space', type: 'number | string', optional: true, description: 'Indentation for pretty-printing. Pass a number of spaces or a string.' }
  ]"
>
<template #returns>The JSON-encoded string representation of the value.</template>

Converts a JavaScript value to a JSON string.

<template #example>

```javascript
import { json } from "system";

const s = json.stringify({ name: "Novadesk", ok: true }, 2);
console.log(s);
// {
//   "name": "Novadesk",
//   "ok": true
// }
```

</template>
</MethodBox>

### File Operations

<MethodBox
  name="json.read(path)"
  badge="json"
  badgeType="core"
  returns="object | array | null"
  :parameters="[
    { name: 'path', type: 'string', description: 'Absolute path or path relative to the entry script directory.' }
  ]"
>
<template #returns>The parsed JSON value on success, an empty object <code>{}</code> for empty/whitespace-only files, or <code>null</code> if the file cannot be read or does not exist.</template>

Reads a JSON file from disk and parses it. If the file exists but contains only whitespace, returns an empty object `{}`. Throws if the file exists but contains invalid JSON.

<template #example>

```javascript
import { json } from "system";

const data = json.read(__dirname + "\\settings.json");
if (data !== null) {
  console.log("theme:", data.theme);
}
```

</template>
</MethodBox>

<MethodBox
  name="json.write(path, value [, merge])"
  badge="json"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'path', type: 'string', description: 'Absolute path or path relative to the entry script directory.' },
    { name: 'value', type: 'any', description: 'The value to serialize and write.' },
    { name: 'merge', type: 'boolean', optional: true, description: 'false (default) overwrites the file. true applies JSON merge-patch against the existing file.' }
  ]"
>
<template #returns><code>true</code> on success, <code>false</code> on failure.</template>

Writes a value as pretty-printed JSON to a file (indented with 4 spaces). When `merge` is `true`, the existing file is read first and a JSON merge-patch is applied — useful for updating specific fields without overwriting others.

<template #example>

```javascript
import { json } from "system";

// Overwrite
json.write(__dirname + "\\settings.json", { theme: "dark", refreshMs: 500 });

// Merge — only updates refreshMs, leaves other fields intact
json.write(__dirname + "\\settings.json", { refreshMs: 1000 }, true);
```

</template>
</MethodBox>

::: info Path Resolution
Paths are resolved relative to the current script directory. If no current script directory is available, falls back to the entry script directory, and finally to the widgets directory.
:::

::: tip JSON Merge Patch
When using `merge: true`, the function performs [JSON Merge Patch (RFC 7396)](https://tools.ietf.org/html/rfc7396) to combine the existing file content with the new value. This allows selective updates of object properties.
:::

---

## Complete Example

Here's a comprehensive example demonstrating all the system APIs covered in this guide:

```javascript
import { 
  disk, 
  displayMetrics, 
  getEnv, 
  execute, 
  fileIcon, 
  json 
} from "system";

// Disk information
console.log("=== Disk Information ===");
const drive = "C:\\";
console.log("Total:",     disk.totalBytes(drive), "bytes");
console.log("Available:", disk.availableBytes(drive), "bytes");
console.log("Used:",      disk.usedBytes(drive), "bytes");
console.log("Usage %:",   disk.usagePercent(drive));
console.log("Read B/s:",  disk.readSpeed());
console.log("Write B/s:", disk.writeSpeed());

// Display metrics
console.log("\\n=== Display Information ===");
const displays = displayMetrics.getMetrics();
console.log("Virtual screen:", displays.virtualScreen);
console.log("Primary monitor work area:", displays.primary.workArea);
displays.monitors.forEach((monitor, index) => {
  console.log(`Monitor ${index}:`, monitor.screenArea);
});

// Environment variables
console.log("\\n=== Environment Variables ===");
console.log("User:", getEnv("USERNAME", "unknown"));
console.log("Temp directory:", getEnv("TEMP"));
console.log("Number of processors:", getEnv("NUMBER_OF_PROCESSORS"));

// Configuration file example
const configPath = __dirname + "\\config.json";
const defaultConfig = {
  theme: "dark",
  autoRefresh: true,
  refreshInterval: 5000
};

// Read existing config or use defaults
let config = json.read(configPath);
if (config === null) {
  config = defaultConfig;
  json.write(configPath, config);
  console.log("\\n=== Created default config ===");
} else {
  console.log("\\n=== Loaded existing config ===");
}
console.log("Theme:", config.theme);
console.log("Auto refresh:", config.autoRefresh);

// Update a single setting using merge
json.write(configPath, { refreshInterval: 3000 }, true);
console.log("Updated refresh interval");

// Extract an application icon
console.log("\\n=== Icon Extraction ===");
const success = fileIcon.extractIcon(
  "C:\\Windows\\System32\\notepad.exe",
  __dirname + "\\notepad.ico",
  48
);
console.log("Icon extracted:", success);

// Launch notepad with the config file
console.log("\\n=== Launching Application ===");
const launched = execute("notepad.exe", configPath);
console.log("Launched notepad:", launched);
```

This example demonstrates practical usage patterns for system monitoring, configuration management, and application integration using Novadesk's system APIs.