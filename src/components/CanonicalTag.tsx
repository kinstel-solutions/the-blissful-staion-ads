"use client";

import { usePathname } from "next/navigation";

export function CanonicalTag() {
  const pathname = usePathname();
  const path = pathname === "/" ? "" : pathname;
  const url = `https://www.theblissfulstation.com${path}`;

  return <link rel="canonical" href={url} />;
}
