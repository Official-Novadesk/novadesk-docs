---
title: Read and control media sessions with the NowPlaying addon.
---

# NowPlaying Addon

The NowPlaying addon reads active media metadata and lets you control playback (play/pause/next/previous).

#### Table of Contents
[[toc]]

## Quick Start

Load the addon DLL and call the functions directly.

```javascript
import { addon } from "novadesk";

const nowPlaying = addon.load("D:/Novadesk-Project/NowPlaying/dist/x64/Debug/NowPlaying.dll");

const stats = nowPlaying.stats();
console.log(stats.title, stats.artist, stats.position, "/", stats.duration);

nowPlaying.playPause();
```

## `stats()`

Returns current media session details.

### Return Value

- **Type**: `object`
- **Description**: Always returns an object with:
  - `available` (`boolean`)
  - `player` (`string`)
  - `artist` (`string`)
  - `album` (`string`)
  - `title` (`string`)
  - `thumbnail` (`string`): Cached thumbnail path (empty string if unavailable)
  - `duration` (`number`): Track duration in seconds
  - `position` (`number`): Current playback position in seconds
  - `progress` (`number`): Playback progress (`0-100`)
  - `state` (`number`): `0` stopped/unknown, `1` playing, `2` paused
  - `status` (`number`): `0` closed, `1` opened
  - `shuffle` (`boolean`)
  - `repeat` (`boolean`)

::: info
If nothing is playing, `available` is `false` and the rest of the fields are empty/default values.
:::

## `backend()`

Returns active now-playing backend name.

### Return Value

- **Type**: `string`
- **Description**: Returns `"winrt"` when enabled or `"disabled"` otherwise.

## Playback Controls

These functions return `true` if the action was queued (backend enabled), otherwise `false`.

- `play()`
- `pause()`
- `playPause()`
- `stop()`
- `next()`
- `previous()`

## `setPosition(value[, isPercent])`

Sets playback position.

### Parameters

- `value` (`number`): Position in seconds, or percent if `isPercent` is `true`.
- `isPercent` (`boolean`, optional, default `false`): Interpret `value` as `0-100` percent.

### Return Value

- **Type**: `boolean`

::: info
When `isPercent` is `true`, the seek time is computed from current track duration.
:::

## `setShuffle(enabled)`

Enable or disable shuffle.

- `enabled` (`boolean`)
- **Returns**: `boolean`

## `toggleShuffle()`

Toggles shuffle state.

- **Returns**: `boolean`

## `setRepeat(mode)`

Sets repeat mode.

- `mode` (`number`)
  - `0` none
  - `1` track (repeat one)
  - `2` list (repeat all)
- **Returns**: `boolean`

## Error Behavior

- `setPosition(value[, isPercent])` throws a type error when `value` is not numeric.
- `setRepeat(mode)` throws a type error when `mode` is not numeric.

## Beginner Tips

- Call `stats()` on a short interval (500–1000ms) to refresh the UI.
- Use `available` to hide controls when nothing is playing.
- Use `progress` if you want a quick slider without calculating time.

## Example

```javascript
import { addon } from "novadesk";

const nowPlaying = addon.load("D:/Novadesk-Project/NowPlaying/dist/x64/Debug/NowPlaying.dll");

console.log("backend:", nowPlaying.backend());

const stats = nowPlaying.stats();
console.log("available:", stats.available);
console.log("player:", stats.player, "title:", stats.title, "progress:", stats.progress + "%");

nowPlaying.playPause();
nowPlaying.setShuffle(true);
nowPlaying.setRepeat(2);
nowPlaying.setPosition(50, true);
```
