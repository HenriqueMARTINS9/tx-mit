"use client";

import { useEffect, useState } from "react";

const MOBILE_DEVICE_REGEX =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

export function useIsMobileDevice() {
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    const touchViewport =
      navigator.maxTouchPoints > 0 && window.matchMedia("(max-width: 1024px)").matches;

    setIsMobileDevice(MOBILE_DEVICE_REGEX.test(userAgent) || touchViewport);
  }, []);

  return isMobileDevice;
}
