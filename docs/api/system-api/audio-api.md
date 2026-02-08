
# Audio API

Control system volume and play sounds in Novadesk.

::: warning
The `system` object is **only available in the Main script**. UI scripts should communicate with the main script via [IPC](/api/widget-api/widget-methods#inter-process-communication-ipc) if they need system data.
:::

The Audio API provides methods to control the master system volume and play WAV audio files.

## system.getVolume()

Retrieves the current master system volume.

### Return Value

- **Type**: `number`
- **Description**: An integer between `0` and `100` representing the current volume percentage.

## system.setVolume(level)

Sets the master system volume.

### Parameters

- **`level`**
  - **Type**: `number`
  - **Description**: An integer between `0` and `100` representing the target volume percentage. Values outside this range will be clamped.

## system.playSound(path, [loop])

Plays a WAV audio file asynchronously.

### Parameters

- **`path`**
  - **Type**: `string`
  - **Description**: Path to the WAV file. Can be absolute or relative to the widget script.

- **`loop`** (Optional)
  - **Type**: `boolean`
  - **Default**: `false`
  - **Description**: If `true`, the sound will loop continuously until `stopSound()` is called.

### Return Value

- **Type**: `boolean`
- **Description**: Returns `true` if the sound playback was successfully initiated.

## system.stopSound()

Stops any currently playing sound initiated via `playSound()`.

## Examples

### 1. Volume Control
```javascript
// Get current volume
var vol = system.getVolume();
console.log("Current Volume: " + vol);

// Set volume to 50%
system.setVolume(50);
```

### 2. Playing an Alert Sound
```javascript
// Play a sound once
system.playSound("assets/alert.wav");

// Play a background sound on loop
system.playSound("assets/ambient.wav", true);

// Stop the sound after 10 seconds
setTimeout(function() {
    system.stopSound();
}, 10000);
```

