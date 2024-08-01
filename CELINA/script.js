document.addEventListener('DOMContentLoaded', function() {
    const lignes = document.querySelectorAll('.ligne');
    const repetitions = 5;

    lignes.forEach(ligne => {
        const projets = Array.from(ligne.children);

        for (let i = 0; i < repetitions; i++) {
            projets.forEach(projet => ligne.appendChild(projet.cloneNode(true)));
        }

        ligne.scrollLeft = 0;

        let scrollAmount = 0;
        const speed = 2;
        let isScrolling = false;
        let isDragging = false;
        let startX;
        let scrollLeft;
        let animationFrameId;
        let wasDragging = false;

        const startScroll = () => {
            if (isScrolling) {
                scrollAmount += speed;
                if (scrollAmount > ligne.scrollWidth - ligne.clientWidth) {
                    scrollAmount = 0;
                }
                ligne.scrollLeft = scrollAmount;
                animationFrameId = requestAnimationFrame(startScroll);
            }
        };

        const startDrag = (e) => {
            isDragging = true;
            wasDragging = false; // Réinitialiser le flag pour les vérifications ultérieures
            startX = e.pageX - ligne.getBoundingClientRect().left;
            scrollLeft = ligne.scrollLeft;
            ligne.style.cursor = 'grabbing';
            isScrolling = false; // Stop automatic scrolling
            cancelAnimationFrame(animationFrameId);
        };

        const drag = (e) => {
            if (isDragging) {
                wasDragging = true; // Marquer comme étant en train de faire glisser
                const x = e.pageX - ligne.getBoundingClientRect().left;
                const walk = (x - startX) * 0.5;
                ligne.scrollLeft = scrollLeft - walk;
            }
        };

        const endDrag = (e) => {
            if (isDragging) {
                isDragging = false;
                ligne.style.cursor = 'grab';
                scrollAmount = ligne.scrollLeft;
                isScrolling = true;
                startScroll(); 
                
                // Empêcher le clic si un drag a été effectué
                if (wasDragging) {
                    e.preventDefault();
                }
            }
        };

        ligne.addEventListener('mouseenter', () => {
            if (!isDragging) {
                isScrolling = true;
                startScroll();
            }
        });

        ligne.addEventListener('mouseleave', () => {
            isScrolling = false;
            cancelAnimationFrame(animationFrameId);
        });

        ligne.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);

        // Gestion des clics pour ouvrir les liens dans les projets
        ligne.addEventListener('click', (e) => {
            const projet = e.target.closest('.projet');
            if (projet && !wasDragging) { // Ouvrir le lien uniquement si ce n'était pas un drag
                const link = projet.getAttribute('data-link');
                if (link) {
                    window.location.href = link;
                }
            }
        });
    });
});
