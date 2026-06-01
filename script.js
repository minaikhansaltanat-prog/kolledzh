'use strict';

/* ============================================
   КММТ — Premium Script
   IntersectionObserver-only · No scroll listeners
   ============================================ */

// ===== LANGUAGE SYSTEM =====
let currentLang = localStorage.getItem('kmmt_lang') || 'ru';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('kmmt_lang', lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-ru]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (!text) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = text;
    } else {
      el.innerHTML = text;
    }
  });

  document.querySelectorAll('[data-ru-placeholder]').forEach(el => {
    const key = 'data-' + lang + '-placeholder';
    if (el.hasAttribute(key)) el.placeholder = el.getAttribute(key);
  });

  document.querySelectorAll('select option[data-ru]').forEach(opt => {
    const text = opt.getAttribute('data-' + lang);
    if (text) opt.textContent = text;
  });

  document.querySelectorAll('.lang-btn, .drawer-lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

document.querySelectorAll('.lang-btn, .drawer-lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});
applyLang(currentLang);


// ===== HEADER — IntersectionObserver sentinel =====
const header = document.getElementById('header');
const sentinel = document.createElement('div');
sentinel.style.cssText = 'position:absolute;top:80px;height:1px;width:1px;pointer-events:none;';
document.body.prepend(sentinel);

new IntersectionObserver(([entry]) => {
  header.classList.toggle('scrolled', !entry.isIntersecting);
}).observe(sentinel);


// ===== MOBILE DRAWER =====
const burger         = document.getElementById('burger');
const mobileDrawer   = document.getElementById('mobileDrawer');
const drawerBackdrop = document.getElementById('drawerBackdrop');
const drawerClose    = document.getElementById('drawerClose');

if (mobileDrawer && burger) {

  function openDrawer() {
    burger.classList.add('open');
    mobileDrawer.classList.add('open');
    if (drawerBackdrop) drawerBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    burger.classList.remove('open');
    mobileDrawer.classList.remove('open');
    if (drawerBackdrop) drawerBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => {
    mobileDrawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });
  drawerClose?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);
  mobileDrawer.querySelectorAll('.drawer-link').forEach(l => l.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
}


// ===== FLOATING CTA — IntersectionObserver on hero =====
const floatingCta = document.getElementById('floatingCta');
const heroSection = document.getElementById('home');

if (heroSection && floatingCta) {
  new IntersectionObserver(([entry]) => {
    floatingCta.classList.toggle('visible', !entry.isIntersecting);
  }, { threshold: 0.1 }).observe(heroSection);
}


// ===== COUNTER ANIMATION for hero stats =====
function animateCounter(el, target, suffix = '', duration = 1400) {
  const isFloat = target % 1 !== 0;
  const start = performance.now();
  const startVal = 0;

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out-expo
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current = startVal + (target - startVal) * eased;
    el.textContent = (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Trigger counters when stats become visible
const statsShell = document.querySelector('.hero__stats-shell');
if (statsShell) {
  let counted = false;
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !counted) {
      counted = true;
      const counters = [
        { selector: '.hero__stat:nth-child(1) .hero__stat-num', value: 25, suffix: '+' },
        { selector: '.hero__stat:nth-child(2) .hero__stat-num', value: 3,  suffix: '' },
        { selector: '.hero__stat:nth-child(3) .hero__stat-num', value: 87, suffix: '%' },
        { selector: '.hero__stat:nth-child(4) .hero__stat-num', value: 3,  suffix: '' },
      ];
      counters.forEach(({ selector, value, suffix }, i) => {
        const el = document.querySelector(selector);
        if (el) setTimeout(() => animateCounter(el, value, suffix), i * 150);
      });
    }
  }, { threshold: 0.5 }).observe(statsShell);
}


// ===== SCROLL REVEALS — IntersectionObserver only =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.10, rootMargin: '0px 0px -24px 0px' });

function addFadeUp(selector, baseDelay = 0, stagger = 60) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('fade-up');
    // Emil: stagger 30-80ms between items, not 90+
    el.style.transitionDelay = (baseDelay + i * stagger) + 'ms';
    revealObserver.observe(el);
  });
}

// Emil: section labels get clip-path reveal (wired via CSS class)
const labelObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      labelObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.section-label').forEach(el => labelObserver.observe(el));

