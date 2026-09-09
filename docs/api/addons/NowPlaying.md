---
title: Read and control media sessions with the NowPlaying addon.
description: Read media session metadata and control playback.
---

# NowPlaying Addon

Read active media session metadata and control playback. For volume control, see [audio](/api/modules/system/audio) and [AppVolume](/api/addons/AppVolume) — play, pause, skip, seek, shuffle, and repeat.

## What is NowPlaying?

The **NowPlaying** addon lets you interact with whatever media is currently playing on your computer — whether it's Spotify, YouTube in a browser, Windows Media Player, or any app that uses the Windows SMTC (System Media Transport Controls) API.

You can:

- **Read** the current track's title, artist, album, and thumbnail
- **Control** playback — play, pause, stop, skip tracks, seek
- **Toggle** shuffle and repeat modes

## Getting Started

First, load the addon in your script:

```javascript
import { addon } from "novadesk";

// Load the NowPlaying addon DLL
const nowPlaying = addon.load("path/to/NowPlaying.dll");
```

::: tip
Replace `"path/to/NowPlaying.dll"` with the actual path to the `NowPlaying.dll` file on your system.
:::

#### Table of Contents
[[toc]]

## Quick Example

Here is a minimal example that shows what's currently playing:

```javascript
import { addon } from "novadesk";
const nowPlaying = addon.load("path/to/NowPlaying.dll");

const s = nowPlaying.stats();
if (s.available) {
  console.log(`${s.artist} - ${s.title}`);
  console.log(`Progress: ${s.progress}%`);
} else {
  console.log("Nothing is playing right now");
}
```

<MethodBox
  name="nowPlaying.stats([options])"
  badge="NowPlaying"
  badgeType="core"
  returns="object"
  :parameters="[
    { name: 'options', type: 'object', optional: true, description: 'Optional config. Accepts includeThumbnail (boolean, default true) and includeGenres (boolean, default true).' }
  ]"
>
<template #returns>An object with media session details. Always returns an object — check <code>available</code> before using other fields.</template>

Returns current media session metadata. Call on a short interval (500–1000ms) to keep the UI updated.

**Options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `includeThumbnail` | `boolean` | `true` | Whether to include the thumbnail path in the result. Set to `false` for faster response. |
| `includeGenres` | `boolean` | `true` | Whether to include genre information. Set to `false` if not needed. |

**Return value properties:**

| Property | Type | Description |
|---|---|---|
| `available` | `boolean` | `true` when a media session is active. Check this first! |
| `player` | `string` | Player/app name (e.g. `"Spotify"`, `"Chrome"`). |
| `artist` | `string` | Track artist. |
| `album` | `string` | Track album. |
| `title` | `string` | Track title. |
| `thumbnail` | `string` | Cached thumbnail path, or empty string. Only present when `includeThumbnail` is `true`. |
| `duration` | `number` | Track duration in seconds. |
| `position` | `number` | Current playback position in seconds. |
| `progress` | `number` | Playback progress from `0` to `100`. |
| `state` | `number` | `0` = stopped/unknown, `1` = playing, `2` = paused. |
| `status` | `number` | `0` = closed, `1` = opened. |
| `shuffle` | `boolean` | Whether shuffle is enabled. |
| `repeat` | `boolean` | Whether repeat is enabled. |
| `genres` | `string` | Genre information (when `includeGenres` is `true`). |

<template #example>

```javascript
const s = nowPlaying.stats();

if (s.available) {
  console.log(s.artist, "-", s.title);
  console.log("Progress:", s.progress + "%");

  // Check playback state
  if (s.state === 1) console.log("Playing");
  else if (s.state === 2) console.log("Paused");
  else console.log("Stopped");
} else {
  console.log("Nothing playing");
}
```

</template>
</MethodBox>

<MethodBox
  name="nowPlaying.backend()"
  badge="NowPlaying"
  badgeType="core"
  returns="string"
>
<template #returns><code>"smtc_v2"</code> when the backend is active, <code>"disabled"</code> otherwise.</template>

Returns the active backend name. Useful for checking if the NowPlaying addon is functional on this system.

<template #example>

```javascript
console.log("Backend:", nowPlaying.backend());
// Output: "smtc_v2" if active, "disabled" if not
```

</template>
</MethodBox>

## Playback Controls

All playback control functions return `true` if the action was queued (backend is enabled), `false` otherwise.

::: tip
These controls send commands to the active media session. If no media is playing, the commands are simply ignored.
:::

<MethodBox
  name="nowPlaying.play()"
  badge="NowPlaying"
  badgeType="core"
  returns="boolean"
>
<template #returns><code>true</code> if the command was sent to the active session.</template>

Sends a play command to the active media session.

<template #example>

```javascript
nowPlaying.play();
```

</template>
</MethodBox>

