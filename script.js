/* ============================================
   PORTFOLIO WEBSITE - SCRIPTS
   Minimal, Optional Enhancements
   ============================================ */

/**
 * Initialize all interactive features
 */
document.addEventListener('DOMContentLoaded', () => {
  initFadeInAnimations();
  initSmoothScroll();
  initMobileNav();
});

/**
 * Fade-in animations on scroll
 * Elements with class 'fade-in' will animate when they enter viewport
 */
function initFadeInAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  if (!fadeElements.length) return;
  
  // Use Intersection Observer for performance
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optionally stop observing after animation
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  fadeElements.forEach((el) => observer.observe(el));
}

/**
 * Smooth scroll for anchor links
 * Enhances the native smooth scroll behavior
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Skip if it's just "#"
      if (href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without triggering scroll
        history.pushState(null, '', href);
      }
    });
  });
}

/**
 * Mobile navigation toggle
 * Shows/hides the navigation menu on mobile devices
 */
function initMobileNav() {
  const toggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');
  
  if (!toggle || !navLinks) return;
  
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('nav__links--open');
    toggle.setAttribute('aria-expanded', isOpen);
    
    // Animate hamburger to X
    toggle.classList.toggle('nav__toggle--active');
  });
  
  // Close menu when clicking a link
  navLinks.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('nav__links--open');
      toggle.classList.remove('nav__toggle--active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * Optional: Parallax effect for hero section
 * Uncomment to enable subtle parallax on scroll
 */
/*
function initParallax() {
  const hero = document.querySelector('.hero');
  const portrait = document.querySelector('.hero__portrait');
  
  if (!hero || !portrait) return;
  
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    
    if (scrollY < heroBottom) {
      const parallaxValue = scrollY * 0.3;
      portrait.style.transform = `translateY(${parallaxValue}px)`;
    }
  });
}
*/
