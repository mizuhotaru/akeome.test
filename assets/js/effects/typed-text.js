/**
 * Typed Text — タイプライター演出
 * 使い方: <p data-typed>テキスト</p>
 *   data-typed-speed="80" (ms/文字、デフォルト40)
 *   data-typed-delay="1000" (開始遅延ms)
 */
(function () {
  'use strict';
  function typeElement(el) {
    var text = el.textContent, speed = parseInt(el.dataset.typedSpeed, 10) || 40;
    var delay = parseInt(el.dataset.typedDelay, 10) || 0, i = 0;
    el.textContent = ''; el.style.visibility = 'visible';
    setTimeout(function () {
      var timer = setInterval(function () {
        if (i < text.length) { el.textContent += text.charAt(i); i++; }
        else { clearInterval(timer); el.dataset.typedDone = 'true'; }
      }, speed);
    }, delay);
  }
  function init() {
    document.querySelectorAll('[data-typed]').forEach(function (el) {
      if (!el.dataset.typedDone) { el.style.visibility = 'hidden'; typeElement(el); }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
