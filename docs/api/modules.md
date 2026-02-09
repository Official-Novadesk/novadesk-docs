# Include Method

Include method in Novadesk.

## include(path)

Includes and executes another JavaScript file within the current script context. This is useful for modularizing your code or including shared libraries.

### Parameters

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

---

# Require Method

CommonJS-style module import for Novadesk main scripts.

## require(modulePath)

Loads and executes a module and returns its `module.exports`.

::: warning
`require` is **only available in the Main script** (`index.js`). UI scripts do not have access to `require`.
:::

### Parameters

- **`modulePath`**
  - **Type**: `string`
  - **Description**: Path to the module. Relative paths resolve from the requiring file’s directory. If no extension is provided, `.js` is added automatically.

### Return Value

- **Type**: `any`
- **Description**: The `module.exports` value from the required module.

### Example

```javascript
// index.js (Main script)
const math = require("./lib/math");
console.log("Sum:", math.add(2, 3));
```

```javascript
// lib/math.js
exports.add = function(a, b) {
  return a + b;
};
```

::: info
- Modules are cached after first load; subsequent `require()` calls return the cached `module.exports`.
- Circular dependencies are supported and will return the current cached exports object.
- `__filename` and `__dirname` are provided to modules when they are executed.
:::
