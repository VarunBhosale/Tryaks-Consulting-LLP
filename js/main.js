/* ==========================================================================
   main.js — General Interactivity, Newsletter Handler & Scroll Interactions
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Newsletter submission feedback
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector(".newsletter-input");
      const btn = newsletterForm.querySelector("button");

      if (input && input.value) {
        btn.textContent = "Subscribed ✓";
        btn.style.backgroundColor = "var(--accent-green)";
        btn.style.borderColor = "var(--accent-green)";
        input.value = "";
        input.placeholder = "Thank you for joining our network!";
        input.disabled = true;

        setTimeout(() => {
          btn.textContent = "Subscribe";
          btn.style.backgroundColor = "";
          btn.style.borderColor = "";
          input.disabled = false;
          input.placeholder = "Enter your work email";
        }, 4000);
      }
    });
  }

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#") {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
});
