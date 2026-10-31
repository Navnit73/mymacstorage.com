// Drop-in client for the mymacstorage.com app API (see README → "Mac app API"). macOS 13+, Swift 5.9+.
//
//   // In applicationDidFinishLaunching:
//   MacAppAPI.shared.start(isLicensed: { LicenseStore.shared.isActive }) { update in
//       // Called on the main actor whenever the server offers a newer build.
//       if update.required { /* block the UI until they update */ }
//       else { /* show "Version \(update.version) is available" */ }
//   }
//
//   // Anywhere a feature is used:
//   MacAppAPI.shared.track("scan.completed", ["files": 1200, "bytes": 5_000_000_000])
//
//   // In applicationWillTerminate:
//   MacAppAPI.shared.flush()

import Foundation

struct AppUpdate: Decodable, Equatable {
    let version: String
    let build: Int
    let channel: String
    let title: String
    let notes: String
    let downloadUrl: URL
    let size: Int?
    let minimumSystemVersion: String?
    /// Don't let the user skip this one.
    let critical: Bool
    /// This build is below a minimum: block use until the user updates.
    let required: Bool
}

@MainActor
final class MacAppAPI {
    static let shared = MacAppAPI()

    // Match APP_API_KEY on the server.
    private let baseURL = URL(string: "https://mymacstorage.com/api/app/v1/")!
    private let appKey = "PASTE_APP_API_KEY"
    private let channel = "stable" // "beta" for test builds

    private let deviceId: String = {
        let key = "MacAppAPI.deviceId"
        if let id = UserDefaults.standard.string(forKey: key) { return id }
        let id = UUID().uuidString
        UserDefaults.standard.set(id, forKey: key)
        return id
    }()
    private let sessionId = UUID().uuidString
    private let appVersion = Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String ?? "0"
    private let build = Bundle.main.object(forInfoDictionaryKey: "CFBundleVersion") as? String ?? "0"

    private var isLicensed: () -> Bool = { false }
    private var onUpdate: (AppUpdate) -> Void = { _ in }
    private var lastOffered: AppUpdate?
    private var heartbeatTask: Task<Void, Never>?
    private var queue: [[String: Any]] = []
    private var flushTask: Task<Void, Never>?
    private let iso = ISO8601DateFormatter()

    func start(isLicensed: @escaping () -> Bool, onUpdate: @escaping (AppUpdate) -> Void) {
        self.isLicensed = isLicensed
        self.onUpdate = onUpdate
        heartbeatTask?.cancel()
        heartbeatTask = Task { [weak self] in
            var event = "launch"
            while !Task.isCancelled {
                let wait = await self?.heartbeat(event: event) ?? 60
                event = "ping"
                try? await Task.sleep(for: .seconds(wait))
            }
        }
    }

    /// Records a feature use. Events are batched and sent every 60 s, at 100 queued, and on `flush()`.
    func track(_ name: String, _ props: [String: Any] = [:]) {
        var event: [String: Any] = ["name": name, "at": iso.string(from: Date())]
        if !props.isEmpty { event["props"] = props }
        queue.append(event)
        if queue.count >= 100 { flush() }
        else if flushTask == nil {
            flushTask = Task { [weak self] in
                try? await Task.sleep(for: .seconds(60))
                self?.flush()
            }
        }
    }

    func flush() {
        flushTask?.cancel()
        flushTask = nil
        guard !queue.isEmpty else { return }
        let batch = queue
        queue.removeAll()
        Task {
            let body: [String: Any] = ["deviceId": deviceId, "sessionId": sessionId, "appVersion": appVersion, "events": batch]
            if (try? await post("events", body)) == nil {
                queue.insert(contentsOf: batch.prefix(max(0, 500 - queue.count)), at: 0) // retry next flush, bounded
            }
        }
    }

    /// Manual "Check for updates…". Returns nil when up to date.
    func checkForUpdates() async throws -> AppUpdate? {
        var url = URLComponents(url: baseURL.appendingPathComponent("updates"), resolvingAgainstBaseURL: false)!
        url.queryItems = [.init(name: "build", value: build), .init(name: "channel", value: channel)]
        var request = URLRequest(url: url.url!)
        request.setValue(appKey, forHTTPHeaderField: "X-App-Key")
        let (data, _) = try await URLSession.shared.data(for: request)
        return try JSONDecoder().decode(UpdateResponse.self, from: data).update
    }

    // MARK: - Private

    private struct HeartbeatResponse: Decodable { let nextHeartbeatSeconds: Int; let update: AppUpdate? }
    private struct UpdateResponse: Decodable { let update: AppUpdate? }

    /// Returns the number of seconds to wait before the next heartbeat.
    private func heartbeat(event: String) async -> Int {
        let os = ProcessInfo.processInfo.operatingSystemVersion
        let body: [String: Any] = [
            "deviceId": deviceId, "sessionId": sessionId, "appVersion": appVersion, "build": build,
            "channel": channel, "event": event, "licensed": isLicensed(),
            "osVersion": "\(os.majorVersion).\(os.minorVersion).\(os.patchVersion)",
            "model": Self.sysctl("hw.model") ?? "", "arch": Self.sysctl("hw.machine") ?? "",
            "locale": Locale.current.identifier,
        ]
        guard let data = try? await post("heartbeat", body),
              let response = try? JSONDecoder().decode(HeartbeatResponse.self, from: data)
        else { return 120 } // offline or server error: back off a little
        if let update = response.update, update != lastOffered {
            lastOffered = update
            onUpdate(update)
        }
        return max(30, response.nextHeartbeatSeconds)
    }

    private func post(_ path: String, _ body: [String: Any]) async throws -> Data {
        var request = URLRequest(url: baseURL.appendingPathComponent(path))
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue(appKey, forHTTPHeaderField: "X-App-Key")
        request.httpBody = try JSONSerialization.data(withJSONObject: body)
        request.timeoutInterval = 15
        let (data, response) = try await URLSession.shared.data(for: request)
        guard (response as? HTTPURLResponse)?.statusCode ?? 0 < 300 else { throw URLError(.badServerResponse) }
        return data
    }

    private static func sysctl(_ name: String) -> String? {
        var size = 0
        guard sysctlbyname(name, nil, &size, nil, 0) == 0, size > 0 else { return nil }
        var buffer = [CChar](repeating: 0, count: size)
        guard sysctlbyname(name, &buffer, &size, nil, 0) == 0 else { return nil }
        return String(cString: buffer)
    }
}
