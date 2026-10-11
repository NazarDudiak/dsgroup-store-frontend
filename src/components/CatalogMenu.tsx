'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Category, getCategories } from '@/lib/api';

type Group = { name: string; subcategory: string; brands: string[] };
const menu: Record<string, { icon: string; groups: Group[] }> = {
  energy: { icon: '⚡', groups: [
    { name: 'Павербанки', subcategory: 'powerbanks', brands: ['Baseus', 'Hoco', 'Proove', 'Xiaomi', 'Anker'] },
    { name: 'Зарядні станції', subcategory: 'charging-stations', brands: ['EcoFlow', 'Bluetti', 'Anker', 'Jackery'] },
    { name: 'Сонячні зарядні пристрої', subcategory: 'solar-chargers', brands: ['EcoFlow', 'Proove', 'Baseus'] },
    { name: 'Джерела безперебійного живлення', subcategory: 'ups', brands: ['LogicPower', 'Powercom', 'Must'] },
  ] },
  audio: { icon: '◖◗', groups: [
    { name: 'Бездротові навушники', subcategory: 'wireless-headphones', brands: ['Hoco', 'Baseus', 'Proove', 'Xiaomi'] },
    { name: 'Повнорозмірні навушники', subcategory: 'over-ear-headphones', brands: ['Hoco', 'Baseus', 'Proove'] },
    { name: 'Портативна акустика', subcategory: 'portable-speakers', brands: ['Hoco', 'Baseus', 'Proove', 'JBL'] },
  ] },
  charging: { icon: '⌁', groups: [
    { name: 'Мережеві зарядні пристрої', subcategory: 'wall-chargers', brands: ['Baseus', 'Hoco', 'Proove', 'Ugreen'] },
    { name: 'Кабелі USB та USB-C', subcategory: 'usb-cables', brands: ['Baseus', 'Hoco', 'Proove'] },
    { name: 'Бездротові зарядні пристрої', subcategory: 'wireless-chargers', brands: ['Baseus', 'Hoco', 'Proove'] },
    { name: 'Автомобільні зарядки', subcategory: 'car-chargers', brands: ['Baseus', 'Hoco', 'Proove'] },
  ] },
};
const labels: Record<string, string> = { energy: 'Енергія для блекауту', audio: 'Навушники та аудіо', charging: 'Кабелі та зарядки' };
const fallbackCategories: Category[] = Object.entries(menu).map(([slug, value]) => ({ name: labels[slug], slug, description: '', subcategories: value.groups.map(group => ({ name: group.name, slug: group.subcategory, description: '', brands: group.brands })) }));
export function CatalogMenu() {
  const [open, setOpen] = useState(false); const [categories, setCategories] = useState<Category[]>(fallbackCategories); const [category, setCategory] = useState('energy'); const [group, setGroup] = useState(0);
  useEffect(() => { getCategories().then(rows => { if (rows.length) { setCategories(rows); setCategory(current => rows.some(row => row.slug === current) ? current : rows[0].slug); } }).catch(() => undefined); }, []);
  const current = categories.find(item => item.slug === category) || categories[0];
  const choose = (key: string) => { setCategory(key); setGroup(0); };
  if (!current) return null;
  const selected = current.subcategories[group] || current.subcategories[0];
  const groupHref = (item: { slug: string }) => `/catalog?category=${category}&subcategory=${item.slug}`;
  return <><button className="catalog-trigger" onClick={() => setOpen(!open)} aria-expanded={open}><span>{open ? '×' : '☰'}</span> Каталог</button>{open && <><button aria-label="Закрити каталог" className="catalog-backdrop" onClick={() => setOpen(false)}/><div className="catalog-mega"><aside>{categories.map(item => <button key={item.slug} onMouseEnter={() => choose(item.slug)} onClick={() => choose(item.slug)} className={category === item.slug ? 'active' : ''}><i>{menu[item.slug]?.icon || '◈'}</i>{item.name} <b>›</b></button>)}<Link href="/catalog" onClick={() => setOpen(false)}>◈ Усі товари</Link></aside><section className="subcategories"><p>ПІДКАТЕГОРІЇ</p><h2>{current.name}</h2>{current.subcategories.map((item, index) => <Link onMouseEnter={() => setGroup(index)} onClick={() => setOpen(false)} className={group === index ? 'active' : ''} href={groupHref(item)} key={item.slug}>{item.name}<b>›</b></Link>)}</section>{selected && <section className="brands"><p>БРЕНДИ</p><h2>{selected.name}</h2><div>{selected.brands.map(brand => <Link onClick={() => setOpen(false)} href={`${groupHref(selected)}&brand=${encodeURIComponent(brand)}`} key={brand}>{brand}</Link>)}</div><Link className="all-link" onClick={() => setOpen(false)} href={groupHref(selected)}>Переглянути всі товари →</Link></section>}</div></>}</>;
}
