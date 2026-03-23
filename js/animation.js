const swup = new Swup();
const overlay = document.querySelector('.transition-overlay');

swup.hooks.on('visit:start', () => {
    overlay.classList.add('active');

    setTimeout(() => {
        overlay.classList.add('expand');
    }, 300);
});

swup.hooks.on('content:replace', () => {
    setTimeout(() => {
        overlay.classList.remove('active', 'expand');
    }, 300);
});
