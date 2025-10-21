import Link from "next/link";
import { UserNav } from "@/components/auth/UserNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bricolage font-bold">
            Boub'Chic
          </span>
        </Link>

        <UserNav />
      </div>
    </header>
  );
}