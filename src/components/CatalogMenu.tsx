'use client';
import Link from 'next/link';
import { useState } from 'react';

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
export function CatalogMenu() { const [open, setOpen] = useState(false); const [category, setCategory] = useState('energy'); const [group, setGroup] = useState(0); const current = menu[category]; const choose = (key: string) => { setCategory(key); setGroup(0); }; const groupHref = (item: Group) => `/catalog?category=${category}&subcategory=${item.subcategory}`; return <><button className="catalog-trigger" onClick={() => setOpen(!open)} aria-expanded={open}><span>{open ? '×' : '☰'}</span> Каталог</button>{open && <><button aria-label="Закрити каталог" className="catalog-backdrop" onClick={() => setOpen(false)}/><div className="catalog-mega"><aside>{Object.keys(menu).map(key => <button key={key} onMouseEnter={() => choose(key)} onClick={() => choose(key)} className={category === key ? 'active' : ''}><i>{menu[key].icon}</i>{labels[key]} <b>›</b></button>)}<Link href="/catalog" onClick={() => setOpen(false)}>◈ Усі товари</Link></aside><section className="subcategories"><p>ПІДКАТЕГОРІЇ</p><h2>{labels[category]}</h2>{current.groups.map((item, index) => <Link onMouseEnter={() => setGroup(index)} onClick={() => setOpen(false)} className={group === index ? 'active' : ''} href={groupHref(item)} key={item.name}>{item.name}<b>›</b></Link>)}</section><section className="brands"><p>БРЕНДИ</p><h2>{current.groups[group].name}</h2><div>{current.groups[group].brands.map(brand => <Link onClick={() => setOpen(false)} href={`${groupHref(current.groups[group])}&q=${encodeURIComponent(brand)}`} key={brand}>{brand}</Link>)}</div><Link className="all-link" onClick={() => setOpen(false)} href={groupHref(current.groups[group])}>Переглянути всі товари →</Link></section></div></>}</>; }
