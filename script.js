// Mobile Menu Functionality
function setupMobileMenu() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    const menuLinks = document.querySelectorAll('.nav-links a');

    if (menuButton && navLinks) {
        menuButton.addEventListener('click', () => {
            menuButton.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking links
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuButton.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuButton.contains(e.target)) {
                menuButton.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
}

// Project Data
const projects = [
    {
        title: 'Project 1',
        description: 'A brief description of this amazing project and the technologies used.',
        tags: ['React', 'Node.js']
    },
    {
        title: 'Project 2',
        description: 'A brief description of this amazing project and the technologies used.',
        tags: ['React', 'Node.js']
    },
    {
        title: 'Project 3',
        description: 'A brief description of this amazing project and the technologies used.',
        tags: ['React', 'Node.js']
    },
    {
        title: 'Project 4',
        description: 'A brief description of this amazing project and the technologies used.',
        tags: ['React', 'Node.js']
    }
];

class Carousel {
    constructor() {
        this.currentIndex = 0;
        this.track = document.querySelector('.carousel-track');
        this.prevButton = document.querySelector('.carousel-button.prev');
        this.nextButton = document.querySelector('.carousel-button.next');
        this.dotsContainer = document.querySelector('.carousel-dots');
        this.cards = [];
        this.dots = [];
        
        this.initializeCarousel();
        this.setupEventListeners();
        this.updateCarousel();
    }

    initializeCarousel() {
        // Generate project cards
        projects.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <div class="project-image"></div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            `;
            this.track.appendChild(card);
            this.cards.push(card);

            // Create dot
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
            this.dots.push(dot);
        });
    }

    setupEventListeners() {
        this.prevButton.addEventListener('click', () => this.previousSlide());
        this.nextButton.addEventListener('click', () => this.nextSlide());

        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        this.track.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        this.track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            const difference = touchStartX - touchEndX;
            if (Math.abs(difference) > 50) { // Minimum swipe distance
                if (difference > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
        });
    }

    updateCarousel() {
        // Update track position
        const slideWidth = this.cards[0].offsetWidth + 32; // Including margin
        this.track.style.transform = `translateX(-${this.currentIndex * slideWidth}px)`;

        // Update buttons
        this.prevButton.disabled = this.currentIndex === 0;
        this.nextButton.disabled = this.currentIndex >= this.cards.length - this.getVisibleSlides();

        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    getVisibleSlides() {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
    }

    nextSlide() {
        if (this.currentIndex < this.cards.length - this.getVisibleSlides()) {
            this.currentIndex++;
            this.updateCarousel();
        }
    }

    previousSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    }

    goToSlide(index) {
        this.currentIndex = Math.min(
            index,
            this.cards.length - this.getVisibleSlides()
        );
        this.updateCarousel();
    }
}

// Initialize everything when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu(); // Add this line
    new Carousel();

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            new Carousel();
        }, 250); // Debounce resize events
    });
});
