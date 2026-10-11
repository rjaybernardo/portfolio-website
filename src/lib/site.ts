// Edit this file to change the name, intro and links shown across the site.
export const site = {
  name: "Raphael Jay Bernardo",
  role: "Shopify Developer",
  intro:
    "I build Shopify apps, Liquid themes and headless storefronts, and set up and migrate stores. My apps handle discounts, inventory forecasting, checkout shipping rates, returns and bulk catalog edits.",
  github: "https://github.com/rjaybernardo",
  // Put a square photo in public/ and set its path here, e.g. "/profile.jpg". Initials show while it is null.
  photo: null as string | null,
  // Set these to show them in the contact section.
  email: "raphaeljaybernardo@gmail.com",
  linkedin: "",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};
