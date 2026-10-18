import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Where Am I Right Now home">
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary shadow-pin">
        <MapPin className="h-5 w-5 text-primary-foreground" />
      </span>
      <span className="font-display text-lg font-bold tracking-tight">
        Where Am I <span className="text-primary">Right Now</span>
      </span>
    </Link>
  );
}
