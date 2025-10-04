"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const prefix = isHome ? "" : "/";

  return (
    <header className="max-w-5xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/" className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-background font-bold">
          n
        </Link>
        <Link href="/" className="text-lg font-semibold tracking-tight hover:opacity-90">
          notli – Aprilscherz oder echte EU‑Verordnung?
        </Link>
      </div>
      <nav className="hidden sm:flex items-center gap-6 text-sm text-foreground/80">
        <Link href={`${prefix}#wie-funktioniert`} className="hover:text-foreground">So funktioniert’s</Link>
        <Link href={`${prefix}#beispiele`} className="hover:text-foreground">Beispiele</Link>
        <Link href={`${prefix}#faq`} className="hover:text-foreground">FAQ</Link>
      </nav>
    </header>
  );
}
