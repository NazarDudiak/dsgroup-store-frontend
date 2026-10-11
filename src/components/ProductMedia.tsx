'use client';

import Link from 'next/link';
import { useState } from 'react';
import { assetUrl } from '@/lib/api';

type GalleryImage = { image: string; alt_text: string };

export function ProductMedia({ images = [], fallback, alt, href, compact = false }: { images?: GalleryImage[]; fallback: string | null; alt: string; href?: string; compact?: boolean }) {
  const gallery = images.map(item => ({ src: assetUrl(item.image), alt: item.alt_text || alt })).filter((item): item is { src: string; alt: string } => Boolean(item.src));
  if (!gallery.length && fallback) gallery.push({ src: assetUrl(fallback)!, alt });
  const [active, setActive] = useState(0);
  const current = gallery[active] || null;
  const change = (direction: number) => setActive(index => (index + direction + gallery.length) % gallery.length);
  const picture = current ? <img src={current.src} alt={current.alt} /> : <div className="placeholder">Фото товару</div>;

  return <div className={`product-gallery${compact ? ' product-gallery--card' : ''}`}>
    {href ? <Link href={href} className="product-gallery-main">{picture}</Link> : <div className="product-gallery-main">{picture}</div>}
    {gallery.length > 1 && <>
      <button type="button" className="gallery-arrow gallery-arrow--prev" aria-label="Попереднє фото" onClick={() => change(-1)}>‹</button>
      <button type="button" className="gallery-arrow gallery-arrow--next" aria-label="Наступне фото" onClick={() => change(1)}>›</button>
      {compact ? <div className="gallery-dots" aria-label={`Фото ${active + 1} з ${gallery.length}`}>{gallery.map((_, index) => <button key={index} aria-label={`Фото ${index + 1}`} className={index === active ? 'active' : ''} onClick={() => setActive(index)} />)}</div> : <div className="gallery-thumbnails">{gallery.map((item, index) => <button key={item.src} className={index === active ? 'active' : ''} aria-label={`Показати фото ${index + 1}`} onClick={() => setActive(index)}><img src={item.src} alt="" /></button>)}</div>}
    </>}
  </div>;
}
