# vscode-profiles

Define different extensions configurations and switch between them in a second.
Bind any vscode settings to your profiles.

## Motivation

In VSCode, extensions are important part of functionality... and they can become numerous.
Extensions are great, but too many of them eat up resources and slow down project load times.

As a developer, you may want to be able to switch between different development configurations, depending on what you are working on currently. If you are working on back-end, you don't need HTML/CSS extensions, if you are working in pure JS, you probably want to be able to temporarily ditch PHP stuff etc. But VSCode doesn't provide a way to manage your extensions set, you can only disable / uninstall each of them inidividually.

This extension was designed to help you with this problem.

It was partially inspired by nvm and uses the power of symlinks to maintain several independent extension folders, then switch between them. Moreover, to prevent duplication, each extension usually exists only in special extensions.storage folder in your USERPROFILE/.vscode directory, and is 'symlinkified' to profiles folder, this helps us save disk space.
Each profile is represented with its folder where extensions symlinks are stored.

## Features

- you can create, rename and delete profiles
- quickly switch profiles, using status bar menu button
- create new profile, based on existing profile (`clone` profile).
- automatically load approproate profile for the project based on workspace settings.
- bind any VS code settings from settings.json to your profile and automatically activate them on profile load using `settings-cycler`.
- backup your profiles individually to cloud using `settings-sync`.

## Commands

### switch

Switches profile and reloads all VS Code windows in order to engage it.

### create

Creates new empty profile and switches it on.
`vscode-profiles` is automatically installed in new profile.

### clone

Creates new profile, based on alredy existing profile, and switches it on.
All extensions from 'base' profile are copied over to the new profile.

### delete

Deletes profile.

### clean

This command is used to clean `extensions.storage` folder from old extension versions that are not in use in any profile.
If extension is found that is not present in any of the profiles, it is deleted.
You'll want to use it from time to time. Automatic cleaning is not currently engaged.

### maintenance

Vscode automatically updates extensions - once a new version is available, it downloads it into profile folder.
That is why profile maintenance is needed, when all newly installed extensions are moved into extensions.storage folder and replaced with symlinks. This is done automatically every time when you switch profiles, but you can do it manually with
`Maintenance` command.

### rescan

Rescans all extensions of the current profile. Supplementary command, used for debugging.

## Extension Settings

### autoSwitchToWorkspaceProfile

_default: true_
If you have `profile` option in your workspace settings (.vscode/setting.json) this profile will be automatically switched on
when you open this workspace.
Be aware that opening a project with profile bound will engage that profile for all already open projects.

### workspaceProfile

Profile name that will be turned on automatically on workspace load.
Use it only in workspace settings (in your project's .vscode/settings.json)

### extensions.symlinkifyExtensions

_default: true_
Whether extensions in profile folders will be replaced with symlinks to extensions.storage folder.
Turning this off may result in multiplied disk space usage.

### paths.profiles

_default: `<HOMEDIR>/.vscode/profiles`_
Path to the folder where profiles will be stored.

### paths.extensionsStorage

_default: `<HOMEDIR>/.vscode/extensions.storage`_
Path to the folder where all symlinkified extensions will be stored.

## Integration with another extensions

Vscode-profiles was designed with integration with 2 popular extension for settings management: `settings-cycler` and `settings-sync` in mind.

This allows you to bind any VS Code settings to your profile, so that after switching profile you get fully customized environment.
This also allows you to assign to each profile a dedicated Github gist, and save your extensions set and settings there with the help of `settings-sync` extension.

Example: in your global `settings.json` create a setting in `settings cycler` format, with id that corresponds to your profile name.
When you switch profiles, `settings.cycle<profileName>` command will be automatically executed and appropriate settings loaded.
If you don't have a `settings.cycle` settings block for your profile, you'll receive a notification.

```json
"settings.cycle": [
    {
      "id": "MyProfile", // must be unique
      "overrideWorkspaceSettings": false,
      "values": [
        {
          "sync.gist": "<your gist id here>"
        }
      ]
    },
```

Now every time when you switch to 'MyProfile', any settings that you specified within 'values' will be applied,
and you can use `Sync:Update` command to store your settings and extensions list in the cloud. If you use a public gist you can share your profile with your friends.

For more information, please refer to `settings cycler` and `settings-sync` extensions documentation.

## Known Issues

### Limitations

Only one profile can be active at the time. This means that though you can have several VS Code projects open in parallel in different windows, you cannot make them use different profiles.
To prevent conflicts, when you switch profile, all VS Code windows are automatically reloaded with new profile selected.

### Exceptions

`LiveShare` extension cannot be symlinkified since it runs `vsls-agent` service from extension folder, which makes impossible manipulations with it. That's why it is excluded from being symlinkified.
