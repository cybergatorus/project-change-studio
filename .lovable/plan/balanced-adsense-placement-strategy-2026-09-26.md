# Balanced AdSense placement strategy

## Goal
Increase viewable ad opportunities and revenue potential without crowding the county tools, misleading users, or weakening page speed and search quality.

## Implementation
- Add the authorized Google seller record at `/ads.txt`.
- Create one reusable responsive AdSense unit that initializes safely after the existing site-wide AdSense script loads.
- Keep each unit clearly labeled “Advertisement,” reserve stable vertical space to reduce layout shift, and never place ads inside or immediately beside buttons and inputs.
- Use distinct supplied slot IDs for measurable placement-level reporting.

## Homepage placements
1. Move the current post-statistics opportunity to directly below the county finder and its trust row.
2. When a lookup succeeds, place a dedicated result-focused unit between the finder and the result card.
3. Add one in-content unit after the “Why your county matters” section.
4. Add one late-page unit immediately before the FAQ section.

The first unit is hidden when a result appears so it is replaced—not stacked—by the result-focused unit. This keeps density balanced while prioritizing the highest-intent moment.

## Other high-intent pages
- ZIP, address, coordinates, and state guides: one unit after the lookup area and one mid-article unit.
- Learning guides: two units spaced between substantive sections.
- No ads in navigation, footer, legal pages, short pages, or directly adjacent to interactive controls.

## Validation
- Confirm `/ads.txt` serves the exact seller record.
- Confirm the existing AdSense loader remains single-instance.
- Check desktop and mobile layouts, slot ordering, reserved space, and the conditional result placement without clicking any ad.
- Check the generated preview for errors after implementation.

## Technical details
- Use the supplied publisher ID `ca-pub-3904638486580715` and responsive slot IDs from the uploaded code.
- Guard initialization against duplicate React development effects and unavailable/blocked AdSense scripts.
- Apply presentation-only placement changes; county lookup behavior and editorial content remain unchanged.
