import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/logo";

export const NAV = [
  { to: "/exact-address", label: "Exact Address" },
  { to: "/ip-location", label: "My IP Location" },
  { to: "/my-coordinates", label: "Coordinates" },
  { to: "/guides", label: "Guides" },
  { to: "/faq", label: "FAQ" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const cls = "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors";
  const active = { className: "text-sm font-semibold text-foreground" };
  return (
    <header className="sticky top-0 z-50 glass border-b border-border">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className={cls} activeProps={active}>
              {n.label}
            </Link>
          ))}
        </nav>
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-4 border-t border-border bg-background px-4 py-4 md:hidden" aria-label="Mobile">
          <Link to="/" className={cls} onClick={() => setOpen(false)}>Locate Me</Link>
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className={cls} onClick={() => setOpen(false)}>
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
