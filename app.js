const yearEl = document.querySelector('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i * 60, 260)}ms`;
  observer.observe(el);
});

const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

menuBtn?.addEventListener('click', () => {
  const open = nav?.classList.contains('open');
  if (!open) {
    nav?.classList.add('open');
    nav.style.display = 'grid';
    nav.style.position = 'fixed';
    nav.style.top = '72px';
    nav.style.left = '0';
    nav.style.right = '0';
    nav.style.background = 'rgba(8, 18, 36, 0.98)';
    nav.style.padding = '1rem';
    nav.style.gridTemplateColumns = '1fr';
    nav.style.gap = '0.9rem';
    nav.style.justifyItems = 'center';
    nav.style.borderBottom = '1px solid rgba(110, 145, 235, 0.35)';
    menuBtn.setAttribute('aria-expanded', 'true');
  } else {
    nav.classList.remove('open');
    nav.style.display = 'none';
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => {
    if (nav?.classList.contains('open')) {
      nav.classList.remove('open');
      nav.style.display = 'none';
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
});

const filterButtons = document.querySelectorAll('.filter-pill');
const projects = document.querySelectorAll('.project-card');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const tag = btn.dataset.tag;
    filterButtons.forEach((b) => {
      b.classList.toggle('active', b === btn);
      b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
    });

    projects.forEach((card) => {
      const tags = card.dataset.tags?.split(' ') || [];
      card.classList.toggle('hidden', tag !== 'all' && !tags.includes(tag));
    });
  });
});
