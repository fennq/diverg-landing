/* Diverg — Animations and interactions */
(function () {
  'use strict';

  // Scroll-triggered animations
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements with animate-on-scroll class
  document.querySelectorAll('.animate-on-scroll, .feature-card, .solution-block, .value-item, .stat-item, .resource-card, .api-item, .pricing-card').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });

  // Stagger animations for grids
  const grids = document.querySelectorAll('.feature-grid, .api-grid, .values-grid, .resources-grid, .pricing-grid');
  grids.forEach(grid => {
    const items = grid.children;
    Array.from(items).forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.1}s`;
    });
  });

  // Nav background on scroll with enhanced glass effect
  const nav = document.querySelector('.nav');
  let lastScroll = 0;
  let ticking = false;

  function updateNav() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });

  // Smooth reveal for page content (no initial hide to avoid logo flash)
  const pageContent = document.querySelector('.page-content');
  if (pageContent) {
    pageContent.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  }

  // Parallax effect for geometric shapes
  const geoBlocks = document.querySelectorAll('.geo-block');
  let geoTicking = false;
  
  function updateGeoParallax() {
    const scrolled = window.pageYOffset;
    
    geoBlocks.forEach((block, index) => {
      const speed = 0.3 + (index * 0.05);
      const yPos = scrolled * speed * 0.05;
      const baseTransform = block.classList.contains('geo-accent') 
        ? 'perspective(1000px) rotateX(15deg) rotateY(-15deg)'
        : 'perspective(1000px) rotateX(15deg) rotateY(-15deg)';
      block.style.transform = `${baseTransform} translateY(${-yPos}px)`;
    });
    geoTicking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!geoTicking) {
      requestAnimationFrame(updateGeoParallax);
      geoTicking = true;
    }
  }, { passive: true });

  // Magnetic button effect with enhanced glow
  const buttons = document.querySelectorAll('.btn-primary, .btn-outline');
  
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.02)`;
      
      // Add dynamic glow based on cursor position
      if (btn.classList.contains('btn-primary')) {
        btn.style.boxShadow = `
          0 6px 30px rgba(59, 130, 246, ${0.4 + Math.abs(x) / rect.width * 0.3}),
          0 0 60px rgba(59, 130, 246, ${0.2 + Math.abs(y) / rect.height * 0.2})
        `;
      }
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.boxShadow = '';
    });
    
    // Add click ripple effect
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        width: 20px;
        height: 20px;
        background: rgba(255,255,255,0.4);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        left: ${e.clientX - rect.left - 10}px;
        top: ${e.clientY - rect.top - 10}px;
        pointer-events: none;
      `;
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
  
  // Add ripple keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(10);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Glow effect on cards
  const cards = document.querySelectorAll('.feature-card, .resource-card, .solution-block');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
})();
