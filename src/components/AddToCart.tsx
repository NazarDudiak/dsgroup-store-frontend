'use client';
import { useState } from 'react';
import { Product } from '@/lib/api';
import { readCart, writeCart } from '@/lib/cart';
export function AddToCart({ product, compact = false }: { product: Product; compact?: boolean }) {
  const [added, setAdded] = useState(false);
  function add() { const items = readCart(); const found = items.find(x => x.slug === product.slug); if (found) found.quantity++; else items.push({ slug: product.slug, name: product.name, price: product.price, quantity: 1 }); writeCart(items); setAdded(true); }
  if (compact) return <button className="round-button cart-button" onClick={add} disabled={!product.stock} aria-label={product.stock ? `Додати ${product.name} в кошик` : 'Немає в наявності'} title="Додати в кошик"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.2 10.1a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L20 8H7"/><circle cx="10" cy="20" r="1"/><circle cx="17" cy="20" r="1"/></svg></button>;
  return <button className="button" onClick={add} disabled={!product.stock}>{product.stock ? added ? 'Додано в кошик' : 'Додати в кошик' : 'Немає в наявності'}</button>;
}
