// Year
document.getElementById('yr').textContent = new Date().getFullYear();

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => io.observe(el));

// Mobile nav
const toggle = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', false);
}));

// Project filter
const pills = document.querySelectorAll('.pill');
const cards = document.querySelectorAll('.proj-card');

pills.forEach(pill => {
  pill.addEventListener('click', () => {
    pills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    const f = pill.dataset.filter;
    cards.forEach(card => {
      const tags = card.dataset.tags || '';
      const show = f === 'all' || tags.includes(f);
      card.classList.toggle('hidden', !show);
    });
  });
});

// Active nav highlight on scroll
const sections = document.querySelectorAll('section[id], main[id]');
const navLinks = document.querySelectorAll('.nav a');
const scrollSpy = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active-link'));
      const link = document.querySelector(`.nav a[href="#${e.target.id}"]`);
      if (link) link.classList.add('active-link');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => scrollSpy.observe(s));