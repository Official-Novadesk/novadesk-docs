---
title: CLI Commands
---

# CLI Commands

Novadesk ships several executables, each with its own command-line interface. This page covers every supported argument so you can automate, script, or integrate Novadesk into your own workflows.

#### Table of Contents
[[toc]]

---

## Quick overview

| Tool | Purpose |
|---|---|
| `Novadesk.exe` | The desktop widget runtime |
| `nwm` | Widget development tool (init / run / build) |
| `ndpkg_installer.exe` | Package installer for `.ndpkg` widget bundles |
| `manage_novadesk.exe` | The management UI |

---

## `Novadesk.exe`

`Novadesk.exe` is the main desktop runtime. It enforces **single-instance execution** via a Windows mutex, which shapes how CLI arguments behave:

- **No running instance** → a new instance starts. Any `--enable-*` / `--disable-*` settings and script paths are applied at startup.
- **Instance already running** → supported commands are forwarded to the existing instance via Windows messaging.

Non-flag arguments (paths that don't start with `-`) are always treated as widget script paths to load.

::: tip First time? Start here.
If you just installed Novadesk and want to load a widget, the simplest command is:

```bash
Novadesk.exe "C:\path\to\my-widget\index.js"
```

This works whether Novadesk is already running or just starting up.
:::

---

<CliCommandBox
  command="--exit"
  platform="Novadesk.exe"
  platformType="novadesk"
  usage="Novadesk.exe --exit"
>

Gracefully shuts down the running Novadesk instance. All three flag styles are equivalent:

```bash
Novadesk.exe /exit
Novadesk.exe -exit
Novadesk.exe --exit
```

The command is forwarded to the existing instance and triggers a clean shutdown.

</CliCommandBox>

<CliCommandBox
  command="--list-scripts"
  platform="Novadesk.exe"
  platformType="novadesk"
  usage="Novadesk.exe --list-scripts"
  :flags="[
    { flag: '--list-scripts', description: 'Print loaded script paths to stdout' },
    { flag: '--list-scripts-file', value: 'path', description: 'Write loaded script paths to a file instead' }
  ]"
>

Outputs all currently loaded widget script paths from the running instance.

```bash
# Print to stdout
Novadesk.exe --list-scripts

# Save to a file
Novadesk.exe --list-scripts-file "C:\temp\novadesk-scripts.txt"
```

Useful in automation scripts when you need to capture which widgets are running.

</CliCommandBox>

<CliCommandBox
  command="--refresh"
  platform="Novadesk.exe"
  platformType="novadesk"
  usage="Novadesk.exe --refresh <path>"
  :flags="[
    { flag: '--refresh', value: 'path', description: 'Reload a specific widget script' },
    { flag: '--refresh-all', description: 'Reload all loaded widget scripts' }
  ]"
>

Reloads one or all widget scripts in the running instance without restarting everything.

```bash
# Refresh a single widget
Novadesk.exe --refresh "C:\path\to\widget\index.js"

# Refresh everything
Novadesk.exe --refresh-all
```

</CliCommandBox>

<CliCommandBox
  command="--unload"
  platform="Novadesk.exe"
  platformType="novadesk"
  usage="Novadesk.exe --unload <path>"
  :flags="[
    { flag: '--unload', value: 'path', description: 'Remove a specific widget script from the running instance' }
  ]"
>

Removes a specific widget from the running instance. The widget stops immediately and is not reloaded on the next startup.

```bash
Novadesk.exe --unload "C:\path\to\widget\index.js"
```

</CliCommandBox>

<CliCommandBox
  command="--load"
  platform="Novadesk.exe"
  platformType="novadesk"
  usage="Novadesk.exe --load <path>"
  :flags="[
    { flag: '--load', value: 'path', description: 'Load a widget script into the running instance. Can be repeated.' },
    { flag: '<path>', description: 'Positional shorthand — paths without a leading flag are treated as --load' }
  ]"
>

Adds one or more widget scripts to the running instance. You can repeat `--load` for multiple widgets, or pass paths directly as positional arguments:

```bash
# Using the flag (repeatable)
Novadesk.exe --load "C:\path\to\widgetA\index.js"
Novadesk.exe --load "C:\path\to\widgetA\index.js" --load "C:\path\to\widgetB\index.js"

# Positional shorthand — no flag needed
Novadesk.exe "C:\path\to\widgetA\index.js" "C:\path\to\widgetB\index.js"
```

</CliCommandBox>

<CliCommandBox
  command="--enable-hardware-acceleration"
  platform="Novadesk.exe"
  platformType="novadesk"
  usage="Novadesk.exe --enable-hardware-acceleration"
  :flags="[
    { flag: '--enable-hardware-acceleration', description: 'Turn hardware acceleration on' },
    { flag: '--disable-hardware-acceleration', description: 'Turn hardware acceleration off' }
  ]"
>

Saves the hardware acceleration setting to `settings.json`.

```bash
Novadesk.exe --enable-hardware-acceleration
Novadesk.exe --disable-hardware-acceleration
```

::: warning Requires restart
The change is saved immediately, but only fully takes effect after restarting Novadesk. The Manage UI will prompt you when you toggle this through the settings panel.
:::

</CliCommandBox>

<CliCommandBox
  command="--enable-debugging"
  platform="Novadesk.exe"
  platformType="novadesk"
  usage="Novadesk.exe --enable-debugging"
  :flags="[
    { flag: '--enable-debugging', description: 'Enable the DevTools inspector' },
    { flag: '--disable-debugging', description: 'Disable the DevTools inspector' }
  ]"
>

