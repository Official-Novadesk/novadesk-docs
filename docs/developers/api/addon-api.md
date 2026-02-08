
# Addon API (Native)
Technical guide for building native C++ addons for Novadesk.

This guide covers the technical details of the **Novadesk Addon SDK**, used to build native x64 DLLs that integrate with the Novadesk JavaScript engine.

## **Architecture**

Novadesk addons are **engine-agnostic**. Instead of linking against a specific JavaScript engine (like Duktape), addons interact with Novadesk via a provided **Host API** table. This ensures binary compatibility even if the underlying engine is updated.

---

## **C++ Entry Points**

### `NOVADESK_ADDON_INIT`

The primary entry point for any addon. It is called by Novadesk when `system.loadAddon()` is executed.

```cpp
#include <NovadeskAPI/novadesk_addon.h>

NOVADESK_ADDON_INIT(ctx, hMsgWnd, host) {
    // ctx: Opaque handle to the JS context
    // hMsgWnd: Window handle for thread-safe dispatching
    // host: Pointer to the Host API (Never use this directly, use novadesk::Addon wrapper)
    
    novadesk::Addon addon(ctx, host);
    addon.RegisterString("version", "1.0.0");
}
```

### `NOVADESK_ADDON_UNLOAD`

Optional hook called when the addon is manually unloaded or when Novadesk reloads scripts.

```cpp
NOVADESK_ADDON_UNLOAD() {
    // Cleanup your background threads, global memory, etc.
}
```

---

## **Host API Functions**

The `novadesk::Addon` helper class provides a convenient wrapper around the low-level Host API.

### **Registering Data**

Native addons export functionality by adding properties to the object returned by `system.loadAddon()`. Use the following methods on the `novadesk::Addon` instance.

#### `RegisterString(name, value)`
Registers a static string property.
```cpp
addon.RegisterString("version", "1.2.0");
addon.RegisterString("author", "Novadesk Team");
```

#### `RegisterNumber(name, value)`
Registers a numeric property (supports `double`, `int`, `float`).
```cpp
addon.RegisterNumber("maxConnections", 100);
addon.RegisterNumber("pi", 3.14159);
```

#### `RegisterBool(name, value)`
Registers a boolean property.
```cpp
addon.RegisterBool("isEnabled", true);
```

#### `RegisterArray(name, values)`
Registers an array of either strings or numbers.
```cpp
// String array
addon.RegisterArray("tags", {"native", "performance", "win32"});

// Number array
addon.RegisterArray("levels", {1.0, 5.5, 10.0});
```

#### `RegisterObject(name, callback)`
Creates a nested object to organize your API. The callback receives a new `novadesk::Addon` instance representing the sub-object.
```cpp
addon.RegisterObject("utils", [](novadesk::Addon& utils) {
    utils.RegisterString("status", "ok");
    utils.RegisterNumber("id", 12345);
});
```

### **Registering Functions**

Functions are registered with a name, a C++ lambda or function pointer, and the number of expected arguments (`nargs`).

```cpp
addon.RegisterFunction("hello", [](novadesk_context ctx) -> int {
    // 'ctx' is the JS context handle
    return 0; // Returning 0 means no value is returned to JS
}, 0);
```

---

## **Manual Stack Management**

While high-level registration handles most cases, you can manually push values onto the JavaScript stack using the `host` pointer or the `Addon` helper.

#### `PushString(value)`
Pushes a null-terminated string onto the stack.
```cpp
host->PushString(ctx, "Directly pushed string");
```

#### `PushNumber(value)`
Pushes a numeric value.
```cpp
host->PushNumber(ctx, 3.14);
```

#### `PushBool(value)`
Pushes a boolean value (as 1 or 0).
```cpp
host->PushBool(ctx, 1); // true
```

#### `PushNull()`
Pushes a `null` value.
```cpp
host->PushNull(ctx);
```

#### `PushObject()`
Pushes a new, empty JavaScript object.
```cpp
host->PushObject(ctx);
```

---

## **Handling Arguments (In Detail)**

When a JavaScript function calls your native addon, use the `Addon` utility methods to safely retrieve arguments from the stack.

### `GetNumber(index)`
Retrieves a numeric value at the specified stack index (0-based).

```cpp
// JS: addon.sum(10, 20)
addon.RegisterFunction("sum", [host](novadesk_context ctx) -> int {
    novadesk::Addon helper(ctx, host);
    
    double a = helper.GetNumber(0); // 10
    double b = helper.GetNumber(1); // 20
    
    // Return the result
    host->PushNumber(ctx, a + b);
    return 1; // 1 means we pushed one return value
}, 2);
```

### `GetString(index)`
Retrieves a string value.

```cpp
// JS: addon.greet("World")
addon.RegisterFunction("greet", [host](novadesk_context ctx) -> int {
    novadesk::Addon helper(ctx, host);
    const char* name = helper.GetString(0);
    
    std::string response = "Hello, " + std::string(name) + "!";
    host->PushString(ctx, response.c_str());
    return 1;
}, 1);
```

### `GetBool(index)`
Retrieves a boolean value as a `bool`.

```cpp
// JS: addon.test(true)
addon.RegisterFunction("test", [host](novadesk_context ctx) -> int {
    novadesk::Addon helper(ctx, host);
    bool val = helper.GetBool(0); // true
    return 0;
}, 1);
```

---

