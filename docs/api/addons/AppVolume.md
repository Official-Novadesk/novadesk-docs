---
title: Control per-application audio sessions with the AppVolume addon.
---

# AppVolume Addon

Read and control Windows audio sessions per application — ideal for per-app volume sliders and mute toggles.

```javascript
import { addon } from "novadesk";
const appVolume = addon.load("path/to/AppVolume.dll");
```

::: info
This API comes from the AppVolume addon, not the built-in `system` module.
:::

#### Table of Contents
[[toc]]

---

<MethodBox
  name="appVolume.listSessions()"
  badge="AppVolume"
  badgeType="core"
  returns="object[]"
>
<template #returns>Array of audio session objects. Returns an empty array if enumeration fails.</template>

Returns all active Windows output audio sessions. Each session maps to an application currently playing (or having recently played) audio.

Each session object has:

| Property | Type | Description |
|---|---|---|
| `pid` | `number` | Process ID. |
| `processName` | `string` | Executable file name (e.g. `chrome.exe`). |
| `fileName` | `string` | Executable file name. |
| `filePath` | `string` | Full executable path when available. |
| `iconPath` | `string` | Extracted `.ico` path cached in temp, or empty string. |
| `displayName` | `string` | Session display name. |
| `volume` | `number` | Session volume `0.0–1.0`. |
| `peak` | `number` | Peak level `0.0–1.0`. |
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

---

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

Gets aggregated volume details for all sessions belonging to a process ID. Returns the average volume, peak maximum, and whether any session is muted.

The returned object has: `volume` (average, `0.0–1.0`), `muted` (`true` if any session is muted), `peak` (maximum peak).

<template #example>

```javascript
const s = appVolume.listSessions()[0];
const info = appVolume.getByPid(s.pid);
if (info) {
  console.log("Volume:", info.volume, "Muted:", info.muted);
}
```

</template>
</MethodBox>

---

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

Same as `getByPid()` but matches by process name. Case-insensitive.

<template #example>

```javascript
const info = appVolume.getByProcessName("Spotify.exe");
if (info) console.log("Spotify volume:", info.volume);
```

</template>
</MethodBox>

---

<MethodBox
  name="appVolume.setVolumeByPid(pid, volume01)"
  badge="AppVolume"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'pid', type: 'number', description: 'Target process ID. Must be greater than 0.' },
    { name: 'volume01', type: 'number', description: 'Target volume 0.0–1.0. Values outside this range are clamped.' }
  ]"
>
<template #returns><code>true</code> if at least one matching session was updated, <code>false</code> otherwise.</template>

Sets the volume for all audio sessions belonging to a process ID.

<template #example>

```javascript
const s = appVolume.listSessions()[0];
appVolume.setVolumeByPid(s.pid, 0.5); // 50%
```

</template>
</MethodBox>

---

<MethodBox
  name="appVolume.setVolumeByProcessName(name, volume01)"
  badge="AppVolume"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'name', type: 'string', description: 'Process name to match (case-insensitive).' },
    { name: 'volume01', type: 'number', description: 'Target volume 0.0–1.0. Values outside this range are clamped.' }
  ]"
>
<template #returns><code>true</code> if at least one matching session was updated, <code>false</code> otherwise.</template>

Sets the volume for all audio sessions matching a process name.

<template #example>

```javascript
appVolume.setVolumeByProcessName("chrome.exe", 0.3); // 30%
```

</template>
</MethodBox>

---

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
appVolume.setMuteByPid(s.pid, true);
```

</template>
</MethodBox>

---

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
appVolume.setMuteByProcessName("Spotify.exe", true);
```

</template>
</MethodBox>

---

## Full Example

```javascript
import { addon } from "novadesk";
const appVolume = addon.load("path/to/AppVolume.dll");

const sessions = appVolume.listSessions();
if (sessions.length > 0) {
  const first = sessions[0];
  console.log("App:", first.processName, "Vol:", first.volume, "Muted:", first.muted);

  appVolume.setVolumeByProcessName(first.processName, 0.5);
  appVolume.setMuteByPid(first.pid, false);

  const agg = appVolume.getByPid(first.pid);
  console.log("Aggregated:", agg);
}
```