Enables or disables the DevTools inspector. Takes effect immediately on the running instance.

```bash
Novadesk.exe --enable-debugging
Novadesk.exe --disable-debugging
```

</CliCommandBox>

<CliCommandBox
  command="--enable-logging"
  platform="Novadesk.exe"
  platformType="novadesk"
  usage="Novadesk.exe --enable-logging"
  :flags="[
    { flag: '--enable-logging', description: 'Turn console and log output on' },
    { flag: '--disable-logging', description: 'Turn console and log output off' }
  ]"
>

Toggles log output. Takes effect immediately on the running instance.

```bash
Novadesk.exe --enable-logging
Novadesk.exe --disable-logging
```

</CliCommandBox>

<CliCommandBox
  command="--enable-save-log-to-file"
  platform="Novadesk.exe"
  platformType="novadesk"
  usage="Novadesk.exe --enable-save-log-to-file"
  :flags="[
    { flag: '--enable-save-log-to-file', description: 'Write logs to %AppData%\\Novadesk\\logs.log' },
    { flag: '--disable-save-log-to-file', description: 'Stop writing logs to file' }
  ]"
>

Enables or disables saving log output to a file. Takes effect immediately on the running instance.

```bash
Novadesk.exe --enable-save-log-to-file
Novadesk.exe --disable-save-log-to-file
```

</CliCommandBox>

<CliCommandBox
  command="--new-instance"
  platform="Novadesk.exe"
  platformType="novadesk"
  usage="Novadesk.exe --new-instance"
>

Forces a completely new Novadesk process, bypassing the single-instance check. Useful for testing widgets in isolation.

```bash
Novadesk.exe --new-instance
Novadesk.exe --new-instance "C:\path\to\widget\index.js"
```

</CliCommandBox>

---

## `nwm` — Novadesk Widget Maker

`nwm` is the command-line development tool for creating, running, and packaging widgets.

::: tip Typical workflow
```bash
nwm init my-widget   # scaffold a new project
cd my-widget
nwm run              # launch it in Novadesk for live development
nwm build            # package it for distribution when done
```
:::

---

<CliCommandBox
  command="init"
  platform="nwm"
  platformType="nwm"
  usage="nwm init <widget-name>"
  :flags="[
    { flag: '<widget-name>', value: 'name', description: 'Name of the widget folder and project to create' }
  ]"
>

Scaffolds a new widget project from the default template in the current directory.

```bash
nwm init my-widget
```

Creates a `my-widget/` folder with an `index.js` entry point and a `meta.json` pre-filled with the widget name.

</CliCommandBox>

<CliCommandBox
  command="run"
  platform="nwm"
  platformType="nwm"
  usage="nwm run"
>

Loads the widget in the current directory into a running (or freshly started) Novadesk instance. Run this from inside your widget folder.

```bash
nwm run
```

</CliCommandBox>

<CliCommandBox
  command="build"
  platform="nwm"
  platformType="nwm"
  usage="nwm build"
>

Packages the widget in the current directory into a distributable `.ndpkg` file placed in a `dist/` folder.

```bash
nwm build
```

The output is a self-contained installer bundle that users can open directly with `ndpkg_installer.exe`. Build behavior — version stamping, excluded files, and bundled addons — is controlled by the widget's `meta.json`.

</CliCommandBox>

<CliCommandBox
  command="--version"
  platform="nwm"
  platformType="nwm"
  usage="nwm --version"
  :flags="[
    { flag: '-v', description: 'Short alias for --version' },
    { flag: '--version', description: 'Print the installed nwm version' }
  ]"
>

Prints the installed `nwm` version.

```bash
nwm -v
nwm --version
```

</CliCommandBox>

<CliCommandBox
  command="--help"
  platform="nwm"
  platformType="nwm"
  usage="nwm --help"
  :flags="[
    { flag: '-h', description: 'Short alias for --help' },
    { flag: '--help', description: 'Print the usage summary' }
  ]"
>

Prints the usage summary with all available commands.

```bash
nwm -h
nwm --help
```

</CliCommandBox>

---

## `ndpkg_installer.exe`

A standalone GUI installer for `.ndpkg` widget packages. Can be opened by double-clicking a `.ndpkg` file or invoked from the command line.

<CliCommandBox
  command="<package-path>"
  platform="ndpkg_installer.exe"
  platformType="ndpkg"
  usage="ndpkg_installer.exe <path-to-package.ndpkg>"
  :flags="[
    { flag: '<path>', value: '*.ndpkg', optional: true, description: 'Path to the .ndpkg file to install. Opens a file picker if omitted.' }
  ]"
>

Installs a widget package. Passing the path skips the file picker:

```bash
ndpkg_installer.exe "C:\path\to\widget.ndpkg"
```

If no path is provided, a file picker opens for the user to select a `.ndpkg` manually.

The installer automatically detects whether Novadesk is in **portable mode** (a `settings.json` next to the executable) or **installed mode** (writing to `Documents\Novadesk\`) and installs to the correct location.

</CliCommandBox>

---

## `manage_novadesk.exe`

The Novadesk management UI — the tray application that lists loaded widgets, manages settings, and monitors logs. Normally opened without arguments.

<CliCommandBox
  command="--request-close"
  platform="manage_novadesk.exe"
  platformType="manage"
  usage="manage_novadesk.exe --request-close"
>

Sends a close message to an already-running Manage window and exits.

```bash
manage_novadesk.exe --request-close
```

Used internally by `ndpkg_installer.exe` during package installation to safely close the Manage UI before copying files. You can also use it in scripts that need to dismiss the Manage window programmatically.

</CliCommandBox>
