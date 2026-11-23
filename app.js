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

const layerState = { pen: true, sticker: true };
const compareButton = document.querySelector('#compare-toggle');
const demoStatus = document.querySelector('#demo-status');
function renderLayers() {
  document.querySelectorAll('[data-layer]').forEach(element => {
    const visible = layerState[element.dataset.layer];
    element.classList.toggle('is-hidden', !visible);
    element.setAttribute('aria-hidden', String(!visible));
  });
  document.querySelectorAll('[data-toggle-layer]').forEach(button => {
    button.setAttribute('aria-pressed', String(layerState[button.dataset.toggleLayer]));
  });
  const bare = !layerState.pen && !layerState.sticker;
  compareButton.setAttribute('aria-pressed', String(bare));
  compareButton.querySelector('span').textContent = bare ? '함께 꾸민 다이어리 보기' : '꾸미기 전 사진만 보기';
  demoStatus.textContent = bare ? '꾸미기 전 사진을 보고 있어요.' : `손글씨 ${layerState.pen ? '표시' : '숨김'}, 스티커 ${layerState.sticker ? '표시' : '숨김'} 상태예요.`;
}
document.querySelectorAll('[data-toggle-layer]').forEach(button => {
  button.addEventListener('click', () => {
    layerState[button.dataset.toggleLayer] = !layerState[button.dataset.toggleLayer];
    renderLayers();
  });
});
compareButton?.addEventListener('click', () => {
  const showAll = !layerState.pen && !layerState.sticker;
  layerState.pen = showAll;
  layerState.sticker = showAll;
  renderLayers();
});

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
