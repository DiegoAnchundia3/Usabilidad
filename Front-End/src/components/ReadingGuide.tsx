"use client"
import { useAccessibilityContext } from "../hooks/AccessibilityProvider"

export function ReadingGuide() {
  const { settings, readingGuideY } = useAccessibilityContext();
  if (!settings.isReadingGuideActive) return null;
  return (
    <div
      className="reading-guide fixed left-0 right-0 pointer-events-none z-[55]"
      style={{ top: `${readingGuideY}px` }}
    ></div>
  );
}
