import { channel, channelsFor } from "@/lib/app-api";
import { collection } from "@/lib/db";
import { APP_NAME } from "@/lib/site";

/**
 * A Sparkle appcast of the last 20 published releases, for apps that update with Sparkle. Point `SUFeedURL` at
 * `/api/app/v1/appcast.xml` (add `?channel=beta` for testers). Public, since Sparkle fetches it without the app key.
 */
export async function GET(request: Request) {
  const ch = channel(new URL(request.url).searchParams.get("channel"));
  const releases = await (await collection("app_releases"))
    .find({ channel: { $in: channelsFor(ch) }, published: true })
    .sort({ build: -1 })
    .limit(20)
    .toArray();

  const items = releases.map(
    (r) => `    <item>
      <title>${xml(r.title)}</title>
      <pubDate>${r.publishedAt.toUTCString()}</pubDate>
      <sparkle:version>${r.build}</sparkle:version>
      <sparkle:shortVersionString>${xml(r.version)}</sparkle:shortVersionString>${
        r.minimumSystemVersion ? `\n      <sparkle:minimumSystemVersion>${xml(r.minimumSystemVersion)}</sparkle:minimumSystemVersion>` : ""
      }${criticalTag(r.critical, r.minimumSupportedBuild)}
      <description><![CDATA[${r.notes.replaceAll("]]>", "]]]]><![CDATA[>")}]]></description>
      <enclosure url="${xml(r.downloadUrl)}"${r.size ? ` length="${r.size}"` : ""} type="application/octet-stream"${
        r.edSignature ? ` sparkle:edSignature="${xml(r.edSignature)}"` : ""
      } />
    </item>`,
  );

  const body = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:sparkle="http://www.andymatuschak.org/xml-namespaces/sparkle">
  <channel>
    <title>${xml(APP_NAME)}</title>
${items.join("\n")}
  </channel>
</rss>
`;
  return new Response(body, {
    headers: { "content-type": "application/rss+xml; charset=utf-8", "cache-control": "public, max-age=300" },
  });
}

/** Sparkle 2: critical for everyone, or (with a minimum) only for builds below it. */
function criticalTag(critical: boolean, minimumBuild: number | null) {
  if (minimumBuild) return `\n      <sparkle:criticalUpdate sparkle:version="${minimumBuild}" />`;
  return critical ? "\n      <sparkle:criticalUpdate />" : "";
}

function xml(s: string) {
  return s.replace(/[<>&"']/g, (c) => `&#${c.charCodeAt(0)};`);
}
