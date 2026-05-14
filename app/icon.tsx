import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
              borderLeft: "11px solid transparent",
              borderRight: "11px solid transparent",
              borderBottom: "13px solid #0f2744",
            }}
          />
          <div
            style={{
              width: 22,
              height: 12,
              background: "#0f2744",
              marginTop: -1,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 2,
                left: "50%",
                marginLeft: -3,
                width: 6,
                height: 7,
                background: "#ffffff",
                borderRadius: 1,
              }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
