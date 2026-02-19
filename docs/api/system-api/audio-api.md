
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

## App Volume Control

Control volume and mute state for individual application audio sessions.

### App Selector

Per-app methods use a selector object:

- **`pid`** (`number`): Process ID
- **`process`** (`string`): Process name (for example `"chrome.exe"`)

Provide either `pid` or `process`.

### system.listAppVolumes()

Lists active app audio sessions.

### Return Value

- **Type**: `Array<Object>`
- **Description**: Each item may include:
  - **`pid`** (`number`)
  - **`process`** (`string`)
  - **`fileName`** (`string`)
  - **`filePath`** (`string`)
  - **`iconPath`** (`string`)
  - **`displayName`** (`string`)
  - **`volume`** (`number`, `0-100`)
  - **`peak`** (`number`, `0-100`)
  - **`muted`** (`boolean`)

### system.getAppVolume(selector)

Gets app session volume.

### Return Value

- **Type**: `number | null`
- **Description**: Volume percentage (`0-100`), or `null` if session is not found.

### system.setAppVolume(selector, level)

Sets app session volume.

### Parameters

- **`selector`**
  - **Type**: `Object`
  - **Description**: App selector (`pid` or `process`).

- **`level`**
  - **Type**: `number`
  - **Description**: Target volume percentage (`0-100`). Values are clamped.

### Return Value

- **Type**: `boolean`
- **Description**: `true` if the app session volume was changed.

### system.getAppPeak(selector)

Gets current app peak meter level.

### Return Value

- **Type**: `number | null`
- **Description**: Peak level percentage (`0-100`), or `null` if session is not found.

### system.getAppMute(selector)

Gets app mute state.

### Return Value

- **Type**: `boolean | null`
- **Description**: `true`/`false` mute state, or `null` if session is not found.

### system.setAppMute(selector, muted)

Sets app mute state.

### Parameters

- **`selector`**
  - **Type**: `Object`
  - **Description**: App selector (`pid` or `process`).

- **`muted`**
  - **Type**: `boolean`
  - **Description**: Mute target state.

### Return Value

- **Type**: `boolean`
- **Description**: `true` if mute state was changed.

### 3. Per-App Volume Example
```javascript
var sessions = system.listAppVolumes();
console.log("App Sessions:", JSON.stringify(sessions));

// Target by process name
var selector = { process: "chrome.exe" };

var current = system.getAppVolume(selector);
console.log("Chrome Volume:", current);

system.setAppVolume(selector, 30);
console.log("Chrome Peak:", system.getAppPeak(selector));

system.setAppMute(selector, true);
console.log("Chrome Muted:", system.getAppMute(selector));
```

