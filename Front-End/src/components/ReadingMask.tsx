"use client"
import { useAccessibilityContext } from "../hooks/AccessibilityProvider"

export function ReadingMask() {
  const { settings, readingMaskY } = useAccessibilityContext();
  if (!settings.isReadingMaskActive) return null;
  const windowHeight = 60;
  const topMaskHeight = readingMaskY - windowHeight / 2;
  const bottomMaskHeight = window.innerHeight - (readingMaskY + windowHeight / 2);
  return (
    <div className="fixed inset-0 z-[55] pointer-events-none">
      <div className="reading-mask-top" style={{ height: `${Math.max(0, topMaskHeight)}px` }}></div>
      <div
        className="reading-mask-bottom"
        style={{
          top: `${Math.max(0, readingMaskY + windowHeight / 2)}px`,
          height: `${Math.max(0, bottomMaskHeight)}px`,
        }}
      ></div>
    </div>
  );
}
