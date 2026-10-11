import type { Metadata } from 'next';
import Link from 'next/link';
import { Category, getCategories, getProducts, Product } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import { BrandFilter } from '@/components/BrandFilter';
import { CategorySelect } from '@/components/CategorySelect';

export const metadata: Metadata = { title: 'Каталог', description: 'Електроніка, павербанки, навушники та зарядні пристрої DSGroup.' };
const PAGE_SIZE = 10;

export default async function Catalog({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const category = typeof params.category === 'string' ? params.category : '';
  const subcategory = typeof params.subcategory === 'string' ? params.subcategory : '';
  const q = typeof params.q === 'string' ? params.q : '';
  const selectedBrands = Array.isArray(params.brand) ? params.brand : params.brand ? [params.brand] : [];
  const rawPage = typeof params.page === 'string' ? params.page : undefined;
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (key === 'page' || key === 'category' || !value) continue;
    if (Array.isArray(value)) value.forEach(item => query.append(key, item)); else query.set(key, value);
  }
  if (category) query.set('category', category);
  let products: Product[] = [], categories: Category[] = [];
  try { [products, categories] = await Promise.all([getProducts(`?${query}`), getCategories()]); } catch {}
  const pages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, Number(rawPage) || 1), pages);
  const visible = products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const brands = [...new Set(products.map(product => product.brand).filter((brand): brand is string => Boolean(brand)))].sort((a, b) => a.localeCompare(b, 'uk'));
  const filters: Record<string, { slug: string; values: string[] }> = {};
  products.forEach(product => product.attributes?.filter(attribute => attribute.is_filterable).forEach(attribute => { const filter = filters[attribute.name] ||= { slug: attribute.slug, values: [] }; filter.values.push(attribute.value); }));
  Object.values(filters).forEach(filter => filter.values.splice(0, filter.values.length, ...new Set(filter.values)));
  const href = (next: number) => { const nextParams = new URLSearchParams(query); nextParams.set('page', String(next)); return `/catalog?${nextParams}`; };
  const activeCategory = categories.find(item => item.slug === category);
  const activeSubcategory = activeCategory?.subcategories.find(item => item.slug === subcategory);
  const title = activeSubcategory?.name || activeCategory?.name || (subcategory ? 'Підкатегорія' : 'Усі товари');
  return <main className="catalog-page"><div className="shell"><div className="catalog-title"><div><p className="eyebrow">DSGROUP / КАТАЛОГ</p><h1>{title}</h1></div><span>Знайдено <b>{products.length}</b> товарів</span></div><div className="catalog-layout"><aside className="filter-sidebar"><form><input name="q" defaultValue={q} placeholder="Пошук"/><CategorySelect categories={categories} value={category}/><BrandFilter brands={brands} selected={selectedBrands}/>{Object.entries(filters).map(([name, filter]) => <details open key={name}><summary>{name}</summary>{filter.values.map(value => <label key={value}><input type="radio" name={`attr_${filter.slug}`} value={value} defaultChecked={params[`attr_${filter.slug}`] === value}/> {value}</label>)}</details>)}<button>Застосувати</button><Link href="/catalog">Очистити фільтри</Link></form></aside><section><form className="catalog-mobile-search"><input name="q" defaultValue={q} placeholder="Пошук за назвою або брендом"/><button>Знайти</button></form>{visible.length ? <><div className="catalog-grid">{visible.map(product => <ProductCard key={product.slug} product={product}/>)}</div>{pages > 1 && <nav aria-label="Пагінація" className="pagination">{page > 1 && <Link href={href(page - 1)}>← Назад</Link>}{Array.from({ length: pages }, (_, index) => index + 1).map(number => <Link key={number} className={number === page ? 'active' : ''} href={href(number)}>{number}</Link>)}{page < pages && <Link href={href(page + 1)}>Далі →</Link>}</nav>}</> : <div className="empty-catalog"><h2>Товарів не знайдено</h2><p>Спробуйте змінити фільтри.</p><Link href="/catalog">Скинути фільтри</Link></div>}</section></div></div></main>;
}
