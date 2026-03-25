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

    overlay.className = 'tv-overlay';
    void overlay.offsetWidth;

    if (isNavigation) {
      // tv-in: line → fullscreen → fade out
      // Show content at 825ms when overlay fully covers screen
      runAnim('tv-in', 1100).then(function () {
        overlay.className = 'tv-overlay';
        busy = false;
      });
      setTimeout(function () {
        showContent();
      }, 825);
    } else {
      // tv-pageload: thin line → grows to full → shrinks away
      // Show content at 440ms (40% of 1100ms) when overlay reaches fullscreen
      runAnim('tv-pageload', 1100).then(function () {
        overlay.className = 'tv-overlay';
        busy = false;
      });
      setTimeout(function () {
        showContent();
      }, 440);
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