addFadeUp('.program-card-shell', 0, 60);
addFadeUp('.journey__step', 0, 55);
addFadeUp('.intl__card-shell', 0, 55);
addFadeUp('.lang__card', 0, 55);
addFadeUp('.partner-logo', 0, 32);
addFadeUp('.parents__card-shell', 0, 55);
addFadeUp('.problem__card', 0, 80);
addFadeUp('.review-card', 0, 45);


// ===== GALLERY CAROUSEL =====
function createCarousel(carouselId, prevId, nextId, dotsId) {
  const track = document.getElementById(carouselId);
  if (!track) return;
  const slides = Array.from(track.children);
  if (!slides.length) return;

  let current = 0;

  function getSlideWidth() {
    const gap = parseInt(getComputedStyle(track).gap) || 20;
    return slides[0].offsetWidth + gap;
  }
  function getVisible() {
    return Math.max(1, Math.round(track.parentElement.offsetWidth / getSlideWidth()));
  }
  function maxIndex() {
    return Math.max(0, slides.length - getVisible());
  }
  function go(idx) {
    current = Math.max(0, Math.min(idx, maxIndex()));
    track.style.transform = `translateX(-${current * getSlideWidth()}px)`;
    track.style.transition = `transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)`;
    if (dotsId) {
      document.querySelectorAll(`#${dotsId} .carousel-dot`)
        .forEach((d, i) => d.classList.toggle('active', i === current));
    }
  }

  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);
  if (prevBtn) prevBtn.addEventListener('click', () => go(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => go(current + 1));

  if (dotsId) {
    const dotsContainer = document.getElementById(dotsId);
    if (dotsContainer) {
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dot.addEventListener('click', () => go(i));
        dotsContainer.appendChild(dot);
      });
    }
  }

  // Touch support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx < -44) go(current + 1);
    else if (dx > 44) go(current - 1);
  });

  window.addEventListener('resize', () => go(Math.min(current, maxIndex())));
  go(0);
}

createCarousel('galleryCarousel', 'galleryPrev', 'galleryNext', 'galleryDots');


// ===== REVIEW CAROUSELS (data-carousel buttons) =====
const reviewTracks = {};
['videoCarousel', 'textCarousel', 'audioCarousel', 'gisCarousel'].forEach(id => {
  const track = document.getElementById(id);
  if (!track) return;
  reviewTracks[id] = { offset: 0 };
  track._offset = 0;

  // Touch
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    const gap  = parseInt(getComputedStyle(track).gap) || 20;
    const slideW = track.children[0]?.offsetWidth + gap || 380;
    const maxOff = Math.max(0, (track.children.length - 1) * slideW);
    if (dx < -44) track._offset = Math.max(-maxOff, track._offset - slideW);
    if (dx > 44)  track._offset = Math.min(0, track._offset + slideW);
    track.style.transform = `translateX(${track._offset}px)`;
    track.style.transition = `transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)`;
  });
});

document.querySelectorAll('.carousel-btn[data-carousel]').forEach(btn => {
  btn.addEventListener('click', () => {
    const trackId = btn.dataset.carousel;
    const track = document.getElementById(trackId);
    if (!track) return;
    const gap    = parseInt(getComputedStyle(track).gap) || 20;
    const slideW = track.children[0]?.offsetWidth + gap || 380;
    const maxOff = Math.max(0, (track.children.length - 1) * slideW);
    if (!track._offset) track._offset = 0;
    if (btn.classList.contains('carousel-btn--prev')) {
      track._offset = Math.min(0, track._offset + slideW);
    } else {
      track._offset = Math.max(-maxOff, track._offset - slideW);
    }
    track.style.transform = `translateX(${track._offset}px)`;
    track.style.transition = `transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)`;
  });
});


// ===== REVIEWS TABS =====
document.querySelectorAll('.reviews__tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.reviews__tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.reviews__panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById('tab-' + tab.dataset.tab);
    if (panel) panel.classList.add('active');
  });
});


// ===== FORM SUBMIT — WhatsApp redirect with validation =====
const form         = document.getElementById('ctaForm');
const modal        = document.getElementById('successModal');
const modalClose   = document.getElementById('modalClose');
const modalOverlay = document.getElementById('modalOverlay');

const WA_NUMBER = '77711681900';

function showFieldError(el) {
  el.style.border    = '1.5px solid rgba(255, 80, 80, 0.80)';
  el.style.boxShadow = '0 0 0 3px rgba(255, 80, 80, 0.15)';
  const clear = () => { el.style.border = ''; el.style.boxShadow = ''; };
  el.addEventListener('input',  clear, { once: true });
  el.addEventListener('change', clear, { once: true });
}

