(function () {
  var overlay = document.createElement('div');
  overlay.className = 'tv-overlay';
  document.body.appendChild(overlay);

  function runAnim(cls, duration) {
    return new Promise(function (resolve) {
      overlay.className = 'tv-overlay';
      void overlay.offsetWidth;
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

    runAnim('tv-out', 900).then(function () {
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

    // tv-in total: 1600ms
    // overlay reaches 100% width+height at 80% = 1280ms
    // show content slightly after — at 1380ms to be safe
    runAnim('tv-in', 1600).then(function () {
      overlay.className = 'tv-overlay';
      busy = false;
    });
    setTimeout(function () {
      showContent();
    }, 1380);
  }

  window.addEventListener('pageshow', function (e) {
    busy = false;
    if (e.persisted) {
      try { sessionStorage.setItem('tv-nav', '1'); } catch(ex) {}
    }
    playEntrance();
  });

})();
