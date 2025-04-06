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
                    <img src="images/logo.jpg" alt="Logo">
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

// Development Banner
document.addEventListener('DOMContentLoaded', function() {
    // Check if banner was previously dismissed
    if (localStorage.getItem('devBannerDismissed')) return;

    // Create banner element
    const banner = document.createElement('div');
    banner.className = 'dev-banner';
    banner.innerHTML = `
        <span>Development Mode - Created by <span class="dev-name">~satvik patel</span></span>
        <button class="close-btn" aria-label="Close banner">×</button>
    `;

    // Add banner to page
    document.body.insertBefore(banner, document.body.firstChild);

    // Handle close button click
    const closeBtn = banner.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        banner.style.opacity = '0';
        banner.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            banner.remove();
            localStorage.setItem('devBannerDismissed', 'true');
        }, 300);
    });

    // Adjust header position to account for banner
    const header = document.querySelector('.header');
    if (header) {
        header.style.top = '2.5rem';
    }
});

// Development Status
document.addEventListener('DOMContentLoaded', function() {
    // Check if status was previously dismissed
    if (localStorage.getItem('devStatusDismissed')) return;

    // Create status element
    const status = document.createElement('div');
    status.className = 'dev-status';
    status.innerHTML = `
        <button class="dev-status-toggle" aria-label="Toggle development status">×</button>
        <h4>Development Status</h4>
        <ul class="dev-status-list">
            <li class="dev-status-item incomplete">Mobile menu animation needs refinement</li>
            <li class="dev-status-item bug">Product images not loading on Safari</li>
            <li class="dev-status-item glitch">Contact form validation incomplete</li>
            <li class="dev-status-item incomplete">Responsive design issues on tablets</li>
            <li class="dev-status-item bug">Footer links not working properly</li>
        </ul>
    `;

    // Add status to page
    document.body.appendChild(status);

    // Handle toggle button click
    const toggleBtn = status.querySelector('.dev-status-toggle');
    toggleBtn.addEventListener('click', () => {
        status.classList.toggle('collapsed');
        localStorage.setItem('devStatusCollapsed', status.classList.contains('collapsed'));
    });

    // Restore collapsed state if previously set
    if (localStorage.getItem('devStatusCollapsed') === 'true') {
        status.classList.add('collapsed');
    }

    // Handle click on collapsed status to expand
    status.addEventListener('click', (e) => {
        if (status.classList.contains('collapsed') && e.target === status) {
            status.classList.remove('collapsed');
            localStorage.setItem('devStatusCollapsed', 'false');
        }
    });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
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

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    let menuOverlay;

    // Create overlay element
    function createOverlay() {
        menuOverlay = document.createElement('div');
        menuOverlay.className = 'menu-overlay';
        body.appendChild(menuOverlay);
    }
    createOverlay();

    // Toggle menu function
    function toggleMenu() {
        navLinks.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
    }

    // Event listeners
    mobileMenu.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Handle resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                toggleMenu();
            }
        }, 250);
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

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