## **Type Safety & Validation**

Always validate arguments before using them to prevent addon crashes or engine errors.

#### `IsNumber(index)`
Returns true if the argument at the specified `index` is a numeric type.

#### `IsString(index)`
Returns true if the argument is a string.

#### `IsBool(index)`
Returns true if the argument is a boolean.

#### `IsFunction(index)`
Returns true if the argument is a JavaScript function (callback).

#### `IsObject(index)`
Returns true if the argument is a JavaScript object.

#### `IsNull(index)`
Returns true if the argument is `null` or `undefined`.

---

## **Stack & Error Control**

These methods provide direct control over the JavaScript stack state and error reporting.

#### `GetTop()`
Returns the number of items currently on the stack.
```cpp
int count = helper.GetTop();
```

#### `Pop()`
Removes the top-most item from the stack.
```cpp
helper.Pop();
```

#### `PopN(n)`
Removes `n` items from the stack.
```cpp
helper.PopN(3); // Remove top 3 items
```

#### `ThrowError(message)`
Improves error reporting by throwing a native JavaScript error. **This immediately interrupts C++ execution of the function.**
```cpp
if (idx < 0) {
    helper.ThrowError("Index cannot be negative!");
    return 0;
}
```

---

### **Example: Robust Math**

```cpp
addon.RegisterFunction("multiply", [host](novadesk_context ctx) -> int {
    novadesk::Addon helper(ctx, host);
    
    if (!helper.IsNumber(0) || !helper.IsNumber(1)) {
        helper.ThrowError("multiply() requires two numbers!");
        return 0;
    }
    
    host->PushNumber(ctx, helper.GetNumber(0) * helper.GetNumber(1));
    return 1;
}, 2);
```

---

## **JavaScript Callbacks (`JsFunction`)**

The `JsFunction` class allows you to capture a JavaScript function passed as an argument and call it later from your C++ code (on the main thread).

#### `JsFunction(ctx, host, index)`
Captures a function from the specified stack index. Use `IsFunction(index)` first to ensure validity.

```cpp
addon.RegisterFunction("onComplete", [host](novadesk_context ctx) -> int {
    novadesk::Addon helper(ctx, host);
    
    // Capture the function at index 0
    novadesk::JsFunction callback(ctx, host, 0);
    
    if (callback.IsValid()) {
        callback.Call("Operation Successful!"); // Call with string
        callback.Call(42.0);                    // Call with number
        callback.Call();                        // Call with no args
    }
    
    return 0;
}, 1);
```

---

## **Thread Safety & Callbacks**

Native addons often perform work in the background. **You must never touch `novadesk_context` or call Host API functions from a background thread.**

### Using the `Dispatcher`
The `Dispatcher` allows you to send a task from a background thread to the **Main Thread**, where it is safe to interact with JavaScript.

```cpp
// In INIT:
auto dispatcher = new novadesk::Dispatcher(hMsgWnd);

// In a thread:
std::thread([dispatcher]() {
    // Long running work...
    double result = 100.0;
    
    dispatcher->Dispatch([](void* data) {
        // THIS CODE RUNS ON THE MAIN THREAD
        // Safe to use Host API here!
    });
}).detach();
```

---

## **Low-Level Host API (C-Compatible)**

For developers not using the C++ helper classes, all operations can be performed directly via the `NovadeskHostAPI` structure passed to `NovadeskAddonInit`.

### **Object Creation (Raw)**
To create an object manually:
```cpp
host->RegisterObjectStart(ctx, "myObject");
host->RegisterString(ctx, "innerProp", "value");
host->RegisterObjectEnd(ctx, "myObject");
```

### **Array Registration (Raw)**
To register arrays using raw pointers:
```cpp
const char* tags[] = { "alpha", "beta", "gamma" };
host->RegisterArrayString(ctx, "tags", tags, 3);

const double values[] = { 1.1, 2.2, 3.3 };
host->RegisterArrayNumber(ctx, "values", values, 3);
```

### **Callbacks (Raw)**
The low-level API uses opaque pointers for JS functions:
```cpp
void* fnPtr = host->JsGetFunctionPtr(ctx, 0); // Capture function at index 0
if (fnPtr) {
    host->PushString(ctx, "Hello from raw C++");
    host->JsCallFunction(ctx, fnPtr, 1); // Call with 1 argument
}
```

---

## **Full Example: System Utilities**

```cpp
#include <NovadeskAPI/novadesk_addon.h>

NOVADESK_ADDON_INIT(ctx, hMsgWnd, host) {
    novadesk::Addon addon(ctx, host);

    // 1. Simple Property
    addon.RegisterString("author", "Novadesk Team");

    // 2. Nested Utility Object
    addon.RegisterObject("math", [host](novadesk::Addon& math) {
        math.RegisterFunction("add", [host](novadesk_context ctx) -> int {
            novadesk::Addon h(ctx, host);
            host->PushNumber(ctx, h.GetNumber(0) + h.GetNumber(1));
            return 1;
        }, 2);
    });

    // 3. Status Check with Type Validation
    addon.RegisterFunction("checkStatus", [host](novadesk_context ctx) -> int {
        novadesk::Addon h(ctx, host);
        if (h.IsString(0)) {
            host->PushBool(ctx, 1);
        } else {
            host->PushBool(ctx, 0);
        }
        return 1;
    }, 1);
}
```
