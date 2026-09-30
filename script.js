'use strict';
// Navigation remains usable as normal links when JavaScript is unavailable.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
  menuButton.querySelector('.menu-label').textContent = 'Menu';
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('is-open', !isOpen);
  menuButton.querySelector('.menu-label').textContent = isOpen ? 'Menu' : 'Close';
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu(); menuButton.focus();
  }
});
window.matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);

// Keep the current section identified for visual and screen-reader navigation.
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navigation.querySelectorAll('a').forEach(link => {
        if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, {rootMargin: '-18% 0px -55% 0px', threshold: 0});
  document.querySelectorAll('main section[id]:not(#contributions), .contributions-block[id]').forEach(el => sectionObserver.observe(el));
}

// Native dialog supplies modal semantics, focus containment and Escape support.
const photos = [...document.querySelectorAll('.gallery-link')];
const dialog = document.querySelector('.lightbox');
const displayImage = document.querySelector('#lightbox-image');
const caption = document.querySelector('#photo-caption');
const counter = document.querySelector('#photo-count');
let currentPhoto = 0;
let activePhotos = photos;
let lastTrigger;
function showPhoto(index) {
  currentPhoto = (index + activePhotos.length) % activePhotos.length;
  const photo = activePhotos[currentPhoto];
  displayImage.src = photo.href;
  displayImage.alt = photo.dataset.alt;
  caption.textContent = photo.dataset.caption;
  counter.textContent = `${currentPhoto + 1} / ${activePhotos.length}`;
}
photos.forEach((photo, index) => {
  photo.addEventListener('click', event => {
    if (typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    lastTrigger = photo;
    const group = photo.dataset.gallery || photo.closest('[data-gallery]')?.dataset.gallery || 'nprs';
    activePhotos = photos.filter(item => (item.dataset.gallery || item.closest('[data-gallery]')?.dataset.gallery || 'nprs') === group);
    showPhoto(activePhotos.indexOf(photo));
    dialog.querySelector('.photo-prev').hidden = activePhotos.length < 2;
    dialog.querySelector('.photo-next').hidden = activePhotos.length < 2;
    dialog.classList.toggle('single-photo', activePhotos.length < 2);
    dialog.showModal();
    document.body.classList.add('modal-open');
    dialog.querySelector('.lightbox-close').focus();
  });
});
dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
dialog.querySelector('.photo-prev').addEventListener('click', () => showPhoto(currentPhoto - 1));
dialog.querySelector('.photo-next').addEventListener('click', () => showPhoto(currentPhoto + 1));
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') {event.preventDefault(); showPhoto(currentPhoto - 1);}
  if (event.key === 'ArrowRight') {event.preventDefault(); showPhoto(currentPhoto + 1);}
});
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  lastTrigger?.focus();
});
document.querySelector('#year').textContent = new Date().getFullYear();

// Contributions Interactive Filter Switcher
const filterButtons = document.querySelectorAll('.filter-tab-btn');
const deptBlock = document.querySelector('#department-contributions');
const univBlock = document.querySelector('#university-contributions');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const target = button.dataset.filter;
    filterButtons.forEach(btn => {
      const isActive = btn === button;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
    });

    if (deptBlock && univBlock) {
      deptBlock.classList.remove('is-hidden', 'is-fade-in');
      univBlock.classList.remove('is-hidden', 'is-fade-in');

      if (target === 'department') {
        univBlock.classList.add('is-hidden');
        deptBlock.classList.add('is-fade-in');
      } else if (target === 'university') {
        deptBlock.classList.add('is-hidden');
        univBlock.classList.add('is-fade-in');
      } else {
        deptBlock.classList.add('is-fade-in');
        univBlock.classList.add('is-fade-in');
      }
    }
  });
});

// Ensure target block is visible when clicked from header navigation
document.querySelectorAll('a[href^="#department-contributions"], a[href^="#university-contributions"]').forEach(link => {
  link.addEventListener('click', () => {
    const targetFilter = link.hash === '#department-contributions' ? 'department' : 'university';
    const activeBtn = document.querySelector('.filter-tab-btn.is-active');
    if (activeBtn && activeBtn.dataset.filter !== 'all' && activeBtn.dataset.filter !== targetFilter) {
      const matchingBtn = document.querySelector(`.filter-tab-btn[data-filter="${targetFilter}"]`) || document.querySelector('.filter-tab-btn[data-filter="all"]');
      matchingBtn?.click();
    }
  });
});
