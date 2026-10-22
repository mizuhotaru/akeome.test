/**
 * Hidden Message — 隠しメッセージ演出
 * 使い方:
 *   <div data-hidden-trigger="click" data-hidden-count="5"><span data-hidden-message>秘密</span></div>
 *   <div data-hidden-trigger="keyword" data-hidden-keyword="open"><span data-hidden-message>解除</span></div>
 *   <div data-hidden-trigger="hold" data-hidden-hold="2000"><span data-hidden-message>長押し</span></div>
 */
(function () {
  'use strict';
  var style = document.createElement('style');
  style.textContent =
    '[data-hidden-message]{opacity:0;transition:opacity 1.5s ease;pointer-events:none;user-select:none}' +
    '[data-hidden-message].revealed{opacity:1;pointer-events:auto;user-select:auto}';
  document.head.appendChild(style);
  function reveal(c){c.querySelectorAll('[data-hidden-message]').forEach(function(el){el.classList.add('revealed');});}
  function init(){
    document.querySelectorAll('[data-hidden-trigger]').forEach(function(el){
      var t=el.dataset.hiddenTrigger;
      if(t==='click'){var need=parseInt(el.dataset.hiddenCount,10)||5,count=0;el.style.cursor='pointer';el.addEventListener('click',function(){if(++count>=need)reveal(el);});}
      else if(t==='keyword'){var kw=(el.dataset.hiddenKeyword||'').toLowerCase(),buf='';if(!kw)return;document.addEventListener('keydown',function(e){if(e.key.length===1){buf=(buf+e.key.toLowerCase()).slice(-kw.length);if(buf===kw)reveal(el);}});}
      else if(t==='hold'){var dur=parseInt(el.dataset.hiddenHold,10)||2000,timer;el.style.cursor='pointer';el.addEventListener('mousedown',function(){timer=setTimeout(function(){reveal(el);},dur);});el.addEventListener('mouseup',function(){clearTimeout(timer);});el.addEventListener('mouseleave',function(){clearTimeout(timer);});}
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
