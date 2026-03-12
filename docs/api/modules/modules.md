---
title: Modules Overview
---

# Modules
Use modules to access system features and Novadesk runtime features from your script.

#### Table of Contents
[[toc]]

## Quick Start

Import modules with ES module syntax:

```javascript
import { app, tray, widgetWindow } from "novadesk";
import { cpu, memory, webFetch } from "system";
```

Use this page as a map. Open each module page for full API details and examples.

::: info Script Context
Some APIs are Main-script-only. If a method is unavailable in your script, check [Script Types](/guides/script-types.html) and the note on the module's own page.
:::

## Import Your Own Files as Modules

You can split widget logic into multiple local files and import them with relative paths.

### 1) Export from your custom file

```javascript
// utils/format.js
export function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}
```

### 2) Import it where you need it

```javascript
// index.js
import { formatBytes } from "./utils/format.js";
import { memory } from "system";

const used = memory.getUsed();
console.log("Used RAM:", formatBytes(used));
```

### Notes

- Use relative import paths such as `./module.js` or `../shared/module.js`.
- Keep file extensions explicit (recommended: `.js`) to avoid path resolution confusion.
- Relative imports are resolved from the importing file's location.
- You can mix custom modules with built-in modules (`novadesk`, `system`, `fs`) in the same script.

## Module Families

### `fs` module
File-system APIs for reading/writing files and managing directories.

- [fs](/api/modules/fs.html): Read, write, copy, rename, list, and inspect files/directories.

### `novadesk` module
Runtime and app-control APIs.

- [app](/api/modules/novadesk/app.html): App lifecycle, logging, version and paths.
- [tray](/api/modules/novadesk/tray.html): System tray constructor, menu control, and events.
- [widgetWindow](/api/modules/novadesk/widgetWindow.html): Create and manage widget windows.
- [addon](/api/modules/novadesk/addon.html): Load and manage native C++ DLL addons.

### `system` module
Windows/system integration APIs.

- [audio](/api/modules/system/audio.html): Master volume and WAV playback.
- [audioLevel](/api/modules/system/audioLevel.html): Read live output/input levels.
- [appVolume](/api/modules/system/appVolume.html): Control per-app audio sessions.
- [brightness](/api/modules/system/brightness.html): Read brightness capability status.
- [clipboard](/api/modules/system/clipboard.html): Read and write clipboard text.
- [cpu](/api/modules/system/cpu.html): Read CPU usage metrics.
- [disk](/api/modules/system/disk.html): Read disk usage information.
- [displayMetrics](/api/modules/system/displayMetrics.html): Read monitor and desktop bounds.
- [env](/api/modules/system/env.html): Read environment variables.
- [execute](/api/modules/system/execute.html): Launch files, apps, and URLs.
- [fileIcon](/api/modules/system/fileIcon.html): Extract file icons to `.ico`.
- [hotkey](/api/modules/system/hotkey.html): Register global keyboard hotkeys.
- [json](/api/modules/system/json.html): Parse/stringify plus JSON file helpers.
- [memory](/api/modules/system/memory.html): Read RAM usage metrics.
- [mouse](/api/modules/system/mouse.html): Read cursor coordinates.
- [network](/api/modules/system/network.html): Read network throughput and totals.
- [power](/api/modules/system/power.html): Read battery and power state.
- [registry](/api/modules/system/registry.html): Read and write Windows registry values.
- [wallpaper](/api/modules/system/wallpaper.html): Get/set desktop wallpaper.
- [webFetch](/api/modules/system/webfetch.html): Read text from web URLs and files.

## Notes and Best Practices

- Keep UI scripts focused on rendering and interaction. Put heavy system calls in Main script and pass results with IPC.
- For polling APIs (CPU, memory, network, now playing), use sensible intervals (for example `500-2000ms`) to avoid unnecessary overhead.
- Validate inputs before writing system state (volume, registry, wallpaper paths).
- Wrap external operations (`execute`, `webFetch`, file/registry writes) in error handling and log failures for easier debugging.
- Use stable window IDs in `widgetWindow` so user position and state can persist correctly.
