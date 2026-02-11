# Audio Level

Monitor system audio levels and frequency bands.

::: warning
The `system` object is **only available in the Main script**. UI scripts should communicate with the main script via [IPC](/api/widget-api/widget-methods#inter-process-communication-ipc) if they need audio data.
:::

## system.audioLevel(options)

Creates an audio level monitor instance.

```js
var audio = new system.audioLevel(options);
```

### Options

- **`port`**
  - **Type**: `string`
  - **Default**: `"output"`
  - **Description**: Audio endpoint to capture. Use `"output"` or `"input"`.

- **`id`**
  - **Type**: `string`
  - **Default**: `""`
  - **Description**: Specific device ID. Empty string uses the default device.

- **`fftSize`**
  - **Type**: `number`
  - **Default**: `1024`
  - **Description**: FFT size used for spectrum analysis.

- **`fftOverlap`**
  - **Type**: `number`
  - **Default**: `512`
  - **Description**: FFT overlap in samples.

- **`bands`**
  - **Type**: `number`
  - **Default**: `10`
  - **Description**: Number of frequency bands returned in `stats().bands`.

- **`freqMin`**
  - **Type**: `number`
  - **Default**: `20.0`
  - **Description**: Minimum frequency (Hz) for band calculation.

- **`freqMax`**
  - **Type**: `number`
  - **Default**: `20000.0`
  - **Description**: Maximum frequency (Hz) for band calculation.

- **`sensitivity`**
  - **Type**: `number`
  - **Default**: `35.0`
  - **Description**: Overall sensitivity scaling for band output.

- **`rmsAttack`**
  - **Type**: `number`
  - **Default**: `300`
  - **Description**: RMS attack time in milliseconds.

- **`rmsDecay`**
  - **Type**: `number`
  - **Default**: `300`
  - **Description**: RMS decay time in milliseconds.

- **`peakAttack`**
  - **Type**: `number`
  - **Default**: `50`
  - **Description**: Peak attack time in milliseconds.

- **`peakDecay`**
  - **Type**: `number`
  - **Default**: `2500`
  - **Description**: Peak decay time in milliseconds.

- **`fftAttack`**
  - **Type**: `number`
  - **Default**: `300`
  - **Description**: FFT band attack time in milliseconds.

- **`fftDecay`**
  - **Type**: `number`
  - **Default**: `300`
  - **Description**: FFT band decay time in milliseconds.

- **`rmsGain`**
  - **Type**: `number`
  - **Default**: `1.0`
  - **Description**: Gain applied to RMS output.

- **`peakGain`**
  - **Type**: `number`
  - **Default**: `1.0`
  - **Description**: Gain applied to peak output.

## audio.stats()

Returns the current audio levels.

### Return Value

- **Type**: `object`
- **Properties**:
  - **`rms`**: `number[]` with two values `[left, right]`
  - **`peak`**: `number[]` with two values `[left, right]`
  - **`bands`**: `number[]` of length `bands`

## audio.destroy()

Releases the audio monitor and its native resources.

## Example

```javascript
var audio = new system.audioLevel({
    port: "output",
    bands: 12,
    fftSize: 2048,
    fftOverlap: 1024,
    sensitivity: 35,
    rmsAttack: 200,
    rmsDecay: 300
});

setInterval(function() {
    var data = audio.stats();
    var left = data.rms[0];
    var right = data.rms[1];
    console.log("RMS L/R", left, right);
}, 50);
```
