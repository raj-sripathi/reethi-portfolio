// Theme switcher
const themeSwitcher = document.getElementById('themeSwitcher');
const themeLabel = themeSwitcher.querySelector('.theme-label');
const savedTheme = localStorage.getItem('theme') || 'dark';

if (savedTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
  themeLabel.textContent = 'Dark';
}

themeSwitcher.addEventListener('click', () => {
  document.body.classList.add('theme-transitioning');
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';

  if (isLight) {
    document.documentElement.removeAttribute('data-theme');
    themeLabel.textContent = 'Light';
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeLabel.textContent = 'Dark';
    localStorage.setItem('theme', 'light');
  }

  setTimeout(() => document.body.classList.remove('theme-transitioning'), 400);
});

// Navigation scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  });
});

// Click-to-play YouTube thumbnails
document.querySelectorAll('.video-thumb').forEach(thumb => {
  thumb.addEventListener('click', () => {
    const videoId = thumb.dataset.id;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    iframe.setAttribute('allowfullscreen', '');
    thumb.innerHTML = '';
    thumb.style.cursor = 'default';
    thumb.appendChild(iframe);
  });
});

// Scroll-triggered fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Apply fade-in to section elements
document.querySelectorAll('.music-card, .about-content, .featured-video, .contact-heading, .social-links').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
