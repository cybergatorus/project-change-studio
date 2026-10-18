import { useEffect, useRef, useState } from "react";

const ADSENSE_CLIENT = "ca-pub-3904638486580715";

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, never>>;
  }
}

export function AdSlot({ slot, className = "" }: { slot: string; className?: string }) {
  const adRef = useRef<HTMLModElement>(null);
  const [status, setStatus] = useState<"loading" | "filled" | "unfilled">("loading");

  useEffect(() => {
    const ad = adRef.current;
    if (!ad) return;

    const syncStatus = () => {
      const adStatus = ad.dataset.adStatus;
      if (adStatus === "filled" || adStatus === "unfilled") setStatus(adStatus);
    };

    const observer = new MutationObserver(syncStatus);
    observer.observe(ad, { attributes: true, attributeFilter: ["data-ad-status"] });
    syncStatus();

    if (!ad.dataset.adsbygoogleStatus) {
      try {
        (window.adsbygoogle = window.adsbygoogle ?? []).push({});
      } catch {
        setStatus("unfilled");
      }
    }

    // Ad blockers and consent tools may leave the unit without a final status.
    const timeout = window.setTimeout(() => {
      if (!ad.dataset.adStatus) setStatus("unfilled");
    }, 5000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, []);

  if (status === "unfilled") return null;

  return (
    <aside
      className={`ad-placement mx-auto w-full max-w-5xl px-2 sm:px-6 ${className}`}
      aria-label="Advertisement"
      data-ad-placement={slot}
      data-ad-display-status={status}
    >
      <div className="mb-1.5 text-center text-[10px] font-medium uppercase tracking-widest text-muted-foreground sm:mb-2">
        Advertisement
      </div>
      <div className="min-h-[90px] w-full overflow-hidden sm:min-h-[120px]">
        <ins
          ref={adRef}
          className="adsbygoogle block"
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}