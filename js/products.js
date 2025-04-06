// Product Filtering
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            productItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Product Image Hover Effect
    const productImages = document.querySelectorAll('.product-image');
    
    productImages.forEach(image => {
        image.addEventListener('mouseenter', () => {
            image.querySelector('.product-overlay').style.opacity = '1';
        });

        image.addEventListener('mouseleave', () => {
            image.querySelector('.product-overlay').style.opacity = '0';
        });
    });

    // View Details Button Click
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productItem = button.closest('.product-item');
            const productName = productItem.querySelector('h3').textContent;
            const productDescription = productItem.querySelector('p').textContent;
            const productFeatures = Array.from(productItem.querySelectorAll('.product-features li')).map(li => li.textContent);

            // Create and show modal
            showProductModal(productName, productDescription, productFeatures);
        });
    });
});

// Product Modal Function
function showProductModal(name, description, features) {
    // Create modal container
    const modalContainer = document.createElement('div');
    modalContainer.className = 'product-modal';
    modalContainer.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${name}</h2>
            <p>${description}</p>
            <h3>Features:</h3>
            <ul>
                ${features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <div class="modal-buttons">
                <button class="contact-btn">Contact for Quote</button>
                <button class="download-btn">Download Brochure</button>
            </div>
        </div>
    `;

    // Add modal to body
    document.body.appendChild(modalContainer);

    // Close modal functionality
    const closeBtn = modalContainer.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modalContainer.remove();
    });

    // Close modal when clicking outside
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            modalContainer.remove();
        }
    });

    // Contact for Quote button functionality
    const contactBtn = modalContainer.querySelector('.contact-btn');
    contactBtn.addEventListener('click', () => {
        window.location.href = 'contact.html';
    });

    // Download Brochure button functionality
    const downloadBtn = modalContainer.querySelector('.download-btn');
    downloadBtn.addEventListener('click', () => {
        // Add your brochure download logic here
        alert('Brochure download will start shortly...');
    });
}

// Add smooth scrolling for product sections
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

// Add animation on scroll for product items
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.product-item');
    
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