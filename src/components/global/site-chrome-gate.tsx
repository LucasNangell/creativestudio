"use client";

import { usePathname } from "next/navigation";

type SiteChromeGateProps = {
  children: React.ReactNode;
};

export function SiteChromeGate({ children }: SiteChromeGateProps) {
  const pathname = usePathname();
  const hideOnAdmin = pathname.startsWith("/admin") || pathname.startsWith("/adm");

  if (hideOnAdmin) return null;

  return <>{children}</>;
}
