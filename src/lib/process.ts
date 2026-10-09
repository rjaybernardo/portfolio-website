// "How I work" content on the home page. Each step is drawn from how the four apps were built.
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

export const toolkit = [
  {
    group: "Shopify APIs",
    items: ["Admin GraphQL (2026-07)", "Bulk Operations", "Carrier Service", "Discounts", "Customer Segments", "Webhooks"],
  },
  {
    group: "App platform",
    items: ["Shopify CLI", "App Bridge", "Polaris web components", "React Router app template", "Embedded admin apps"],
  },
  {
    group: "Engineering",
    items: ["TypeScript", "React", "Prisma", "PostgreSQL", "Vitest", "Next.js", "Vercel"],
  },
];
