# vscode-profiles

Define different extensions configurations and switch between them in a second.
Bind any vscode settings to your profiles.

*Note: Just letting you know that I didn't abandon this project, but due to the war in Ukraine I currently don't have a possibility to actively develop it, so sorry for being unresponsive with issues and PR's. But I have some new cool features in mind and hopefully new updated version will be released in foreseeble future, cheers!*

![vscode-profiles-basic-operation-gif](images/gif/basic_operation.gif 'creating and switching profiles')

## Motivation

In VSCode, extensions are important part of functionality... and they can become numerous.
Extensions are great, but if there are too many, they eat up resources and slow down project load times.

As a developer, you may want to be able to switch between different development configurations, depending on what you are working on currently. If you are working on back-end, you don't need HTML/CSS extensions, if you are working in pure JS, you probably want to be able to temporarily ditch PHP stuff etc. But VSCode doesn't provide a way to manage your extensions set, you can only disable / uninstall each of them inidividually.

This extension was designed to help you with this problem.

It was partially inspired by _nvm_ and uses the power of symlinks to maintain several independent extension folders, then switch between them. Moreover, to prevent duplication, each extension usually exists only in special `extensions.storage` folder in your USERPROFILE/.vscode directory, and is symlinked to profile folder, that helps us save disk space.
Each profile therefore is represented with the separate directory, where extensions symlinks are stored.

## Features

- you can create, rename and delete profiles
- quickly switch profiles, using status bar menu button
- create new profiles, based on existing profiles (`clone` profiles).
- automatically load appropriate profile for the project based on workspace settings.
- bind any VS code settings from settings.json to your profile and automatically activate them on profile load using `settings-cycler`.
- backup your profiles individually to cloud using `settings-sync`.

## Installation

Extension automatically creates folders structure, required for it to function, but there may be permission problems.

