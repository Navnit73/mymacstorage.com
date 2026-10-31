# Mac app integration guide

Add one Swift file to the MyMacStorage app and call it in three places. The mymacstorage.com backend then shows live users and feature use, and offers each new DMG build to every running copy within about a minute.

Once integrated, the app:

- sends a **heartbeat** every 60 seconds to `POST /api/app/v1/heartbeat`. The device counts as live for 2½ minutes after each one and as active for the day. The response carries any update waiting for it.
- sends **feature events** in batches to `POST /api/app/v1/events`, e.g. `scan.completed`.
- **checks for updates** on demand at `GET /api/app/v1/updates`, for a "Check for Updates…" menu item.

The server side is documented in the main [README](../README.md#mac-app-api).

## Before you start

| Item | Details |
| --- | --- |
| `APP_API_KEY` | Generate with `openssl rand -hex 24`. Set it in the server's `.env.local` and in production, then restart. Until it is set, the app endpoints return 503. |
| Client file | [`docs/MacAppAPI.swift`](MacAppAPI.swift) |
| Base URL | `https://mymacstorage.com/api/app/v1/` |
| Requirements | macOS 13+, Swift 5.9+ |
| Admin | `/navnit_admin/app`: live users and stats, and where you publish releases |

## Step 1: Add the client to Xcode

1. Drag `docs/MacAppAPI.swift` into the Xcode project navigator. Tick **Copy items if needed** and your app target.
2. Set the three constants at the top of the class:

   ```swift
   private let baseURL = URL(string: "https://mymacstorage.com/api/app/v1/")!
   private let appKey = "<same value as APP_API_KEY>"
   private let channel = "stable" // "beta" for tester builds
   ```

3. If the app is sandboxed, go to the target → **Signing & Capabilities** → **App Sandbox** and tick **Outgoing Connections (Client)**. Without this, every request fails with no visible error. It adds:

   ```xml
   <key>com.apple.security.network.client</key>
   <true/>
   ```

4. In the target's **General** tab, check that **Version** (`CFBundleShortVersionString`, e.g. `1.4.0`) and **Build** (`CFBundleVersion`, e.g. `42`) are set. The server compares **Build** only, so it must be a whole number that goes up with every release.

All calls use HTTPS, so no App Transport Security exception is needed.

## Step 2: Start it when the app launches

Call `start` once at launch and `flush` on quit. `isLicensed` should return whatever your app already uses to decide whether the licence key is active. The update callback is covered in [Step 4](#step-4-show-updates-to-the-user).

### AppKit (`AppDelegate`)

```swift
import AppKit

@main
final class AppDelegate: NSObject, NSApplicationDelegate {
    func applicationDidFinishLaunching(_ notification: Notification) {
        MacAppAPI.shared.start(isLicensed: { LicenseStore.shared.isActive }) { update in
            UpdatePrompt.show(update)
        }
    }

    func applicationWillTerminate(_ notification: Notification) {
        MacAppAPI.shared.flush()
    }
}
```

### SwiftUI (`App`)

```swift
import SwiftUI

@main
struct MyMacStorageApp: App {
    @NSApplicationDelegateAdaptor(AppDelegate.self) private var appDelegate

    var body: some Scene {
        WindowGroup { ContentView() }
            .commands {
                CommandGroup(after: .appInfo) {
                    Button("Check for Updates…") { UpdatePrompt.checkNow() }
                }
            }
    }
}
```

With SwiftUI, put the `AppDelegate` above in its own file without `@main`. The adaptor wires it in.

After `start`, the client:

- generates a device ID on first launch and stores it in `UserDefaults`, so it survives updates and app restarts
- creates a new session ID each launch
- sends `"event": "launch"` once, then a heartbeat every 60 seconds, or 120 seconds after a failed request

## Step 3: Track feature use

Call `track` wherever a feature is used. It only adds the event to an in-memory queue, so it is cheap. The queue is sent every 60 seconds, as soon as it holds 100 events, and on `flush()`. Events that fail to send are retried at the next flush, up to 500.

```swift
MacAppAPI.shared.track("scan.completed", [
    "files": result.fileCount,
    "bytes": result.totalBytes,
    "seconds": duration,
])

MacAppAPI.shared.track("duplicates.deleted", ["count": selection.count, "bytes": freedBytes])
```

**Rules the server enforces.** Events that break them are dropped without an error:

| Field | Rule |
| --- | --- |
| `name` | Letters, digits, `.` `_` `:` `-`, at most 100 characters |
| `props` | A flat object of at most 20 keys. Values must be strings (cut to 256 characters), numbers, booleans or null. Nested objects are dropped. |
| `at` | Set by the client. Times more than 7 days off the server's clock are replaced with the time received. |

**Naming.** Use `area.action`, lowercase, past tense for things that finished. The admin panel ranks events by name, so pick names you'll recognise. Suggested set:

| Event | When |
| --- | --- |
| `scan.started` / `scan.completed` | Disk scan begins / ends (`files`, `bytes`, `seconds`) |
| `duplicates.opened` / `duplicates.deleted` | Duplicate finder shown / files removed (`count`, `bytes`) |
| `large_files.opened` / `large_files.deleted` | Large file view shown / files removed |
| `cache.cleared` | Caches cleaned (`bytes`) |
| `system_data.opened` | System Data breakdown viewed |
| `license.activated` / `license.failed` | Licence key entered |
| `paywall.shown` / `paywall.buy_clicked` | Upgrade prompt seen / Buy button pressed |
| `update.prompt_shown` / `update.download_clicked` | See Step 4 |

Never put file paths, file names or email addresses in `props`. Send counts and sizes instead.

## Step 4: Show updates to the user

A DMG app can't install itself in place. The usual flow is to tell the user, open the DMG download, and let them drag the new copy into Applications.

The update the server sends looks like this:

```json
{
  "version": "1.4.0", "build": 42, "channel": "stable",
  "title": "Version 1.4.0", "notes": "Faster scans…",
  "downloadUrl": "https://…/MyMacStorage-1.4.0.dmg",
  "critical": false,
  "required": false
}
```

| Flag | Meaning | Suggested UI |
| --- | --- | --- |
| neither | Normal update | Alert with **Download**, **Later** and **Skip This Version** |
| `critical: true` | Important fix, can't be skipped | Alert with **Download** and **Later** only |
| `required: true` | This build is below the minimum you set | Blocking alert with **Download** and **Quit**. Show it again on every launch. |

Both flags take into account every release the device has missed. A device on build 10 sees `critical` if any release between 10 and the latest is critical, even if the latest one isn't.

The heartbeat callback fires once per new update per launch. The client won't show the same build twice in one run.

### Drop-in prompt

```swift
import AppKit

@MainActor
enum UpdatePrompt {
    private static let skippedKey = "UpdatePrompt.skippedBuild"

    static func show(_ update: AppUpdate, userInitiated: Bool = false) {
        let skipped = UserDefaults.standard.integer(forKey: skippedKey)
        if !userInitiated, !update.critical, !update.required, update.build <= skipped { return }

        MacAppAPI.shared.track("update.prompt_shown", ["build": update.build, "required": update.required])

        let alert = NSAlert()
        alert.messageText = update.required
            ? "Update required"
            : "\(update.title) is available"
        alert.informativeText = update.notes.isEmpty
            ? "You have version \(currentVersion)."
            : update.notes
        alert.alertStyle = update.required || update.critical ? .critical : .informational
        alert.addButton(withTitle: "Download")
        alert.addButton(withTitle: update.required ? "Quit" : "Later")
        if !update.critical && !update.required { alert.addButton(withTitle: "Skip This Version") }

        NSApp.activate(ignoringOtherApps: true)
        switch alert.runModal() {
        case .alertFirstButtonReturn:
            MacAppAPI.shared.track("update.download_clicked", ["build": update.build])
            NSWorkspace.shared.open(update.downloadUrl)
            if update.required { MacAppAPI.shared.flush(); NSApp.terminate(nil) }
        case .alertSecondButtonReturn:
            if update.required { MacAppAPI.shared.flush(); NSApp.terminate(nil) }
        default:
            UserDefaults.standard.set(update.build, forKey: skippedKey)
        }
    }

    /// For the "Check for Updates…" menu item.
    static func checkNow() {
        Task {
            do {
                if let update = try await MacAppAPI.shared.checkForUpdates() {
                    show(update, userInitiated: true)
                } else {
                    let alert = NSAlert()
                    alert.messageText = "You're up to date"
                    alert.informativeText = "MyMacStorage \(currentVersion) is the latest version."
                    alert.runModal()
                }
            } catch {
                NSAlert(error: error).runModal()
            }
        }
    }

    private static var currentVersion: String {
        Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String ?? ""
    }
}
```

### Alternative: automatic install with Sparkle

To have the app download, verify and replace itself, use [Sparkle 2](https://sparkle-project.org). The backend already serves a Sparkle feed.

1. Add Sparkle with Swift Package Manager: `https://github.com/sparkle-project/Sparkle`.
2. Run Sparkle's `generate_keys` once. It stores the private key in your Keychain and prints a public key.
3. Add to `Info.plist`:

   | Key | Value |
   | --- | --- |
   | `SUFeedURL` | `https://mymacstorage.com/api/app/v1/appcast.xml` (testers: add `?channel=beta`) |
   | `SUPublicEDKey` | the public key from `generate_keys` |

4. Create an `SPUStandardUpdaterController` at launch and hook its `checkForUpdates(_:)` to the menu item.
5. For each release, run `sign_update MyMacStorage-1.4.0.dmg`. It prints `sparkle:edSignature` and `length`; enter them in the admin form's **EdDSA signature** and **Size** fields.

Keep `MacAppAPI.shared.start(...)` either way, since the heartbeat is what counts live users. With Sparkle, the update callback can just handle `required` builds and leave everything else to Sparkle.

## Step 5: Ship a release

Each release goes through: bump the build number, archive, notarize, package the DMG, upload it, then publish it in the admin panel.

1. **Bump the build.** Raise **Build** (e.g. 41 → 42) and set **Version** (e.g. `1.4.0`). The server only offers an update when its build is higher than the app's.
2. **Archive.** Xcode → **Product → Archive** → **Distribute App** → **Direct Distribution** (Developer ID). Xcode signs the app, sends it to Apple for notarization, and exports `MyMacStorage.app` once it passes.
3. **Build the DMG.**

   ```sh
   mkdir -p dmg && cp -R MyMacStorage.app dmg/ && ln -s /Applications dmg/Applications
   hdiutil create -volname "MyMacStorage" -srcfolder dmg -ov -format UDZO MyMacStorage-1.4.0.dmg
   codesign --sign "Developer ID Application: <Your Name> (<TEAMID>)" --timestamp MyMacStorage-1.4.0.dmg
   ```

4. **Notarize and staple the DMG**, so Gatekeeper opens it without a network check:

   ```sh
   # One-time setup:
   # xcrun notarytool store-credentials notary --apple-id <you@…> --team-id <TEAMID>
   xcrun notarytool submit MyMacStorage-1.4.0.dmg --keychain-profile notary --wait
   xcrun stapler staple MyMacStorage-1.4.0.dmg
   ```

5. **Upload** the DMG wherever you host downloads now (the same place `MAC_DOWNLOAD_URL` points to). Use a new file name per version, so caches never serve an old build. Note the byte size with `stat -f%z MyMacStorage-1.4.0.dmg`.
6. **Publish.** Open `/navnit_admin/app` → **New release**. Fill in the version, build and HTTPS download URL, plus notes and size. Tick **Critical** or set **Force builds below** only when needed. Untick **Publish now** to save it as a draft. Running apps see it on their next heartbeat.

Or publish from a script or CI:

```sh
curl -X POST https://mymacstorage.com/api/admin/app/releases \
  -H "Authorization: Bearer $ADMIN_API_TOKEN" -H 'content-type: application/json' \
  -d '{
    "version": "1.4.0", "build": 42, "channel": "stable",
    "downloadUrl": "https://…/MyMacStorage-1.4.0.dmg",
    "size": 18234567, "notes": "Faster scans and a new duplicates view.",
    "critical": false
  }'
```

To pull a bad release, click **Unpublish** on its row, or send `PATCH /api/admin/app/releases/:id` with `{"published": false}`. Apps stop being offered it on their next heartbeat. Devices that already installed it stay on it until you publish a higher build.

Remember to also update `MAC_DOWNLOAD_URL` on the website, so new buyers get the latest DMG.

## Step 6: Test it

1. **Check the server.** Expect HTTP 200 and `"update": null`:

   ```sh
   curl -s https://mymacstorage.com/api/app/v1/heartbeat \
     -H "X-App-Key: $APP_API_KEY" -H 'content-type: application/json' \
     -d '{"deviceId":"TEST-0000-0001","appVersion":"1.0.0","build":1,"event":"launch"}'
   ```

   A 401 means the key doesn't match. A 503 means `APP_API_KEY` isn't set on the server.

2. **Run the app** from Xcode. Within a few seconds, `/navnit_admin/app` should show **Live now ≥ 1** and the device in **Live devices**.
3. **Use a few features**, wait 60 seconds or quit the app, and check **Feature use**.
4. **Test updates without bothering real users.** Set `channel = "beta"` in a debug build, then publish a **beta** release whose build is one higher than yours. The prompt should appear within a minute. Stable users never see beta releases. Delete the test release afterwards.
5. **Test a forced update** the same way, with **Force builds below** set above your build. The alert should block and offer only Download or Quit.

## Privacy and opt-out

- **Sent:** a random device ID, app version and build, macOS version, Mac model, CPU architecture, locale, licence status, and the event names and props you choose. The server also records the country, from your host's IP country header.
- **Not sent:** names, emails, file paths or IP addresses. Keep it that way in `props`.
- Mention this in the website's privacy policy (`/privacy`): anonymous usage statistics and update checks.

**Optional opt-out.** Add a "Share anonymous usage data" setting and check it before tracking:

```swift
extension MacAppAPI {
    static var analyticsEnabled: Bool {
        UserDefaults.standard.object(forKey: "analyticsEnabled") as? Bool ?? true
    }
}

// Wherever you track:
if MacAppAPI.analyticsEnabled { MacAppAPI.shared.track("scan.completed", […]) }
```

Keep calling `start` even when the user opts out. Without heartbeats the app stops getting update offers, though opted-out users then still count as live users. If they must not be counted at all, skip `start` and rely on **Check for Updates…**.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Nothing shows in the admin panel | Sandboxed app without **Outgoing Connections (Client)**. Or `appKey` ≠ `APP_API_KEY`. Test with the curl command in Step 6. |
| 503 "App API is disabled" | `APP_API_KEY` isn't set on the server, or the server wasn't restarted after setting it |
| 400 "deviceId, appVersion and build are required" | **Build** in Xcode isn't a whole number (e.g. `1.4.0` instead of `42`) |
| Update never appears | The release's build isn't higher than the app's; it's unpublished; or it's on `beta` while the app uses `stable` |
| "Build 42 already exists on stable" | Each build number can be used once per channel. Bump the build. |
| Events missing | Name has spaces or other characters outside `A–Z a–z 0–9 . _ : -`. Or the app quit without calling `flush()`. |
| Live count drops to 0 when the Mac sleeps | Expected. Heartbeats pause during sleep and resume on wake. |
