---
title: Read and control media sessions with the NowPlaying addon.
---

# NowPlaying Addon

Read active media session metadata and control playback — play, pause, skip, seek, shuffle, and repeat.

```javascript
import { addon } from "novadesk";
const nowPlaying = addon.load("path/to/NowPlaying.dll");
```

#### Table of Contents
[[toc]]

---

<MethodBox
  name="nowPlaying.stats()"
  badge="NowPlaying"
  badgeType="core"
  returns="object"
>
<template #returns>An object with media session details. Always returns an object — check <code>available</code> before using other fields.</template>

Returns current media session metadata. Call on a short interval (500–1000ms) to keep the UI updated.

| Property | Type | Description |
|---|---|---|
| `available` | `boolean` | `true` when a media session is active. |
| `player` | `string` | Player/app name. |
| `artist` | `string` | Track artist. |
| `album` | `string` | Track album. |
| `title` | `string` | Track title. |
| `thumbnail` | `string` | Cached thumbnail path, or empty string. |
| `duration` | `number` | Track duration in seconds. |
| `position` | `number` | Current playback position in seconds. |
| `progress` | `number` | Playback progress `0–100`. |
| `state` | `number` | `0` = stopped/unknown, `1` = playing, `2` = paused. |
| `status` | `number` | `0` = closed, `1` = opened. |
| `shuffle` | `boolean` | Shuffle state. |
| `repeat` | `boolean` | Repeat state. |

<template #example>

```javascript
const s = nowPlaying.stats();

if (s.available) {
  console.log(s.artist, "-", s.title);
  console.log("Progress:", s.progress + "%");
} else {
  console.log("Nothing playing");
}
```

</template>
</MethodBox>

---

<MethodBox
  name="nowPlaying.backend()"
  badge="NowPlaying"
  badgeType="core"
  returns="string"
>
<template #returns><code>"winrt"</code> when the backend is active, <code>"disabled"</code> otherwise.</template>

Returns the active backend name.

<template #example>

```javascript
console.log("Backend:", nowPlaying.backend());
```

</template>
</MethodBox>

---

## Playback Controls

All playback control functions return `true` if the action was queued (backend is enabled), `false` otherwise.

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

---

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

---

<MethodBox
  name="nowPlaying.playPause()"
  badge="NowPlaying"
  badgeType="core"
  returns="boolean"
>
<template #returns><code>true</code> if the command was sent to the active session.</template>

Toggles play/pause on the active media session.

<template #example>

```javascript
nowPlaying.playPause();
```

</template>
</MethodBox>

---

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

---

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

---

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

---

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

Seeks to a position in the current track.

<template #example>

```javascript
// Seek to 30 seconds
nowPlaying.setPosition(30);

// Seek to 50% of the track
nowPlaying.setPosition(50, true);
```

</template>
</MethodBox>

---

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
nowPlaying.setShuffle(true);
```

</template>
</MethodBox>

---

<MethodBox
  name="nowPlaying.toggleShuffle()"
  badge="NowPlaying"
  badgeType="core"
  returns="boolean"
>
<template #returns><code>true</code> if the command was sent.</template>

Toggles shuffle on the active media session.

<template #example>

```javascript
nowPlaying.toggleShuffle();
```

</template>
</MethodBox>

---

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

<template #example>

```javascript
nowPlaying.setRepeat(2); // repeat all
nowPlaying.setRepeat(0); // no repeat
```

</template>
</MethodBox>
