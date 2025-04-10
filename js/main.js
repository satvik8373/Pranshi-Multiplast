// Loading Screen
document.addEventListener('DOMContentLoaded', function() {
    // Check if we should show the loading screen
    const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
    const isFirstVisit = !localStorage.getItem('hasVisited');
    const isPageRefresh = !document.referrer;

    // Only show loading screen on first visit or when switching to home page (not on refresh)
    if ((isHomePage && !isPageRefresh) || isFirstVisit) {
        // Create loading screen element
        const loadingScreen = document.createElement('div');
        loadingScreen.className = 'loading-screen';
        loadingScreen.innerHTML = `
            <div class="loading-content">
                <div class="loading-icons">
                    <div class="icon-item">
                        <i class="fas fa-industry"></i>
                    </div>
                    <div class="icon-item">
                        <i class="fas fa-box"></i>
                    </div>
                    <div class="icon-item">
                        <i class="fas fa-recycle"></i>
                    </div>
                    <div class="icon-item">
                        <i class="fas fa-cog"></i>
                    </div>
                </div>
                <div class="logo-circle">
                    <img src="images/icon.png" alt="Logo">
                </div>
                <div class="loading-text">PRANSHI MULTIPLAST</div>
            </div>
        `;

        // Add loading screen to page
        document.body.appendChild(loadingScreen);

        // Add fade-out class after delay
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.remove();
            }, 300);
        }, 1500);

        // Prevent scrolling while loading screen is visible
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            document.body.style.overflow = '';
        }, 1500);

        // Mark as visited
        localStorage.setItem('hasVisited', 'true');
    }
});

// Mobile Menu Functionality
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const menuOverlay = document.querySelector('.menu-overlay');
const body = document.body;

function toggleMenu() {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
}

mobileMenu.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

// Close menu when clicking a nav link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});

// Close menu if window is resized beyond mobile breakpoint
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});

// Smooth Scrolling for Navigation Links
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

// Header Scroll Effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Animate Elements on Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.product-card, .industry-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Image Lazy Loading
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Form Validation (if contact form exists)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const name = contactForm.querySelector('input[name="name"]').value;
        const email = contactForm.querySelector('input[name="email"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value;
        
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Here you would typically send the form data to a server
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Email validation helper function
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Breadcrumb Generation
document.addEventListener('DOMContentLoaded', function() {
    // Create breadcrumb structure
    function generateBreadcrumbs() {
        const path = window.location.pathname;
        const pathParts = path.split('/').filter(part => part !== '');
        
        // Don't show breadcrumbs on homepage
        if (path === '/' || path === '/index.html') return;
        
        const breadcrumbHTML = `
            <div class="breadcrumb">
                <div class="breadcrumb-container">
                    <ul class="breadcrumb-list">
                        <li class="breadcrumb-item">
                            <a href="/">Home</a>
                        </li>
                        ${generateBreadcrumbItems(pathParts)}
                    </ul>
                </div>
            </div>
        `;
        
        // Insert breadcrumbs after header
        const header = document.querySelector('.header');
        header.insertAdjacentHTML('afterend', breadcrumbHTML);
    }
    
    // Generate individual breadcrumb items
    function generateBreadcrumbItems(pathParts) {
        let currentPath = '';
        return pathParts.map((part, index) => {
            currentPath += '/' + part;
            const isLast = index === pathParts.length - 1;
            const readableName = part.replace(/-/g, ' ')
                                   .replace('.html', '')
                                   .split(' ')
                                   .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                   .join(' ');
            
            if (isLast) {
                return `<li class="breadcrumb-item active">${readableName}</li>`;
            } else {
                return `<li class="breadcrumb-item">
                    <a href="${currentPath}">${readableName}</a>
                </li>`;
            }
        }).join('');
    }
    
    // Initialize breadcrumbs
    generateBreadcrumbs();
});

// Function to load the footer
async function loadFooter() {
    try {
        const response = await fetch('/footer.html');
        const footerContent = await response.text();
        document.body.insertAdjacentHTML('beforeend', footerContent);
        
        // Update copyright year
        const currentYear = new Date().getFullYear();
        const copyrightYearElement = document.getElementById('copyright-year');
        if (copyrightYearElement) {
            copyrightYearElement.textContent = currentYear;
        }
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

// Load footer when DOM is ready
document.addEventListener('DOMContentLoaded', loadFooter);

// Update copyright year
document.addEventListener('DOMContentLoaded', function() {
    const copyrightYearElement = document.getElementById('copyright-year');
    if (copyrightYearElement) {
        copyrightYearElement.textContent = new Date().getFullYear();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Initialize header functionality
    initializeHeader();

    // Initialize smooth scrolling
    initializeSmoothScroll();

    // Initialize animations
    initializeAnimations();
});

function initializeHeader() {
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initializeAnimations() {
    // Add animation classes to elements when they become visible
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
} 