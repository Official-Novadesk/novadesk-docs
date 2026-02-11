# Time And Date (Duktape)
Novadesk uses the Duktape JavaScript engine, so time and date behavior follows the ECMAScript 5.1 `Date` built-in. Duktape targets ES5/ES5.1 semantics, and its `Date` implementation relies on the host platform for local time, time zone, and formatting details.

All of the methods listed below are available in **both Main and UI scripts**.

## Constructor And Static Methods

### Constructor
- `Date()`: Called with `new`, creates a `Date` instance. Called as a function, returns a string representation of the current date/time.

### Static Methods
- `Date.now()`: Returns the current time in milliseconds since the Unix epoch.
- `Date.parse(dateString)`: Parses a date string and returns the time value in milliseconds since the Unix epoch (or `NaN` if invalid).
- `Date.UTC(year, month[, day[, hour[, minute[, second[, millisecond]]]]])`: Returns the time value in milliseconds for the given UTC components.

## Instance Methods

### Getters (Local Time)
- `getDate()`: Day of the month (1-31) in local time.
- `getDay()`: Day of the week (0-6, Sunday is 0) in local time.
- `getFullYear()`: Four-digit year in local time.
- `getHours()`: Hour (0-23) in local time.
- `getMilliseconds()`: Milliseconds (0-999) in local time.
- `getMinutes()`: Minutes (0-59) in local time.
- `getMonth()`: Month (0-11, January is 0) in local time.
- `getSeconds()`: Seconds (0-59) in local time.
- `getTime()`: Time value in milliseconds since the Unix epoch.
- `getTimezoneOffset()`: Difference, in minutes, between local time and UTC.

### Getters (UTC)
- `getUTCDate()`: Day of the month (1-31) in UTC.
- `getUTCDay()`: Day of the week (0-6, Sunday is 0) in UTC.
- `getUTCFullYear()`: Four-digit year in UTC.
- `getUTCHours()`: Hour (0-23) in UTC.
- `getUTCMilliseconds()`: Milliseconds (0-999) in UTC.
- `getUTCMinutes()`: Minutes (0-59) in UTC.
- `getUTCMonth()`: Month (0-11, January is 0) in UTC.
- `getUTCSeconds()`: Seconds (0-59) in UTC.

### Setters (Local Time)
- `setDate(day)`: Sets the day of the month (1-31) in local time.
- `setFullYear(year[, month[, day]])`: Sets the year in local time (optionally month and day).
- `setHours(hour[, minute[, second[, millisecond]]])`: Sets the hour in local time.
- `setMilliseconds(ms)`: Sets the milliseconds in local time.
- `setMinutes(minute[, second[, millisecond]])`: Sets the minutes in local time.
- `setMonth(month[, day])`: Sets the month (0-11) in local time (optionally day).
- `setSeconds(second[, millisecond])`: Sets the seconds in local time.
- `setTime(timeValue)`: Sets the time value in milliseconds since the Unix epoch.

### Setters (UTC)
- `setUTCDate(day)`: Sets the day of the month (1-31) in UTC.
- `setUTCFullYear(year[, month[, day]])`: Sets the year in UTC (optionally month and day).
- `setUTCHours(hour[, minute[, second[, millisecond]]])`: Sets the hour in UTC.
- `setUTCMilliseconds(ms)`: Sets the milliseconds in UTC.
- `setUTCMinutes(minute[, second[, millisecond]])`: Sets the minutes in UTC.
- `setUTCMonth(month[, day])`: Sets the month (0-11) in UTC (optionally day).
- `setUTCSeconds(second[, millisecond])`: Sets the seconds in UTC.

### Formatting And Conversion
- `toString()`: Returns a human-readable local date and time string.
- `toDateString()`: Returns a human-readable local date string (date only).
- `toTimeString()`: Returns a human-readable local time string (time only).
- `toUTCString()`: Returns a human-readable UTC date and time string.
- `toISOString()`: Returns an ISO 8601 string in UTC.
- `toJSON()`: Returns the JSON serialization (usually same as `toISOString()`).
- `toLocaleString()`: Returns a locale-aware date and time string.
- `toLocaleDateString()`: Returns a locale-aware date string.
- `toLocaleTimeString()`: Returns a locale-aware time string.
- `valueOf()`: Returns the primitive time value in milliseconds since the Unix epoch.

### Legacy (Deprecated)
- `getYear()`: Returns the year minus 1900 (legacy behavior).
- `setYear(year)`: Sets the year (legacy behavior; years 0-99 map to 1900-1999).
- `toGMTString()`: Legacy alias for `toUTCString()`.

## Notes On Time Zones And Locales

- Duktape's `Date` depends on the host platform for local time, time zone offset, and date formatting. This means outputs from `toString()`, `toLocaleString()`, and related methods can vary by OS and configuration.
- Locale-aware formatting (`toLocaleString()` and friends) uses locale-specific formats and typically relies on `Intl.DateTimeFormat` when available in the JS environment.

## Quick Examples

```javascript
// Current time (ms since epoch)
var now = Date.now();

// Create a date (local time)
var d = new Date(2026, 1, 11, 14, 30, 0); // Feb 11, 2026 14:30:00

// UTC formatting
var utc = d.toISOString();

// Local formatted string
var local = d.toString();
```