<MethodBox
  name="nowPlaying.pause()"
  badge="NowPlaying"
  badgeType="core"
  returns="boolean"
>
<template #returns><code>true</code> if the command was sent to the active session.</template>

Sends a pause command to the active media session.

<template #example>

```javascript
nowPlaying.pause();
```

</template>
</MethodBox>

<MethodBox
  name="nowPlaying.playPause()"
  badge="NowPlaying"
  badgeType="core"
  returns="boolean"
>
<template #returns><code>true</code> if the command was sent to the active session.</template>

Toggles play/pause on the active media session. This is the most common control — it plays if paused, pauses if playing.

<template #example>

```javascript
nowPlaying.playPause();
```

</template>
</MethodBox>

<MethodBox
  name="nowPlaying.stop()"
  badge="NowPlaying"
  badgeType="core"
  returns="boolean"
>
<template #returns><code>true</code> if the command was sent to the active session.</template>

Stops the active media session.

<template #example>

```javascript
nowPlaying.stop();
```

</template>
</MethodBox>

<MethodBox
  name="nowPlaying.next()"
  badge="NowPlaying"
  badgeType="core"
  returns="boolean"
>
<template #returns><code>true</code> if the command was sent to the active session.</template>

Skips to the next track.

<template #example>

```javascript
nowPlaying.next();
```

</template>
</MethodBox>

<MethodBox
  name="nowPlaying.previous()"
  badge="NowPlaying"
  badgeType="core"
  returns="boolean"
>
<template #returns><code>true</code> if the command was sent to the active session.</template>

Goes to the previous track.

<template #example>

```javascript
nowPlaying.previous();
```

</template>
</MethodBox>

<MethodBox
  name="nowPlaying.setPosition(value [, isPercent])"
  badge="NowPlaying"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'value', type: 'number', description: 'Position in seconds, or 0–100 percent if isPercent is true. Throws TypeError if not a number.' },
    { name: 'isPercent', type: 'boolean', optional: true, description: 'true to interpret value as a percentage of track duration. Defaults to false.' }
  ]"
>
<template #returns><code>true</code> if the seek command was sent, <code>false</code> otherwise.</template>

Seeks to a position in the current track. You can specify the position in seconds or as a percentage.

<template #example>

```javascript
// Seek to 30 seconds into the track
nowPlaying.setPosition(30);

// Seek to 50% of the track
nowPlaying.setPosition(50, true);
```

</template>
</MethodBox>

<MethodBox
  name="nowPlaying.setShuffle(enabled)"
  badge="NowPlaying"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'enabled', type: 'boolean', description: 'true to enable shuffle, false to disable.' }
  ]"
>
<template #returns><code>true</code> if the command was sent.</template>

Sets the shuffle state of the active media session.

<template #example>

```javascript
nowPlaying.setShuffle(true);  // Enable shuffle
nowPlaying.setShuffle(false); // Disable shuffle
```

</template>
</MethodBox>

<MethodBox
  name="nowPlaying.setRepeat(mode)"
  badge="NowPlaying"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'mode', type: 'number', description: '0 = no repeat, 1 = repeat one track, 2 = repeat all. Throws TypeError if not a number.' }
  ]"
>
<template #returns><code>true</code> if the command was sent.</template>

Sets the repeat mode of the active media session.

**Repeat modes:**

| Value | Meaning |
|---|---|
| `0` | No repeat |
| `1` | Repeat current track |
| `2` | Repeat all tracks |

<template #example>

```javascript
nowPlaying.setRepeat(2); // Repeat all tracks
nowPlaying.setRepeat(1); // Repeat current track
nowPlaying.setRepeat(0); // No repeat
```

</template>
</MethodBox>

## Full Example

Here is a complete example that creates a simple media info display with playback controls:

```javascript
import { addon } from "novadesk";
const nowPlaying = addon.load("path/to/NowPlaying.dll");

// Poll for media info every 1 second
setInterval(() => {
  const s = nowPlaying.stats();

  if (s.available) {
    console.log("Now Playing:");
    console.log(`  ${s.artist} - ${s.title}`);
    console.log(`  Album: ${s.album}`);
    console.log(`  Progress: ${s.progress}%`);
    console.log(`  State: ${s.state === 1 ? "Playing" : s.state === 2 ? "Paused" : "Stopped"}`);
    console.log(`  Shuffle: ${s.shuffle}, Repeat: ${s.repeat}`);
  } else {
    console.log("No media session active");
  }
}, 1000);

// Example playback controls
// nowPlaying.playPause();     // Toggle play/pause
// nowPlaying.next();          // Skip to next track
// nowPlaying.previous();      // Go to previous track
// nowPlaying.setPosition(30); // Seek to 30 seconds
// nowPlaying.setShuffle(true); // Enable shuffle
// nowPlaying.setRepeat(2);    // Repeat all
```
