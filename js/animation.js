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

  var busy = false;

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('javascript') || a.target === '_blank') return;
    if (href.includes('konkursFlagi1-quizz')) return;
    e.preventDefault();
    if (busy) return;
    busy = true;

    hideContent();
    try { sessionStorage.setItem('tv-nav', '1'); } catch(e) {}

    runAnim('tv-out', 700).then(function () {
      window.location.href = href;
    });
  });

  function init() {
    var isNavigation = false;
    try {
      isNavigation = sessionStorage.getItem('tv-nav') === '1';
      sessionStorage.removeItem('tv-nav');
    } catch(e) {}

    hideContent();

    if (isNavigation) {
      runAnim('tv-in', 900).then(function () {
        showContent();
        overlay.className = 'tv-overlay';
        busy = false;
      });
    } else {
      runAnim('tv-pageload', 900).then(function () {
        showContent();
        overlay.className = 'tv-overlay';
        busy = false;
      });
    }
  }

  // Handle bfcache restore (Chrome/Edge)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      // Page restored from bfcache â reset and play tv-in
      busy = false;
      try { sessionStorage.setItem('tv-nav', '1'); } catch(e) {}
      init();
    }
  });

  init();
})();
