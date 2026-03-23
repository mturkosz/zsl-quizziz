document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.querySelector('.transition-overlay');
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        const href = link.getAttribute('href');
        if(href && !href.startsWith('#') && !href.startsWith('mailto:')) {
            link.addEventListener('click', e => {
                e.preventDefault();

                // overlay natychmiast aktywny
                overlay.classList.add('active');

                // po animacji przechodzimy do nowej strony
                setTimeout(() => {
                    window.location.href = href;
                }, 400); // czas taki jak w CSS transition
            });
        }
    });
});
