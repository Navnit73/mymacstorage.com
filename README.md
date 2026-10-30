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

Buy buttons open `/api/checkout`, which starts a [Dodo Payments](https://dodopayments.com) checkout for one product and saves it as an order in MongoDB. After payment, Dodo calls `/api/webhooks/dodo`. The webhook checks the signature, marks the order paid, and when Dodo issues the licence key emails the buyer the download links and their key through [Resend](https://resend.com).

Set these in `.env.local` for development and in your host's environment for production:

| Variable | Value |
| - | - |
| `DODO_PAYMENTS_API_KEY` | Dodo API key (test mode key while developing) |
| `DODO_PAYMENTS_WEBHOOK_KEY` | Signing secret of the webhook endpoint, `whsec_...` |
| `DODO_PAYMENTS_ENVIRONMENT` | `test_mode` or `live_mode`. Anything else means test mode |
| `DODO_PRODUCT_ID` | The $19.99 one-time product, `pdt_...` |
| `RESEND_API_KEY` | Resend API key, `re_...` |
| `EMAIL_FROM` | Sender on a domain verified in Resend, e.g. `MyMacStorage <orders@mymacstorage.com>` |
| `MAC_DOWNLOAD_URL` | Direct link to the `.dmg` |
| `WINDOWS_DOWNLOAD_URL` | Optional. Direct link to the Windows installer |
| `MONGODB_URI` | MongoDB connection string with the database name in the path |
| `ADMIN_API_TOKEN` | Bearer token for `/api/admin/*`. Empty disables the admin API |

In the Dodo dashboard:

1. Create a one-time product priced at $19.99 and turn on **License keys** for it.
2. Under **Developer → Webhooks**, add `https://mymacstorage.com/api/webhooks/dodo`, subscribe to `payment.succeeded`, `payment.failed`, `payment.cancelled`, `entitlement_grant.created` and `entitlement_grant.delivered`, and copy the signing secret into `DODO_PAYMENTS_WEBHOOK_KEY`.

## Database and logging

Everything is stored in MongoDB (`src/lib/db.ts`). Indexes are created on first connection.

| Collection | Contents |
| - | - |
| `visits` | Every page and API request, written by `src/proxy.ts`: path, IP, country, referrer, browser, OS, device, and whether it came from a bot (`isBot`, `botName`). People get a first-party `mms_vid` cookie so repeat visits group together. Kept 90 days. |
| `orders` | One per checkout: `checkout_created` → `paid` / `failed` / `cancelled` → `fulfilled` once the licence email is sent. |
| `webhook_events` | Every verified Dodo webhook, keyed by `webhook-id`, so retries aren't processed twice. |
| `emails` | Every Resend send, with its Resend ID or the error. |
| `logs` | Backend events from `logger()` in `src/lib/logger.ts`, also printed to the console as JSON. Kept 90 days. |

## Admin API

Send `Authorization: Bearer $ADMIN_API_TOKEN`.

| Endpoint | Returns |
| - | - |
| `GET /api/admin/stats?days=7` | People vs bot traffic, unique visitors, top bots, top pages, requests per day, orders and revenue by status |
| `GET /api/admin/visits` | Raw visit log. Filters: `bot=true\|false`, `botName`, `path`, `visitorId`; paging: `limit`, `before` |
| `GET /api/admin/orders` | Orders. Filters: `status`, `email`, `limit` |
| `POST /api/admin/resend-email` | Body `{ "email": "..." }`. Sends the buyer their download links and licence key again |

```sh
curl -H "Authorization: Bearer $ADMIN_API_TOKEN" https://mymacstorage.com/api/admin/stats?days=30
```
