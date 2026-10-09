import type { StaticImageData } from "next/image";

import discount01 from "@/content/screenshots/smart-discount-manager-01.png";
import discount02 from "@/content/screenshots/smart-discount-manager-02.png";
import discount03 from "@/content/screenshots/smart-discount-manager-03.png";
import discount04 from "@/content/screenshots/smart-discount-manager-04.png";
import forecast01 from "@/content/screenshots/inventory-forecasting-01.png";
import forecast02 from "@/content/screenshots/inventory-forecasting-02.png";
import forecast03 from "@/content/screenshots/inventory-forecasting-03.png";
import shipping01 from "@/content/screenshots/shipping-cost-optimizer-01.png";
import shipping02 from "@/content/screenshots/shipping-cost-optimizer-02.png";
import shipping03 from "@/content/screenshots/shipping-cost-optimizer-03.png";
import shipping04 from "@/content/screenshots/shipping-cost-optimizer-04.png";

export type Screenshot = { src: StaticImageData; alt: string; caption: string };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  problem: string;
  highlights: string[];
  features: { title: string; body: string }[];
  howItWorks: { title: string; body: string }[];
  stack: string[];
  scopes: string[];
  repo: string;
  screenshots: Screenshot[];
};

export const projects: Project[] = [
  {
    slug: "smart-discount-manager",
    name: "Smart Discount Manager",
    tagline:
      "Run discount campaigns from rules: pick an offer, an audience and a schedule, and the app creates the Shopify discount and tracks how it performs.",
    problem:
      "Setting up discounts one at a time in Shopify admin makes it hard to target specific customers, keep track of what's running and see which offers actually drive sales.",
    highlights: ["Customer segments", "A/B offer tests", "Batched stats"],
    features: [
      {
        title: "Campaigns",
        body: "Code or automatic discounts, percentage or fixed amount, minimum subtotal, start and end dates, total usage cap and once-per-customer.",
      },
      {
        title: "Audiences",
        body: "Everyone, first-time buyers, returning customers or VIPs above a lifetime-spend threshold, backed by Shopify customer segments created once per shop.",
      },
      {
        title: "Templates",
        body: "Welcome offer, VIP appreciation, 24-hour flash sale, win-back and spend & save, each pre-filling the form with a generated code.",
      },
      {
        title: "A/B tests",
        body: "Two codes with different values, compared on redemptions, sales and sales per redemption, inconclusive until each has 30 redemptions.",
      },
    ],
    howItWorks: [
      {
        title: "Rules engine",
        body: "Validates the campaign and builds a DiscountCodeBasicInput or DiscountAutomaticBasicInput, so Shopify itself starts, expires and caps the discount.",
      },
      {
        title: "Segments",
        body: "Audiences map to segment queries: number_of_orders = 0, number_of_orders >= 2, or amount_spent >= threshold.",
      },
      {
        title: "Stats",
        body: "Usage and sales for every campaign come from one batched nodes(ids:) query, cached for five minutes.",
      },
    ],
    stack: ["TypeScript", "React Router 7", "Polaris web components", "Prisma", "Admin GraphQL 2026-07", "Vitest"],
    scopes: ["write_discounts", "read_discounts", "read_customers", "write_customers"],
    repo: "https://github.com/rjaybernardo/shopify-app-smart-discount-manager",
    screenshots: [
      { src: discount01, alt: "Dashboard with campaign stats", caption: "Dashboard: active campaigns, redemptions and discounted sales." },
      { src: discount02, alt: "Create campaign form", caption: "Create campaign: offer, audience, schedule and limits." },
      { src: discount03, alt: "Campaign templates", caption: "Templates pre-fill the form with a generated code." },
      { src: discount04, alt: "A/B tests page", caption: "A/B tests compare two offer values side by side." },
    ],
  },
  {
    slug: "inventory-forecasting",
    name: "Inventory Forecasting",
    tagline:
      "Predicts when each product variant will run out of stock and alerts the merchant by email or SMS before it happens.",
    problem:
      "Running out of a best-seller means lost sales; over-ordering ties up cash. Merchants need to know what to reorder, when, and how much.",
    highlights: ["Stockout dates", "Reorder points", "Email & SMS alerts"],
    features: [
      {
        title: "Forecast",
        body: "KPIs for out of stock, reorder now, stockouts in 30 days and sales at risk, with variants ranked by urgency and a CSV reorder list.",
      },
      {
        title: "Variant detail",
        body: "Stock history with the projected stockout, daily sales, and per-variant lead time and safety stock.",
      },
      {
        title: "Alerts",
        body: "One email or SMS digest per sync, deduplicated so a variant is only re-alerted when it gets worse or after a reminder interval.",
      },
      {
        title: "Live updates",
        body: "Forecasts recalculate when inventory changes via webhooks, with an optional daily sync for every shop.",
      },
    ],
    howItWorks: [
      {
        title: "Sales rate",
        body: "60% last 14 days + 40% full lookback, skipping days the variant was out of stock so a stockout doesn't read as low demand.",
      },
      {
        title: "Reorder point",
        body: "Sales rate × lead time + safety stock.",
      },
      {
        title: "Suggested quantity",
        body: "Sales rate × (lead time + coverage) + safety stock − available.",
      },
    ],
    stack: ["TypeScript", "React Router 7", "Polaris web components", "Prisma", "Admin GraphQL 2026-07", "Webhooks"],
    scopes: ["read_products", "read_inventory", "read_orders"],
    repo: "https://github.com/rjaybernardo/shopify-app-inventory-forecasting",
    screenshots: [
      { src: forecast01, alt: "Forecast page", caption: "Forecast: variants ranked by urgency with stockout and reorder dates." },
      { src: forecast02, alt: "Alerts page", caption: "Alerts: past email and SMS digests." },
      { src: forecast03, alt: "Settings page", caption: "Settings: lead time, safety stock, warning window and alert level." },
    ],
  },
  {
    slug: "shipping-cost-optimizer",
    name: "Shipping Cost Optimizer",
    tagline:
      "Prices shipping at checkout by comparing USPS, UPS, FedEx and DHL from every enabled location and returning the cheapest rate per service level.",
    problem:
      "Most stores ship with one carrier from one warehouse, even when a different carrier or location would be cheaper for a given parcel and address.",
    highlights: ["Carrier service", "Multi-location routing", "Rules engine"],
    features: [
      {
        title: "Checkout rates",
        body: "Plugs into checkout as a carrier service and returns one rate per level: Economy, Standard, Express and optionally Overnight.",
      },
      {
        title: "Carrier rules",
        body: "Never use, prefer within X%, hide level, free shipping and adjust price, scoped by country, weight and subtotal and run by priority.",
      },
      {
        title: "Location routing",
        body: "Quotes every enabled location and ships from the cheapest, optionally only from locations that can fill the whole cart.",
      },
      {
        title: "Savings dashboard",
        body: "30-day savings against the carrier you used before, carrier mix, cache hit rate, response time and recent rate requests.",
      },
    ],
    howItWorks: [
      {
        title: "Billable weight",
        body: "The greater of actual and dimensional weight (L × W × H ÷ 139 or 166), rounded up to a whole pound.",
      },
      {
        title: "Selection",
        body: "Excluded carriers are removed, the cheapest quote wins unless a preferred carrier is within tolerance, then markup, handling and price rules apply.",
      },
      {
        title: "Never breaks checkout",
        body: "EasyPost live rates fall back to built-in rates after a 4 s timeout; quotes are cached per route, weight and box, and stock lookups are capped at 2.5 s.",
      },
    ],
    stack: ["TypeScript", "React Router 7", "Polaris web components", "Prisma", "Admin GraphQL 2026-07", "EasyPost"],
    scopes: ["write_shipping", "read_locations", "read_inventory", "read_products"],
    repo: "https://github.com/rjaybernardo/shopify-app-shipping-cost-optimizer",
    screenshots: [
      { src: shipping01, alt: "Dashboard with savings and rate requests", caption: "Dashboard: savings, rate requests, cache hit rate and optimizer status." },
      { src: shipping02, alt: "Rate calculator", caption: "Rate calculator: test a package and destination before shoppers see it." },
      { src: shipping03, alt: "Carrier rules page", caption: "Carrier rules: change which carrier wins or what shoppers pay." },
      { src: shipping04, alt: "Settings page", caption: "Settings: checkout, locations, rate source, carriers, routing and pricing." },
    ],
  },
  {
    slug: "bulk-product-editor",
    name: "Bulk Product Editor",
    tagline:
      "Change prices, tags, collections, titles, descriptions and status on hundreds of products at once, from a rule builder or a spreadsheet, with preview and one-click undo.",
    problem:
      "Editing products one by one is slow and error-prone when a sale, a re-price or a catalog cleanup touches hundreds of them.",
    highlights: ["Bulk Operations API", "CSV / Excel import", "One-click undo"],
    features: [
      {
        title: "Rule builder",
        body: "Set or change prices by % or amount with .99/.95 rounding, compare-at prices, tags, collections, title and description edits, vendor, type and status.",
      },
      {
        title: "CSV import",
        body: "CSV, TSV or Excel, matched by handle, SKU or ID, accepting Shopify export columns, with per-row warnings.",
      },
      {
        title: "Preview & apply",
        body: "Every before → after value is shown before anything is written, then applied with live progress, even if the tab is closed.",
      },
      {
        title: "Undo & history",
        body: "Original values are kept, so any finished job, collection membership included, can be reversed in one click.",
      },
    ],
    howItWorks: [
      {
        title: "Snapshot",
        body: "bulkOperationRunQuery reads products, variants and collection membership as JSONL, avoiding query-cost limits.",
      },
      {
        title: "Plan",
        body: "Rules or rows become a target state per product; only real differences are kept, with exact before and after values. Prices are computed in cents.",
      },
      {
        title: "Apply",
        body: "Changes are staged as JSONL and run with bulkOperationRunMutation; progress advances on polling and the bulk_operations/finish webhook, guarded by a row lock.",
      },
    ],
    stack: ["TypeScript", "React Router 7", "Polaris web components", "Prisma", "Admin GraphQL 2026-07", "Vitest"],
    scopes: ["read_products", "write_products"],
    repo: "https://github.com/rjaybernardo/shopify-app-bulk-product-editor",
    screenshots: [],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
