// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('diverg-theme');
if (savedTheme === 'light') html.setAttribute('data-theme', 'light');

themeToggle.addEventListener('click', () => {
  if (html.getAttribute('data-theme') === 'light') {
    html.removeAttribute('data-theme');
    localStorage.removeItem('diverg-theme');
  } else {
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('diverg-theme', 'light');
  }
});

// Mobile menu
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const docsSidebar = document.getElementById('docsSidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function toggleSidebar() {
  docsSidebar.classList.toggle('open');
  sidebarOverlay.classList.toggle('open');
}

mobileMenuToggle.addEventListener('click', toggleSidebar);
sidebarOverlay.addEventListener('click', toggleSidebar);
