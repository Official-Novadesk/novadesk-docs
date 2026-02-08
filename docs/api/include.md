
# Include Method
 Include method in Novadesk


## `include(path)`

Includes and executes another JavaScript file within the current script context. This is useful for modularizing your code or including shared libraries.

- **`path`**: The path to the JavaScript file to include. 
    - You can use relative paths (e.g., `./lib/math.js`) or absolute paths.

### Example

```javascript
// Include a common utility file
include("scripts/utils.js");

// Now you can use functions defined in utils.js
const result = formatCurrency(1500);
console.log("Formatted:", result);
```

::: info
 - `include` executes the script immediately in the **global scope** of your current script.
 - If the file does not exist or contains syntax errors, an error will be thrown.
:::
