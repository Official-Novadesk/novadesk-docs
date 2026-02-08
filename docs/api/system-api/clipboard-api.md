
# Clipboard API
 Access Windows System Clipboard in Novadesk


::: warning
The `system` object is **only available in the Main script**. UI scripts should communicate with the main script via [IPC](/api/widget-api/widget-methods/#inter-process-communication-ipc) if they need system data.
:::

The Clipboard API allows widgets to interact with the system clipboard.

---

## **`system.getClipboardText()`**

Retrieves the current text content of the clipboard.
---

### Return Value
* **Type**: `string | null`
* **Description**: The text content of the clipboard, or `null` if the clipboard is empty or does not contain text.

---

## **`system.setClipboardText(text)`**

Sets the text content of the system clipboard.
---

###### **`text`**
* **Type**: `string`
* **Description**: The text to copy to the clipboard.

### Return Value
* **Type**: `boolean`
* **Description**: `true` if successful.

---

### Example

```javascript
// Copy text to clipboard
var success = system.setClipboardText("Copied from Novadesk!");
if (success) {
    console.log("Text copied!");
}

// Read from clipboard
var text = system.getClipboardText();
console.log("Clipboard contains: " + text);
```
