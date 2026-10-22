/**
 * Hidden Message (Simple) — 隠しメッセージ（シンプル版）
 * 使い方: <span data-hidden>秘密のテキスト</span>
 *   data-hidden-reveal="hover" (表示条件: hover, click, select。デフォルトhover)
 *   data-hidden-style="blur" (隠し方: blur, blackout, invisible。デフォルトblur)
 */
(function () {
  'use strict';
  var style = document.createElement('style');
  style.textContent =
    '[data-hidden].yacho-hm-blur{filter:blur(5px);transition:filter .3s}' +
    '[data-hidden].yacho-hm-blur.revealed{filter:none}' +
    '[data-hidden].yacho-hm-blackout{background:#333;color:transparent;border-radius:2px;transition:all .3s}' +
    '[data-hidden].yacho-hm-blackout.revealed{background:transparent;color:inherit}' +
    '[data-hidden].yacho-hm-invisible{opacity:0;transition:opacity .5s}' +
    '[data-hidden].yacho-hm-invisible.revealed{opacity:1}';
  document.head.appendChild(style);
  function init() {
    document.querySelectorAll('[data-hidden]').forEach(function (el) {
      var reveal = el.dataset.hiddenReveal || 'hover';
      var hiddenStyle = el.dataset.hiddenStyle || 'blur';
      el.classList.add('yacho-hm-' + hiddenStyle);
      if (reveal === 'hover') {
        el.addEventListener('mouseenter', function () { el.classList.add('revealed'); });
        el.addEventListener('mouseleave', function () { el.classList.remove('revealed'); });
      } else if (reveal === 'click') {
        el.style.cursor = 'pointer';
        el.addEventListener('click', function () { el.classList.toggle('revealed'); });
      } else if (reveal === 'select') {
        el.addEventListener('mousedown', function () { el.classList.add('revealed'); });
        el.addEventListener('mouseup', function () {
          setTimeout(function () { el.classList.remove('revealed'); }, 2000);
        });
      }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
