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
