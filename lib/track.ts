// Événements de mesure : no-op tant que les scripts ne sont pas chargés
// (pas de consentement, ou IDs non configurés). GA4 en nommage standard
// e-commerce, Meta en événements standards équivalents.

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Ga4Item {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
}

function gtag(...args: unknown[]) {
  (window as any).gtag?.(...args);
}

function fbq(...args: unknown[]) {
  (window as any).fbq?.(...args);
}

export function trackAddToCart(item: Ga4Item) {
  if (typeof window === "undefined") return;
  const value = item.price * item.quantity;
  gtag("event", "add_to_cart", {
    currency: "EUR",
    value,
    items: [item],
  });
  fbq("track", "AddToCart", {
    content_ids: [item.item_id],
    content_name: item.item_name,
    content_type: "product",
    value,
    currency: "EUR",
  });
}

export function trackBeginCheckout(items: Ga4Item[]) {
  if (typeof window === "undefined") return;
  const value = items.reduce((a, i) => a + i.price * i.quantity, 0);
  gtag("event", "begin_checkout", {
    currency: "EUR",
    value,
    items,
  });
  fbq("track", "InitiateCheckout", {
    content_ids: items.map((i) => i.item_id),
    content_type: "product",
    num_items: items.reduce((a, i) => a + i.quantity, 0),
    value,
    currency: "EUR",
  });
}

export function trackViewItem(item: Omit<Ga4Item, "quantity">) {
  if (typeof window === "undefined") return;
  gtag("event", "view_item", {
    currency: "EUR",
    value: item.price,
    items: [{ ...item, quantity: 1 }],
  });
  fbq("track", "ViewContent", {
    content_ids: [item.item_id],
    content_name: item.item_name,
    content_type: "product",
    value: item.price,
    currency: "EUR",
  });
}
