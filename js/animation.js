document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.querySelector('.transition-overlay');
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        const href = link.getAttribute('href');
        if(href && !href.startsWith('#') && !href.startsWith('mailto:')) {
            link.addEventListener('click', e => {
                e.preventDefault();

                // od razu aktywujemy transform
                overlay.classList.add('active');

                // przejście po animacji
                setTimeout(() => {
                    window.location.href = href;
                }, 500); // czas taki jak w transition
            });
        }
    });

    // opcjonalna animacja startowa przy wejściu na stronę
    setTimeout(() => {
        overlay.classList.add('active');
        setTimeout(() => overlay.classList.remove('active'), 500);
    }, 100);
});
