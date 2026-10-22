/**
 * Fade In — スクロールフェードイン演出
 * 使い方: <div data-fade-in>コンテンツ</div>
 *   data-fade-in="up" (方向: up, down, left, right。デフォルトup)
 *   data-fade-delay="200" (遅延ms)
 *   data-fade-duration="600" (アニメーション時間ms、デフォルト600)
 */
(function () {
  'use strict';
  var style = document.createElement('style');
  style.textContent =
    '[data-fade-in]{opacity:0;transition-property:opacity,transform;transition-timing-function:ease-out}' +
    '[data-fade-in].yacho-visible{opacity:1;transform:none!important}';
  document.head.appendChild(style);
  var transforms = {
    up: 'translateY(30px)',
    down: 'translateY(-30px)',
    left: 'translateX(30px)',
    right: 'translateX(-30px)',
  };
  function init() {
    var elements = document.querySelectorAll('[data-fade-in]');
    elements.forEach(function (el) {
      var dir = el.dataset.fadeIn || 'up';
      var duration = parseInt(el.dataset.fadeDuration, 10) || 600;
      var delay = parseInt(el.dataset.fadeDelay, 10) || 0;
      el.style.transitionDuration = duration + 'ms';
      el.style.transitionDelay = delay + 'ms';
      el.style.transform = transforms[dir] || transforms.up;
    });
    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (el) { el.classList.add('yacho-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('yacho-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    elements.forEach(function (el) { observer.observe(el); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
