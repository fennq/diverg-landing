const nav = document.getElementById('nav');

function updateNav() {
  // Always show nav background on inner pages (no .hero element).
  // On homepage, only show it after scrolling past the hero.
  if (window.scrollY > 40 || !document.querySelector('.hero')) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

updateNav(); // apply immediately on page load
window.addEventListener('scroll', updateNav, { passive: true });

/* Homepage hero: copy pip install command */
(function () {
  const btn = document.getElementById('hero-copy-pip');
  if (!btn || !navigator.clipboard) return;
  btn.addEventListener('click', async () => {
    const text = btn.getAttribute('data-copy') || '';
    try {
      await navigator.clipboard.writeText(text);
      const label = btn.querySelector('.hero-pip-text');
      const prev = label ? label.textContent : '';
      if (label) label.textContent = 'Copied';
      btn.classList.add('hero-pip-pill--copied');
      setTimeout(() => {
        if (label) label.textContent = prev;
        btn.classList.remove('hero-pip-pill--copied');
      }, 1600);
    } catch (_) {}
  });
})();
