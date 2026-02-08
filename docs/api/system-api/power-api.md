
# Power API
 Access system power and battery status in Novadesk


::: warning
The `system` object is **only available in the Main script**. UI scripts should communicate with the main script via [IPC](/api/widget-api/widget-methods/#inter-process-communication-ipc) if they need system data.
:::

The Power API provides information about the system's power source, battery status, and CPU frequency.

---

## **`system.getPowerStatus()`**

Retrieves current power and battery information.
---

### Return Value
* **Type**: `object | null`
* **Description**: Returns an object with the following properties, or `null` if the information could not be retrieved.

---

###### **`acline`**
* **Type**: `number`
* **Description**: `1` if plugged in (AC), `0` otherwise (Battery).

###### **`status`**
* **Type**: `number`
* **Description**: Mapped battery status:
    * `0`: No battery
    * `1`: Charging
    * `2`: Critical
    * `3`: Low
    * `4`: High/Full

###### **`status2`**
* **Type**: `number`
* **Description**: Raw `BatteryFlag` from Windows.

###### **`lifetime`**
* **Type**: `number`
* **Description**: Estimated battery life remaining in seconds. Returns `-1` if unknown.

###### **`percent`**
* **Type**: `number`
* **Description**: Battery charge percentage (0-100).

###### **`mhz`**
* **Type**: `number`
* **Description**: Current CPU frequency in MHz.

###### **`hz`**
* **Type**: `number`
* **Description**: Current CPU frequency in Hz (MHz * 1,000,000).

---

### Example

```javascript
var power = system.getPowerStatus();

if (power) {
    console.log("Source: " + (power.acline ? "AC Power" : "Battery"));
    console.log("Battery: " + power.percent + "%");
    console.log("CPU Frequency: " + power.mhz + " MHz");
    
    if (power.status === 1) {
        console.log("Status: Charging");
    }
}
```
