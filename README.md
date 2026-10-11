# Store frontend

Next.js customer storefront. It server-renders catalog and product pages for SEO, includes canonical metadata, JSON-LD Product schema, `sitemap.xml` and `robots.txt`.

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Set `NEXT_PUBLIC_API_URL` to the Django API URL. The internal cart sends a simple order request; payment and delivery integrations can be added once a provider is selected.

Use `npm run build && npm run start` for a production-like local run. The included Dockerfile builds a standalone production image.

Cross-repository architecture and working context are maintained in the infrastructure repository's `memory-bank/`; read it before changing catalogue, checkout or deployment behavior.
