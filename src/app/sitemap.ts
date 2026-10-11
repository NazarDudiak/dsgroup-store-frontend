import type { MetadataRoute } from 'next';
import { getProducts, Product } from '@/lib/api';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> { const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'; let products: Product[] = []; try { products = await getProducts(); } catch {} return [{ url: site, changeFrequency: 'weekly', priority: 1 }, { url: `${site}/catalog`, changeFrequency: 'daily', priority: .8 }, ...products.map(p => ({ url: `${site}/product/${p.slug}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: .7 }))]; }
