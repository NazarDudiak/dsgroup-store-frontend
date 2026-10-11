'use client';

import { useRouter } from 'next/navigation';
import type { Category } from '@/lib/api';

export function CategorySelect({ categories, value }: { categories: Category[]; value: string }) {
  const router = useRouter();
  return <select name="category" value={value} onChange={event => router.push(event.target.value ? `/catalog?category=${event.target.value}` : '/catalog')}><option value="">Усі категорії</option>{categories.map(category => <option value={category.slug} key={category.slug}>{category.name}</option>)}</select>;
}
