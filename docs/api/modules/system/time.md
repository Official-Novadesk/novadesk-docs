---
title: Time formatting and timestamp utilities from the system module.
description: Format time, work with timestamps, and time zone utilities.
---

# time Module

Format the current date and time, work with Unix timestamps, parse date strings, and check daylight saving time — all using standard `strftime`-style format strings.

```javascript
import { time } from "system";
```

::: info Availability
Available in the [Main script](/guides/script-types.html#main-script-the-brain) only.
:::

#### Table of Contents
[[toc]]

## Methods

<MethodBox
  name="time.time([format [, locale]])"
  badge="time"
  badgeType="core"
  returns="string"
  :parameters="[
    { name: 'format', type: 'string', optional: true, description: 'strftime-style format string. Defaults to %H:%M:%S if omitted or empty.' },
    { name: 'locale', type: 'string', optional: true, description: 'BCP 47 locale name for locale-aware tokens (e.g. en-US, de-DE, ja-JP). Optional.' }
  ]"
>
<template #returns>The current local date/time as a formatted string.</template>

Formats the current local time using a `strftime`-style format string. When a locale is provided, locale-sensitive tokens such as `%A` (weekday name) and `%B` (month name) are rendered in that language.

**Common format tokens:**

| Token | Description | Example |
|---|---|---|
| `%Y` | 4-digit year | `2026` |
| `%m` | Month as zero-padded number (01–12) | `08` |
| `%d` | Day of month as zero-padded number (01–31) | `13` |
| `%H` | Hour in 24-hour format (00–23) | `14` |
| `%I` | Hour in 12-hour format (01–12) | `02` |
| `%M` | Minute (00–59) | `30` |
| `%S` | Second (00–59) | `05` |
| `%A` | Full weekday name | `Thursday` |
| `%B` | Full month name | `August` |
| `%p` | AM or PM | `PM` |
| `%j` | Day of year (001–366) | `225` |
| `%W` | Week number of year (00–53) | `32` |

<template #example>

```javascript
import { time } from "system";

// Current date and time
console.log(time.time("%Y-%m-%d %H:%M:%S"));
// "2026-08-13 14:30:05"

// Time only (default format)
console.log(time.time());
// "14:30:05"

// 12-hour clock
console.log(time.time("%I:%M %p"));
// "02:30 PM"

// Locale-aware weekday and month name
console.log(time.time("%A, %B %d %Y", "en-US"));
// "Thursday, August 13 2026"

// German locale
console.log(time.time("%A, %d. %B %Y", "de-DE"));
// "Donnerstag, 13. August 2026"
```

</template>
</MethodBox>

<MethodBox
  name="time.timeStamp()"
  badge="time"
  badgeType="core"
  returns="number"
>
<template #returns>The current Unix timestamp in seconds as a floating-point number.</template>

Returns the current time as a Unix timestamp — the number of seconds elapsed since 1970-01-01 00:00:00 UTC. The value includes a fractional part for sub-second precision.

<template #example>

```javascript
import { time } from "system";

const ts = time.timeStamp();
console.log("Unix timestamp:", ts);
// e.g. 1755100205.123

// Compatible with JS Date (multiply by 1000)
const date = new Date(ts * 1000);
console.log("JS Date:", date.toISOString());

// Calculate elapsed time
const start = time.timeStamp();
// ... do work ...
const elapsed = time.timeStamp() - start;
console.log("Elapsed:", elapsed.toFixed(3), "seconds");
```

</template>
</MethodBox>

<MethodBox
  name="time.timeStampFormat(timestamp, format [, locale])"
  badge="time"
  badgeType="core"
  returns="string"
  :parameters="[
    { name: 'timestamp', type: 'number', description: 'Unix timestamp in seconds.' },
    { name: 'format', type: 'string', description: 'strftime-style format string. Defaults to %H:%M:%S if empty.' },
    { name: 'locale', type: 'string', optional: true, description: 'BCP 47 locale name for locale-aware tokens. Optional.' }
  ]"
>
<template #returns>The given timestamp formatted as a string in local time.</template>

Converts a Unix timestamp to a formatted local-time string. Useful for displaying timestamps fetched from APIs or stored in files.

<template #example>

```javascript
import { time } from "system";

const ts = time.timeStamp();

// Format an existing timestamp
console.log(time.timeStampFormat(ts, "%d/%m/%Y %H:%M:%S"));
// "13/08/2026 14:30:05"

// Format with locale
console.log(time.timeStampFormat(ts, "%A, %B %d", "en-US"));
// "Thursday, August 13"

// Format a past timestamp (e.g. from an API response)
const apiTimestamp = 1700000000;
console.log(time.timeStampFormat(apiTimestamp, "%Y-%m-%d"));
// Formatted date of that unix timestamp in local time
```

</template>
</MethodBox>

<MethodBox
  name="time.timeStampLocale(text, format, locale)"
  badge="time"
  badgeType="core"
  returns="number | null"
  :parameters="[
    { name: 'text', type: 'string', description: 'The date/time string to parse.' },
    { name: 'format', type: 'string', description: 'strftime-style format string that matches the input text.' },
    { name: 'locale', type: 'string', description: 'BCP 47 locale name used for parsing locale-sensitive tokens.' }
  ]"
