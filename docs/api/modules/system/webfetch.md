---
title: Fetch text content from URLs or local files with webFetch.
---

# webFetch

Asynchronously fetch text content from HTTP/HTTPS URLs or local files. Returns a `Promise` that resolves with the response body as a string.

```javascript
import { webFetch } from "system";
```

::: info Availability
Available in the [Main script](/guides/script-types.html#main-script-the-brain) only.
:::

#### Table of Contents
[[toc]]

## Methods

<MethodBox
  name="webFetch(urlOrPath)"
  badge="system"
  badgeType="core"
  returns="Promise&lt;string&gt;"
  :parameters="[
    { name: 'urlOrPath', type: 'string', description: 'The URL or file path to fetch. Supports http://, https://, file://, absolute paths, and relative paths.' }
  ]"
>
<template #returns>
  A <code>Promise&lt;string&gt;</code> that resolves with the full response body as text on success, or rejects with an error message on failure.
</template>

Fetches text content from a remote URL or local file. The network request runs on a background thread so it does not block the JavaScript execution. The promise is resolved back on the JS thread when the request completes.

**Supported input formats:**

| Input | Behavior |
|---|---|
| `https://...` | HTTPS request with SSL/TLS |
| `http://...` | Plain HTTP request |
| `file:///C:/path/to/file.txt` | Read a local file via `file://` URL |
| `C:\path\to\file.txt` | Read a local file via absolute path |
| `./data/config.json` | Relative path — resolved from the widget's entry script directory |

::: warning
`webFetch` throws a `TypeError` synchronously if `urlOrPath` is missing or empty. Network failures and file-not-found errors cause the Promise to **reject** rather than throw synchronously.
:::

<template #example>

```javascript
import { webFetch } from "system";

// Fetch JSON from a web API
async function fetchWeather() {
  try {
    const text = await webFetch("https://wttr.in/?format=j1");
    const data = JSON.parse(text);
    console.log("Weather:", data);
  } catch (err) {
    console.error("Request failed:", err);
  }
}
fetchWeather();

// Load a local config file (relative path)
webFetch("./config/settings.json")
  .then(text => {
    const config = JSON.parse(text);
    console.log("Config loaded:", config);
  })
  .catch(err => console.error("Load failed:", err));

// Read a file using an absolute path
webFetch("C:\\Data\\notes.txt")
  .then(text => console.log("File contents:", text))
  .catch(err => console.error("File error:", err));

// Read a file using a file:// URL
webFetch("file:///C:/Data/notes.txt")
  .then(text => console.log("File contents:", text));
```

</template>
</MethodBox>

## How It Works

`webFetch` creates a background thread for each call. When the thread finishes, the result is posted back to the JS message loop and the Promise is resolved or rejected there.

This means:
- Multiple `webFetch` calls can run concurrently without blocking each other
- The widget UI and timers remain responsive while waiting for a response
- Resolving always happens on the JS thread — no synchronisation needed in your callbacks

## Practical Examples

### Fetch and Display JSON Data

```javascript
import { webFetch } from "system";
import { json } from "system";

async function loadRemoteData(url) {
  const text = await webFetch(url);
  return JSON.parse(text);
}

// Fetch GitHub user info
loadRemoteData("https://api.github.com/users/octocat")
  .then(user => {
    console.log("Name:", user.name);
    console.log("Public repos:", user.public_repos);
    console.log("Followers:", user.followers);
  })
  .catch(err => console.error("GitHub fetch failed:", err));
```

### Periodic Remote Data Refresh

Poll an endpoint on a timer to keep your widget data up to date:

```javascript
import { webFetch } from "system";

let lastData = null;

async function refreshData() {
  try {
    const text = await webFetch("https://example.com/api/status");
    const data = JSON.parse(text);

    if (JSON.stringify(data) !== JSON.stringify(lastData)) {
      lastData = data;
      console.log("Data updated:", data);
      // Update your widget UI here
    }
  } catch (err) {
    console.warn("Refresh failed:", err);
  }
}

// Refresh every 60 seconds
setInterval(refreshData, 60 * 1000);
refreshData(); // Initial load
```

### Load a Bundled Config File

Relative paths are resolved from the widget's entry script directory, so you can ship config files alongside your widget:

```javascript
import { webFetch } from "system";

async function loadConfig() {
  try {
    const text = await webFetch("./config.json");
    const config = JSON.parse(text);
    console.log("Widget config:", config);
    return config;
  } catch (err) {
    console.warn("Could not load config, using defaults");
    return { theme: "light", scale: 1.0 };
  }
}

const config = await loadConfig();
```

### Safe Wrapper with Timeout

`webFetch` has no built-in timeout. Wrap it with `Promise.race` if you need one:

```javascript
import { webFetch } from "system";

function fetchWithTimeout(url, timeoutMs = 10000) {
  const fetchPromise = webFetch(url);
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject("Request timed out after " + timeoutMs + "ms"), timeoutMs)
  );
  return Promise.race([fetchPromise, timeoutPromise]);
}

fetchWithTimeout("https://example.com/api/data", 5000)
  .then(text => console.log("Response:", text))
  .catch(err => console.error("Error:", err));
```

**Notes:**

- The response is always returned as a raw **string**. Use `JSON.parse()` to work with JSON responses
- There is no built-in request timeout — use `Promise.race` with a `setTimeout` if needed
- Binary content (images, archives) is not suitable for `webFetch` since the data is treated as text
- Relative paths resolve to the widget's **entry script directory**, not the current working directory
- `file://` URLs on Windows should use three slashes and an absolute path: `file:///C:/path/file.txt`
- Each call spawns a detached background thread — avoid issuing hundreds of concurrent calls
