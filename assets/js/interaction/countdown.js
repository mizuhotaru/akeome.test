/**
 * Countdown Timer — カウントダウン演出
 * 使い方: <div data-countdown="2026-03-15T00:00:00">読み込み中...</div>
 *   data-countdown-format: full(default), days, clock, human
 *   data-countdown-expired="時は満ちた"
 *   data-countdown-redirect="/secret.html"
 */
(function () {
  'use strict';
  var pad=function(n){return n<10?'0'+n:''+n;};
  var fmt={
    full:function(s){var d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60),sec=s%60;return(d>0?d+'日 ':'')+pad(h)+':'+pad(m)+':'+pad(sec);},
    days:function(s){return''+Math.ceil(s/86400);},
    clock:function(s){return pad(Math.floor(s/3600))+':'+pad(Math.floor(s%3600/60))+':'+pad(s%60);},
    human:function(s){var d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60);return d>0?d+'日と'+h+'時間':h>0?h+'時間と'+m+'分':m+'分';}
  };
  function initEl(el){
    var target=new Date(el.dataset.countdown).getTime(),f=fmt[el.dataset.countdownFormat||'full']||fmt.full;
    var expired=el.dataset.countdownExpired||null,redir=el.dataset.countdownRedirect||null;
    (function tick(){var diff=Math.floor((target-Date.now())/1000);if(diff<=0){if(redir){location.href=redir;return;}el.textContent=expired||'00:00:00';return;}el.textContent=f(diff);setTimeout(tick,1000);})();
  }
  function init(){document.querySelectorAll('[data-countdown]').forEach(initEl);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
