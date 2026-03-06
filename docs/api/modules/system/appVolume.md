---
title: Control per-application audio sessions with the appVolume module.
---

# appVolume Module
Manage per-application audio session volume and mute state in Novadesk.

The `appVolume` module is exported from the `system` module.

```javascript
import { appVolume } from "system";
```

#### Table of Contents
[[toc]]

## `appVolume.listSessions()`

Returns active output audio sessions.

### Return Value

- **Type**: `object[]`
- **Description**: Array of session objects with:
  - **`pid`** (`number`): Process ID.
  - **`processName`** (`string`): Process file name.
  - **`fileName`** (`string`): Executable file name.
  - **`filePath`** (`string`): Full executable path when available.
  - **`iconPath`** (`string`): Extracted icon path when available, otherwise empty string.
  - **`displayName`** (`string`): Session display name.
  - **`volume`** (`number`): Session volume in `0.0-1.0`.
  - **`peak`** (`number`): Peak level in `0.0-1.0` (currently `0`).
  - **`muted`** (`boolean`): Session mute state.

If session enumeration fails, an empty array is returned.

## `appVolume.getByPid(pid)`

Gets aggregated volume details for all active sessions matching a PID.

### Parameters

- **`pid`**
  - **Type**: `number`
  - **Description**: Target process ID. Must be greater than `0`.

### Return Value

- **Type**: `object | null`
- **Description**:
  - Returns `null` when no active session matches the PID.
  - Otherwise returns:
    - **`volume`** (`number`): Average volume of matching sessions (`0.0-1.0`).
    - **`muted`** (`boolean`): `true` if any matching session is muted.
    - **`peak`** (`number`): Maximum peak across matching sessions.

## `appVolume.getByProcessName(name)`

Gets aggregated volume details for all active sessions matching a process name.

### Parameters

- **`name`**
  - **Type**: `string`
  - **Description**: Process name match (case-insensitive), usually executable file name like `"chrome.exe"`.

### Return Value

- **Type**: `object | null`
- **Description**: Same shape and behavior as `getByPid()`.

## `appVolume.setVolumeByPid(pid, volume01)`

Sets volume for all active sessions matching a PID.

### Parameters

- **`pid`**
  - **Type**: `number`
  - **Description**: Target process ID. Must be greater than `0`.

- **`volume01`**
  - **Type**: `number`
  - **Description**: Target volume in `0.0-1.0`. Values outside this range are clamped.

### Return Value

- **Type**: `boolean`
- **Description**: `true` if at least one matching active session was updated; otherwise `false`.

## `appVolume.setVolumeByProcessName(name, volume01)`

Sets volume for all active sessions matching a process name.

### Parameters

- **`name`**
  - **Type**: `string`
  - **Description**: Process name match (case-insensitive).

- **`volume01`**
  - **Type**: `number`
  - **Description**: Target volume in `0.0-1.0`. Values outside this range are clamped.

### Return Value

- **Type**: `boolean`
- **Description**: `true` if at least one matching active session was updated; otherwise `false`.

## `appVolume.setMuteByPid(pid, mute)`

Sets mute state for all active sessions matching a PID.

### Parameters

- **`pid`**
  - **Type**: `number`
  - **Description**: Target process ID. Must be greater than `0`.

- **`mute`**
  - **Type**: `boolean`
  - **Description**: `true` to mute, `false` to unmute.

### Return Value

- **Type**: `boolean`
- **Description**: `true` if at least one matching active session was updated; otherwise `false`.

## `appVolume.setMuteByProcessName(name, mute)`

Sets mute state for all active sessions matching a process name.

### Parameters

- **`name`**
  - **Type**: `string`
  - **Description**: Process name match (case-insensitive).

- **`mute`**
  - **Type**: `boolean`
  - **Description**: `true` to mute, `false` to unmute.

### Return Value

- **Type**: `boolean`
- **Description**: `true` if at least one matching active session was updated; otherwise `false`.

## Example

```javascript
import { appVolume } from "system";

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
