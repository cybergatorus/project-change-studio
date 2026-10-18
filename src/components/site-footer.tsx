import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { GUIDES } from "@/lib/guides";

export function SiteFooter() {
  const cls = "text-sm text-ink-foreground/70 hover:text-ink-foreground transition-colors";
  return (
    <footer className="mt-24 bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="[&_span]:text-ink-foreground [&_a>span:first-child]:text-primary-foreground"><Logo /></div>
          <p className="mt-4 text-sm text-ink-foreground/70">
            Find where you are right now — exact address, GPS coordinates and IP location, free and private.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest">Tools</h2>
          <ul className="mt-4 space-y-2.5">
            <li><Link to="/" className={cls}>Where am I right now?</Link></li>
            <li><Link to="/exact-address" className={cls}>My exact address</Link></li>
            <li><Link to="/ip-location" className={cls}>Where am I by IP</Link></li>
            <li><Link to="/my-coordinates" className={cls}>My GPS coordinates</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest">Guides</h2>
          <ul className="mt-4 space-y-2.5">
            {GUIDES.map((g) => (
              <li key={g.slug}><Link to="/guides/$slug" params={{ slug: g.slug }} className={cls}>{g.short}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest">Site</h2>
          <ul className="mt-4 space-y-2.5">
            <li><Link to="/faq" className={cls}>FAQ</Link></li>
            <li><Link to="/about" className={cls}>About</Link></li>
            <li><Link to="/contact" className={cls}>Contact</Link></li>
            <li><Link to="/privacy" className={cls}>Privacy Policy</Link></li>
            <li><Link to="/terms" className={cls}>Terms of Use</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-foreground/15">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-ink-foreground/60 sm:px-6">
          © 2026 WhereIAmRightNow.org · Map data © OpenStreetMap contributors · Not for emergency use — always call your local emergency number.
        </p>
      </div>
    </footer>
  );
}
