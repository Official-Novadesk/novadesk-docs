---
title: Read system audio levels with the audioLevel module.
---

# audioLevel Module
Read current system audio levels and spectrum bands in Novadesk.

The `audioLevel` module is exported from the `system` module.

```javascript
import { audioLevel } from "system";
```

#### Table of Contents
[[toc]]

## `audioLevel.stats([options])`

Returns current audio level data for the selected endpoint/device.

### Parameters

- **`options`**
  - **Type**: `object`
  - **Required**: No
  - **Description**: Optional capture and analysis settings.

### `options`

- **`port`**
  - **Type**: `string`
  - **Default**: `"output"`
  - **Description**: Audio endpoint to capture (`"output"` or `"input"`).

- **`id`**
  - **Type**: `string`
  - **Default**: `""`
  - **Description**: Device ID. Use an empty string for the default device.

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
  - **Description**: Minimum frequency in Hz for band calculations.

- **`freqMax`**
  - **Type**: `number`
  - **Default**: `20000.0`
  - **Description**: Maximum frequency in Hz for bands.

- **`sensitivity`**
  - **Type**: `number`
  - **Default**: `35.0`
  - **Description**: Sensitivity scaling applied to band output.

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

### Return Value

- **Type**: `object | null`
- **Description**:
  - Returns `null` when audio stats cannot be collected.
  - Returns an object with:
    - **`rms`** (`number[]`): RMS levels for left/right channels (`[left, right]`).
    - **`peak`** (`number[]`): Peak levels for left/right channels (`[left, right]`).
    - **`bands`** (`number[]`): Frequency band levels; array length equals the configured `bands`.

## Example

```javascript
import { audioLevel } from "system";

const data = audioLevel.stats({
    port: "output",
    bands: 12,
    fftSize: 2048,
    fftOverlap: 1024,
    sensitivity: 35,
    rmsAttack: 200,
    rmsDecay: 300
});

if (data) {
    const left = data.rms[0];
    const right = data.rms[1];
    console.log("RMS L/R", left, right);
    console.log("Bands:", data.bands);
}
```