if (form) {
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const nameInput  = form.querySelector('input[type="text"]');
    const phoneInput = form.querySelector('input[type="tel"]');
    const dirSelect  = form.querySelector('select');

    const name      = nameInput?.value.trim()  || '';
    const phone     = phoneInput?.value.trim() || '';
    const direction = dirSelect?.value         || '';

    // Validation
    let valid = true;
    if (!name) {
      showFieldError(nameInput);
      valid = false;
    }
    if (!phone || phone.includes('_') || phone.replace(/\D/g, '').length < 7) {
      showFieldError(phoneInput);
      valid = false;
    }
    if (!direction) {
      showFieldError(dirSelect);
      valid = false;
    }
    if (!valid) return;

    // Direction labels
    const dirLabels = {
      'it':         'IT & Разработка',
      'management': 'Туризм & Менеджмент',
      'accounting': 'Бухгалтерский учёт',
      'personal':   'Личный вопрос',
    };
    const dirText = dirLabels[direction] || direction;

    // Message
    const message = `Саламатсыз бе! 🎓\n\nАты: ${name}\nБайланыс номері: ${phone}\nБағыты: ${dirText}\n\nКонсультация алғым келеді.`;
    const waURL   = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

    // Loading state
    const origText = submitBtn.textContent;
    submitBtn.textContent = 'Жіберілуде...';
    submitBtn.disabled    = true;
    submitBtn.style.opacity = '0.8';

    setTimeout(() => {
      window.open(waURL, '_blank');
      modal.classList.add('open');
      form.reset();

      // Success state
      submitBtn.disabled        = false;
      submitBtn.style.opacity   = '';
      submitBtn.textContent     = '✓ WhatsApp ашылды';
      submitBtn.style.background = 'rgba(34, 197, 94, 0.85)';

      setTimeout(() => {
        submitBtn.textContent      = origText;
        submitBtn.style.background = '';
      }, 3000);
    }, 600);
  });
}
function closeModal() { modal?.classList.remove('open'); }
modalClose?.addEventListener('click', closeModal);
modalOverlay?.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });


// ===== PROGRAM MODALS =====
const MODAL_MAP = {
  'it':         'prog-modal-it',
  'tourism':    'prog-modal-tourism',
  'accounting': 'prog-modal-accounting',
};

let activeProgModal = null;

function openProgModal(key) {
  const id = MODAL_MAP[key];
  if (!id) return;
  const modal = document.getElementById(id);
  if (!modal) return;

  // Close any open modal first
  if (activeProgModal && activeProgModal !== modal) closeProgModal(activeProgModal);

  activeProgModal = modal;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Apply current language to new modal content
  applyLang(currentLang);

  // Focus close button for accessibility
  const closeBtn = modal.querySelector('.prog-modal__close');
  if (closeBtn) setTimeout(() => closeBtn.focus(), 300);
}

function closeProgModal(modal) {
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
  activeProgModal = null;
}

// Open triggers — card buttons
document.querySelectorAll('.prog-open-btn').forEach(btn => {
  btn.addEventListener('click', () => openProgModal(btn.dataset.modal));
});

// Close via X button
document.querySelectorAll('.prog-modal__close').forEach(btn => {
  btn.addEventListener('click', () => closeProgModal(btn.closest('.prog-modal')));
});

// Close via overlay click
document.querySelectorAll('.prog-modal__overlay').forEach(overlay => {
  overlay.addEventListener('click', () => closeProgModal(overlay.closest('.prog-modal')));
});

// ESC key closes modal (added to existing ESC listener below)
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && activeProgModal) closeProgModal(activeProgModal);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// ===== AUDIO PLAY TOGGLE =====
document.querySelectorAll('.audio-play-btn').forEach(btn => {
  let playing = false;
  btn.addEventListener('click', () => {
    playing = !playing;
    const bars = btn.nextElementSibling?.querySelectorAll('.audio-bar');
    bars?.forEach(bar => {
      bar.style.animationPlayState = playing ? 'running' : 'paused';
    });
    btn.textContent = playing ? '⏸' : '▶';
  });
  // Start paused
  btn.nextElementSibling?.querySelectorAll('.audio-bar')
    .forEach(bar => { bar.style.animationPlayState = 'paused'; });
});
