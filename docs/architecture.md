# Frontend architecture

The App Router pages fetch catalogue data on the server with 60-second revalidation. Each product route generates unique metadata and Product JSON-LD. Interactive cart behavior stays isolated in client components; catalogue, category and product rendering remain server components for crawlable HTML.
