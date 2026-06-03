const setupMobileMenu = () => {
  const menuButton = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  if (!menuButton || !navMenu) return;

  menuButton.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
};

const markActiveNavigation = () => {
  const currentPath = window.location.pathname;

  document.querySelectorAll('[data-nav-link]').forEach((link) => {
    const href = link.getAttribute('href');
    const isHome = href === '/' && currentPath === '/';
    const isSection = href !== '/' && currentPath.startsWith(href);

    if (isHome || isSection) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
};

const setupScrollReveal = () => {
  const elements = document.querySelectorAll('.scroll-reveal');

  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach((element) => observer.observe(element));
};

const setupContactForm = () => {
  const form = document.querySelector('[data-contact-form]');
  const message = document.querySelector('[data-form-message]');

  if (!form || !message) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.reset();
    message.classList.add('show');
  });
};

document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  markActiveNavigation();
  setupScrollReveal();
  setupContactForm();
});
