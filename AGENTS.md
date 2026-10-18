# Project Architecture

- Render manual AdSense inventory through the shared `AdSlot` component, load the publisher script once in the root head, and collapse unfilled or blocked units after a short loading window to prevent persistent blank gaps.
