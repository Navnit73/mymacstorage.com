This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# mymacstorage.com

## Payments and delivery

Buy buttons open `/api/checkout`, which starts a [Dodo Payments](https://dodopayments.com) checkout for one product and saves it as an order in MongoDB. After payment, Dodo calls `/api/webhooks/dodo`. The webhook checks the signature, marks the order paid, and marks it fulfilled when Dodo issues the licence key. Dodo emails the buyer their receipt and licence key; the site sends no email of its own.

Set these in `.env.local` for development and in your host's environment for production:

| Variable | Value |
| - | - |
| `DODO_PAYMENTS_API_KEY` | Dodo API key (test mode key while developing) |
| `DODO_PAYMENTS_WEBHOOK_KEY` | Signing secret of the webhook endpoint, `whsec_...` |
| `DODO_PAYMENTS_ENVIRONMENT` | `test_mode` or `live_mode`. Anything else means test mode |
| `DODO_PRODUCT_ID` | The $19.99 one-time product, `pdt_...` |
| `MONGODB_URI` | MongoDB connection string with the database name in the path |
| `ADMIN_API_TOKEN` | Bearer token for `/api/admin/*`. Empty disables the admin API |

In the Dodo dashboard:

1. Create a one-time product priced at $19.99 and turn on **License keys** for it. Put the download link in the product (as a digital file or in its description) so it reaches the buyer in Dodo's purchase email.
2. Under **Developer → Webhooks**, add `https://mymacstorage.com/api/webhooks/dodo`, subscribe to `payment.succeeded`, `payment.failed`, `payment.cancelled`, `entitlement_grant.created` and `entitlement_grant.delivered`, and copy the signing secret into `DODO_PAYMENTS_WEBHOOK_KEY`.

## Database and logging

Everything is stored in MongoDB (`src/lib/db.ts`). Indexes are created on first connection.

| Collection | Contents |
| - | - |
| `visits` | Every page and API request, written by `src/proxy.ts`: path, IP, country, referrer, browser, OS, device, and whether it came from a bot (`isBot`, `botName`). People get a first-party `mms_vid` cookie so repeat visits group together. Kept 90 days. |
| `orders` | One per checkout: `checkout_created` → `paid` / `failed` / `cancelled` → `fulfilled` once Dodo issues the licence key. |
| `webhook_events` | Every verified Dodo webhook, keyed by `webhook-id`, so retries aren't processed twice. |
| `logs` | Backend events from `logger()` in `src/lib/logger.ts`, also printed to the console as JSON. Kept 90 days. |

## Admin panel

Sign in at `/navnit_admin` to see traffic (people vs bots, top pages, top bots), browse the visit log, look up orders, and read backend logs. Pages are `noindex` and admin page views aren't logged as visits.

Admins live in the `admins` collection with scrypt-hashed passwords. To add one or reset a password:

```sh
ADMIN_PASSWORD='a-long-password' npm run seed:admin -- you@example.com
```

Sessions last 7 days and are stored in `admin_sessions`, so resetting a password signs that admin out everywhere. After 10 failed sign-ins an IP is locked out for 15 minutes. Times are shown in UTC unless `ADMIN_TIME_ZONE` is set, e.g. `Asia/Kolkata`.

## Admin API

Send `Authorization: Bearer $ADMIN_API_TOKEN`.

| Endpoint | Returns |
| - | - |
| `GET /api/admin/stats?days=7` | People vs bot traffic, unique visitors, top bots, top pages, requests per day, orders and revenue by status |
| `GET /api/admin/visits` | Raw visit log. Filters: `bot=true\|false`, `botName`, `path`, `visitorId`; paging: `limit`, `before` |
| `GET /api/admin/orders` | Orders. Filters: `status`, `email`, `limit` |

```sh
curl -H "Authorization: Bearer $ADMIN_API_TOKEN" https://mymacstorage.com/api/admin/stats?days=30
```

## Mac app API

The Mac app reports usage to the site and gets updates from it. Set `APP_API_KEY` and build the same value into the app. Every call except the appcast sends it as `X-App-Key`. These requests aren't logged as visits. A Swift client is in [`docs/MacAppAPI.swift`](docs/MacAppAPI.swift).

| Endpoint | Purpose |
| - | - |
| `POST /api/app/v1/heartbeat` | Send on launch with `"event": "launch"`, then every `nextHeartbeatSeconds` (60). Body: `deviceId`, `sessionId`, `appVersion`, `build`, plus optional `channel` (`stable`/`beta`), `osVersion`, `model`, `arch`, `locale`, `licensed`. Returns `{ serverTime, nextHeartbeatSeconds, update }`. |
| `POST /api/app/v1/events` | Feature use, batched: `{ deviceId, sessionId, appVersion, events: [{ name, at, props }] }`, at most 100 per call. Names look like `scan.completed`. `props` is a flat object of up to 20 values. Returns `{ accepted }`. |
| `GET /api/app/v1/updates?build=42&channel=stable` | Manual "Check for updates". Returns `{ update }`. |
| `GET /api/app/v1/appcast.xml?channel=stable` | Sparkle appcast, public. Use it as `SUFeedURL` if the app updates with Sparkle. |

`update` is null when the app is current. Otherwise it is the newest published release, with `critical` (don't allow skipping) and `required` (this build is below a release's `minimumSupportedBuild`, so block use until the user updates). Both account for every release the device is missing. Beta devices also get stable releases.

A device counts as **live** for 2½ minutes after its last heartbeat. Daily, weekly and monthly actives come from `app_activity`, which holds one row per device per UTC day.

| Collection | Contents |
| - | - |
| `app_devices` | One per install, keyed by `deviceId`: first and last seen, version, macOS, model, country, licensed, launch count. |
| `app_activity` | Device × day, for DAU/WAU/MAU. Kept 400 days. |
| `app_events` | Feature events. Kept 180 days. |
| `app_releases` | Releases offered as updates. `build` must be unique per channel. |

**Publishing an update:** use the admin panel's **App** page, or the admin API (`Authorization: Bearer $ADMIN_API_TOKEN`):

```sh
curl -X POST https://mymacstorage.com/api/admin/app/releases \
  -H "Authorization: Bearer $ADMIN_API_TOKEN" -H 'content-type: application/json' \
  -d '{"version":"1.4.0","build":42,"downloadUrl":"https://…/MyMacStorage-1.4.0.dmg","notes":"…","critical":false}'
```

| Admin endpoint | Purpose |
| - | - |
| `GET /api/admin/app/stats?days=7` | Live devices, DAU/WAU/MAU, installs, versions, top events |
| `GET /api/admin/app/releases` | All releases, including unpublished ones |
| `POST /api/admin/app/releases` | New release. `"published": false` stages it without offering it |
| `PATCH /api/admin/app/releases/:id` | Change `published`, `critical`, `notes`, `title` or `minimumSupportedBuild` |
| `DELETE /api/admin/app/releases/:id` | Remove a release |
