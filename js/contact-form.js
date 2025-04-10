// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const ownerEmail = 'pranshimultiplast@gmail.com';

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validate form data
            if (!name || !email || !phone || !subject || !message) {
                showError('Please fill in all fields');
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('Please enter a valid email address');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            try {
                // Prepare template parameters
                const templateParams = {
                    to_name: 'Admin',
                    to_email: ownerEmail,
                    from_name: name,
                    from_email: email,
                    phone: phone,
                    subject: subject,
                    message: message,
                    reply_to: email
                };

                console.log('Sending email with params:', templateParams);

                // Send email using EmailJS
                const response = await emailjs.send(
                    'service_w38jz7l',
                    'template_l4kqfzo',
                    templateParams,
                    '2-KFhOBe5OS2fUHna'
                );

                console.log('Email sent successfully:', response);

                // Show success message
                showSuccess(name, email, phone, subject);

                // Reset form
                contactForm.reset();

            } catch (error) {
                console.error('Email sending error:', error);
                showError(error.text || 'Failed to send message. Please try again.');
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }

    // Helper function to show success message
    function showSuccess(name, email, phone, subject) {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. We will contact you soon.</p>
                <div class="success-details">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                </div>
            </div>
        `;
        document.body.appendChild(successMessage);

        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.add('fade-out');
            setTimeout(() => {
                successMessage.remove();
            }, 500);
        }, 5000);
    }

    // Helper function to show error message
    function showError(errorText) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Error!</h3>
                <p>${errorText}</p>
                <p>If the problem persists, please contact us directly at ${ownerEmail}</p>
            </div>
        `;
        document.body.appendChild(errorMessage);

        // Remove error message after 5 seconds
        setTimeout(() => {
            errorMessage.classList.add('fade-out');
            setTimeout(() => {
                errorMessage.remove();
            }, 500);
        }, 5000);
    }
}); 