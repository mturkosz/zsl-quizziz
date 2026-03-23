document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.querySelector('.transition-overlay');
    const links = document.querySelectorAll('a');

    // funkcja uruchamia animację overlay
    function animateOverlay(callback) {
        overlay.classList.add('active');

        // czas dopasowany do CSS (width 0.4s, height 0.4s z opóźnieniem)
        setTimeout(() => {
            overlay.classList.remove('active'); // overlay znika po animacji
            if (callback) callback();
        }, 800);
    }

    // przechwycenie kliknięcia wszystkich linków
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('mailto:')) {
            link.addEventListener('click', e => {
                e.preventDefault(); // blokujemy natychmiastowe przejście

                animateOverlay(() => {
                    window.location.href = href; // przechodzimy dopiero po animacji
                });
            });
        }
    });

    // opcjonalna animacja przy wejściu na stronę (tylko dla efektu startowego)
    // możesz usunąć, jeśli nie chcesz efektu przy samym ładowaniu strony
    setTimeout(() => {
        animateOverlay();
    }, 100); // krótki delay, żeby przeglądarka namalowała początkową linię
});
