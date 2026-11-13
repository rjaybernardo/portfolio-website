// Edit this file to change the name, intro and links shown across the site.
export const site = {
  name: "Raphael Jay Bernardo",
  role: "Shopify Developer",
  intro:
    "I'm a Shopify developer working on apps, themes, and storefronts. My projects cover discounts, inventory forecasting, shipping rates, returns, and bulk product editing.",
  github: "https://github.com/rjaybernardo",
  // Put a square photo in public/ and set its path here, e.g. "/profile.jpg". Initials show while it is null.
  photo: null as string | null,
  // Set these to show them in the contact section.
  email: "raphaeljaybernardo@gmail.com",
  linkedin: "https://www.linkedin.com/in/raphael-jay-bernardo-4b7906355/",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};
