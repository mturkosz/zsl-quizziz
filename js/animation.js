(function () {
  const overlay = document.createElement('div');
  overlay.className = 'tv-overlay';
  document.body.appendChild(overlay);

  function runAnim(cls, duration) {
    return new Promise(function (resolve) {
      overlay.className = 'tv-overlay ' + cls;
      setTimeout(resolve, duration);
    });
  }

  function hideContent() {
    document.body.classList.add('tv-content-hidden');
  }

  function showContent() {
    document.body.classList.remove('tv-content-hidden');
  }

  let busy = false;

  document.addEventListener('click', function (e) {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('javascript') || a.target === '_blank') return;
    if (href.includes('konkursFlagi1-quizz')) return;
    e.preventDefault();
    if (busy) return;
    busy = true;
    hideContent();
    runAnim('tv-out', 700).then(function () {
      window.location.href = href;
    });
  });

  const navEntry = performance.getEntriesByType('navigation')[0];
  const isNavigation = navEntry && navEntry.type === 'navigate';

  hideContent();

  if (isNavigation) {
    runAnim('tv-in', 700).then(function () {
      overlay.className = 'tv-overlay';
      showContent();
      busy = false;
    });
  } else {
    runAnim('tv-pageload', 900).then(function () {
      overlay.className = 'tv-overlay';
      showContent();
      busy = false;
    });
  }
})();
