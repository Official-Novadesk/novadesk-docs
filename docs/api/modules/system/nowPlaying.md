---
title: Read and control media sessions with the nowPlaying module.
---

# nowPlaying Module
Read active media metadata and control playback in Novadesk.

The `nowPlaying` module is exported from the `system` module.

```javascript
import { nowPlaying } from "system";
```

#### Table of Contents
[[toc]]

## `nowPlaying.stats()`

Returns current media session details.

### Return Value

- **Type**: `object`
- **Description**: Contains:
  - **`available`** (`boolean`)
  - **`player`** (`string`)
  - **`artist`** (`string`)
  - **`album`** (`string`)
  - **`title`** (`string`)
  - **`thumbnail`** (`string`): Cached thumbnail image path (empty string if unavailable).
  - **`duration`** (`number`): Track duration in seconds.
  - **`position`** (`number`): Current playback position in seconds.
  - **`progress`** (`number`): Playback progress (`0-100`).
  - **`state`** (`number`): `0` stopped/unknown, `1` playing, `2` paused.
  - **`status`** (`number`): `0` closed, `1` opened.
  - **`shuffle`** (`boolean`)
  - **`repeat`** (`boolean`): `true` when repeat mode is not `none`.

::: info
`stats()` always returns an object. When no active media session exists, fields are default/empty and `available` is `false`.
:::

## `nowPlaying.backend()`

Returns active now-playing backend name.

### Return Value

- **Type**: `string`
- **Description**:
  - `"winrt"` when the WinRT now-playing backend is enabled.
  - `"disabled"` when backend support is not built/enabled.

## `nowPlaying.play()`

Requests playback start on the active media session.

### Return Value

- **Type**: `boolean`
- **Description**:
  - Returns `true` when the now-playing backend is enabled and the action is queued.
  - Returns `false` when backend is disabled.

## `nowPlaying.pause()`

Requests pause on the active media session.

### Return Value

- **Type**: `boolean`
- **Description**:
  - Returns `true` when the now-playing backend is enabled and the action is queued.
  - Returns `false` when backend is disabled.

## `nowPlaying.playPause()`

Requests play/pause toggle on the active media session.

### Return Value

- **Type**: `boolean`
- **Description**:
  - Returns `true` when the now-playing backend is enabled and the action is queued.
  - Returns `false` when backend is disabled.

## `nowPlaying.stop()`

Requests playback stop on the active media session.

### Return Value

- **Type**: `boolean`
- **Description**:
  - Returns `true` when the now-playing backend is enabled and the action is queued.
  - Returns `false` when backend is disabled.

## `nowPlaying.next()`

Requests skip to the next item in the active media session.

### Return Value

- **Type**: `boolean`
- **Description**:
  - Returns `true` when the now-playing backend is enabled and the action is queued.
  - Returns `false` when backend is disabled.

## `nowPlaying.previous()`

Requests skip to the previous item in the active media session.

### Return Value

- **Type**: `boolean`
- **Description**:
  - Returns `true` when the now-playing backend is enabled and the action is queued.
  - Returns `false` when backend is disabled.

## `nowPlaying.setPosition(value[, isPercent])`

Sets playback position.

### Parameters

- **`value`**
  - **Type**: `number`
  - **Description**: Position in seconds by default, or percent when `isPercent` is `true`.

- **`isPercent`**
  - **Type**: `boolean`
  - **Required**: No
  - **Default**: `false`
  - **Description**: `true` to interpret `value` as `0-100` percent of track duration.

### Return Value

- **Type**: `boolean`
- **Description**:
  - Returns `true` when backend is enabled and action is queued.
  - Returns `false` when backend is disabled.

::: info
When `isPercent` is `true`, the effective seek time is computed from current track duration. Resulting position is clamped to valid bounds.
:::

## `nowPlaying.setShuffle(enabled)`

Sets shuffle mode.

### Parameters

- **`enabled`**
  - **Type**: `boolean`

### Return Value

- **Type**: `boolean`
- **Description**: `true` when backend is enabled; otherwise `false`.

## `nowPlaying.toggleShuffle()`

Toggles shuffle mode.

### Return Value

- **Type**: `boolean`
- **Description**: `true` when backend is enabled; otherwise `false`.

## `nowPlaying.setRepeat(mode)`

Sets repeat mode.

### Parameters

- **`mode`**
  - **Type**: `number`
  - **Description**: Repeat mode code:
    - `0`: none
    - `1`: track (repeat one)
    - `2`: list (repeat all)

### Return Value

- **Type**: `boolean`
- **Description**: `true` when backend is enabled; otherwise `false`.

## Error Behavior

- `nowPlaying.setPosition(value[, isPercent])` throws a type error when `value` is not numeric.
- `nowPlaying.setRepeat(mode)` throws a type error when `mode` is not numeric.

## Example

```javascript
import { nowPlaying } from "system";

console.log("backend:", nowPlaying.backend());

const stats = nowPlaying.stats();
console.log("available:", stats.available);
console.log("player:", stats.player, "title:", stats.title, "progress:", stats.progress + "%");

nowPlaying.playPause();
nowPlaying.setShuffle(true);
nowPlaying.setRepeat(2);        // repeat all
nowPlaying.setPosition(50, true); // seek to 50%
```
