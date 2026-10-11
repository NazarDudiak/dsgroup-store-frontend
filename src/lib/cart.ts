export type CartItem = { slug: string; name: string; price: string; quantity: number };
export const readCart = (): CartItem[] => typeof window === 'undefined' ? [] : JSON.parse(localStorage.getItem('cart') || '[]');
export const writeCart = (items: CartItem[]) => { localStorage.setItem('cart', JSON.stringify(items)); window.dispatchEvent(new Event('cart-updated')); };
export const formatPrice = (value: number) => value.toLocaleString('uk-UA') + ' ₴';
