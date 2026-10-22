/**
 * Glitch Text — テキストグリッチ演出（軽量版）
 * 使い方: <span data-glitch-text>テキスト</span>
 *   data-glitch-chars="!@#$%&*" (ランダム文字セット)
 *   data-glitch-speed="50" (ms/フレーム、デフォルト50)
 *   data-glitch-duration="300" (演出時間ms、デフォルト300)
 */
(function () {
  'use strict';
  var defaultChars = '!@#$%&*?/\\|<>{}[]~';
  function glitchElement(el) {
    var original = el.textContent;
    var chars = el.dataset.glitchChars || defaultChars;
    var speed = parseInt(el.dataset.glitchSpeed, 10) || 50;
    var duration = parseInt(el.dataset.glitchDuration, 10) || 300;
    var steps = Math.ceil(duration / speed);
    var step = 0;
    var timer = setInterval(function () {
      if (step >= steps) {
        el.textContent = original;
        clearInterval(timer);
        return;
      }
      var ratio = step / steps;
      var result = '';
      for (var i = 0; i < original.length; i++) {
        if (Math.random() > ratio) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        } else {
          result += original.charAt(i);
        }
      }
      el.textContent = result;
      step++;
    }, speed);
  }
  function init() {
    document.querySelectorAll('[data-glitch-text]').forEach(function (el) {
      glitchElement(el);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
