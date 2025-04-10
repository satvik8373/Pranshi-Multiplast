// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const ownerEmail = 'pranshimultiplast@gmail.com';

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Validate form data
            if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
                showError('Please fill in all required fields');
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showError('Please enter a valid email address');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            // Format the message with all details
            const formattedMessage = `
Customer Details:
----------------
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}

Message:
----------------
${formData.message}
            `;

            // Prepare email content
            const emailParams = {
                to_name: 'Pranshi Multiplast',
                to_email: ownerEmail,
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone,
                subject: formData.subject,
                message: formattedMessage,
                customer_name: formData.name,
                customer_email: formData.email,
                customer_phone: formData.phone,
                customer_subject: formData.subject,
                customer_message: formData.message
            };

            console.log('Sending email with params:', emailParams);

            // Send email using EmailJS
            emailjs.send('service_w38jz7l', 'template_l4kqfzo', emailParams, '2-KFhOBe5OS2fUHna')
                .then(function(response) {
                    console.log('Email sent successfully:', response);
                    // Show success message with customer details
                    showSuccess(formData);
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Enable submit button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                })
                .catch(function(error) {
                    console.error('Email sending error:', error);
                    
                    // Provide more specific error message
                    let errorMessage = 'Failed to send message. ';
                    
                    if (error.text) {
                        errorMessage += 'Error: ' + error.text;
                    } else if (error.status) {
                        errorMessage += 'Status: ' + error.status;
                    } else {
                        errorMessage += 'Please try again or contact us directly at ' + ownerEmail;
                    }
                    
                    showError(errorMessage);
                    
                    // Enable submit button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                });
        });
    }

    // Helper function to show success message
    function showSuccess(formData) {
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for contacting us. We'll get back to you shortly.</p>
                <div class="success-details">
                    <div class="detail-item">
                        <span class="detail-label">Full Name</span>
                        <span class="detail-value">${formData.name}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Email</span>
                        <span class="detail-value email">${formData.email}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Phone</span>
                        <span class="detail-value phone">${formData.phone}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Subject</span>
                        <span class="detail-value">${formData.subject}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Message</span>
                        <span class="detail-value">${formData.message}</span>
                    </div>
                </div>
            </div>
        `;

        // Add to body
        document.body.appendChild(successMessage);

        // Remove after 5 seconds
        setTimeout(() => {
            successMessage.classList.add('fade-out');
            setTimeout(() => {
                successMessage.remove();
            }, 500);
        }, 5000);
    }

    // Helper function to show error message
    function showError(message) {
        // Create error message element
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Error</h3>
                <p>${message}</p>
            </div>
        `;

        // Add to body
        document.body.appendChild(errorMessage);

        // Remove after 5 seconds
        setTimeout(() => {
            errorMessage.classList.add('fade-out');
            setTimeout(() => {
                errorMessage.remove();
            }, 500);
        }, 5000);
    }
}); 