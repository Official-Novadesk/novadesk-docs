---
title: addon
---

# addon

Loads and manages native C++ addon DLLs at runtime, extending Novadesk with platform-specific or performance-critical native code.

```javascript
import { addon } from 'novadesk';
```

::: info Availability
Available in the [Main script](/guides/script-types.html#main-script-the-brain) only.
:::

::: info Path resolution
Both absolute and relative paths are accepted. Relative paths resolve from the **entry script directory** (the folder containing `index.js`), matching the behavior of the `fs` module.
:::

#### Table of Contents
[[toc]]

## How Addons Work

When `addon.load(path)` is called, Novadesk:

1. Loads the DLL with `LoadLibraryW`.
2. Looks for a required `NovadeskAddonInit` export. If missing, the DLL is unloaded and `null` is returned.
3. Calls `NovadeskAddonInit`, passing a host API struct that lets the addon register functions, read arguments, and push return values.
4. Returns the exports object with two injected helpers: `__novadesk_addon_id` and `unload()`.

An optional `NovadeskAddonUnload` export is called when the addon is unloaded. This is the addon's chance to clean up native resources.

::: tip Building addons?
See the [Addon SDK Developer Guide](/developers/api/addon-api) for instructions on creating native addons, the required `NovadeskAddonInit` signature, and how to use the host API.
:::

## Methods

<MethodBox
  name="addon.load(path)"
  badge="addon"
  badgeType="core"
  returns="object | number | null"
  :parameters="[
    { name: 'path', type: 'string', description: 'Path to the .dll file. Relative paths resolve from the entry script directory.' }
  ]"
>
<template #returns>
The addon exports object on a successful first load, the numeric addon ID if the addon is already loaded in a different script context, or <code>null</code> if the DLL could not be loaded or is missing the required <code>NovadeskAddonInit</code> export.
</template>

Loads a native addon DLL and returns its exports. The behavior depends on the addon's state:

- **First load in this context:** calls `NovadeskAddonInit`, builds the exports object, injects `__novadesk_addon_id` and `unload()`, and returns the object.
- **Already loaded in the same context:** returns the existing exports object directly.
- **Already loaded in a different context:** returns the numeric addon ID (`number`) instead of the exports object.
- **DLL not found or load error:** logs an error and returns `null`.
- **DLL missing `NovadeskAddonInit`:** logs an error, unloads the DLL, and returns `null`.
- **`NovadeskAddonInit` throws:** unloads the DLL, removes the registration, and throws a JavaScript `InternalError`.

**Injected properties on the returned object:**

| Property | Type | Description |
|---|---|---|
| `__novadesk_addon_id` | `number` | Numeric ID assigned to this addon by Novadesk. |
| `unload()` | `function` | Convenience method to unload this addon. Equivalent to `addon.unload(handle)`. |

Any additional properties and functions on the exports object are registered by the addon's own `NovadeskAddonInit` implementation.

<template #example>

```javascript
import { addon } from 'novadesk';

const handle = addon.load(path.join(__addonsPath, "my_addon.dll"));

if (handle === null) {
  console.error("Failed to load addon");
} else if (typeof handle === "number") {
  console.log("Addon already loaded with ID:", handle);
} else {
  console.log("Addon loaded, ID:", handle.__novadesk_addon_id);

  // Call a function the addon registered during NovadeskAddonInit
  // const result = handle.myFunction(arg1, arg2);
}
```

</template>
</MethodBox>

<MethodBox
  name="addon.unload(target)"
  badge="addon"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'target', type: 'object | number', optional: true, description: 'The exports handle returned by addon.load(), the numeric addon ID, or omitted when called as handle.unload().' }
  ]"
>
<template #returns><code>true</code> if the addon was found and successfully unloaded, <code>false</code> if no addon with that handle or ID exists.</template>

Unloads a previously loaded native addon. Calls the addon's `NovadeskAddonUnload` export if present, removes all registered functions, frees stored JS function handles, releases the exports object, and calls `FreeLibrary`.

Three calling conventions are supported:

```javascript
// Option 1: convenience method on the handle (no arguments)
handle.unload();

// Option 2: pass the handle object to the module method
addon.unload(handle);

// Option 3: pass the numeric addon ID
addon.unload(handle.__novadesk_addon_id);
```

Throws `TypeError` if the argument is provided but is neither a valid addon object (with `__novadesk_addon_id`) nor a number.

<template #example>

```javascript
import { addon } from 'novadesk';

const handle = addon.load(path.join(__addonsPath, "my_addon.dll"));

if (handle && typeof handle === "object") {
  // Use the addon...

  // Unload when done
  const ok = handle.unload();
  console.log("Unloaded:", ok); // true
}
```

</template>
</MethodBox>

## Practical Examples

**Load an addon and call a registered function**

```javascript
import { addon } from 'novadesk';

const audio = addon.load(path.join(__addonsPath, "AudioLevel.dll"));

if (!audio || typeof audio !== "object") {
  console.error("AudioLevel addon not available");
} else {
  // Functions registered by the addon via NovadeskAddonInit
  const level = audio.getVolume();
  console.log("Volume:", level);

  ipcMain.send("audio-level", { level });
}
```

**Conditionally load an addon**

```javascript
import { addon } from 'novadesk';
import * as fs from "fs";

const dllPath = path.join(__addonsPath, "BlurBehind.dll");

if (!fs.exists(dllPath)) {
  console.warn("BlurBehind addon not installed");
} else {
  const blur = addon.load(dllPath);
  if (blur && typeof blur === "object") {
    blur.enable();
    console.log("Blur behind enabled");
  }
}
```

**Unload on widget close**

```javascript
import { addon, widgetWindow } from 'novadesk';

const handle = addon.load(path.join(__addonsPath, "my_addon.dll"));

const win = new widgetWindow({ id: "demo", width: 300, height: 200 });

win.on("close", () => {
  if (handle && typeof handle === "object") {
    handle.unload();
    console.log("Addon unloaded");
  }
});
```

**Handle the already-loaded case**

```javascript
import { addon } from 'novadesk';

const result = addon.load(path.join(__addonsPath, "shared.dll"));

if (result === null) {
  console.error("Failed to load shared addon");
} else if (typeof result === "number") {
  // Loaded by another script — use the ID to reference it
  console.log("Shared addon already active, ID:", result);
} else {
  // Fresh load — exports object available
  console.log("Addon ready:", result.__novadesk_addon_id);
}
```
