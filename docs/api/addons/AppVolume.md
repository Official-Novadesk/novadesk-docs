---
title: Control per-application audio sessions with the AppVolume addon.
description: "Control per-application audio sessions: volume, mute, and peak levels."
---

# AppVolume Addon

Read and control Windows audio sessions per application. For system-wide volume, see the [audio module](/api/modules/system/audio) — ideal for per-app volume sliders and mute toggles.

## What is AppVolume?

The **AppVolume** addon lets you interact with every app that is currently playing sound on your computer. You can:

- **List** all active audio sessions (e.g. Chrome, Spotify, Discord)
- **Get** the current volume, peak level, and mute state for any app
- **Set** the volume or mute/unmute any app individually

Think of it like the Windows Volume Mixer, but from your NovaDesk widget script.

## Getting Started

First, load the addon in your script:

```javascript
import { addon } from "novadesk";

// Load the AppVolume addon DLL
const appVolume = addon.load("path/to/AppVolume.dll");
```

::: tip
Replace `"path/to/AppVolume.dll"` with the actual path to the `AppVolume.dll` file on your system. If the DLL is in the same folder as your script, you can use just `"AppVolume.dll"`.
:::

::: info
This API comes from the AppVolume addon, not the built-in `system` module.
:::

#### Table of Contents
[[toc]]

## Quick Example

Here is a minimal example that lists all active audio sessions and prints their names and volumes:

```javascript
import { addon } from "novadesk";
const appVolume = addon.load("path/to/AppVolume.dll");

// Get all apps currently playing audio
const sessions = appVolume.listSessions();

for (const s of sessions) {
  console.log(`${s.processName}: volume ${Math.round(s.volume * 100)}%`);
}
```

<MethodBox
  name="appVolume.listSessions()"
  badge="AppVolume"
  badgeType="core"
  returns="object[]"
>
<template #returns>Array of audio session objects. Returns an empty array if enumeration fails.</template>

Returns all active Windows output audio sessions. Each session maps to an application currently playing (or having recently played) audio.

**How it works internally:** This function connects to the Windows audio session manager, enumerates every active session on the default audio output device, and collects details about each one.

Each session object has:

| Property | Type | Description |
|---|---|---|
| `pid` | `number` | Process ID — a unique number Windows assigns to each running app. |
| `processName` | `string` | Executable file name (e.g. `chrome.exe`). |
| `fileName` | `string` | Executable file name (same as `processName`). |
| `filePath` | `string` | Full executable path when available (e.g. `C:\Program Files\...`). |
| `iconPath` | `string` | Path to a cached `.ico` file of the app's icon, or empty string if unavailable. |
| `displayName` | `string` | Session display name set by the app. |
| `volume` | `number` | Session volume from `0.0` (silent) to `1.0` (full volume). |
| `peak` | `number` | Current audio peak level from `0.0` to `1.0`. |
| `muted` | `boolean` | Whether the session is muted. |

<template #example>

```javascript
const sessions = appVolume.listSessions();
console.log("Active sessions:", sessions.length);

for (const s of sessions) {
  console.log(s.processName, "vol:", s.volume, "muted:", s.muted);
}
```

</template>
</MethodBox>

<MethodBox
  name="appVolume.getByPid(pid)"
  badge="AppVolume"
  badgeType="core"
  returns="object | null"
  :parameters="[
    { name: 'pid', type: 'number', description: 'Target process ID. Must be greater than 0.' }
  ]"
>
<template #returns>Aggregated volume info for matching sessions, or <code>null</code> if no session matches the PID.</template>

Gets aggregated volume details for all sessions belonging to a process ID. If an app has multiple audio sessions (e.g. multiple tabs in a browser), this combines them into one result.

The returned object has:

| Property | Type | Description |
|---|---|---|
| `volume` | `number` | Average volume across all matching sessions (`0.0–1.0`). |
| `muted` | `boolean` | `true` if **any** matching session is muted. |
| `peak` | `number` | Maximum peak level across all matching sessions. |

<template #example>

```javascript
const sessions = appVolume.listSessions();
const s = sessions[0];

// Get aggregated info by process ID
const info = appVolume.getByPid(s.pid);
if (info) {
  console.log("Volume:", info.volume, "Muted:", info.muted);
}
```

