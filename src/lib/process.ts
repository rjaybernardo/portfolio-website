// "How I work" content on the home page. Each step is drawn from how the apps were built.
export const processSteps = [
  {
    step: "01",
    title: "Start from the merchant's problem",
    body: "Every app begins with the job a merchant does by hand today — re-pricing hundreds of products, guessing reorder dates, overpaying for one carrier — and a plain statement of what the app will change.",
  },
  {
    step: "02",
    title: "Ask for the fewest scopes",
    body: "Each app requests only what it needs. Inventory Forecasting is read-only (read_products, read_inventory, read_orders); write access is added only where the app has to change store data.",
  },
  {
    step: "03",
    title: "Let Shopify do the heavy lifting",
    body: "Discounts are scheduled and capped by Shopify itself, audiences are native customer segments, and large catalog edits run through the Bulk Operations API instead of thousands of single mutations.",
  },
  {
    step: "04",
    title: "Preview before writing, keep an undo",
    body: "Anything that changes a store shows the exact before → after first and keeps the original values, so a mistake is one click to reverse.",
  },
  {
    step: "05",
    title: "Never break checkout",
    body: "Code on the checkout path has hard timeouts, caching and fallbacks. If a live rate provider is slow, shoppers still get a price.",
  },
  {
    step: "06",
    title: "Test on a dev store, document the math",
    body: "Apps are built and checked on a development store, logic is covered by Vitest, and every README explains the formulas so merchants can trust the numbers.",
  },
];

// Services shown as tiles across the top of the home page.
export const skills = [
  {
    title: "Shopify apps",
    body: "Admin apps that automate the store work merchants do by hand.",
    icon: "M4 5h7v7H4zM13 5h7v7h-7zM4 14h7v5H4zM13 14h7v5h-7z",
  },
  {
    title: "Liquid themes",
    body: "Custom sections and blocks merchants can edit themselves.",
    icon: "M12 3.5c3 4 6 7.2 6 10.5a6 6 0 0 1-12 0c0-3.3 3-6.5 6-10.5z",
  },
  {
    title: "Hydrogen",
    body: "Fast headless storefronts on the Storefront API.",
    icon: "M13 3L5 14h6l-1 7 8-11h-6z",
  },
  {
    title: "Checkout",
    body: "Functions for custom discount, delivery and payment logic.",
    icon: "M3 6h18v12H3zM3 10h18M7 15h4",
  },
  {
    title: "Store setup",
    body: "New stores, and migrations from other platforms.",
    icon: "M4 8h13l-3-3M20 16H7l3 3",
  },
];

export const toolkit = [
  {
    group: "Shopify APIs",
    items: ["Admin GraphQL (2026-07)", "Bulk Operations", "Carrier Service", "Discounts", "Customer Segments", "Returns", "App Proxy", "Webhooks", "Shopify Functions", "Checkout UI extensions", "Storefront API"],
  },
  {
    group: "Platform",
    items: ["Liquid", "Online Store 2.0 themes", "Hydrogen", "Shopify CLI", "App Bridge", "Polaris web components", "React Router app template", "Embedded admin apps"],
  },
  {
    group: "Engineering",
    items: ["TypeScript", "React", "Prisma", "PostgreSQL", "Vitest", "Next.js", "Vercel"],
  },
];
