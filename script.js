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

// Generate Project Cards
function generateProjectCards() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    // Clear existing projects
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        projectCard.innerHTML = `
            <div class="project-image"></div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Cursor Blink Animation
function setupCursorBlink() {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    }
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

// Navigation Scroll Effect
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

// Smooth Scroll for Navigation Links
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    generateProjectCards();
    setupCursorBlink();
    setupThemeToggle();
    setupScrollEffect();
    setupSmoothScroll();
    
    // Set initial theme
    if (!document.body.classList.contains('dark-mode') && 
        !document.body.classList.contains('light-mode')) {
        document.body.classList.add('dark-mode');
    }
});
