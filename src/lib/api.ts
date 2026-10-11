export type ProductAttribute = { name: string; slug: string; unit: string; value: string; is_filterable: boolean };
export type Product = { name: string; slug: string; sku: string; short_description: string; description?: string; price: string; old_price: string | null; stock: number; category: string; subcategory?: string; brand?: string | null; image: string | null; images?: { image: string; alt_text: string }[]; attributes?: ProductAttribute[]; seo_title?: string; seo_description?: string };
export type Subcategory = { name: string; slug: string; description: string; brands: string[] };
export type Category = { name: string; slug: string; description: string; subcategories: Subcategory[] };
const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
export const assetUrl = (url: string | null) => url ? (url.startsWith('http') ? url : base.replace('/api/v1', '') + url) : null;
async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${base}${path}`, { cache: 'no-store' });
  if (!response.ok) throw new Error(`API error ${response.status}`);
  return response.json();
}
export const getProducts = (query = '') => get<Product[]>(`/products/${query}`);
export const getProduct = (slug: string) => get<Product>(`/products/${slug}/`);
export const getCategories = () => get<Category[]>('/categories/');
