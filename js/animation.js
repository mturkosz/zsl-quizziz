(function () {
  const overlay = document.createElement('div');
  overlay.id = 'tv-overlay';
  overlay.style.cssText = [
    'position:fixed', 'inset:0', 'z-index:99999',
    'background:#c8e4ff', 'pointer-events:none',
    'opacity:0', 'transform:scaleX(1) scaleY(1)',
    'transform-origin:center center', 'will-change:transform,opacity'
  ].join(';');
  document.body.appendChild(overlay);

  function animate(props, duration, easing) {
    return new Promise(function (resolve) {
      var keys = Object.keys(props);
      overlay.style.transition = keys.join(', ') + ' ' + duration + 'ms ' + easing;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          keys.forEach(function (k) { overlay.style[k] = props[k]; });
          setTimeout(resolve, duration);
        });
      });
    });
  }

  function instant(props) {
    overlay.style.transition = 'none';
    requestAnimationFrame(function () {
      Object.keys(props).forEach(function (k) { overlay.style[k] = props[k]; });
    });
  }

  async function tvOff() {
    instant({ opacity: '1', transform: 'scaleX(1) scaleY(1)' });
    await new Promise(function (r) { setTimeout(r, 20); });
    await animate({ transform: 'scaleX(1) scaleY(0.015)' }, 520, 'cubic-bezier(0.7,0,0.3,1)');
    await animate({ transform: 'scaleX(0.015) scaleY(0.015)' }, 420, 'cubic-bezier(0.7,0,1,1)');
    await animate({ opacity: '0' }, 120, 'ease');
    instant({ transform: 'scaleX(1) scaleY(1)' });
  }

  async function tvOn() {
    instant({ opacity: '1', transform: 'scaleX(0.015) scaleY(0.015)' });
    await new Promise(function (r) { setTimeout(r, 40); });
    await animate({ transform: 'scaleX(1) scaleY(0.015)' }, 420, 'cubic-bezier(0,0,0.3,1)');
    await animate({ transform: 'scaleX(1) scaleY(1)' }, 520, 'cubic-bezier(0.7,0,0.3,1)');
    await animate({ opacity: '0' }, 200, 'ease');
    instant({ transform: 'scaleX(1) scaleY(1)' });
  }

  // Intercept all link clicks
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('javascript') || a.target === '_blank') return;
    e.preventDefault();
    tvOff().then(function () { window.location.href = href; });
  });

  // Page load intro
  tvOn();
})();
