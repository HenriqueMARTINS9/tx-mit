"use client";

import { useIsMobileDevice } from "@/hooks/useIsMobileDevice";

export function MobileExperienceBadge() {
  const isMobileDevice = useIsMobileDevice();

  if (!isMobileDevice) {
    return null;
  }

  return (
    <span className="rounded-full border border-amber-300/25 bg-amber-300/15 px-3 py-2 text-xs font-medium text-amber-50">
      Recommandation TX-MIT sur mobile
    </span>
  );
}
