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



///////////projets///////////



  document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');

    gallery.addEventListener('wheel', function(event) {
      if (event.deltaY !== 0) {
        // Scrolle horizontalement en fonction du scroll vertical
        gallery.scrollLeft += event.deltaY;
        event.preventDefault(); // Empêche le défilement vertical de la page
      }
    });
  });



  document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.querySelector('.gallery-container');
    const images = Array.from(galleryContainer.children);
    const repetitions = 5; // Nombre de répétitions souhaité

    // Cloner les images pour créer le nombre de répétitions souhaité
    const totalImages = images.length;
    for (let i = 0; i < repetitions; i++) {
        images.forEach(img => galleryContainer.appendChild(img.cloneNode(true)));
    }

    // Calculer la largeur totale après avoir ajouté les clones
    const totalWidth = galleryContainer.scrollWidth;
    const containerWidth = galleryContainer.clientWidth;

    let scrollAmount = 0;
    const speed = 1; // Ajustez la vitesse si nécessaire
    let isScrolling = true;
    let animationFrameId;

    const startScroll = () => {
        if (isScrolling) {
            scrollAmount += speed;
            if (scrollAmount >= totalWidth / 2) {
                scrollAmount = 0; // Réinitialiser pour créer l'effet d'infini
            }
            galleryContainer.scrollLeft = scrollAmount;
            animationFrameId = requestAnimationFrame(startScroll);
        }
    };

    startScroll();

    // Gestion du défilement manuel
    document.querySelector('.gallery').addEventListener('wheel', function(event) {
        galleryContainer.scrollLeft += event.deltaY;
        event.preventDefault(); // Empêche le défilement vertical de la page
    });

    // Arrêter l'animation lorsqu'on passe la souris sur la galerie
    document.querySelector('.gallery').addEventListener('mouseenter', () => {
        isScrolling = false;
        cancelAnimationFrame(animationFrameId);
    });

    // Reprendre l'animation lorsque la souris quitte la galerie
    document.querySelector('.gallery').addEventListener('mouseleave', () => {
        isScrolling = true;
        startScroll();
    });

    // Gestion du redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
        // Recalculer la largeur totale en cas de redimensionnement
        galleryContainer.style.width = `${galleryContainer.scrollWidth}px`;
    });
});

// script.js
document.addEventListener('DOMContentLoaded', () => {
    const translatableElements = document.querySelectorAll('.translatable');
  
    translatableElements.forEach(element => {
      // Sauvegarde du texte original avec HTML
      const originalHTML = element.innerHTML;
  
      element.addEventListener('mouseover', () => {
        const translationHTML = element.getAttribute('data-translation');
        element.innerHTML = translationHTML;
      });
  
      element.addEventListener('mouseout', () => {
        element.innerHTML = originalHTML;
      });
    });
  });
  
  

  


