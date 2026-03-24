(function () {
  const rect = document.createElement('div');
  rect.style.cssText = [
    'position:fixed', 'inset:0', 'z-index:99999',
    'background:radial-gradient(ellipse at center, #1e3460 0%, #14213d 100%)',
    'pointer-events:none',
    'transform:scaleX(1) scaleY(1)',
    'transform-origin:center center',
    'will-change:transform',
    'border-radius:3px'
  ].join(';');
  document.body.appendChild(rect);

  function setInstant(transform) {
    rect.style.transition = 'none';
    requestAnimationFrame(() => rect.style.transform = transform);
  }

  function anim(transform, duration, easing) {
    return new Promise(function (resolve) {
      rect.style.transition = 'transform ' + duration + 'ms ' + easing;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          rect.style.transform = transform;
          setTimeout(resolve, duration);
        });
      });
    });
  }

  let busy = false;

  async function tvTransition(navigate) {
    setInstant('scaleX(0.45) scaleY(0.03)');
    await new Promise(r => setTimeout(r, 20));
    await anim('scaleX(1) scaleY(1)', 500, 'cubic-bezier(0.2, 0, 0.2, 1)');
    navigate();
    await anim('scaleX(0) scaleY(0)', 550, 'cubic-bezier(0.5, 0, 0.8, 1)');
  }

  document.addEventListener('click', function (e) {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('javascript') || a.target === '_blank') return;
    e.preventDefault();
    if (busy) return;
    busy = true;
    tvTransition(function () {
      window.location.href = href;
    }).then(function () { busy = false; });
  });

  // Page load: fullscreen â shrinks to nothing
  (async function () {
    setInstant('scaleX(1) scaleY(1)');
    await new Promise(r => setTimeout(r, 100));
    await anim('scaleX(0) scaleY(0)', 600, 'cubic-bezier(0.5, 0, 0.8, 1)');
  })();
})();
