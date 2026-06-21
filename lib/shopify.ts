import type { ShopifyCart } from "@/types";

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!;
const SHOPIFY_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;
const API_URL = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;

/** True when the Shopify Storefront credentials are present (build-time inlined). */
export const isShopifyConfigured = Boolean(
  process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN &&
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN
);

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) throw new Error(`Shopify fetch failed: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data as T;
}

// ── Cart ──────────────────────────────────────────────────────────────────────

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    cost { totalAmount { amount currencyCode } }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          attributes { key value }
          merchandise {
            ... on ProductVariant {
              id
              title
              price { amount currencyCode }
              product { title }
            }
          }
        }
      }
    }
  }
`;

export async function createCart() {
  const query = `
    ${CART_FRAGMENT}
    mutation { cartCreate { cart { ...CartFields } } }
  `;
  const data = await shopifyFetch<{ cartCreate: { cart: unknown } }>(query);
  return (data as { cartCreate: { cart: unknown } }).cartCreate.cart;
}

export type CartLineInput = {
  merchandiseId: string;
  quantity: number;
  attributes?: Array<{ key: string; value: string }>;
};

/** Create a cart pre-filled with lines and return it (incl. checkoutUrl). */
export async function createCheckout(lines: CartLineInput[]): Promise<ShopifyCart> {
  const query = `
    ${CART_FRAGMENT}
    mutation CartCreate($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
  `;
  const data = await shopifyFetch<{
    cartCreate: { cart: ShopifyCart | null; userErrors: Array<{ message: string }> };
  }>(query, { lines });
  const { cart, userErrors } = data.cartCreate;
  if (userErrors?.length) throw new Error(userErrors[0].message);
  if (!cart) throw new Error("Shopify n'a pas pu créer le panier.");
  return cart;
}

export async function addToCart(
  cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number; attributes?: Array<{ key: string; value: string }> }>
) {
  const query = `
    ${CART_FRAGMENT}
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
      }
    }
  `;
  const data = await shopifyFetch<{ cartLinesAdd: { cart: unknown } }>(query, { cartId, lines });
  return (data as { cartLinesAdd: { cart: unknown } }).cartLinesAdd.cart;
}

export async function getCart(cartId: string) {
  const query = `
    ${CART_FRAGMENT}
    query GetCart($cartId: ID!) {
      cart(id: $cartId) { ...CartFields }
    }
  `;
  const data = await shopifyFetch<{ cart: unknown }>(query, { cartId });
  return (data as { cart: unknown }).cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]) {
  const query = `
    ${CART_FRAGMENT}
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ...CartFields }
      }
    }
  `;
  const data = await shopifyFetch<{ cartLinesRemove: { cart: unknown } }>(query, { cartId, lineIds });
  return (data as { cartLinesRemove: { cart: unknown } }).cartLinesRemove.cart;
}

// ── Products ──────────────────────────────────────────────────────────────────

export async function getProducts(first = 24) {
  const query = `
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id title handle description
            priceRange { minVariantPrice { amount currencyCode } }
            images(first: 1) { edges { node { url altText } } }
            variants(first: 10) {
              edges {
                node {
                  id title availableForSale
                  price { amount currencyCode }
                }
              }
            }
          }
        }
      }
    }
  `;
  const data = await shopifyFetch<{ products: { edges: Array<{ node: unknown }> } }>(query, { first });
  return (data as { products: { edges: Array<{ node: unknown }> } }).products.edges.map((e) => e.node);
}
