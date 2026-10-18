# Project Architecture

- Content routes use the shared `pageHead` helper for metadata and WebPage JSON-LD, with route-specific schemas describing only visible content and supported capabilities.
- Tag social images only when a route supplies an absolute HTTPS rendition of its visible image; bundled images must not be assigned an invented production URL.

