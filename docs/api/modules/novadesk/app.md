---
title: app
---

# app

Control the Novadesk runtime, manage settings and logging preferences, query paths, and persist widget state across sessions.

```javascript
import { app } from 'novadesk';
```

::: info Availability
Available in the [Main script](/guides/script-types.html#main-script-the-brain) only.
:::

#### Table of Contents
[[toc]]

## Lifecycle

<MethodBox
  name="app.reload()"
  badge="app"
  badgeType="core"
>

Reloads all active widget scripts. Equivalent to `app.refresh()`.

<template #example>

```javascript
app.reload();
```

</template>
</MethodBox>

<MethodBox
  name="app.refresh()"
  badge="app"
  badgeType="core"
>

Alias of `app.reload()`. Reloads all active widget scripts.

<template #example>

```javascript
app.refresh();
```

</template>
</MethodBox>

<MethodBox
  name="app.exit()"
  badge="app"
  badgeType="core"
>

Exits the Novadesk application gracefully.

<template #example>

```javascript
app.exit();
```

</template>
</MethodBox>

<MethodBox
  name="app.requestSingleInstanceLock()"
  badge="app"
  badgeType="core"
  returns="boolean"
>
<template #returns><code>true</code> if the single-instance lock was acquired, <code>false</code> if another instance already holds it.</template>

Attempts to acquire the global single-instance mutex. Returns `true` on success. If another Novadesk instance already holds the lock, returns `false`. Use this when building standalone launcher widgets that should only run once.

<template #example>

```javascript
const hasLock = app.requestSingleInstanceLock();
if (!hasLock) {
  console.log("Another instance is already running");
  app.exit();
}
```

</template>
</MethodBox>

<MethodBox
  name="app.releaseSingleInstanceLock()"
  badge="app"
  badgeType="core"
  returns="boolean"
>
<template #returns>Always returns <code>true</code>.</template>

Releases the single-instance lock acquired by `app.requestSingleInstanceLock()`.

<template #example>

```javascript
app.releaseSingleInstanceLock();
```

</template>
</MethodBox>

<MethodBox
  name="app.isFirstRun()"
  badge="app"
  badgeType="core"
  returns="boolean"
>
<template #returns><code>true</code> on the first launch when no settings file exists, <code>false</code> on subsequent launches.</template>

Returns whether this is the first time Novadesk has been launched. Useful for showing onboarding UI or setting initial defaults.

<template #example>

```javascript
if (app.isFirstRun()) {
  console.log("Welcome! Running for the first time.");
  app.storage.set("ui.theme", "dark");
}
```

</template>
</MethodBox>

## Settings and Logging

For a full explanation of how these settings interact, see the [Logging](/api/logging.html) page.

<MethodBox
  name="app.enableDebugging(enable)"
  badge="app"
  badgeType="core"
  :parameters="[
    { name: 'enable', type: 'boolean', description: 'true to enable debug-level logging so console.debug() output becomes visible. false reverts to standard Info-level logging.' }
  ]"
>

Sets the global log level. When `true`, `console.debug()` output becomes visible in the log and console. Persisted to `settings.json`.

<template #example>

```javascript
app.enableDebugging(true);
console.debug("Diagnostic info now visible");
```

</template>
</MethodBox>

<MethodBox
  name="app.disableLogging(disable)"
  badge="app"
  badgeType="core"
  :parameters="[
    { name: 'disable', type: 'boolean', description: 'true to silence all log output (console and file). false resumes logging.' }
  ]"
>

Completely suppresses all logging output when `true`. Both console and file output are stopped. Persisted to `settings.json`.

<template #example>

```javascript
app.disableLogging(true);  // silence everything in production
```

</template>
</MethodBox>

<MethodBox
  name="app.saveLogToFile(enable)"
  badge="app"
  badgeType="core"
  :parameters="[
    { name: 'enable', type: 'boolean', description: 'true to append log output to logs.log in the AppData directory. false stops file logging.' }
  ]"
>

Enables or disables persistent log file output. When `true`, logs are appended to `logs.log` in the AppData directory. Persisted to `settings.json`.

<template #example>

```javascript
app.saveLogToFile(true);
console.log("Log path:", app.getLogPath());
```

</template>
</MethodBox>

<MethodBox
  name="app.useHardwareAcceleration(enable)"
  badge="app"
  badgeType="core"
  :parameters="[
    { name: 'enable', type: 'boolean', description: 'true to use Direct2D hardware rendering (default). false uses software rendering.' }
  ]"
>

Enables or disables Direct2D hardware acceleration. Persisted to `settings.json`.

::: warning Requires restart
This setting is saved immediately but only takes effect after restarting Novadesk.
:::

<template #example>

```javascript
app.useHardwareAcceleration(false); // switch to software rendering
```

</template>
</MethodBox>

## Paths and Version

<MethodBox
  name="app.getAppDataPath()"
  badge="app"
  badgeType="core"
  returns="string"
>
<template #returns>Absolute path to the Novadesk AppData directory, ending with a path separator.</template>