</template>
</MethodBox>

<MethodBox
  name="appVolume.getByProcessName(name)"
  badge="AppVolume"
  badgeType="core"
  returns="object | null"
  :parameters="[
    { name: 'name', type: 'string', description: 'Process name to match (case-insensitive), e.g. chrome.exe.' }
  ]"
>
<template #returns>Aggregated volume info for matching sessions, or <code>null</code> if no session matches the name.</template>

Same as `getByPid()` but matches by process name instead of PID. The comparison is case-insensitive, so `"spotify.exe"` and `"Spotify.exe"` both work.

<template #example>

```javascript
const info = appVolume.getByProcessName("Spotify.exe");
if (info) console.log("Spotify volume:", info.volume);
```

</template>
</MethodBox>

<MethodBox
  name="appVolume.setVolumeByPid(pid, volume01)"
  badge="AppVolume"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'pid', type: 'number', description: 'Target process ID. Must be greater than 0.' },
    { name: 'volume01', type: 'number', description: 'Target volume from 0.0 (silent) to 1.0 (full). Values outside this range are clamped.' }
  ]"
>
<template #returns><code>true</code> if at least one matching session was updated, <code>false</code> otherwise.</template>

Sets the volume for all audio sessions belonging to a process ID.

<template #example>

```javascript
const s = appVolume.listSessions()[0];
appVolume.setVolumeByPid(s.pid, 0.5); // Set to 50%
```

</template>
</MethodBox>

<MethodBox
  name="appVolume.setVolumeByProcessName(name, volume01)"
  badge="AppVolume"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'name', type: 'string', description: 'Process name to match (case-insensitive).' },
    { name: 'volume01', type: 'number', description: 'Target volume from 0.0 (silent) to 1.0 (full). Values outside this range are clamped.' }
  ]"
>
<template #returns><code>true</code> if at least one matching session was updated, <code>false</code> otherwise.</template>

Sets the volume for all audio sessions matching a process name.

<template #example>

```javascript
appVolume.setVolumeByProcessName("chrome.exe", 0.3); // Set Chrome to 30%
```

</template>
</MethodBox>

<MethodBox
  name="appVolume.setMuteByPid(pid, mute)"
  badge="AppVolume"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'pid', type: 'number', description: 'Target process ID. Must be greater than 0.' },
    { name: 'mute', type: 'boolean', description: 'true to mute, false to unmute.' }
  ]"
>
<template #returns><code>true</code> if at least one matching session was updated, <code>false</code> otherwise.</template>

Mutes or unmutes all audio sessions belonging to a process ID.

<template #example>

```javascript
const s = appVolume.listSessions()[0];
appVolume.setMuteByPid(s.pid, true); // Mute this app
```

</template>
</MethodBox>

<MethodBox
  name="appVolume.setMuteByProcessName(name, mute)"
  badge="AppVolume"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'name', type: 'string', description: 'Process name to match (case-insensitive).' },
    { name: 'mute', type: 'boolean', description: 'true to mute, false to unmute.' }
  ]"
>
<template #returns><code>true</code> if at least one matching session was updated, <code>false</code> otherwise.</template>

Mutes or unmutes all audio sessions matching a process name.

<template #example>

```javascript
appVolume.setMuteByProcessName("Spotify.exe", true); // Mute Spotify
```

</template>
</MethodBox>

## Full Example

Here is a complete example that lists sessions, reads volume info, and demonstrates setting volume and mute:

```javascript
import { addon } from "novadesk";
const appVolume = addon.load("path/to/AppVolume.dll");

const sessions = appVolume.listSessions();
if (sessions.length > 0) {
  const first = sessions[0];
  console.log("App:", first.processName, "Vol:", first.volume, "Muted:", first.muted);

  // Set volume to 50%
  appVolume.setVolumeByProcessName(first.processName, 0.5);

  // Unmute the app
  appVolume.setMuteByPid(first.pid, false);

  // Read back the aggregated info
  const agg = appVolume.getByPid(first.pid);
  console.log("Aggregated:", agg);
}
```
