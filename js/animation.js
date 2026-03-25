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

  // Outgoing click handler
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

    var animCls = isNavigation ? 'tv-in' : 'tv-pageload';
    var dur = 900;

    // Force a reflow so the class change is picked up fresh
    overlay.className = 'tv-overlay';
    void overlay.offsetWidth;

    runAnim(animCls, dur).then(function () {
      showContent();
      overlay.className = 'tv-overlay';
      busy = false;
    });
  }

  // pageshow fires on every navigation including bfcache in ALL browsers
  window.addEventListener('pageshow', function (e) {
    busy = false;
    if (e.persisted) {
      // bfcache restore â mark as navigation so tv-in plays
      try { sessionStorage.setItem('tv-nav', '1'); } catch(ex) {}
    }
    playEntrance();
  });

})();
