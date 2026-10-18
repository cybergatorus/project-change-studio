import { Link } from "@tanstack/react-router";
import { SmartLink } from "@/components/smart-link";
import { MapPin } from "lucide-react";
import { useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const linkCls = "text-sm text-muted-foreground hover:text-foreground transition-colors";
  return (
    <header className="sticky top-0 z-50 glass border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <MapPin className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="font-display font-semibold text-lg tracking-tight">
            What County <span className="text-gradient">I Am In</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7">
          <SmartLink to="/tools/zip" className={linkCls}>ZIP Lookup</SmartLink>
          <SmartLink to="/tools/address" className={linkCls}>Address</SmartLink>
          <SmartLink to="/tools/coordinates" className={linkCls}>Coordinates</SmartLink>
          <SmartLink to="/states" className={linkCls}>States</SmartLink>
          <SmartLink to="/learn/what-is-a-county" className={linkCls}>Learn</SmartLink>
          <SmartLink to="/faq" className={linkCls}>FAQ</SmartLink>
          <SmartLink to="/about" className={linkCls}>About</SmartLink>
        </nav>
        <button
          aria-label="Toggle menu"
          className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg border border-border"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-sm">☰</span>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/60 px-4 py-3 flex flex-col gap-3 bg-background">
          <SmartLink to="/tools/zip" className={linkCls} onClick={() => setOpen(false)}>ZIP Lookup</SmartLink>
          <SmartLink to="/tools/address" className={linkCls} onClick={() => setOpen(false)}>Address</SmartLink>
          <SmartLink to="/tools/coordinates" className={linkCls} onClick={() => setOpen(false)}>Coordinates</SmartLink>
          <SmartLink to="/states" className={linkCls} onClick={() => setOpen(false)}>States</SmartLink>
          <SmartLink to="/learn/what-is-a-county" className={linkCls} onClick={() => setOpen(false)}>Learn</SmartLink>
          <SmartLink to="/faq" className={linkCls} onClick={() => setOpen(false)}>FAQ</SmartLink>
          <SmartLink to="/about" className={linkCls} onClick={() => setOpen(false)}>About</SmartLink>
        </div>
      )}
    </header>
  );
}
