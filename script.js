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
        this.nextButton.addEventListener
