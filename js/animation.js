const swup = new Swup();

const overlay = document.querySelector('.transition-overlay');

// WYJŚCIE ZE STRONY
swup.hooks.on('visit:start', () => {
    overlay.classList.add('active');
});

// WEJŚCIE NA NOWĄ STRONĘ
swup.hooks.on('content:replace', () => {
    setTimeout(() => {
        overlay.classList.remove('active');
    }, 300);
});
