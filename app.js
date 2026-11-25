'use strict';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '메뉴 열기');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => {
  if (!event.target.closest('.header-inner')) closeMenu();
});
window.matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);

// A short, finite illustration. Reduced motion always shows the finished page.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const decorations = [...document.querySelectorAll('.hero-decoration')];
let animationTimers = [];
function finishAnimation() {
  animationTimers.forEach(clearTimeout);
  animationTimers = [];
  decorations.forEach(element => element.classList.remove('waiting'));
}
function playIllustration() {
  finishAnimation();
  if (reducedMotion.matches) return;
  decorations.forEach(element => element.classList.add('waiting'));
  decorations.forEach((element, index) => {
    animationTimers.push(setTimeout(() => element.classList.remove('waiting'), 500 + index * 650));
  });
}
document.querySelector('#hero-replay')?.addEventListener('click', playIllustration);
reducedMotion.addEventListener('change', finishAnimation);
playIllustration();

// The GIF starts only on request, and a still frame provides a real stop state.
const motionImage = document.querySelector('#motion-sticker');
const motionButton = document.querySelector('#motion-toggle');
function setStickerMotion(playing) {
  if (!motionImage || !motionButton) return;
  motionImage.src = playing ? motionImage.dataset.motionSrc : motionImage.dataset.stillSrc;
  motionButton.setAttribute('aria-pressed', String(playing));
  motionButton.textContent = playing ? '움직임 정지' : '움직임 재생';
  document.querySelector('#motion-status').textContent = playing ? '동적 스티커를 재생하고 있어요.' : '동적 스티커가 정지됐어요.';
}
motionButton?.addEventListener('click', () => {
  setStickerMotion(motionButton.getAttribute('aria-pressed') !== 'true');
});
reducedMotion.addEventListener('change', () => setStickerMotion(false));

const promoVideo = document.querySelector('#promo-video');
const promoToggle = document.querySelector('#promo-toggle');
const promoStatus = document.querySelector('#promo-status');
if (promoVideo && promoToggle && promoStatus) {
  promoToggle.addEventListener('click', async () => {
    if (!promoVideo.paused) { promoVideo.pause(); return; }
    promoToggle.disabled = true;
    promoStatus.textContent = '영상을 불러오고 있어요.';
    try { await promoVideo.play(); }
    catch { promoStatus.textContent = '영상을 재생하지 못했어요. 다시 누르거나 새 창에서 열어주세요.'; }
    finally { promoToggle.disabled = false; }
  });
  promoVideo.addEventListener('play', () => {
    promoToggle.textContent = '일시정지';
    promoStatus.textContent = '';
  });
  promoVideo.addEventListener('pause', () => { promoToggle.textContent = '영상 재생'; });
  promoVideo.addEventListener('ended', () => { promoToggle.textContent = '다시 재생'; });
  promoVideo.addEventListener('error', () => {
    promoStatus.textContent = '영상을 불러오지 못했어요. 새 창에서 열어주세요.';
  });
}

const dialog = document.querySelector('#screenshot-dialog');
const dialogImage = document.querySelector('#screenshot-image');
document.querySelectorAll('[data-screenshot]').forEach(button => {
  button.addEventListener('click', () => {
    dialogImage.src = button.dataset.screenshot;
    dialogImage.alt = button.querySelector('img').alt;
    document.querySelector('#screenshot-caption').textContent = button.dataset.caption;
    dialog.showModal();
    document.body.classList.add('modal-open');
  });
});
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
document.querySelector('#year').textContent = new Date().getFullYear();

// Current-page navigation is rendered in each HTML file, including without JS.
// Keep old shared links useful after splitting the original single-page site.
if (document.body.dataset.page === 'index') {
  const oldSections = { '#about': 'about.html', '#features': 'features.html', '#how': 'guide.html', '#story': 'brand.html', '#experience': 'features.html#experience' };
  if (oldSections[window.location.hash]) window.location.replace(oldSections[window.location.hash]);
}

