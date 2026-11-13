import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "Raphael Jay Bernardo — Shopify Developer. Commerce, engineered.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#111211", color: "#efeee7", padding: "55px 65px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #34372f", paddingBottom: 25, fontSize: 22 }}><span>{site.name}</span><span style={{ color: "#a2a69b", fontSize: 18 }}>Shopify Developer</span></div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 55, fontSize: 105, letterSpacing: -7, lineHeight: 1.05 }}><span>Commerce.</span><span style={{ color: "#ff9a62" }}>Engineered.</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "auto", fontSize: 19, color: "#a2a69b" }}><span>Apps / Storefronts / Integrations</span><span style={{ color: "#ff9a62" }}>Complex systems. Useful experiences.</span></div>
    </div>,
    size,
  );
}
