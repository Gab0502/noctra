import React from "react";
import type { BackgroundProps } from "../types";

export function BackgroundLayer({
  bgColor,
  bgOpacity = 100,
  bgImage,
  overlayColor,
  overlayOpacity = 50,
  style,
  className,
  children,
}: BackgroundProps & {
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
}) {
  const hasColor = !!bgColor && bgColor !== "transparent" && bgColor !== "";
  const hasImage = !!bgImage;
  const hasOverlay = hasImage && !!overlayColor && overlayColor !== "transparent";

  return (
    <div style={{ position: "relative", ...style }} className={className}>
      {hasColor && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: bgColor,
            opacity: bgOpacity / 100,
            pointerEvents: "none",
          }}
        />
      )}
      {hasImage && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            pointerEvents: "none",
          }}
        />
      )}
      {hasOverlay && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: overlayColor,
            opacity: overlayOpacity / 100,
            pointerEvents: "none",
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
