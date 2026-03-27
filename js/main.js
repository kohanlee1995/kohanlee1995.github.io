/* ========================================
   Ko-Han Lee — Main JS
   Smooth scroll, fade-in, nav behavior
   ======================================== */

(function () {
  'use strict';

  // ---- Scroll-triggered fade-in ----
  const fadeEls = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeEls.forEach((el) => observer.observe(el));

  // ---- Nav shadow on scroll ----
  const nav = document.querySelector('.nav');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  });

  // ---- Active nav link highlight ----
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveLink() {
    const scrollY = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();

  // ---- Mobile nav toggle ----
  const toggle = document.querySelector('.nav-toggle');
  const navLinksContainer = document.querySelector('.nav-links');

  toggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('open');
  });

  // Close mobile nav on link click
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('open');
    });
  });
})();
