/* ============================================================
   烏日驛．站長家 — 共用 JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll effect ──────────────────────────────── */
  const navbar = document.querySelector('.navbar');

  function updateNavbar() {
    if (window.scrollY > 72) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar(); // run on load (for page refresh mid-scroll)


  /* ── Hamburger / Mobile Nav ────────────────────────────── */
  const hamburger   = document.querySelector('.hamburger');
  const mobileNav   = document.querySelector('.mobile-nav');
  const navClose    = document.querySelector('.mobile-nav-close');

  function openMobileNav() {
    mobileNav.classList.add('open');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMobileNav);
  if (navClose)  navClose.addEventListener('click', closeMobileNav);

  // Close when a link is clicked
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // Close on ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMobileNav();
  });


  /* ── Scroll Fade-in (IntersectionObserver) ─────────────── */
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target); // only animate once
          }
        });
      },
      {
        rootMargin: '0px 0px -70px 0px',
        threshold: 0.1
      }
    );

    fadeElements.forEach(el => fadeObserver.observe(el));
  }


  /* ── Image Error Fallback ──────────────────────────────── */
  // When an image fails to load, hide it so the parent's
  // gradient background (img-wrap, menu-img, shop-img) shows through.
  document.querySelectorAll('img').forEach(img => {
    if (img.complete && img.naturalWidth === 0) {
      img.style.opacity = '0';
    }
    img.addEventListener('error', function () {
      this.style.opacity = '0';
    });
  });


  /* ── Active Nav Link Highlight ─────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.style.color = 'var(--secondary)';
    }
  });


  /* ── Smooth anchor scroll (same-page) ─────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = navbar ? navbar.offsetHeight : 72;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
