import { SmartLink } from "@/components/smart-link";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/60 bg-secondary/40 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="font-display font-semibold text-lg">What County I Am In</div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            The accurate, privacy-respecting county lookup tool. Powered by
            authoritative US Census and OpenStreetMap data.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Tools</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><SmartLink to="/" className="hover:text-foreground">What County Am I In</SmartLink></li>
            <li><SmartLink to="/tools/zip" className="hover:text-foreground">County by ZIP</SmartLink></li>
            <li><SmartLink to="/tools/address" className="hover:text-foreground">County by Address</SmartLink></li>
            <li><SmartLink to="/tools/coordinates" className="hover:text-foreground">County by Coordinates</SmartLink></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Learn</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><SmartLink to="/learn/what-is-a-county" className="hover:text-foreground">What is a county?</SmartLink></li>
            <li><SmartLink to="/learn/how-county-detection-works" className="hover:text-foreground">How detection works</SmartLink></li>
            <li><SmartLink to="/learn/zip-vs-county" className="hover:text-foreground">ZIP vs County</SmartLink></li>
            <li><SmartLink to="/learn/county-fips-codes" className="hover:text-foreground">County FIPS codes</SmartLink></li>
            <li><SmartLink to="/learn/county-vs-city" className="hover:text-foreground">County vs City</SmartLink></li>
            <li><SmartLink to="/learn/county-government" className="hover:text-foreground">County government</SmartLink></li>
            <li><SmartLink to="/states" className="hover:text-foreground">Browse states</SmartLink></li>
            <li><SmartLink to="/faq" className="hover:text-foreground">FAQ</SmartLink></li>
            <li><SmartLink to="/data-sources" className="hover:text-foreground">Data sources</SmartLink></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Company</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><SmartLink to="/about" className="hover:text-foreground">About</SmartLink></li>
            <li><SmartLink to="/contact" className="hover:text-foreground">Contact</SmartLink></li>
            <li><SmartLink to="/privacy" className="hover:text-foreground">Privacy</SmartLink></li>
            <li><SmartLink to="/terms" className="hover:text-foreground">Terms</SmartLink></li>
            <li><SmartLink to="/disclaimer" className="hover:text-foreground">Disclaimer</SmartLink></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 text-xs text-muted-foreground flex flex-col md:flex-row gap-2 items-center justify-between">
          <div>© {year} What County I Am In. All rights reserved.</div>
          <div>Not affiliated with any government agency. Data via US Census Bureau & OpenStreetMap.</div>
        </div>
      </div>
    </footer>
  );
}
