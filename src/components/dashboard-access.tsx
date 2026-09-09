"use client";

import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardAccess() {
  const pathname = usePathname();

  if (pathname === "/dashboard") return null;

  return (
    <Link
      href="/dashboard"
      aria-label="Ir al dashboard"
      className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full border border-[#14251d]/15 bg-[#14251d] px-4 py-3 text-sm font-semibold text-[#d9ff57] shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-[#243b2d] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#52705e]/45 sm:bottom-6 sm:right-6"
    >
      <LayoutDashboard className="size-4" aria-hidden="true" />
      Dashboard
    </Link>
  );
}
