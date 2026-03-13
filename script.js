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

  // Nav background on scroll
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      nav.style.background = 'rgba(13, 13, 16, 0.98)';
      nav.style.borderBottom = '1px solid var(--border)';
    } else {
      nav.style.background = 'linear-gradient(to bottom, rgba(13, 13, 16, 0.95) 0%, transparent 100%)';
      nav.style.borderBottom = 'none';
    }
    
    lastScroll = currentScroll;
  }, { passive: true });

  // Smooth reveal for page content
  const pageContent = document.querySelector('.page-content');
  if (pageContent) {
    pageContent.style.opacity = '0';
    pageContent.style.transform = 'translateY(20px)';
    pageContent.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    
    setTimeout(() => {
      pageContent.style.opacity = '1';
      pageContent.style.transform = 'translateY(0)';
    }, 100);
  }

  // Parallax effect for geometric shapes
  const geoBlocks = document.querySelectorAll('.geo-block');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    geoBlocks.forEach((block, index) => {
      const speed = 0.5 + (index * 0.1);
      const yPos = scrolled * speed;
      block.style.transform = `perspective(800px) rotateX(20deg) rotateY(-20deg) translateY(${-yPos * 0.1}px)`;
    });
  }, { passive: true });

  // Magnetic button effect
  const buttons = document.querySelectorAll('.btn-primary, .btn-outline');
  
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

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

  console.log('Diverg animations initialized');
})();
