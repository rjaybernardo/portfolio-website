export const pipelineRepo =
  "https://github.com/rjaybernardo/Shopify-Theme-CI-CD-Pipeline";
export const pipelineRun = `${pipelineRepo}/actions/runs/43118893366`;
export const themeRepo =
  "https://github.com/rjaybernardo/rgb-leather-shopify-theme";

export const skillAreas = [
  {
    id: "interfaces",
    label: "Interfaces",
    title: "From a screen to a working interface.",
    description:
      "React and TypeScript for app interfaces, with responsive layouts, accessible controls, and clear states for the person using them.",
    tools: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Polaris",
      "Keyboard accessibility",
    ],
    evidence: [
      {
        title: "This portfolio",
        detail:
          "Responsive layouts, keyboard project tabs, and screenshot browsing.",
        href: "https://github.com/rjaybernardo/portfolio-website",
      },
      {
        title: "Smart Discount Manager",
        detail:
          "An embedded admin interface for campaign rules and customer targeting.",
        href: "/projects/smart-discount-manager",
      },
    ],
    icon: "M3 5h18v14H3zM3 9h18M7 13h4M7 16h7",
  },
  {
    id: "themes",
    label: "Shopify themes",
    title: "Storefront work, built into the theme.",
    description:
      "Liquid templates, editable sections, and vanilla JavaScript for shopping interactions that fit Shopify's theme architecture.",
    tools: [
      "Liquid",
      "Online Store 2.0",
      "Sections & blocks",
      "CSS",
      "Web components",
      "Section Rendering API",
    ],
    evidence: [
      {
        title: "RGB Leather theme",
        detail:
          "A theme project with product pages, a cart drawer, predictive search, and configurable sections.",
        href: themeRepo,
      },
      {
        title: "Theme source",
        detail:
          "Inspect the Liquid sections, templates, and assets in the repository.",
        href: `${themeRepo}/tree/main/sections`,
      },
    ],
    icon: "M4 8h16v13H4zM3 8l2-5h14l2 5M9 21v-8h6v8M3 8c0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0",
  },
  {
    id: "integrations",
    label: "APIs & data",
    title: "Connecting the pieces behind the UI.",
    description:
      "Shopify APIs, application data, and external services—plus the timeouts, validation, and permissions each workflow needs.",
    tools: [
      "GraphQL",
      "Node.js",
      "Prisma",
      "PostgreSQL",
      "Webhooks",
      "EasyPost",
    ],
    evidence: [
      {
        title: "Shipping Cost Optimizer",
        detail:
          "Carrier-rate selection, location routing, caching, and fallback rates.",
        href: "/projects/shipping-cost-optimizer",
      },
      {
        title: "Returns Management",
        detail:
          "Return requests, labels, refunds, and a forward-only status flow.",
        href: "/projects/returns-management",
      },
    ],
    icon: "M4 4h6v6H4zM14 14h6v6h-6zM14 4h6v6h-6zM7 10v7h7M10 7h4M17 10v4",
  },
  {
    id: "delivery",
    label: "Testing & delivery",
    title: "Checking the work before shipping it.",
    description:
      "Git-based workflows, automated checks, and a theme delivery starter that promotes a checked artifact instead of rebuilding during a release.",
    tools: [
      "Git",
      "GitHub Actions",
      "Node.js tests",
      "Theme Check",
      "Build artifacts",
      "Vercel",
    ],
    evidence: [
      {
        title: "Shopify Theme CI/CD Pipeline",
        detail:
          "Quality checks, artifact verification, staging, and manual release/rollback workflows.",
        href: pipelineRepo,
      },
      {
        title: "Verified quality-check run",
        detail:
          "A successful Theme quality job. Staging was skipped in this run.",
        href: pipelineRun,
      },
    ],
    icon: "M8 3v12a4 4 0 0 0 8 0V8M5 3h6M13 8l3-3 3 3M5 21h14M9 11h6",
  },
];

export const pipelineSteps = [
  {
    label: "Check",
    title: "Catch issues in the pull request.",
    description:
      "Pull requests and main-branch pushes run formatting checks, the pipeline's Node.js tests, and Shopify Theme Check. Pull request checks do not need store credentials.",
    file: "ci.yml",
    code: [
      "- run: npm ci",
      "- run: npm run format:check",
      "- run: npm test",
      "- run: npm run check",
    ].join("\n"),
    proof: "Quality job verified on GitHub",
  },
  {
    label: "Package",
    title: "Keep the build identifiable.",
    description:
      "Package the theme, verify its manifest, and upload the artifact. The manifest records the commit, run ID, and SHA-256 hashes so release tooling can check what it deploys.",
    file: "ci.yml",
    code: [
      "- run: npm run package",
      "- run: npm run verify:bundle",
      "# Upload the checked dist/ artifact",
      "# Manifest: commit, run ID, file hashes",
    ].join("\n"),
    proof: "Packaging and verification are part of Theme CI",
  },
  {
    label: "Stage",
    title: "Preview the checked bundle first.",
    description:
      "After a main-branch push, the staging job downloads the checked artifact and deploys it when staging is enabled and store settings are configured. It rejects a commit already behind main.",
    file: "ci.yml",
    code: [
      "staging:",
      "  needs: quality",
      "  environment: staging",
      "  # Enabled by ENABLE_STAGING=true",
      "  # Download artifact → deploy tested bundle",
    ].join("\n"),
    proof: "Implemented; skipped in the verified run",
  },
  {
    label: "Release / rollback",
    title: "Promote the original build.",
    description:
      "A manual workflow takes a successful main-branch CI run ID and a confirmed production theme ID. Reusing an earlier successful bundle provides rollback. Environment reviewers must be configured separately.",
    file: "release.yml",
    code: [
      "workflow_dispatch:",
      "  inputs:",
      "    build_run_id:",
      "      required: true",
      "    confirm_theme_id:",
      "      required: true",
    ].join("\n"),
    proof: "Release workflow implemented; store deployment unverified",
  },
];
