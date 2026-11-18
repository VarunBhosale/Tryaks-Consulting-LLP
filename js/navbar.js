/* ==========================================================================
   navbar.js — Sticky Header & Mobile Drawer Navigation
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const toggleBtn = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");

  // Sticky header subtle shadow on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.style.backgroundColor = "rgba(254, 250, 243, 0.98)";
      header.style.boxShadow = "0 2px 12px rgba(47, 44, 37, 0.05)";
    } else {
      header.style.backgroundColor = "rgba(254, 250, 243, 0.94)";
      header.style.boxShadow = "none";
    }
  });

  // Mobile menu toggle
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", () => {
      toggleBtn.classList.toggle("is-active");
      navMenu.classList.toggle("is-active");
      document.body.style.overflow = navMenu.classList.contains("is-active") ? "hidden" : "";
    });

    // Close menu when clicking any nav link
    const links = navMenu.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", () => {
        toggleBtn.classList.remove("is-active");
        navMenu.classList.remove("is-active");
        document.body.style.overflow = "";
      });
    });
  }
});
