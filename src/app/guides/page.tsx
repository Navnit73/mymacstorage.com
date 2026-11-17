import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { innerPageGraph, pageMetadata } from "@/lib/seo";
import { pages } from "@/lib/site";

const path = "/guides";
const title = "Mac Storage Guides";
const description =
  "Step-by-step Mac storage guides: free up space, clear caches, reduce System Data, find large and duplicate files, and fix 'not enough space to update'.";

export const metadata = pageMetadata({ title: "Mac Storage Guides and How-Tos", description, path });

const groups = ["Guides", "US guides", "UK guides"] as const;

/** Index of every guide, so each one is a click from a crawlable hub and not only a footer link. */
export default function GuidesIndexPage() {
  return (
    <ContentPage
      title={title}
      intro="Safe, step-by-step help for a full Mac: what is taking up space, what you can delete, and how to do it."
      breadcrumb="Guides"
      graph={innerPageGraph({ path, name: title, description, type: "CollectionPage" })}
    >
      {groups.map((group) => (
        <section key={group}>
          <h2>{group === "Guides" ? "Mac storage how-tos" : group === "US guides" ? "Guides for US readers" : "Guides for UK readers"}</h2>
          <ul>
            {pages
              .filter((p) => p.group === group)
              .map(({ path: href, label }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </ContentPage>
  );
}
