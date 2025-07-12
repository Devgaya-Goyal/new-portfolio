// Custom Cursor with Single Color Cyan Dripping Effect
let cursor = document.querySelector('.cursor');
let cursorTrail = document.querySelector('.cursor-trail');
let particles = [];

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorTrail.style.left = e.clientX + 'px';
        cursorTrail.style.top = e.clientY + 'px';
    }, 100);
    
    // Create cyan dripping particles
    const colors = ['#00ffff', '#06b6d4', '#0891b2', '#0e7490'];
    
    if (Math.random() < 0.5) { // 50% chance to create particle
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = e.clientX + (Math.random() - 0.5) * 40 + 'px';
        particle.style.top = e.clientY + (Math.random() - 0.5) * 40 + 'px';
        particle.style.width = Math.random() * 6 + 3 + 'px';
        particle.style.height = Math.random() * 6 + 3 + 'px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9997';
        particle.style.boxShadow = `0 0 ${Math.random() * 15 + 8}px ${particle.style.background}`;
        
        document.body.appendChild(particle);
        
        let life = 1;
        let x = parseFloat(particle.style.left);
        let y = parseFloat(particle.style.top);
        
        const animate = () => {
            life -= 0.02; // Slower fade for more visible effect
            y += 3; // Faster dripping
            x += (Math.random() - 0.5) * 1; // More horizontal movement
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = life;
            particle.style.transform = `scale(${life})`;
            
            if (life > 0) {
                requestAnimationFrame(animate);
            } else {
                document.body.removeChild(particle);
            }
        };
        
        requestAnimationFrame(animate);
    }
});

// White Starry Background
function createStars() {
    const starsContainer = document.querySelector('.stars-container');
    if (!starsContainer) return;
    
    const numberOfStars = 150;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        starsContainer.appendChild(star);
    }
}

// Section Scroll Animation
function animateOnScroll() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Skills Accordion - Fixed to only open one at a time
function initSkillsAccordion() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        const header = card.querySelector('.card-header');
        
        header.addEventListener('click', () => {
            // Close all other cards
            skillCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('active');
                }
            });
            
            // Toggle current card
            card.classList.toggle('active');
        });
    });
}

// Projects Accordion - Only open one category at a time
function initProjectsAccordion() {
    const projectCategories = document.querySelectorAll('.project-category');
    
    projectCategories.forEach(category => {
        const header = category.querySelector('.category-header');
        
        header.addEventListener('click', () => {
            // Close all other categories
            projectCategories.forEach(otherCategory => {
                if (otherCategory !== category) {
                    otherCategory.classList.remove('active');
                }
            });
            
            // Toggle current category
            category.classList.toggle('active');
        });
    });
}

// Tooltip System
function initTooltips() {
    const tooltip = document.getElementById('tooltip');
    if (!tooltip) return;
    
    const skillItems = document.querySelectorAll('.skill-item[data-tooltip]');
    const socialLinks = document.querySelectorAll('.social-link[data-platform]');
    
    function showTooltip(element, text) {
        tooltip.textContent = text;
        tooltip.classList.add('show');
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    }
    
    function hideTooltip() {
        tooltip.classList.remove('show');
    }
    
    // Skill item tooltips
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            showTooltip(item, item.getAttribute('data-tooltip'));
        });
        
        item.addEventListener('mouseleave', hideTooltip);
    });
    
    // Social link tooltips
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const platform = link.getAttribute('data-platform');
            showTooltip(link, `Go to ${platform}`);
        });
        
        link.addEventListener('mouseleave', hideTooltip);
    });
}

// Project Items Interaction
function initProjectItems() {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        const sourceBtn = item.querySelector('.source-btn');
        
        // Add click handler to source button
        sourceBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Don't proceed if button is disabled
            if (sourceBtn.disabled) {
                return;
            }
            
            // Add your GitHub links here
            const projectType = item.getAttribute('data-project');
            let githubUrl = '';
            
            switch(projectType) {
                case 'pingpong':
                    githubUrl = 'https://github.com/Devgaya-Goyal/PingPong';
                    break;
                case 'mail':
                    githubUrl = 'https://github.com/Devgaya-Goyal/python-mail';
                    break;
                case 'trivia':
                    githubUrl = 'https://github.com/Devgaya-Goyal/Trivia-using-tlinter';
                    break;
                case 'media':
                    githubUrl = 'https://github.com/Devgaya-Goyal/Media-access';
                    break;
                case 'pomodoro':
                    githubUrl = 'https://github.com/Devgaya-Goyal/Pomodoro';
                    break;
                case 'flashcard':
                    githubUrl = 'https://github.com/Devgaya-Goyal/First-Tkinter-project';
                    break;
                case 'cicd':
                    githubUrl = 'https://github.com/Devgaya-Goyal/cicd-pipeline';
                    break;
                default:
                    githubUrl = 'https://github.com/Devgaya-Goyal';
                    break;
            }
            
            window.open(githubUrl, '_blank');
        });
        
        // Add hover effects
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });
}

// Social Links Interaction
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            socialLinks.forEach(otherLink => {
                otherLink.classList.remove('active');
            });
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Remove active class after 2 seconds
            setTimeout(() => {
                link.classList.remove('active');
            }, 2000);
        });
    });
}

// Name Title Animation - Fixed hover issue
function initNameAnimation() {
    const nameTitle = document.getElementById('nameTitle');
    if (!nameTitle) return;
    
    let isHovered = false;
    
    nameTitle.addEventListener('mouseenter', () => {
        isHovered = true;
        nameTitle.style.transform = 'scale(1.05)';
    });
    
    nameTitle.addEventListener('mouseleave', () => {
        isHovered = false;
        nameTitle.style.transform = 'scale(1)';
    });
    
    // Prevent hover effect when not actually hovering
    nameTitle.addEventListener('mouseout', () => {
        if (!isHovered) {
            nameTitle.style.transform = 'scale(1)';
        }
    });
}

// Hero Buttons Interaction
function initHeroButtons() {
    const primaryBtn = document.querySelector('.primary-btn');
    const secondaryBtn = document.querySelector('.secondary-btn');
    
    if (primaryBtn) {
        primaryBtn.addEventListener('click', () => {
            // Add CV download functionality
            console.log('Download CV clicked');
            // You can add actual download functionality here
        });
    }
    
    if (secondaryBtn) {
        secondaryBtn.addEventListener('click', () => {
            // Scroll to projects section
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    animateOnScroll();
    initSkillsAccordion();
    initProjectsAccordion();
    initTooltips();
    initProjectItems();
    initSocialLinks();
    initNameAnimation();
    initHeroButtons();
    initSmoothScrolling();
    
    // Make hero section visible immediately
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.classList.add('visible');
    }
});

// Add some interactive particles on click
document.addEventListener('click', (e) => {
    const colors = ['#00ffff', '#06b6d4', '#0891b2', '#0e7490'];
    
    for (let i = 0; i < 8; i++) { // Increased particle count
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 8;
        const velocity = 120; // Increased velocity
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let x = e.clientX;
        let y = e.clientY;
        let opacity = 1;
        
        const animate = () => {
            x += vx * 0.02;
            y += vy * 0.02;
            opacity -= 0.02;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                document.body.removeChild(particle);
            }
        };
        
        requestAnimationFrame(animate);
    }
});