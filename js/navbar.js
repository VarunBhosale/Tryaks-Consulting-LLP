/* ==========================================================================
   navbar.js — Sticky Header & Full-Screen Mobile Drawer Navigation
   Multi-device touch, resize, keyboard accessibility & background scroll lock
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const toggleBtn = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");
  const dropdownTrigger = document.querySelector(".dropdown-trigger");
  const navDropdown = document.querySelector(".nav-dropdown");

  let isMenuOpen = false;
  let savedScrollY = 0;

  // Sticky header subtle shadow on scroll (when menu is closed)
  const handleScroll = () => {
    if (isMenuOpen) return;
    if (window.scrollY > 15) {
      header.style.backgroundColor = "rgba(254, 250, 243, 0.98)";
      header.style.boxShadow = "0 2px 14px rgba(47, 44, 37, 0.06)";
    } else {
      header.style.backgroundColor = "rgba(254, 250, 243, 0.95)";
      header.style.boxShadow = "none";
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  // Open / Close Mobile Menu function with bulletproof background scroll lock
  const setMobileMenu = (open) => {
    isMenuOpen = open;

    if (toggleBtn) {
      toggleBtn.classList.toggle("is-active", open);
      toggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
    }

    if (navMenu) {
      navMenu.classList.toggle("is-active", open);
    }

    if (header) {
      header.classList.toggle("menu-open", open);
    }

    // Freeze background website completely so user ONLY views and scrolls the menu
    if (open) {
      savedScrollY = window.pageYOffset || document.documentElement.scrollTop;
      document.documentElement.classList.add("nav-open");
      document.body.classList.add("nav-open");
      document.body.style.position = "fixed";
      document.body.style.top = `-${savedScrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.classList.remove("nav-open");
      document.body.classList.remove("nav-open");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.body.style.overflow = "";
      window.scrollTo(0, savedScrollY);
      handleScroll();
    }
  };

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", () => {
      setMobileMenu(!isMenuOpen);
    });

    // Close menu when clicking any navigation link
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        setMobileMenu(false);
      });
    });

    // Close on Escape key press
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        setMobileMenu(false);
      }
    });

    // Close mobile menu if resized to desktop viewport
    window.addEventListener(
      "resize",
      () => {
        if (window.innerWidth > 860 && isMenuOpen) {
          setMobileMenu(false);
        }
      },
      { passive: true }
    );
  }

  // Mobile Dropdown Tap Support
  if (dropdownTrigger && navDropdown) {
    dropdownTrigger.addEventListener("click", (e) => {
      if (window.innerWidth <= 860) {
        e.preventDefault();
        const isVisible = navDropdown.style.display === "flex";
        navDropdown.style.display = isVisible ? "none" : "flex";
      }
    });
  }
});