1. because `extensions` folder is used (locked) by VS Code and Node.js cannot access is to turn it into symlink.
   This happens on Windows, I haven't tested it yet on Linux and Mac (feel free to share your experience with me).
   On Windows, the easiest solution will be to use an unblocking tool (I recommend [lock-hunter](https://lockhunter.com/)) to unlock 'extensions' folder in your `<user profile>/.vscode` directory.
   Reload VS Code and extension will be able to properly set up folders for you (if it didn't happen, try `rescan` command). Reload again.

The other way around is to create the necessary folder structure by yourself:

- shut down VS Code;
- in your `<user profile>/.vscode` directory create empty folder `profiles`;
- move `extensions` folder inside `profiles`. this will be your starting profile; you can rename it to `Default`, for example. 
- Then you'll need to create the symlink to this folder, so that it would replace the `extensions` folder in its former location. Make sure that symlink has name `extensions`.
  On Windows, you can do it with `cmd`:
  - Open cmd with Administrator rights
  - execute command `mklink /D %USERPROFILE%\.vscode\extensions %USERPROFILE%\.vscode\profiles\extensions` (if you haven't rename your folder, otherwise pass the right name to the command).
- Start VS Code now, the extension should be functional.

After this, the default profile will be automatically recognized and switched on.
It will contain all extensions that you had installed up to this moment.
You may rename this profile or delete it later when you create new ones.

2. If you still have permission errors, consider running VS Code as **administrator**m, this will probably fix the problems.

## Commands

### switch

Switches profile and reloads all VS Code windows in order to engage it.

### create

Creates new empty profile and switches it on.
`vscode-profiles` is automatically installed in the new profile.

### clone

Creates new profile, based on already existing profile, and switches it on.
All extensions from 'base' profile are copied over to the new profile.
May be useful also for debugging your extensions - you can clone your current profile and then uninstall extensions one after another until you find the offending extension.

### delete

Deletes profile.

### clean

This command is used to clean `extensions.storage` folder from old extension versions that are not longer in use in any profile.
If extension has been found that is not present in any of the profiles, it is deleted.
You'll want to use it from time to time. Automatic cleaning is not currently engaged.

### maintenance

Vscode automatically updates extensions - once a new version is available, it downloads it into profile folder.
That is why profile maintenance is needed, when all newly installed extensions are moved into `extensions.storage` folder and replaced with symlinks. This is done automatically every time when you switch profiles, but you can do it manually with
`Maintenance` command.

### rescan

Rescans all extensions of the current profile. Supplementary command, used for debugging.

## Extension Settings

(don't forget to prepend those with `profiles.` in settings.json)

### initial

Profile name that will be turned on automatically on workspace load.
Use it only in workspace settings (in your project's .vscode/settings.json).

### autoSwitch.initial

_default: true_
If you have `profile` option in your workspace settings (`.vscode/setting.json`) this profile will be automatically activated, when you open this workspace.

At this time, this means that you cannot switch profiles, if you have 'bounded' (initial) profile set (if 'autoSwitch.initial' option is set to 'true' and you have 'initial' option set). To change the profile, you should change 'initial' setting and re-load your workspaces. So, I currently recommend to use this option in workspace settings when you are settled on what profile you want to use with your project. Do not use it in user settings!

In the future, changing profile may become possible, but this will require some architectural changes.

Also be aware, that opening a project with a bound profile will engage that profile for **all** already open projects (you cannot simultaneously have two open projects each with different profile).

### autoSwitch.created

_default: false_
Automatically switch to newly created profile.

### settingsCyclerWarning

_default: true_
Show warning message that loaded profile has no associated SettingsCycler command / settings block.

### extensions.symlinkify

_default: true_
Whether extensions in profile folders will be replaced with symlinks to extensions.storage folder.
Turning this off will result in increased disk space usage.

### extensions.common

_default: []_
A list of extensions that will be automatically installed to every profile (their presence is checked every time you are switching to the profile).
`Vscode-profiles` is always installed automatically, no need to include it in the list.
Note that while extension is present in this list, it will be installed again even if you delete it manually.

### extensions.blacklisted

_default: []_
A list of extensions that will be automatically uninstalled from every profile (their presence is checked every time you are switching to the profile).
Useful, if you decided to switch to another extension for some purpose, or a new version became available as separate package and you need to uninstall the old extension from all the profiles - add it to this list.

### extensions.excluded

_default: [
"ms-vsliveshare.vsliveshare",
"ms-vscode-remote.remote-wsl",
"ms-vscode-remote.remote-ssh",
"ms-vscode-remote.remote-containers"
]
A list of extensions id's that are excluded from symlinkification.
Add here any extensions that give you troubles with write permissions.
Matching is made by `includes` method based on extension folder's name.

### paths.profiles

_default: `<HOMEDIR>/.vscode/profiles`_
Path to the folder where profiles will be stored.

### paths.extensionsStorage

_default: `<HOMEDIR>/.vscode/extensions.storage`_
Path to the folder where all symlinkified extensions will be stored.

## Integration with other extensions

Vscode-profiles was designed with integration with 2 popular extension for settings management: `settings-cycler` and `settings-sync` in mind.

This allows you to bind any VS Code settings to your profile, so that after switching the profile on you get fully customized environment.
This also allows you to assign to each profile a dedicated Github gist, and save your extensions set and settings there with the help of `settings-sync` extension.

![vscode-profiles-settings-cycler-gif](images/gif/settings_cycler.gif 'binding different themes to profiles')

Example: in your global `settings.json` create a setting in `settings cycler` format, with id that corresponds to your profile name.
When you switch profiles, `settings.cycle<profileName>` command will be automatically executed and appropriate settings loaded.
If you don't have a `settings.cycle` settings block for your profile, you'll receive a notification, if `warnAboutNoSettings` option is on.

```json
"settings.cycle": [
    {
      "id": "MyProfile", // must be unique
      "overrideWorkspaceSettings": false,
      "values": [
        {
          "sync.gist": "<your gist id here>"
          // other settings...
        }
      ]
    },
```

Now every time when you switch to 'MyProfile', any settings that you specified within 'values' will be applied,
and you can use `Sync:Update` command to store your settings and extensions list in the cloud. If you use a public gist you can share your profile with your friends.

For more information, please refer to `settings cycler` and `settings-sync` extensions documentation.

## Known Issues and Limitations

### Reloading

Only one profile can be active at the time. This means that though you can have several VS Code projects open in parallel in different windows, you cannot make them use different profiles.
When you switch the profile, new profile folder becomes active, and this may lead to unexpected results if VS Code window wasn't reloaded and extensions from previous profile are still in use. Main window, from where profile switching is executed, is realoded automatically, but there is no way to automatically reload _all_ VS Code instances.

> IMPORTANT! If you have more than one window open, you'll have to reload them manually. The notification will remind you to do this.

### Write permissions problem

If you try to rename / delete extension folder, that is in use by file system, you may receive an error about write permissions. This can happen when you are switching profiles / running extension maintanance (profile maintanance is actually done each time you do the switching).
For example, `LiveShare` extension cannot be symlinkified because it runs `vsls-agent` service from extension folder. Similar troubles may arise with 'Remote' extensions (SSH, WSL, Containers). That's why they are excluded from the process by default.
The same may apply to other extensions; if you are having troubles, read the error log and remove the offnding extension or add it to the [excluded extensions list](#extensions.excluded)
_Starting from version 1.1.1, all EPERM errors are ignored, so some extensions may be left unsymlinkified if their their folder is locked at the moment, but this may happen next time. You can try to temporarily disable the extension so it won't run on VS Code start and so could be successfully replaced with symlink_

### Usage with Remote SSH / WSL / Containers

When using any variant of remote connection, VS Code installs certain extensions directly on the remote (to improve productivity).
Currently vscode-profiles operates only on local extensions folder and has no way to track which extension are installed where.

## Deinstallation

This extension replaces `$HOME/.vscode/extensions` folder with symlink and creates additional folders `profiles` and `extensions.storage`. If you uninstall this extension, you will be left with the last profile that was active. Other profiles won't be deleted, you just won't be able to manage them. It has sense if you plan to re-install later.
However, if you want to reset everything to the initial state, you can manually delete `profiles` folder and 'extensions' symlink and then rename `extensions.storage` to just `extensions`. Then you'll have all extensions gathered from all of your profiles.

### Check out my other extensions!

They are for everyone and you can find them useful
https://marketplace.visualstudio.com/publishers/cyberbiont

## Credits

<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
