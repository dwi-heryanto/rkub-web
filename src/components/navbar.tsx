import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-[--color-bg]/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-bold text-[--color-deep-teal]">
          RKUB Tailoring
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/catalog" className="text-sm font-medium text-[--color-text] hover:text-[--color-deep-teal]">
            Catalog
          </Link>
          <a href="#services">
            <Button variant="secondary" className="hidden sm:inline-flex">
              Services
            </Button>
          </a>
        </div>
      </nav>
    </header>
  );
}
