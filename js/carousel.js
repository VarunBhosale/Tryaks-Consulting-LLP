/* ==========================================================================
   carousel.css / carousel.js — Showcase Horizontal Scroll Controller
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.getElementById("showcaseViewport");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");

  if (!viewport || !prevBtn || !nextBtn) return;

  const scrollAmount = 360; // Card width + gap

  const updateControls = () => {
    prevBtn.disabled = viewport.scrollLeft <= 10;
    nextBtn.disabled = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 10;
  };

  prevBtn.addEventListener("click", () => {
    viewport.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    viewport.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  viewport.addEventListener("scroll", updateControls, { passive: true });
  window.addEventListener("resize", updateControls);
  updateControls();
});
