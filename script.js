/* ============================================
   PORTFOLIO WEBSITE - SCRIPTS
   Minimal, Optional Enhancements
   ============================================ */

/**
 * Initialize all interactive features
 */
const init = () => {
  initGSAPAnimations();
  initSmoothScroll();
  initMobileNav();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

/**
 * GSAP Animations
 */
function initGSAPAnimations() {
  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // --- Hero Section Entrance (Collision effect) ---
  const heroTL = gsap.timeline({
    defaults: { ease: "back.out(1.2)", duration: 1.5 }
  });

  // Determine entrance X offset based on screen width
  const xOffset = window.innerWidth < 768 ? 100 : 300;

  // Set portraits to be immediately visible (no animation to avoid clip-path issues)
  gsap.set([".hero__portrait-designer", ".hero__portrait-coder"], {
    autoAlpha: 1
  });

  heroTL
    // Left side text slides in from left
    .from(".hero__designer", {
      autoAlpha: 0,
      x: -xOffset,
      duration: 1.4,
      ease: "power2.out"
    }, "-=0.8")
    // Right side text slides in from right
    .from(".hero__coder", {
      autoAlpha: 0,
      x: xOffset,
      duration: 1.4,
      ease: "power2.out"
    }, "<") // Start at the same time as left side
    // Code snippets appear after the collision
    .from(".hero__code-snippets span", {
      autoAlpha: 0,
      y: 20,
      stagger: 0.05,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5")
    // Color bar reveals at the end
    .from(".color-bar__segment", {
      scaleX: 0,
      transformOrigin: "left center",
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.8");

  // --- Scroll Reveal Animations ---

  // Generic Reveal for elements with .scroll-reveal class
  const revealElements = document.querySelectorAll('.scroll-reveal');
  revealElements.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      autoAlpha: 0,
      y: 40,
      duration: 1.2,
      ease: "power3.out",
      clearProps: "all"
    });
  });

  // Batch Reveal for Projects (Bento Cards)
  ScrollTrigger.batch(".bento-card", {
    onEnter: batch => gsap.to(batch, {
      autoAlpha: 1,
      y: 0,
      stagger: 0.15,
      overwrite: true,
      duration: 1,
      ease: "power2.out"
    }),
    start: "top 85%"
  });

  // Batch Reveal for Skills Categories
  ScrollTrigger.batch(".skills__category", {
    onEnter: batch => gsap.to(batch, {
      autoAlpha: 1,
      y: 0,
      stagger: 0.15,
      overwrite: true,
      duration: 1,
      ease: "power2.out"
    }),
    start: "top 85%"
  });

  // Ensure initial state for batch elements
  gsap.set(".bento-card, .skills__category", { autoAlpha: 0, y: 40 });




  // --- Micro-interactions & Hover Effects ---

  // Magnetic Elements (Desktop only)
  const isMobile = window.innerWidth <= 768;
  const magneticElements = document.querySelectorAll('.magnetic');

  if (!isMobile) {
    magneticElements.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(el, {
          x: x * 0.4,
          y: y * 0.4,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });
      });
    });
  }


  // Card Hover Animations (Bento & AI Cards)
  const cards = document.querySelectorAll('.bento-card, .ai-workflow__card, .glass-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.08)",
        duration: 0.4,
        ease: "power2.out"
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        boxShadow: "var(--glass-shadow)",
        duration: 0.4,
        ease: "power2.out"
      });
    });
  });


  // Hero Portrait Interaction (Refined Zoom & Slide)
  const portraitWrapper = document.querySelector('.hero__portrait-wrapper');
  const portraitDesigner = document.querySelector('.hero__portrait-designer');
  const portraitCoder = document.querySelector('.hero__portrait-coder');
  const designerText = document.querySelector('.hero__designer');
  const coderText = document.querySelector('.hero__coder');
  const hoverZoneLeft = document.querySelector('.hero__hover-zone--left');
  const hoverZoneRight = document.querySelector('.hero__hover-zone--right');

  if (portraitWrapper && portraitDesigner && portraitCoder && designerText && coderText) {
    const hoverEase = "power3.out";
    const hoverDuration = 0.6; // Slightly faster for responsiveness

    const onHoverLeft = () => {
      // Zoom and intensive slide portrait right
      gsap.to(portraitWrapper, { scale: 1.15, x: 120, duration: hoverDuration, ease: hoverEase });
      // Reveal designer side
      gsap.to(portraitDesigner, { clipPath: 'inset(0 0% 0 0)', duration: hoverDuration, ease: hoverEase });
      gsap.to(portraitCoder, { clipPath: 'inset(0 0 0 100%)', duration: hoverDuration, ease: hoverEase });
      // Slide text with portrait
      gsap.to(designerText, { opacity: 1, x: 40, scale: 1.05, duration: hoverDuration, ease: hoverEase });
      gsap.to(coderText, { opacity: 0, x: 100, duration: hoverDuration, ease: hoverEase });
    };

    const onHoverRight = () => {
      // Zoom and intensive slide portrait left
      gsap.to(portraitWrapper, { scale: 1.15, x: -120, duration: hoverDuration, ease: hoverEase });
      // Reveal coder side
      gsap.to(portraitDesigner, { clipPath: 'inset(0 100% 0 0)', duration: hoverDuration, ease: hoverEase });
      gsap.to(portraitCoder, { clipPath: 'inset(0 0 0 0%)', duration: hoverDuration, ease: hoverEase });
      // Slide text with portrait
      gsap.to(coderText, { opacity: 1, x: -40, scale: 1.05, duration: hoverDuration, ease: hoverEase });
      gsap.to(designerText, { opacity: 0, x: -100, duration: hoverDuration, ease: hoverEase });
    };

    const onReset = () => {
      gsap.to(portraitWrapper, { scale: 1, x: 0, duration: hoverDuration, ease: hoverEase });
      gsap.to(portraitDesigner, { clipPath: 'inset(0 46% 0 0)', duration: hoverDuration, ease: hoverEase });
      gsap.to(portraitCoder, { clipPath: 'inset(0 0 0 54%)', duration: hoverDuration, ease: hoverEase });
      gsap.to([designerText, coderText], { opacity: 1, x: 0, scale: 1, duration: hoverDuration, ease: hoverEase });
    };

    // Attach listeners to zones and text blocks
    if (hoverZoneLeft) {
      hoverZoneLeft.addEventListener('mouseenter', onHoverLeft);
    }
    if (hoverZoneRight) {
      hoverZoneRight.addEventListener('mouseenter', onHoverRight);
    }

    designerText.addEventListener('mouseenter', onHoverLeft);
    coderText.addEventListener('mouseenter', onHoverRight);

    // Reset when leaving the portrait area or the text areas
    portraitWrapper.addEventListener('mouseleave', onReset);
    designerText.addEventListener('mouseleave', onReset);
    coderText.addEventListener('mouseleave', onReset);
  }
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
  const navMenu = document.querySelector('.nav__menu');
  const navLinks = document.querySelectorAll('.nav__link');

  if (!toggle || !navMenu) return;

  toggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    toggle.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isOpen);

    // Lock body scroll when menu is open
    document.body.classList.toggle('menu-open', isOpen);
  });

  // Close menu when clicking a link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }
  });

  // Close menu on window resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }
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

// Ensure ScrollTrigger refreshes after all assets load
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});

// Final refresh call to catch late renders
setTimeout(() => {
  ScrollTrigger.refresh();
}, 2000);
