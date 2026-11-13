import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "Raphael Jay Bernardo — Shopify Developer.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#fcfbf8", color: "#262c25", padding: "55px 65px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #dedfd6", paddingBottom: 25, fontSize: 22 }}><span>{site.name}</span><span style={{ color: "#62695e", fontSize: 18 }}>Shopify Developer</span></div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 55, fontSize: 105, letterSpacing: -7, lineHeight: 1.05 }}><span>Shopify</span><span style={{ color: "#a4472b" }}>Developer.</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "auto", fontSize: 19, color: "#62695e" }}><span>Apps / Storefronts / Integrations</span><span style={{ color: "#a4472b" }}>Projects / Code / Contact</span></div>
    </div>,
    size,
  );
}
