"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";

const NavLink = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname();
  const active = pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md ${active ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
    >
      {label}
    </Link>
  );
};

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr]">
      <header className="flex items-center justify-between p-4 border-b">
        <Link href="/dashboard" className="font-semibold">Launchpad</Link>
        <nav className="flex items-center gap-2">
          <NavLink href="/projects" label="Projects" />
          <NavLink href="/search" label="Search" />
          <NavLink href="/admin" label="Admin" />
        </nav>
      </header>
      <div className="grid grid-cols-[240px_1fr]">
        <aside className="border-r p-4 space-y-2">
          <div className="text-sm text-muted-foreground">Quick Links</div>
          <Separator />
          <Link className="block hover:underline" href="/projects">New Project</Link>
          <Link className="block hover:underline" href="/tasks">New Task</Link>
        </aside>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