Returns the path to the Novadesk AppData folder used for settings, logs, and storage. In portable mode this is the executable directory. Otherwise it is `%APPDATA%\Novadesk\`.

<template #example>

```javascript
console.log(app.getAppDataPath());
// "C:/Users/Me/AppData/Roaming/Novadesk/"
```

</template>
</MethodBox>

<MethodBox
  name="app.getSettingsFilePath()"
  badge="app"
  badgeType="core"
  returns="string"
>
<template #returns>Absolute path to the active <code>settings.json</code> file.</template>

Returns the full path to the Novadesk settings file.

<template #example>

```javascript
console.log(app.getSettingsFilePath());
```

</template>
</MethodBox>

<MethodBox
  name="app.getLogPath()"
  badge="app"
  badgeType="core"
  returns="string"
>
<template #returns>Absolute path to <code>logs.log</code> if file logging is enabled, or an empty string if it is not.</template>

Returns the path to the current log file. Only non-empty when `app.saveLogToFile(true)` has been called or the `saveLogToFile` setting is enabled.

<template #example>

```javascript
const logPath = app.getLogPath();
if (logPath) {
  console.log("Logging to:", logPath);
}
```

</template>
</MethodBox>

<MethodBox
  name="app.isPortable()"
  badge="app"
  badgeType="core"
  returns="boolean"
>
<template #returns><code>true</code> when running in portable mode, <code>false</code> otherwise.</template>

Returns whether Novadesk is running in portable mode. Portable mode is detected at runtime based on whether the executable directory is writable and is not a system directory.

<template #example>

```javascript
if (app.isPortable()) {
  console.log("Portable mode — data stored next to the exe");
}
```

</template>
</MethodBox>

<MethodBox
  name="app.getProductVersion()"
  badge="app"
  badgeType="core"
  returns="string"
>
<template #returns>The product version string from the executable's version resources.</template>

Returns the product version. For widgets packaged with `nwm`, this reports the version from `meta.json`.

<template #example>

```javascript
console.log("Version:", app.getProductVersion()); // e.g. "1.2.0.0"
```

</template>
</MethodBox>

<MethodBox
  name="app.getFileVersion()"
  badge="app"
  badgeType="core"
  returns="string"
>
<template #returns>The file version string from the executable's version resources.</template>

Returns the file version from the executable. For `nwm`-packaged widgets, this reports the value from `meta.json`.

<template #example>

```javascript
console.log("File version:", app.getFileVersion());
```

</template>
</MethodBox>

<MethodBox
  name="app.getNovadeskVersion()"
  badge="app"
  badgeType="core"
  returns="string"
>
<template #returns>The hardcoded Novadesk engine version string.</template>

Returns the Novadesk engine version. This is always the engine version, even inside `nwm`-packaged widgets where `getProductVersion()` would return the widget's own version.

<template #example>

```javascript
console.log("Engine:", app.getNovadeskVersion()); // e.g. "0.9.9.0"
```

</template>
</MethodBox>

## Storage

`app.storage` is a simple persistent key/value store. Values are JSON-serialized and saved to `storage.json` in the AppData directory. Keys are strings; values can be any JSON-serializable type.

::: info Read-modify-write on every call
Each `set` and `remove` call reads the full `storage.json` file, applies the change in memory, and writes the entire file back. For high-frequency updates, batch changes or use the `fs` module to manage your own storage file.
:::

<MethodBox
  name="app.storage.get(key [, defaultValue])"
  badge="storage"
  badgeType="core"
  returns="any"
  :parameters="[
    { name: 'key', type: 'string', description: 'Storage key to read. Throws TypeError if not a string.' },
    { name: 'defaultValue', type: 'any', optional: true, description: 'Returned when the key does not exist. Defaults to undefined.' }
  ]"
>
<template #returns>The stored value if the key exists, otherwise <code>defaultValue</code> or <code>undefined</code>.</template>

Reads a value from persistent storage. Loads the storage file fresh on every call.

<template #example>

```javascript
const theme = app.storage.get("ui.theme", "dark");
const count = app.storage.get("session.count", 0);
const profile = app.storage.get("profile"); // undefined if not set
```

</template>
</MethodBox>

<MethodBox
  name="app.storage.set(key, value)"
  badge="storage"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'key', type: 'string', description: 'Storage key to write. Throws TypeError if not a string.' },
    { name: 'value', type: 'any', description: 'JSON-serializable value to store. Overwrites any existing value at this key.' }
  ]"
>
<template #returns><code>true</code> if the value was saved successfully, <code>false</code> if the file could not be written.</template>

Writes a value to persistent storage. Creates the storage file if it does not exist.

<template #example>

```javascript
app.storage.set("ui.theme", "dark");
app.storage.set("profile", { name: "Alice", pro: true });
app.storage.set("session.count", 42);
```

</template>
</MethodBox>

<MethodBox
  name="app.storage.remove(key)"
  badge="storage"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'key', type: 'string', description: 'Storage key to delete. Throws TypeError if not a string.' }
  ]"
>
<template #returns><code>true</code> if the key existed and was removed and the file was saved successfully. <code>false</code> if the key was not found or the file could not be written.</template>

Deletes a key from persistent storage.

<template #example>

```javascript
const removed = app.storage.remove("session.count");
if (!removed) {
  console.log("Key did not exist");
}
```

</template>
</MethodBox>
