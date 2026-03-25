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

    // 1. Hide content immediately
    hideContent();

    // 2. Squish out
    runAnim('tv-out', 700).then(function () {

      // 3. Navigate â new page loads hidden
      window.location.href = href;
    });
  });

  const navEntry = performance.getEntriesByType('navigation')[0];
  const isNavigation = navEntry && navEntry.type === 'navigate';

  // Hide content straight away
  hideContent();

  if (isNavigation) {
    // Came via link â grow in, then reveal content when fully covering screen
    runAnim('tv-in', 700).then(function () {
      showContent();
      overlay.className = 'tv-overlay';
      busy = false;
    });
  } else {
    // Fresh load â shrink from full, then reveal
    runAnim('tv-pageload', 900).then(function () {
      showContent();
      overlay.className = 'tv-overlay';
      busy = false;
    });
  }
})();
