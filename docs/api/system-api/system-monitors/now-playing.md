# Now Playing Monitor

Monitor and control active media playback in Novadesk.

The Now Playing monitor provides current media metadata (title, artist, album, position, state) and playback controls (play/pause/next/previous, seek, shuffle, repeat).

::: warning
System monitors are **only available in the Main script**. UI scripts should request monitor data from the main script via [IPC](/api/widget-api/widget-methods#inter-process-communication-ipc).
:::

## Creating a Now Playing Monitor

```javascript
var nowPlaying = new system.nowPlaying();
```

## Methods

### stats()

Get current media session information.

### Return Value

- **Type**: `Object`
- **Description**: An object containing media stats:
  - **`available`** (`boolean`): `true` when media session data is available.
  - **`player`** (`string`): Player/application display name.
  - **`artist`** (`string`): Track artist.
  - **`album`** (`string`): Track album.
  - **`title`** (`string`): Track title.
  - **`thumbnail`** (`string`): Path to a cached thumbnail image (if available).
  - **`duration`** (`number`): Total track duration in seconds.
  - **`position`** (`number`): Current position in seconds.
  - **`progress`** (`number`): Playback progress in percent (`0-100`).
  - **`state`** (`number`): Playback state (`0` stopped/unknown, `1` playing, `2` paused).
  - **`status`** (`number`): Session status (`0` closed, `1` opened).
  - **`shuffle`** (`boolean`): Shuffle enabled state.
  - **`repeat`** (`boolean`): Repeat enabled state.

### play()

Send play command to the active media session.

### pause()

Send pause command to the active media session.

### playPause()

Toggle between play and pause.

### stop()

Send stop command to the active media session.

### next()

Skip to next track.

### previous()

Go to previous track.

### setPosition(value, mode)

Seek playback position.

### Parameters

- **`value`**
  - **Type**: `number`
  - **Description**: Target position value.

- **`mode`**
  - **Type**: `string`
  - **Required**: No
  - **Default**: `"percent"`
  - **Description**: Seek mode:
    - `"percent"`: `value` is treated as percent (`0-100`)
    - `"seconds"`: `value` is treated as absolute seconds

::: info
If `mode` is omitted, values above `100` are treated as seconds.
:::

### setShuffle(enabled)

Enable or disable shuffle mode.

### Parameters

- **`enabled`**
  - **Type**: `boolean`

### toggleShuffle()

Toggle shuffle mode.

### setRepeat(mode)

Set repeat mode.

### Parameters

- **`mode`**
  - **Type**: `string`
  - **Valid values**: `"none"`, `"one"`, `"all"`

### destroy()

Destroy the monitor and free its resources.

## Complete Example

```javascript
// index.js
var nowPlaying = new system.nowPlaying();

var intervalId = setInterval(function () {
    var s = nowPlaying.stats();
    console.log("NowPlaying:", JSON.stringify(s));
}, 1000);

// Example controls
setTimeout(function () {
    nowPlaying.playPause();
    nowPlaying.setPosition(50, "percent");
}, 2000);

setTimeout(function () {
    clearInterval(intervalId);
    nowPlaying.destroy();
    console.log("Now Playing Monitor Destroyed");
}, 10000);
```
