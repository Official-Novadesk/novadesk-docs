---
title: Control system master volume and WAV playback with the audio module.
---

# audio Module
Control master system volume and play/stop WAV sounds in Novadesk.

The `audio` module is exported from the `system` module.

```javascript
import { audio } from "system";
```

#### Table of Contents
[[toc]]

## `audio.getVolume()`

Retrieves the current master system volume.

### Return Value

- **Type**: `number`
- **Description**: Current volume percentage (`0-100`).

## `audio.setVolume(value)`

Sets the master system volume.

### Parameters

- **`value`**
  - **Type**: `number`
  - **Description**: Target volume percentage (`0-100`). Values outside the range are clamped.

### Return Value

- **Type**: `boolean`
- **Description**: `true` if the volume was updated; otherwise `false`.

## `audio.playSound(path, [loop])`

Plays a WAV file asynchronously.

### Parameters

- **`path`**
  - **Type**: `string`
  - **Description**: Path to a WAV file.

- **`loop`**
  - **Type**: `boolean`
  - **Required**: No
  - **Default**: `false`
  - **Description**: `true` to loop playback until `audio.stopSound()` is called.

### Return Value

- **Type**: `boolean`
- **Description**: `true` if playback started; otherwise `false`.

## `audio.stopSound()`

Stops any sound started with `audio.playSound()`.

### Return Value

- **Type**: `boolean`
- **Description**: Always returns `true`.

## Example

```javascript
import { audio } from "system";

const current = audio.getVolume();
console.log("Current volume:", current);

audio.setVolume(50);

audio.playSound("assets/alert.wav");

setTimeout(function () {
    audio.stopSound();
}, 3000);
```
