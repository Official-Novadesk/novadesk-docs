---
title: Set and read the desktop wallpaper with the wallpaper module.
description: Get and set the desktop wallpaper.
---

# wallpaper Module

Set the Windows desktop wallpaper from a file path, choose how it is displayed, and read back the path of the currently active wallpaper.

```javascript
import { wallpaper } from "system";
```

::: info Availability
Available in the [Main script](/guides/script-types.html#main-script-the-brain) only.
:::

#### Table of Contents
[[toc]]

## Methods

<MethodBox
  name="wallpaper.set(path [, style])"
  badge="wallpaper"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'path', type: 'string', description: 'Absolute path to the image file to use as the desktop wallpaper.' },
    { name: 'style', type: 'string', optional: true, description: 'How the image should be displayed on the desktop. Defaults to fill.' }
  ]"
>
<template #returns><code>true</code> if the wallpaper was applied successfully, <code>false</code> otherwise.</template>

Sets the desktop wallpaper to the specified image file. The change takes effect immediately and persists across reboots.

Under the hood, the style is applied by writing `WallpaperStyle` and `TileWallpaper` to `HKEY_CURRENT_USER\Control Panel\Desktop` before calling `SystemParametersInfo`.

**Style options:**

| Value | Behavior |
|---|---|
| `fill` | Scales the image to fill the screen, cropping the sides or top/bottom as needed. **(default)** |
| `fit` | Scales the image to fit entirely within the screen, preserving aspect ratio. May show background color on the edges. |
| `stretch` | Stretches the image to exactly fill the screen, ignoring aspect ratio. |
| `tile` | Repeats the image in a grid pattern across the desktop. |
| `center` | Displays the image at its original pixel size, centered on the desktop. |
| `span` | Spans the image across all connected monitors as a single canvas. |

::: tip
`fill` is the Windows default and looks best for landscape photos. Use `span` for panoramic or ultra-wide images across multi-monitor setups.
:::

<template #example>

```javascript
import { wallpaper } from "system";

// Set with default style (fill)
const ok = wallpaper.set("C:\\Wallpapers\\landscape.jpg");
console.log("Wallpaper set:", ok);

// Set with explicit style
wallpaper.set("C:\\Wallpapers\\portrait.png", "fit");
wallpaper.set("C:\\Wallpapers\\pattern.png", "tile");
wallpaper.set("C:\\Wallpapers\\panorama.jpg", "span");

// Check the result
if (!wallpaper.set("C:\\Wallpapers\\photo.jpg", "fill")) {
  console.error("Failed to set wallpaper — check the file path");
}
```

</template>
</MethodBox>

<MethodBox
  name="wallpaper.getCurrentPath()"
  badge="wallpaper"
  badgeType="core"
  returns="string"
>
<template #returns>The file path of the currently active desktop wallpaper, or an empty string if unavailable or no wallpaper is set.</template>

Returns the absolute file path of the wallpaper currently displayed on the desktop. Uses `SystemParametersInfo` with `SPI_GETDESKWALLPAPER` internally.

<template #example>

```javascript
import { wallpaper } from "system";

const current = wallpaper.getCurrentPath();
if (current) {
  console.log("Current wallpaper:", current);
  // e.g. "C:\Users\User\Pictures\Wallpapers\photo.jpg"
} else {
  console.log("No wallpaper is currently set");
}

// Swap wallpapers and keep track of the previous one
function swapWallpaper(newPath, style = "fill") {
  const previous = wallpaper.getCurrentPath();
  const ok = wallpaper.set(newPath, style);
  if (ok) {
    console.log("Swapped from:", previous || "(none)");
    console.log("Swapped to:  ", newPath);
    return previous; // Caller can restore it later
  }
  return null;
}

const previous = swapWallpaper("C:\\Wallpapers\\new.jpg");
// To restore: wallpaper.set(previous);
```

</template>
</MethodBox>

## Practical Examples

### Wallpaper Rotation

Cycle through a list of wallpapers at a set interval:

```javascript
import { wallpaper } from "system";

const images = [
  "C:\\Wallpapers\\morning.jpg",
  "C:\\Wallpapers\\afternoon.jpg",
  "C:\\Wallpapers\\evening.jpg",
  "C:\\Wallpapers\\night.jpg",
];

let index = 0;

function rotateWallpaper() {
  const path = images[index % images.length];
  const ok = wallpaper.set(path, "fill");
  if (ok) {
    console.log("Now showing:", path);
  }
  index++;
}

// Change wallpaper every 30 minutes
rotateWallpaper();
setInterval(rotateWallpaper, 30 * 60 * 1000);
```

### Time-of-Day Wallpaper

Automatically choose a wallpaper that matches the current time of day:

```javascript
import { wallpaper } from "system";
import { time } from "system";

const wallpaperMap = {
  morning:   "C:\\Wallpapers\\sunrise.jpg",
  afternoon: "C:\\Wallpapers\\afternoon.jpg",
  evening:   "C:\\Wallpapers\\sunset.jpg",
  night:     "C:\\Wallpapers\\night.jpg",
};

function updateWallpaperForTime() {
  const hour = parseInt(time.time("%H"), 10);

  let period;
  if (hour >= 5 && hour < 12)       period = "morning";
  else if (hour >= 12 && hour < 17) period = "afternoon";
  else if (hour >= 17 && hour < 20) period = "evening";
  else                               period = "night";

  const target = wallpaperMap[period];
  const current = wallpaper.getCurrentPath();

  if (current !== target) {
    wallpaper.set(target, "fill");
    console.log("Wallpaper updated for", period, "→", target);
  }
}

// Check every 5 minutes
setInterval(updateWallpaperForTime, 5 * 60 * 1000);
updateWallpaperForTime();
```

**Notes:**

- `path` must be an absolute file path. Relative paths are not resolved automatically
- The wallpaper change is persistent — it survives reboots because the registry and INI settings are updated (`SPIF_UPDATEINIFILE | SPIF_SENDWININICHANGE`)
- `wallpaper.set` throws a `TypeError` synchronously if `path` is not provided
- `wallpaper.getCurrentPath()` returns an empty string (not `null`) when no wallpaper is set or the path is unavailable
- Supported image formats depend on Windows — common formats (JPEG, PNG, BMP, GIF, TIFF) work on all modern Windows versions
