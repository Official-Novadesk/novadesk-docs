# Runtime Mode

Novadesk can run in two modes: **Portable** and **Standard**. The mode controls where settings, logs, and widget data are stored.

## Portable Mode

Portable mode keeps all data alongside the executable so you can move the folder without losing settings.

Typical behavior:
- Settings and logs are stored next to the `Novadesk.exe` folder.
- Widgets remain in the same local folder structure.
- Best for USB drives or single-folder deployments.

## Standard Mode

Standard mode uses system locations for user data.

Typical behavior:
- Settings and logs are stored under `%APPDATA%\\Novadesk`.
- Installer-based setups default to this mode.
- Best for normal Windows installations.

## Choosing A Mode

Use **Portable** if you want Novadesk fully self-contained in one folder.  
Use **Standard** if you want settings managed in the user profile and installed via a setup.
