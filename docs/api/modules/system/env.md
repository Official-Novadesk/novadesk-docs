---
title: Read environment variables with getEnv from the system module.
description: Read process environment variables.
---

# Environment Variables

Read process environment variables.
nSee [Global Variables](/api/global-variables) for `__filename` and `__dirname`.

```javascript
import { getEnv } from "system";
```

::: info Availability
Available in the [Main script](/guides/script-types.html#main-script-the-brain) only.
:::

#### Table of Contents
[[toc]]

## Methods

<MethodBox
  name="getEnv([name [, defaultValue]])"
  badge="system"
  badgeType="core"
  returns="object | string"
  :parameters="[
    { name: 'name', type: 'string', optional: true, description: 'Environment variable key (e.g. PATH, USERNAME). If omitted, all variables are returned.' },
    { name: 'defaultValue', type: 'string', optional: true, description: 'Fallback value returned when the variable is missing or empty. Only used when name is provided.' }
  ]"
>
<template #returns>An <code>object</code> map of all env vars when called with no arguments, or a <code>string</code> value for a specific variable.</template>

Returns environment variable data depending on how it is called:

- `getEnv()` — returns an object containing all environment variables as key/value pairs
- `getEnv(name)` — returns the value of the named variable, or an empty string if missing or empty
- `getEnv(name, defaultValue)` — returns the variable value, or `defaultValue` if the variable is missing or empty

::: info Windows Environment Variables
On Windows, environment variable names are case-insensitive but typically stored in uppercase (`PATH`, `USERNAME`, `APPDATA`). Empty values are treated the same as missing when a `defaultValue` is provided.
:::

<template #example>

```javascript
import { getEnv } from "system";

// Single variable with fallback
const user = getEnv("USERNAME", "unknown");
console.log("User:", user);

// Single variable, no fallback
const appdata = getEnv("APPDATA");
console.log("AppData:", appdata);

// All variables
const all = getEnv();
console.log("PATH:", all.PATH);
```

</template>
</MethodBox>
