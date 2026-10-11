import type { Metadata } from 'next';
import Link from 'next/link';
import { CatalogMenu } from '@/components/CatalogMenu';
import { CartPreview } from '@/components/CartPreview';
import './globals.css';
import './cart-button.css';
import './product-gallery.css';
import './catalog-menu.css';
import './brand-filter.css';
import './ui-fixes.css';
export const metadata: Metadata = { title: { default: 'DSGroup — техніка, що тримає зв’язок', template: '%s | DSGroup' }, description: 'Електроніка, зарядні пристрої та рішення для автономності під час блекаутів.', metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000') };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="uk"><body><div className="topbar"><div className="shell"><span>Безкоштовна доставка від 1 500 ₴</span><span>Пн–Нд: 09:00–20:00 · +38 (067) 000-00-00</span></div></div><header><div className="shell header-row"><Link href="/" className="brand"><b>DS</b>Group</Link><CatalogMenu/><form action="/catalog" className="header-search"><input name="q" placeholder="Пошук товарів"/><button aria-label="Знайти">⌕</button></form><nav><Link href="/catalog">Акції</Link><CartPreview/></nav></div></header><main>{children}</main><footer><div className="shell footer-grid"><div><Link href="/" className="brand"><b>DS</b>Group</Link><p>Енергія та техніка, на які можна покластися.</p></div><div><strong>Покупцям</strong><Link href="/catalog">Каталог</Link><span>Доставка й оплата</span><span>Гарантія</span></div><div><strong>Контакти</strong><span>+38 (067) 000-00-00</span><span>hello@dsgroup.ua</span></div></div></footer></body></html>; }
