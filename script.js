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

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
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

// Navigation scroll effect
function setupScrollEffect() {
    const nav = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
            nav.classList.remove('scroll-up');
            nav.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
            nav.classList.remove('scroll-down');
            nav.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
}

// Smooth scroll for navigation
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Theme Toggle
function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            document.body.classList.toggle('dark-mode');
        });
    }
}

// Initialize everything when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
    setupThemeToggle();
    setupScrollEffect();
    setupSmoothScroll();
    
    // Set initial theme
    if (!document.body.classList.contains('dark-mode') && 
        !document.body.classList.contains('light-mode')) {
        document.body.classList.add('dark-mode');
    }

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            new Carousel();
        }, 250); // Debounce resize events
    });
});
