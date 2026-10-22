/**
 * Glitch Effect — グリッチ演出
 * 使い方: <h1 data-glitch>テキスト</h1>
 *   <body data-glitch-interval="8000" data-glitch-intensity="high">
 *   intensity: low / medium / high
 */
(function () {
  'use strict';
  var style = document.createElement('style');
  style.textContent =
    '@keyframes yacho-glitch-skew{0%{transform:skew(0)}20%{transform:skew(-2deg,1deg)}40%{transform:skew(3deg,-1deg)}60%{transform:skew(-1deg,2deg)}80%{transform:skew(2deg,-2deg)}100%{transform:skew(0)}}' +
    '@keyframes yacho-glitch-color{0%{text-shadow:none}25%{text-shadow:-2px 0 #f00,2px 0 #0ff}50%{text-shadow:2px 0 #f00,-2px 0 #0ff}75%{text-shadow:-1px 0 #0f0,1px 0 #f0f}100%{text-shadow:none}}' +
    '.yacho-glitching{animation:yacho-glitch-skew .3s ease-in-out}' +
    '[data-glitch].yacho-glitch-text{animation:yacho-glitch-color .3s ease-in-out}' +
    '.yacho-glitch-scanline{position:fixed;inset:0;pointer-events:none;z-index:99999;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.1) 2px,rgba(0,0,0,.1) 4px);opacity:0;transition:opacity .1s}' +
    '.yacho-glitch-scanline.active{opacity:1}';
  document.head.appendChild(style);
  var cfg = { low:{dur:150,scan:0.2}, medium:{dur:300,scan:0.5}, high:{dur:500,scan:0.8} };
  function trigger(c) {
    document.body.classList.add('yacho-glitching');
    setTimeout(function(){document.body.classList.remove('yacho-glitching');},c.dur);
    document.querySelectorAll('[data-glitch]').forEach(function(el){
      el.classList.add('yacho-glitch-text');
      setTimeout(function(){el.classList.remove('yacho-glitch-text');},c.dur);
    });
    if(Math.random()<c.scan){var s=document.querySelector('.yacho-glitch-scanline');if(s){s.classList.add('active');setTimeout(function(){s.classList.remove('active');},c.dur+200);}}
  }
  function init(){
    var interval=parseInt(document.body.dataset.glitchInterval,10)||5000;
    var c=cfg[document.body.dataset.glitchIntensity||'medium']||cfg.medium;
    var s=document.createElement('div');s.className='yacho-glitch-scanline';document.body.appendChild(s);
    (function loop(){setTimeout(function(){trigger(c);loop();},interval*(0.5+Math.random()));})();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
