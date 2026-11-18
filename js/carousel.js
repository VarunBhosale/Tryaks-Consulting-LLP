/* ==========================================================================
   carousel.js — Uninterrupted Continuous Flow Showcase Ribbon
   Constant smooth motion that never stops on hover or card click.
   Only clicking the "See their story" button redirects the user.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.getElementById("showcaseViewport");
  const track = viewport ? viewport.querySelector(".carousel-track") : null;

  if (!viewport || !track) return;

  // Clone original cards to construct a seamless, infinite ribbon loop
  const originalCards = Array.from(track.children);
  if (originalCards.length === 0) return;

  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  });

  const speed = 0.85; // Natural continuous glide velocity (~50px/second)

  // Half width represents the exact total width of the original card set
  const getLoopThreshold = () => {
    return track.scrollWidth / 2;
  };

  // Continuous auto-flow loop via requestAnimationFrame
  // Flows uninterrupted across hover, touch, and card clicks
  const autoFlow = () => {
    viewport.scrollLeft += speed;
    const threshold = getLoopThreshold();
    if (viewport.scrollLeft >= threshold) {
      viewport.scrollLeft -= threshold;
    }
    requestAnimationFrame(autoFlow);
  };

  requestAnimationFrame(autoFlow);
});
