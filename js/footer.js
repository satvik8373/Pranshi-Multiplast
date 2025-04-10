document.addEventListener('DOMContentLoaded', function() {
    // Load the footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            // Find the script tag that loads footer.js
            const footerScript = document.querySelector('script[src="js/footer.js"]');
            
            // Insert the footer before the script tag
            footerScript.insertAdjacentHTML('beforebegin', data);
            
            // Initialize any footer-specific functionality
            initFooter();
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
});

function initFooter() {
    // Get the current year for the copyright notice
    const year = new Date().getFullYear();
    const copyrightElement = document.querySelector('.footer-bottom p');
    if (copyrightElement) {
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2024', year);
    }

    // Add active class to current page link in footer
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const footerLinks = document.querySelectorAll('.footer-links a');
    
    footerLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Initialize smooth scroll for footer links
    const allFooterLinks = document.querySelectorAll('.footer a[href^="#"]');
    allFooterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
} 