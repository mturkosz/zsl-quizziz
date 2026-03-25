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
    try { sessionStorage.setItem('tv-nav', '1'); } catch(ex) {}

    runAnim('tv-out', 700).then(function () {
      window.location.assign(href);
    });
  });

  function playEntrance() {
    var isNavigation = false;
    try {
      isNavigation = sessionStorage.getItem('tv-nav') === '1';
      sessionStorage.removeItem('tv-nav');
    } catch(ex) {}

    hideContent();

    overlay.className = 'tv-overlay';
    void overlay.offsetWidth;

    if (isNavigation) {
      // tv-in: grows to full (covers screen) â show content â overlay fades out
      // Show content at 75% of 900ms = ~675ms, when overlay fully covers screen
      runAnim('tv-in', 900).then(function () {
        overlay.className = 'tv-overlay';
        busy = false;
      });
      setTimeout(function () {
        showContent();
      }, 675);
    } else {
      // tv-pageload: content already visible, just shrink away
      showContent();
      runAnim('tv-pageload', 900).then(function () {
        overlay.className = 'tv-overlay';
        busy = false;
      });
    }
  }

  window.addEventListener('pageshow', function (e) {
    busy = false;
    if (e.persisted) {
      try { sessionStorage.setItem('tv-nav', '1'); } catch(ex) {}
    }
    playEntrance();
  });

})();
