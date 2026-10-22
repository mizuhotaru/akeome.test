/**
 * Typewriter — タイプライター演出（カーソル付き）
 * 使い方: <p data-typewriter>テキスト</p>
 *   data-typewriter-speed="60" (ms/文字、デフォルト60)
 *   data-typewriter-delay="500" (開始遅延ms)
 *   data-typewriter-cursor="▌" (カーソル文字、デフォルト▌)
 */
(function () {
  'use strict';
  var style = document.createElement('style');
  style.textContent =
    '.yacho-tw-cursor{animation:yacho-tw-blink 1s step-end infinite}' +
    '@keyframes yacho-tw-blink{50%{opacity:0}}';
  document.head.appendChild(style);
  function typeElement(el) {
    var text = el.textContent;
    var speed = parseInt(el.dataset.typewriterSpeed, 10) || 60;
    var delay = parseInt(el.dataset.typewriterDelay, 10) || 0;
    var cursorChar = el.dataset.typewriterCursor || '\u258C';
    var cursor = document.createElement('span');
    cursor.className = 'yacho-tw-cursor';
    cursor.textContent = cursorChar;
    el.textContent = '';
    el.appendChild(cursor);
    el.style.visibility = 'visible';
    var i = 0;
    setTimeout(function () {
      var timer = setInterval(function () {
        if (i < text.length) {
          cursor.before(text.charAt(i));
          i++;
        } else {
          clearInterval(timer);
          setTimeout(function () { cursor.remove(); }, 2000);
        }
      }, speed);
    }, delay);
  }
  function init() {
    document.querySelectorAll('[data-typewriter]').forEach(function (el) {
      el.style.visibility = 'hidden';
      typeElement(el);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
