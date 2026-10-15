'use client';

import { useMemo, useState } from 'react';

export function BrandFilter({ brands, selected }: { brands: string[]; selected: string[] }) {
  const [search, setSearch] = useState('');
  const visible = useMemo(() => brands.filter(brand => brand.toLocaleLowerCase('uk').includes(search.toLocaleLowerCase('uk'))), [brands, search]);
  return <details className="brand-filter"><summary>Бренд</summary><input className="brand-search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Пошук бренду" aria-label="Пошук бренду" />{visible.map(brand => <label key={brand}><input type="checkbox" name="brand" value={brand} defaultChecked={selected.includes(brand)}/> {brand}</label>)}{!visible.length && <p className="brand-empty">Брендів не знайдено</p>}</details>;
}
