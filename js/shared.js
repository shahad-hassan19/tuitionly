AOS.init({ duration: 800, once: true, offset: 80, easing: 'ease-out-cubic' });

const nav = document.getElementById('main-nav');
const navLogo = document.querySelector('.nav-logo');
const navLinks = document.querySelectorAll('.nav-link');
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => nav.classList.add('scrollable-nav'), { once: true });
window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  if (sy > 100) {
    nav.classList.add('scrolled');
    navLogo.style.color = '#0F2B36';
    navLinks.forEach(l => { l.style.color = 'rgba(15,43,54,0.7)'; });
  } else {
    nav.classList.remove('scrolled');
    navLogo.style.color = '#fff';
    navLinks.forEach(l => { l.style.color = 'rgba(255,255,255,0.7)'; });
  }
  if (sy > 200 && sy > lastScrollY) {
    nav.classList.add('nav-hidden');
  } else {
    nav.classList.remove('nav-hidden');
  }
  lastScrollY = sy;
});

const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.innerHTML = `&copy; ${new Date().getFullYear()} Tuitionly. Learning made simple.`;

const mobileToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener('click', () => {
    const isOpen = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.classList.toggle('scale-y-0');
    mobileMenu.classList.toggle('opacity-0');
    mobileMenu.classList.toggle('pointer-events-none');
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.add('scale-y-0', 'opacity-0', 'pointer-events-none');
    });
  });
}
