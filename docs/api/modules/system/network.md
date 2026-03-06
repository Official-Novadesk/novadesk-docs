---
title: Read network throughput and totals with the network module.
---

# network Module
Read network receive/transmit rates and cumulative traffic totals.

The `network` module is exported from the `system` module.

```javascript
import { network } from "system";
```

#### Table of Contents
[[toc]]

## `network.rxSpeed()`

Returns current receive speed.

### Return Value

- **Type**: `number`
- **Description**: Bytes per second received across operational interfaces. Returns `0` if unavailable.

## `network.txSpeed()`

Returns current transmit speed.

### Return Value

- **Type**: `number`
- **Description**: Bytes per second sent across operational interfaces. Returns `0` if unavailable.

## `network.bytesReceived()`

Returns cumulative received bytes.

### Return Value

- **Type**: `number`
- **Description**: Total bytes received across operational interfaces. Returns `0` if unavailable.

## `network.bytesSent()`

Returns cumulative sent bytes.

### Return Value

- **Type**: `number`
- **Description**: Total bytes sent across operational interfaces. Returns `0` if unavailable.

::: info
Values are sampled internally and cached briefly (about 400ms), so very frequent calls may return the same sample.
:::

## Example

```javascript
import { network } from "system";

const rx = network.rxSpeed();
const tx = network.txSpeed();
const totalRx = network.bytesReceived();
const totalTx = network.bytesSent();

console.log("RX B/s:", rx);
console.log("TX B/s:", tx);
console.log("Total RX:", totalRx);
console.log("Total TX:", totalTx);
```
