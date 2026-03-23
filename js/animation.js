document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.querySelector('.transition-overlay');
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        const href = link.getAttribute('href');
        if(href && !href.startsWith('#') && !href.startsWith('mailto:')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                overlay.classList.add('active'); // start animacji

                setTimeout(() => {
                    window.location.href = href;
                }, 800); // czas animacji (szerokość + wysokość)
            });
        }
    });

    // reset overlay przy wejściu na nową stronę
    overlay.style.width = '0%';
    overlay.style.height = '4px';
});
