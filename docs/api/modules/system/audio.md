---
title: audio
description: Master volume control and WAV audio playback.
---

# audio

Control the system master volume and play WAV sound files.

```javascript
import { audio } from "system";
```

::: info Availability
Available in the [Main script](/guides/script-types.html#main-script-the-brain) only.
:::

#### Table of Contents
[[toc]]

## Methods

<MethodBox
  name="audio.getVolume()"
  badge="audio"
  badgeType="core"
  returns="number"
>
<template #returns>Current master volume as an integer in the range <code>0–100</code>. Returns <code>0</code> if the audio device is unavailable.</template>

Returns the current master system volume level as an integer percentage. The value is rounded to the nearest integer.

::: info Returns 0 on failure
If the system audio device cannot be accessed (e.g. no audio hardware, COM failure), `getVolume` returns `0` — the same value as a silent device. There is no separate error indicator.
:::

<template #example>

```javascript
import { audio } from "system";

const vol = audio.getVolume();
console.log("Volume:", vol); // e.g. 75

// Use with a tray tooltip
appTray.setToolTip("Volume: " + vol + "%");
```

</template>
</MethodBox>

<MethodBox
  name="audio.setVolume(value)"
  badge="audio"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'value', type: 'number', description: 'Target volume as a percentage (0–100). Values below 0 are clamped to 0. Values above 100 are clamped to 100.' }
  ]"
>
<template #returns><code>true</code> if the volume was set successfully. <code>false</code> if the audio device is unavailable or the operation failed.</template>

Sets the master system volume. Values outside `0–100` are automatically clamped before being applied. Throws `TypeError` if no argument is provided.

<template #example>

```javascript
import { audio } from "system";

audio.setVolume(50);       // set to 50%
audio.setVolume(0);        // mute
audio.setVolume(100);      // max volume
audio.setVolume(-10);      // clamped to 0
audio.setVolume(150);      // clamped to 100

const ok = audio.setVolume(75);
if (!ok) {
  console.error("Failed to set volume — no audio device?");
}
```

</template>
</MethodBox>

<MethodBox
  name="audio.playSound(path [, loop])"
  badge="audio"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'path', type: 'string', description: 'Absolute path to a WAV file. Relative paths resolve from the process working directory, not from __dirname.' },
    { name: 'loop', type: 'boolean', optional: true, description: 'true to loop playback until stopSound() is called. Defaults to false.' }
  ]"
>
<template #returns><code>true</code> if playback started, <code>false</code> if the file was not found or could not be opened.</template>

Plays a WAV file asynchronously using the Win32 `PlaySoundW` API. Only WAV format is supported. Playing a new sound automatically stops any previously playing sound.

::: warning Absolute paths recommended
Pass an absolute path to guarantee the file is found. Use `path.join(__dirname, "alert.wav")` to build the full path. Relative paths are resolved by the OS relative to the process working directory, which may differ from your widget's directory.
:::

::: info Only WAV is supported
The underlying Win32 `PlaySoundW` API only supports `.wav` files. Other formats (MP3, OGG, etc.) will fail silently and return `false`.
:::

<template #example>

```javascript
import { audio } from "system";

// Play once
audio.playSound(path.join(__dirname, "alert.wav"));

// Loop until stopped
audio.playSound(path.join(__dirname, "ambient.wav"), true);

// Stop after 5 seconds
setTimeout(() => audio.stopSound(), 5000);
```

</template>
</MethodBox>

<MethodBox
  name="audio.stopSound()"
  badge="audio"
  badgeType="core"
  returns="boolean"
>
<template #returns>Always returns <code>true</code>.</template>

Stops any WAV sound currently playing via `audio.playSound()`. Safe to call even when nothing is playing.

<template #example>

```javascript
import { audio } from "system";

audio.playSound(path.join(__dirname, "alarm.wav"), true);

setTimeout(() => {
  audio.stopSound();
}, 3000);
```

</template>
</MethodBox>

## Practical Examples

**Volume control widget with tray scroll wheel**

```javascript
import { audio, tray } from "system";  // Note: tray is in novadesk module
import { tray as appTray } from "novadesk";

const t = new appTray(path.join(__dirname, "assets", "speaker.ico"));

function updateTip() {
  t.setToolTip("Volume: " + audio.getVolume() + "%");
}

updateTip();

t.on("scroll-up", () => {
  const vol = Math.min(100, audio.getVolume() + 5);
  audio.setVolume(vol);
  updateTip();
});

t.on("scroll-down", () => {
  const vol = Math.max(0, audio.getVolume() - 5);
  audio.setVolume(vol);
  updateTip();
});
```

**Play a notification sound on an event**

```javascript
import { audio } from "system";

ipcMain.on("alert", () => {
  audio.playSound(path.join(__dirname, "assets", "notify.wav"));
});
```

**Mute on widget open, restore on close**

```javascript
import { audio, widgetWindow } from "novadesk";
import { audio as sys } from "system";

const savedVolume = sys.getVolume();
sys.setVolume(0);

const win = new widgetWindow({ id: "demo", width: 300, height: 200, script: "script.ui.js" });

win.on("close", () => {
  sys.setVolume(savedVolume);
});
```
