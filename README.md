
# MyMacStorage — Disk Cleanup for Mac, Done Safely

**Website:** [https://mymacstorage.com](https://mymacstorage.com)

MyMacStorage is a native Mac storage cleaner and disk space analyzer. One scan maps your entire disk, shows exactly what fills it, and clears what you don't need — safely. Nothing is deleted; everything goes to the Trash.

## Why MyMacStorage


- **One scan, full picture** — Maps every folder on your Mac (hidden ones included) in a single pass.
- **Safe by design** — Every cleanup moves files to the Trash. Undo puts a whole cleanup back in one click.
- **Private** — Scanning, hashing and duplicate matching all happen locally. Not a single filename is uploaded.
- **Pay once, keep it** — $14.99 one-time. No subscription, no account. One licence covers Mac and Windows.

## What It Cleans

| Category | Description |
| --- | --- |
| **Caches & logs** | Browser caches, app caches and macOS logs that quietly grow into gigabytes |
| **System Data** | Breaks open the grey "System Data" slice macOS won't explain |
| **Duplicate files** | Byte-for-byte matching — keep one copy, Trash the rest |
| **Large & forgotten files** | Old video exports, VMs, backup archives — sorted biggest first |
| **Developer files** | Xcode DerivedData, simulators, `node_modules`, build output |
| **Old installers** | Leftover `.dmg` and `.pkg` files sitting around after install |
| **App leftovers** | Support files left behind by apps you already removed |

## How It Works


1. **Scan your disk** — One scan maps every folder, hidden ones included.
2. **Review what it finds** — Browse results tool by tool. Every item shows its size and location.
3. **Clear to the Trash** — Click Clear. Changed your mind? Undo puts everything back.

## System Requirements

- macOS 14 Sonoma or later
- Apple silicon and Intel Macs supported
- MacBook Air, MacBook Pro, iMac, Mac mini, Mac Studio


## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** MongoDB
- **Payments:** [Dodo Payments](https://dodopayments.com) (one-time checkout with licence key fulfilment)
- **Analytics:** Ahrefs, Microsoft Clarity, plus a custom first-party visitor log


## Getting Started (Development)


```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.


### Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

   | Variable | Purpose |
   | --- | --- |
   | `DODO_PAYMENTS_API_KEY` | Dodo API key (use test-mode key while developing) |
   | `DODO_PAYMENTS_WEBHOOK_KEY` | Webhook signing secret (`whsec_...`) |
   | `DODO_PAYMENTS_ENVIRONMENT` | `test_mode` or `live_mode` |
   | `DODO_PRODUCT_ID` | One-time product ID (`pdt_...`) |
   | `MONGODB_URI` | MongoDB connection string |
   | `ADMIN_API_TOKEN` | Bearer token for `/api/admin/*` |

## Payments & Delivery

Buy buttons open `/api/checkout`, which starts a Dodo Payments checkout. After payment, Dodo calls `/api/webhooks/dodo` to mark the order paid and fulfilled once the licence key is issued. Dodo emails the buyer their receipt and licence key.


## Admin Panel


Sign in at `/navnit_admin` to view traffic analytics (people vs bots, top pages), browse the visit log, look up orders, and read backend logs.

```bash
# Seed an admin user
ADMIN_PASSWORD='a-long-password' npm run seed:admin -- you@example.com
````


## Admin REST API


Authenticate with `Authorization: Bearer $ADMIN_API_TOKEN`.

| Endpoint | Description |
| --- | --- |
| `GET /api/admin/stats?days=7` | Traffic, unique visitors, top bots/pages, orders & revenue |
| `GET /api/admin/visits` | Raw visit log with filters (`bot`, `path`, `visitorId`) |
| `GET /api/admin/orders` | Orders with filters (`status`, `email`) |

## Mac App API

The native Mac app reports usage and receives update info. Set `APP_API_KEY` in the environment and build the same value into the app.

| Endpoint                                          | Purpose                                                                                                                                                                                                                                                                                       |
| ---                                               | ---                                                                                                                                                                                                                                                                                           |
| `POST /api/app/v1/heartbeat`                      | Launch event + periodic heartbeat                                                                                                                                                                                                                                                             |
| `POST /api/app/v1/events`                         | Batched feature-use events                                                                                                                                                                                                                                                                    |
| `GET /api/app/v1/updates`                         | Manual "Check for updates"                                                                                                                                                                                                                                                                    |
| `GET /api/app/v1/appcast.xml`                     | Sparkle appcast (public)                                                                                                                                                                                                                                                                      |

A Swift client is available in [`docs/MacAppAPI.swift`](docs/MacAppAPI.swift).

## Database Collections

| Collection       | Contents                                                                                                           |
| ---              | ---                                                                                                                |
| `visits`         | Page/API requests with IP, country, referrer, browser, OS, bot detection (90-day TTL)                              |
| `orders`         | Checkout lifecycle: created → paid/failed/cancelled → fulfilled                                                    |
| `webhook_events` | Verified Dodo webhooks, de-duplicated by `webhook-id`                                                              |
| `logs`           | Backend events from the structured logger (90-day TTL)                                                             |
| `app_devices`    | One row per install — version, model, country, launch count                                                        |
| `app_activity`   | Device × day for DAU/WAU/MAU (400-day TTL)                                                                         |
| `app_events`     | Feature-use events (180-day TTL)                                                                                   |
| `app_releases`   | Published and staged app releases                                                                                  |


## Publishing an App Update

Use the admin panel's **App** page, or the API:

```bash
curl -X POST https://mymacstorage.com/api/admin/app/releases \
  -H "Authorization: Bearer $ADMIN_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"version":"1.4.0","build":42,"downloadUrl":"https://…/MyMacStorage-1.4.0.dmg","notes":"…","critical":false}'
````

## Links

- **Website:** [https://mymacstorage.com](https://mymacstorage.com)
- **Support:** [support@mymacstorage.com](mailto:support@mymacstorage.com)
- **Guides:** [How to free up space on Mac](https://mymacstorage.com/guides/how-to-free-up-space-on-mac) · [Reduce System Data](https://mymacstorage.com/guides/how-to-reduce-system-data-on-mac) · [Find large files](https://mymacstorage.com/guides/how-to-find-large-files-on-mac) · [Find duplicates](https://mymacstorage.com/guides/how-to-find-duplicate-files-on-mac) · [Clear cache](https://mymacstorage.com/guides/how-to-clear-cache-on-mac)

## License

Proprietary. All rights reserved.
