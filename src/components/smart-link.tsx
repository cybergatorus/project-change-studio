import { Link, useRouter, useRouterState, type LinkProps } from "@tanstack/react-router";
import { forwardRef, type MouseEvent, type ReactNode } from "react";

type Props = LinkProps & {
  className?: string;
  children?: ReactNode;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

/**
 * SmartLink: behaves like TanStack <Link>, but if the user clicks a link
 * pointing to the page they are already on, it resets the current view to
 * the top instead of letting the browser restore the old scroll position.
 */
export const SmartLink = forwardRef<HTMLAnchorElement, Props>(function SmartLink(
  { to, onClick, ...rest },
  ref,
) {
  const router = useRouter();
  const currentPath = useRouterState({ select: (s) => s.location.pathname });

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    const target = typeof to === "string" ? to : "";
    if (!target) return;
    const normalize = (p: string) => (p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p);
    if (normalize(target) === normalize(currentPath)) {
      e.preventDefault();
      if (typeof window !== "undefined") {
        if ("scrollRestoration" in window.history) {
          window.history.scrollRestoration = "manual";
        }
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
      }
      void router.invalidate();
    }
  };

  return <Link ref={ref} to={to} onClick={handleClick} {...rest} />;
});
