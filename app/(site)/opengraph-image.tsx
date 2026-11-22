import {ImageResponse} from "next/og"
import {siteConfig} from "@/config/site"

export const alt = siteConfig.name
export const size = {width: 1200, height: 630}
export const contentType = "image/png"

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: 96,
                    background: "#0b0b0f",
                    color: "#ffffff",
                }}
            >
                <div style={{fontSize: 92, fontWeight: 700, letterSpacing: -2}}>{siteConfig.name}</div>
                <div style={{fontSize: 40, marginTop: 24, color: "#a1a1aa"}}>AI &amp; ML Backend Engineer</div>
                <div style={{fontSize: 30, marginTop: 64, color: "#71717a"}}>nikolas-rummel.de</div>
            </div>
        ),
        size,
    )
}
