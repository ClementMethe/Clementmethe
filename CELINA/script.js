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
        const speed = 5;
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
            wasDragging = false;
            startX = e.pageX - ligne.getBoundingClientRect().left;
            scrollLeft = ligne.scrollLeft;
            ligne.style.cursor = 'grabbing';
            isScrolling = false;
            cancelAnimationFrame(animationFrameId);
        };

        const drag = (e) => {
            if (isDragging) {
                wasDragging = true;
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

        ligne.addEventListener('click', (e) => {
            const projet = e.target.closest('.projet');
            if (projet && !wasDragging) {
                const link = projet.getAttribute('data-link');
                if (link) {
                    window.location.href = link;
                }
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');

    gallery.addEventListener('wheel', function(event) {
      if (event.deltaY !== 0) {
        gallery.scrollLeft += event.deltaY;
        event.preventDefault();
      }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.querySelector('.gallery-container');
    const images = Array.from(galleryContainer.children);
    const repetitions = 5;

    for (let i = 0; i < repetitions; i++) {
        images.forEach(img => galleryContainer.appendChild(img.cloneNode(true)));
    }

    let scrollAmount = 0;
    const speed = 1;
    let isScrolling = true;
    let animationFrameId;

    const startScroll = () => {
        if (isScrolling) {
            scrollAmount += speed;
            if (scrollAmount >= galleryContainer.scrollWidth / 2) {
                scrollAmount = 0;
            }
            galleryContainer.scrollLeft = scrollAmount;
            animationFrameId = requestAnimationFrame(startScroll);
        }
    };

    startScroll();

    document.querySelector('.gallery').addEventListener('wheel', function(event) {
        galleryContainer.scrollLeft += event.deltaY;
        event.preventDefault();
    });

    document.querySelector('.gallery').addEventListener('mouseenter', () => {
        isScrolling = false;
        cancelAnimationFrame(animationFrameId);
    });

    document.querySelector('.gallery').addEventListener('mouseleave', () => {
        isScrolling = true;
        startScroll();
    });

    window.addEventListener('resize', () => {
        scrollAmount = galleryContainer.scrollLeft;
        if (isScrolling) {
            cancelAnimationFrame(animationFrameId);
            startScroll();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const translatableElements = document.querySelectorAll('.translatable');
  
    translatableElements.forEach(element => {
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
