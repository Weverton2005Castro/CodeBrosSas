import { ImageResponse } from "next/og"
export const alt = "CodeBros — Sites, sistemas web e aplicativos sob medida"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#0a0a0a", color: "white" }}><div style={{ display: "flex", fontSize: 90, fontWeight: 700 }}><span>Code</span><span style={{ color: "#a78bfa" }}>Bros</span></div><div style={{ fontSize: 44, marginTop: 36 }}>Sites, sistemas web e aplicativos</div><div style={{ fontSize: 30, color: "#22d3ee", marginTop: 24 }}>Tecnologia sob medida · Manaus, AM</div></div>, size)
}
