---
title: Read and write Windows Registry values with the registry module.
description: Read and write Windows Registry values.
---

# registry Module

Read and write values in the Windows Registry. Useful for persisting widget settings, reading system configuration, or interacting with application preferences stored in the registry.

```javascript
import { registry } from "system";
```

::: info Availability
Available in the [Main script](/guides/script-types.html#main-script-the-brain) only.
:::

#### Table of Contents
[[toc]]

## Methods

<MethodBox
  name="registry.readData(path, valueName)"
  badge="registry"
  badgeType="core"
  returns="string | number | null"
  :parameters="[
    { name: 'path', type: 'string', description: 'Full registry key path including the hive prefix (e.g. HKEY_CURRENT_USER\\\\Software\\\\MyApp).' },
    { name: 'valueName', type: 'string', description: 'Name of the value to read within the key.' }
  ]"
>
<template #returns>
  A <code>string</code> for string registry types, a <code>number</code> for numeric registry types, or <code>null</code> if the key or value does not exist, or the type is unsupported.
</template>

Reads a single value from the Windows Registry. The return type depends on the underlying registry value type:

| Registry Type | Returns |
|---|---|
| `REG_SZ` | `string` |
| `REG_EXPAND_SZ` | `string` |
| `REG_DWORD` | `number` |
| `REG_QWORD` | `number` |
| Other types | `null` |

::: tip Hive Prefixes
Use the full key path including the hive. Common hive prefixes:
- `HKEY_CURRENT_USER` — Current user settings (no admin required)
- `HKEY_LOCAL_MACHINE` — System-wide settings (may require admin)
- `HKEY_CLASSES_ROOT` — File type associations
:::

<template #example>

```javascript
import { registry } from "system";

// Read a string value
const theme = registry.readData(
  "HKEY_CURRENT_USER\\Software\\MyWidget",
  "Theme"
);

if (theme !== null) {
  console.log("Theme:", theme); // e.g. "dark"
} else {
  console.log("Value not found, using default");
}

// Read a numeric value
const opacity = registry.readData(
  "HKEY_CURRENT_USER\\Software\\MyWidget",
  "Opacity"
);
console.log("Opacity:", opacity); // e.g. 85

// Read a system value
const wallpaperStyle = registry.readData(
  "HKEY_CURRENT_USER\\Control Panel\\Desktop",
  "WallpaperStyle"
);
console.log("Wallpaper style code:", wallpaperStyle);
```

</template>
</MethodBox>

<MethodBox
  name="registry.writeData(path, valueName, value)"
  badge="registry"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'path', type: 'string', description: 'Full registry key path including the hive prefix. The key is created if it does not exist.' },
    { name: 'valueName', type: 'string', description: 'Name of the value to write.' },
    { name: 'value', type: 'string | number', description: 'The value to write. Strings are stored as REG_SZ. Numbers are stored as a numeric type.' }
  ]"
>
<template #returns><code>true</code> if the write succeeded, <code>false</code> otherwise.</template>

Writes a value to the Windows Registry. The registry key is created automatically if it does not already exist.

The write type is determined by the JavaScript type of `value`:
- Passing a **string** writes `REG_SZ`
- Passing a **number** writes it as a numeric registry value

::: warning Admin Privileges
Writing to `HKEY_LOCAL_MACHINE` or other system-level hives requires the process to be running with administrator privileges. Prefer `HKEY_CURRENT_USER` for storing widget settings.
:::

<template #example>

```javascript
import { registry } from "system";

// Write a string value (REG_SZ)
const ok1 = registry.writeData(
  "HKEY_CURRENT_USER\\Software\\MyWidget",
  "Theme",
  "dark"
);
console.log("Theme saved:", ok1);

// Write a numeric value
const ok2 = registry.writeData(
  "HKEY_CURRENT_USER\\Software\\MyWidget",
  "Opacity",
  85
);
console.log("Opacity saved:", ok2);

// Read back to confirm
const savedTheme = registry.readData(
  "HKEY_CURRENT_USER\\Software\\MyWidget",
  "Theme"
);
console.log("Confirmed:", savedTheme); // "dark"
```

</template>
</MethodBox>

## Practical Example — Persisting Widget Settings

A common use case is saving and loading user preferences across widget sessions using `HKEY_CURRENT_USER`:

```javascript
import { registry } from "system";

const REG_KEY = "HKEY_CURRENT_USER\\Software\\MyWidget\\Settings";

// Load settings (with defaults for missing values)
function loadSettings() {
  return {
    theme:   registry.readData(REG_KEY, "Theme")   ?? "light",
    opacity: registry.readData(REG_KEY, "Opacity") ?? 100,
    scale:   registry.readData(REG_KEY, "Scale")   ?? 1.0,
  };
}

// Save settings to the registry
function saveSettings(settings) {
  registry.writeData(REG_KEY, "Theme",   settings.theme);
  registry.writeData(REG_KEY, "Opacity", settings.opacity);
  registry.writeData(REG_KEY, "Scale",   settings.scale);
  console.log("Settings saved to registry");
}

// Usage
const settings = loadSettings();
console.log("Loaded theme:", settings.theme);
console.log("Loaded opacity:", settings.opacity);

// Modify and save
settings.theme = "dark";
settings.opacity = 80;
saveSettings(settings);
```

**Notes:**

- Both `path` and `valueName` are required — the call throws a `TypeError` if either is missing
- Unsupported registry types (binary, multi-string, etc.) return `null` from `readData`
- The key path uses double backslashes in JavaScript strings (`\\`) to represent a single registry path separator (`\`)
- `writeData` with a non-string, non-numeric value (e.g. `null`, `undefined`, an object) will not write a string and will attempt numeric coercion, likely writing `0`
