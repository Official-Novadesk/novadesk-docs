---
title: Control per-application audio sessions with the AppVolume addon.
---

# AppVolume Addon
AppVolume lets you read and control audio sessions for individual apps on Windows. It is great for widgets, stream tools, and quick controls where you want to show or change an app volume without touching the master volume.

This API comes from the AppVolume addon, not the `system` module.

```javascript
import { addon } from "novadesk";
const appVolume = addon.load("path/to/AppVolume.dll");
```

#### Table of Contents
[[toc]]

## Quick Start
```javascript
import { addon } from "novadesk";
const appVolume = addon.load("path/to/AppVolume.dll");

const sessions = appVolume.listSessions();
console.log("sessions:", sessions.length);

if (sessions.length > 0) {
  const s = sessions[0];
  console.log("first:", s.processName, s.volume, s.muted);

  appVolume.setVolumeByPid(s.pid, 0.5);
  appVolume.setMuteByPid(s.pid, true);
}
```

## What Is a Session
Each playing (or recently used) audio source in Windows creates an audio session. A session typically maps to a process, but some apps may create multiple sessions. The API returns each session and lets you change volume or mute for all matching sessions by PID or process name.

## `listSessions()`
Returns output audio sessions.

### Return Value
- **Type**: `object[]`
- **Description**: Array of session objects with:
  - **`pid`** (`number`): Process ID.
  - **`processName`** (`string`): Process file name (for example `chrome.exe`).
  - **`fileName`** (`string`): Executable file name.
  - **`filePath`** (`string`): Full executable path when available.
  - **`iconPath`** (`string`): Extracted `.ico` path when available (cached in the system temp directory), otherwise empty string.
  - **`displayName`** (`string`): Session display name.
  - **`volume`** (`number`): Session volume in `0.0-1.0`.
  - **`peak`** (`number`): Peak level in `0.0-1.0` (when available).
  - **`muted`** (`boolean`): Session mute state.

If session enumeration fails, an empty array is returned.

## `getByPid(pid)`
Gets aggregated volume details for all sessions matching a PID.

### Parameters
- **`pid`** (`number`): Target process ID. Must be greater than `0`.

### Return Value
- **Type**: `object | null`
- **Description**:
  - Returns `null` when no session matches the PID.
  - Otherwise returns:
    - **`volume`** (`number`): Average volume of matching sessions (`0.0-1.0`).
    - **`muted`** (`boolean`): `true` if any matching session is muted.
    - **`peak`** (`number`): Maximum peak across matching sessions.

## `getByProcessName(name)`
Gets aggregated volume details for all sessions matching a process name.

### Parameters
- **`name`** (`string`): Process name match (case-insensitive), usually executable file name like `"chrome.exe"`.

### Return Value
- **Type**: `object | null`
- **Description**: Same shape and behavior as `getByPid()`.

## `setVolumeByPid(pid, volume01)`
Sets volume for all sessions matching a PID.

### Parameters
- **`pid`** (`number`): Target process ID. Must be greater than `0`.
- **`volume01`** (`number`): Target volume in `0.0-1.0`. Values outside this range are clamped.

### Return Value
- **Type**: `boolean`
- **Description**: `true` if at least one matching session was updated; otherwise `false`.

## `setVolumeByProcessName(name, volume01)`
Sets volume for all sessions matching a process name.

### Parameters
- **`name`** (`string`): Process name match (case-insensitive).
- **`volume01`** (`number`): Target volume in `0.0-1.0`. Values outside this range are clamped.

### Return Value
- **Type**: `boolean`
- **Description**: `true` if at least one matching session was updated; otherwise `false`.

## `setMuteByPid(pid, mute)`
Sets mute state for all sessions matching a PID.

### Parameters
- **`pid`** (`number`): Target process ID. Must be greater than `0`.
- **`mute`** (`boolean`): `true` to mute, `false` to unmute.

### Return Value
- **Type**: `boolean`
- **Description**: `true` if at least one matching session was updated; otherwise `false`.

## `setMuteByProcessName(name, mute)`
Sets mute state for all sessions matching a process name.

### Parameters
- **`name`** (`string`): Process name match (case-insensitive).
- **`mute`** (`boolean`): `true` to mute, `false` to unmute.

### Return Value
- **Type**: `boolean`
- **Description**: `true` if at least one matching session was updated; otherwise `false`.

## Beginner Tips
- Start by calling `listSessions()` and log the results. It helps you confirm process names and PIDs.
- Some apps only create a session when audio is actually playing.
- Use `setVolumeByPid` when you know the PID is stable, and `setVolumeByProcessName` for quick matching.
- If you want to show icons, use `iconPath` and provide a fallback image for missing icons.

## Example Usage
```javascript
import { addon } from "novadesk";
const appVolume = addon.load("path/to/AppVolume.dll");

const sessions = appVolume.listSessions();
console.log("sessions:", sessions.length);

if (sessions.length > 0) {
    const first = sessions[0];
    console.log("first session:", first.processName, first.volume, first.muted);

    // Set session group by process name to 50% volume.
    appVolume.setVolumeByProcessName(first.processName, 0.5);

    // Mute and unmute by PID.
    appVolume.setMuteByPid(first.pid, true);
    appVolume.setMuteByPid(first.pid, false);

    const stats = appVolume.getByPid(first.pid);
    console.log("aggregated:", stats);
}
```
