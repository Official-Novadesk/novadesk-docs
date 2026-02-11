# Changelog

## [0.4.0.0-beta] - 2026-02-11
###### 📅 11th February, 2026 

### Added

#### Window & Lifecycle
- Added new `.on` callbacks for `widgetWindow` focus and unfocus events.
- Added new `widgetWindow` methods: `setFocus()` and `unFocus()`.
- Added new `widgetWindow` methods: `getHandle()`, `getInternalPointer()`, and `getTitle()`.
- Added support for gradient backgrounds in `widgetWindow`.

#### Elements
- Added new element type `roundLine`.
- Added new element type `shapes` with multiple shape variants.
- Added gradient color support for elements.
- Added automatic width and height calculation for `bar` element.
- Added new element property `show` to control element visibility.

#### System & Runtime
- Added new system monitor for `audioLevel`.
- Added system to detect and verify portable environment support.
- Added `require` method for loading modules.

#### Performance & Updates
- Added `win.startUpdate()` and `win.endUpdate()` methods for batch updating element properties.

#### Installation
- Added self-installation support for widgets using the new tool `installer_stub`.

### Fixed
- Fixed issue where images were not displayed when width or height was not explicitly set.

### Removed
- Removed deprecated element properties like `solidColor2` and `gradientAngle`, replaced by the new gradient support system.

<!-- ================================================================================= -->

## [0.3.0.0-beta] - 2026-02-05
###### 📅 5th February, 2026 

### Added

- Extended fontWeight support with string and numeric values.
  - String values: thin, extralight or ultralight, light, regular, medium, semibold or semi-bold, bold, extrabold or ultrabold, black
  - Numeric values: 100, 200, 300, 400, 500, 600, 700, 800, 900

- Added fontPath property for loading custom fonts in the text element
- Added inline style tag support for the text element
- Added fontColor support for gradient colors
- Added fontShadow support for text
- Added letterSpacing property for the text element
- Added case property for the text element
- Added underline property for the text element
- Added strikethrough property for the text element

### Supported Inline Tags

- `<b>` : Bold text
- `<i>` : Italic text
- `<u>` : Underlined text
- `<s>` : Strikethrough text
- `<color=value>` : Changes text color or applies a gradient  
  Example: `<color=#f00>Red Text</color>`  
  Example: `<color=linearGradient(0,#f00,#0f0)>Gradient Text</color>`
- `<size=value>` : Changes font size in pixels  
  Example: `<size=24>Large Text</size>`
- `<font=name>` : Changes font face  
  Example: `<font=Consolas>Monospaced Text</font>`
- `<case=value>` : Changes text case  
  Valid values:
  - `normal` : Maintains original casing
  - `upper` : Converts all text to uppercase
  - `lower` : Converts all text to lowercase
  - `capitalize` : Capitalizes the first letter of each word
  - `sentence` : Capitalizes the first letter of the first word  
  Example: `<case=upper>this will be uppercase</case>`

<!-- ================================================================================= -->

## [0.2.0.0-beta] - 2026-01-30
###### 📅 30th January, 2026 

### Added
- New JavaScript APIs on the `app` object: `getAppDataPath()`, `getSettingsFilePath()`, and `getLogPath()`.
- Dynamic product name retrieval from executable resources for consistent directory naming.

### Fixed
- **Single Instance Enforcement**: Resolved an issue where multiple instances could run if one was started as Administrator (by the installer) and another as a Standard User.
- **Changelog Sorting**: Standardized versioning to 3-part Semver to ensure "Latest" version labeling works correctly.

### Changed
- **Branding Consistency**: Refactored `GetAppTitle()` to use `PathUtils::GetProductName()`, ensuring the product name is consistently pulled from executable resources across the entire application (including the tray menu).
- Redirected `settings.json`, `config.json`, and `logs.log` to the user's `%APPDATA%` directory.
- Updated the installer and uninstaller to handle user data cleanup in AppData.
- Consolidated resource extraction logic across the codebase for improved performance (caching).

<!-- ================================================================================= -->

## [0.1.0.0-beta] - 2026-01-30  
###### 📅 30th January, 2026  

### Added
- Initial beta release...
