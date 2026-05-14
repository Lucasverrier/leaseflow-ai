import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "62px solid transparent",
              borderRight: "62px solid transparent",
              borderBottom: "74px solid #0f2744",
            }}
          />
          <div
            style={{
              width: 124,
              height: 68,
              background: "#0f2744",
              marginTop: -2,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 12,
                left: "50%",
                marginLeft: -18,
                width: 36,
                height: 42,
                background: "#ffffff",
                borderRadius: 4,
              }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
