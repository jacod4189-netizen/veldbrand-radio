import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/admin/LogoutButton";

export const metadata: Metadata = {
  title: "Admin — Veldbrand Radio",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-veld-black">
      {user && (
        <header className="border-b border-white/8 bg-veld-charcoal">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <nav className="flex items-center gap-5 text-sm font-medium">
              <span className="font-display font-bold text-veld-amber">
                Veldbrand Admin
              </span>
              <Link
                href="/admin"
                className="text-veld-muted transition-colors hover:text-veld-cream"
              >
                Oorsig
              </Link>
              <Link
                href="/admin/koerant"
                className="text-veld-muted transition-colors hover:text-veld-cream"
              >
                Koerant
              </Link>
            </nav>
            <LogoutButton />
          </div>
        </header>
      )}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</div>
    </div>
  );
}