>
<template #returns>The parsed Unix timestamp as a <code>number</code>, or <code>null</code> if parsing fails.</template>

Parses a locale-formatted date/time string into a Unix timestamp. All three arguments are required. Returns `null` if the input string does not match the format or if parsing otherwise fails.

::: tip
This is the reverse of `formatLocale` — use it to turn a human-readable date string back into a numeric timestamp.
:::

<template #example>

```javascript
import { time } from "system";

// Parse a date string into a Unix timestamp
const ts = time.timeStampLocale(
  "13/08/2026 14:30:05",
  "%d/%m/%Y %H:%M:%S",
  "en-US"
);

if (ts !== null) {
  console.log("Parsed timestamp:", ts);
  console.log("Formatted back:", time.timeStampFormat(ts, "%Y-%m-%d"));
} else {
  console.log("Parse failed — check that format matches input");
}

// Parse a named-month date
const ts2 = time.timeStampLocale(
  "August 13, 2026",
  "%B %d, %Y",
  "en-US"
);
console.log("August 13 timestamp:", ts2);
```

</template>
</MethodBox>

<MethodBox
  name="time.formatLocale(timestamp, format, locale)"
  badge="time"
  badgeType="core"
  returns="string"
  :parameters="[
    { name: 'timestamp', type: 'number', description: 'Unix timestamp in seconds.' },
    { name: 'format', type: 'string', description: 'strftime-style format string. Defaults to %H:%M:%S if empty.' },
    { name: 'locale', type: 'string', description: 'BCP 47 locale name for locale-aware output. Required.' }
  ]"
>
<template #returns>The timestamp formatted as a locale-aware string in local time.</template>

Formats a Unix timestamp using an explicit locale. Behaves identically to `timeStampFormat` except the locale parameter is required rather than optional.

<template #example>

```javascript
import { time } from "system";

const ts = time.timeStamp();

// English
console.log(time.formatLocale(ts, "%A, %B %d %Y", "en-US"));
// "Thursday, August 13 2026"

// German
console.log(time.formatLocale(ts, "%A, %d. %B %Y", "de-DE"));
// "Donnerstag, 13. August 2026"

// Japanese
console.log(time.formatLocale(ts, "%Y年%m月%d日", "ja-JP"));
// "2026年08月13日"
```

</template>
</MethodBox>

<MethodBox
  name="time.daylightSavingTime()"
  badge="time"
  badgeType="core"
  returns="boolean"
>
<template #returns><code>true</code> if the local system clock is currently observing daylight saving time, <code>false</code> otherwise.</template>

Checks whether the local system time is currently in daylight saving time (DST). The result reflects the current system locale and timezone settings.

<template #example>

```javascript
import { time } from "system";

const dst = time.daylightSavingTime();
console.log("DST active:", dst);

// Adjust displayed timezone label based on DST
const tzLabel = dst ? "BST" : "GMT"; // UK example
console.log("Current time:", time.time("%H:%M") + " " + tzLabel);
```

</template>
</MethodBox>

## Practical Examples

### Clock Widget

```javascript
import { time } from "system";

function updateClock() {
  const timeStr  = time.time("%H:%M:%S");
  const dateStr  = time.time("%A, %B %d %Y", "en-US");
  const dst      = time.daylightSavingTime();

  console.log("Time:", timeStr);
  console.log("Date:", dateStr);
  console.log("DST:", dst ? "yes" : "no");
}

// Refresh every second
setInterval(updateClock, 1000);
updateClock();
```

### Elapsed / Countdown Timer

```javascript
import { time } from "system";

// Record a start time
const startTs = time.timeStamp();
console.log("Started at:", time.timeStampFormat(startTs, "%H:%M:%S"));

// Later — calculate elapsed time
setInterval(() => {
  const elapsed = time.timeStamp() - startTs;
  const hours   = Math.floor(elapsed / 3600);
  const minutes = Math.floor((elapsed % 3600) / 60);
  const seconds = Math.floor(elapsed % 60);

  console.log(
    "Uptime:",
    String(hours).padStart(2, "0") + ":" +
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0")
  );
}, 1000);
```

### Parse and Re-format a Date

```javascript
import { time } from "system";

// Parse a date string from an external source
const rawDate = "2026-08-13";
const ts = time.timeStampLocale(rawDate, "%Y-%m-%d", "en-US");

if (ts !== null) {
  // Display in a friendlier format
  const friendly = time.formatLocale(ts, "%B %d, %Y", "en-US");
  console.log("Friendly date:", friendly); // "August 13, 2026"
} else {
  console.error("Failed to parse date:", rawDate);
}
```

**Notes:**

- All methods use the local system timezone. There is no built-in UTC or timezone-offset mode
- `timeStampLocale` requires all three arguments — passing fewer throws a `TypeError`
- `formatLocale` requires all three arguments — passing fewer throws a `TypeError`
- `time.time()` with no arguments defaults to `%H:%M:%S`
- Locale strings follow BCP 47 (e.g. `en-US`, `de-DE`, `fr-FR`, `ja-JP`)
