/* ==========================================================================
   dashboard.js — Animated Numbers & Live Build Metric Updates
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const metricElements = document.querySelectorAll(".metric-num[data-target]");

  if (metricElements.length === 0) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute("data-target"), 10);
    const duration = 1500;
    const start = 0;
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * ease);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        metricElements.forEach(el => animateCounter(el));
        obs.disconnect();
      }
    });
  }, { threshold: 0.15 });

  const dashboardSection = document.querySelector(".dashboard-section");
  if (dashboardSection) {
    observer.observe(dashboardSection);
  }
});
