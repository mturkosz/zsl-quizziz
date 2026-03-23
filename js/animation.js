document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.querySelector('.transition-overlay');
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        const href = link.getAttribute('href');
        if(href && !href.startsWith('#') && !href.startsWith('mailto:')) {
            link.addEventListener('click', e => {
                e.preventDefault();

                // uruchamiamy animację overlay po renderze
                requestAnimationFrame(() => {
                    overlay.classList.add('active');
                });

                setTimeout(() => {
                    window.location.href = href;
                }, 800); // czas dopasowany do transition w CSS
            });
        }
    });

    // reset overlay przy wejściu na stronę
    overlay.style.width = '0%';
    overlay.style.height = '4px';
});
