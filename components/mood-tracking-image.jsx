"use client";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function MoodTrackingImage() {
  const { resolvedTheme } = useTheme();

  // Optionally, handle SSR fallback
  if (!resolvedTheme) return null;

  return (
    <Image
      src={
        resolvedTheme === "dark"
          ? "/moodTracking_dark.png"
          : "/moodTracking_light.png"
      }
      alt="Mood Tracking"
      width={400}
      height={300}
      priority
    />
  );
} 