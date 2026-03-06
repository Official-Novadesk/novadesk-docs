---
title: Load and manage native C++ addons with the addon module.
---

# addon

The `addon` object lets you load and manage native C++ addons (DLLs) at runtime. Use it to extend Novadesk with performance-critical or platform-specific native code.

`addon` is exported from the `novadesk` module.

```javascript
import { addon } from 'novadesk';
```

#### Table of Contents
[[toc]]

## `addon.load(path)`

Loads a native addon DLL into the Novadesk runtime. If the addon is already loaded, Novadesk returns the existing handle (same context) or the addon ID (other contexts) without reloading.

The DLL must export a `NovadeskAddonInit` function. An optional `NovadeskAddonUnload` export is called during cleanup.

### Parameters

- **`path`** (`string`): Path to the `.dll` file. Relative paths are resolved from the entry script directory.

### Return Value

- **Type**: `object | number | null`
- **Description**:
  - The addon's exports object on first successful load (whatever the addon registered). Novadesk injects `__novadesk_addon_id` and an `unload()` helper; if the addon returns a non-object, Novadesk wraps it under `value`.
  - If the addon was already loaded in the same script context, the existing exports object is returned.
  - If the addon was loaded in another context, the numeric addon ID is returned.
  - `null` if the DLL could not be loaded or is missing the required `NovadeskAddonInit` export.

### Example

```javascript
import { addon } from 'novadesk';

const handle = addon.load("./my_addon.dll");
if (handle && typeof handle === "object") {
  console.log("Addon ready:", handle);
  // handle.__novadesk_addon_id is available
  // handle.unload() is injected for convenience
}
```

## `addon.unload(target?)`

Unloads a previously loaded native addon. Calls the addon’s `NovadeskAddonUnload` export (if present), removes registered functions, releases the exports object, and frees the DLL.

### Parameters

- **`target`** (`object | number`, optional): The exports handle returned by `addon.load()` or the numeric addon ID. When invoked as `handle.unload()` you can omit this parameter.

### Return Value

- **Type**: `boolean`
- **Description**: `true` if the addon was found and unloaded; `false` if no addon with that handle/ID exists.

### Example

```javascript
import { addon } from 'novadesk';

const handle = addon.load("./my_addon.dll");

// ... use the addon ...

// Option 1: use the helper on the handle
const ok1 = handle.unload();

// Option 2: unload via module function with handle or ID
const ok2 = addon.unload(handle);
// or addon.unload(handle.__novadesk_addon_id);

console.log("Unloaded:", ok1 && ok2);
```

::: tip
Looking to build your own native addon? See the [Addon SDK Developer Guide](/developers/api/addon-api).
:::
