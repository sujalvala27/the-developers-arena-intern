// Form Validation for Contact Form

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    // Form submission handler
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Real-time validation
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('blur', () => validateInput(input));
        input.addEventListener('input', () => clearError(input));
    });
});

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());
    
    // Validate all fields
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateInput(field)) {
            isValid = false;
        }
    });
    
    // Additional validation for non-required fields if they have values
    const emailField = form.querySelector('#email');
    if (emailField.value && !validateEmail(emailField.value)) {
        showError(emailField, 'Please enter a valid email address');
        isValid = false;
    }
    
    const phoneField = form.querySelector('#phone');
    if (phoneField.value && !validatePhone(phoneField.value)) {
        showError(phoneField, 'Please enter a valid phone number');
        isValid = false;
    }
    
    if (!isValid) {
        // Focus first invalid field
        const firstInvalid = form.querySelector('.error');
        if (firstInvalid) {
            firstInvalid.focus();
        }
        return;
    }
    
    // If validation passes, simulate form submission
    simulateFormSubmission(form, formValues);
}

// Validate individual input
function validateInput(input) {
    const value = input.value.trim();
    const isRequired = input.hasAttribute('required');
    
    // Check required fields
    if (isRequired && !value) {
        showError(input, 'This field is required');
        return false;
    }
    
    // Email validation
    if (input.type === 'email' && value && !validateEmail(value)) {
        showError(input, 'Please enter a valid email address');
        return false;
    }
    
    // Phone validation
    if (input.type === 'tel' && value && !validatePhone(value)) {
        showError(input, 'Please enter a valid phone number (10 digits minimum)');
        return false;
    }
    
    // Message length validation
    if (input.id === 'message' && value.length < 10) {
        showError(input, 'Please enter a message of at least 10 characters');
        return false;
    }
    
    // Clear any existing errors
    clearError(input);
    return true;
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function validatePhone(phone) {
    // Remove all non-digits
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length >= 10;
}

// Show error message
function showError(input, message) {
    // Remove any existing error first
    clearError(input);
    
    // Add error class to input
    input.classList.add('error');
    
    // Get or create error message element
    let errorElement = document.getElementById(`${input.id}-error`);
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = `${input.id}-error`;
        errorElement.className = 'error-message';
        errorElement.setAttribute('aria-live', 'polite');
        input.parentNode.appendChild(errorElement);
    }
    
    // Set error message
    errorElement.textContent = message;
    errorElement.classList.add('show');
    
    // Add aria-invalid attribute
    input.setAttribute('aria-invalid', 'true');
    
    // Announce error to screen readers
    announceToScreenReader(message);
}

// Clear error message
function clearError(input) {
    input.classList.remove('error');
    input.removeAttribute('aria-invalid');
    
    const errorElement = document.getElementById(`${input.id}-error`);
    if (errorElement) {
        errorElement.classList.remove('show');
        errorElement.textContent = '';
    }
}

// Announce messages to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'assertive');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-announcement';
    announcement.style.position = 'absolute';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.padding = '0';
    announcement.style.margin = '-1px';
    announcement.style.overflow = 'hidden';
    announcement.style.clip = 'rect(0, 0, 0, 0)';
    announcement.style.whiteSpace = 'nowrap';
    announcement.style.border = '0';
    
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    // Remove after announcement is read
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Simulate form submission (in a real app, this would be an AJAX call)
function simulateFormSubmission(form, formData) {
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Show success message
        const successElement = document.getElementById('form-success');
        if (successElement) {
            successElement.hidden = false;
            successElement.focus(); // Move focus to success message for screen readers
            
            // Announce success
            announceToScreenReader('Form submitted successfully. Thank you for your message.');
        }
        
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Log form data (in real app, send to server)
        console.log('Form submitted with data:', formData);
        
        // Scroll to success message
        if (successElement) {
            successElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            if (successElement) {
                successElement.hidden = true;
            }
        }, 5000);
        
    }, 1500); // Simulate network delay
}

// Additional validation for specific field types
function initSpecializedValidation() {
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Format as (XXX) XXX-XXXX
            if (value.length > 0) {
                value = '(' + value.substring(0, 3) + ') ' + value.substring(3, 6) + '-' + value.substring(6, 10);
            }
            
            e.target.value = value.substring(0, 14); // Limit length
        });
    }
    
    // Character counter for message field
    const messageInput = document.getElementById('message');
    if (messageInput) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.textContent = '0/500 characters';
        messageInput.parentNode.appendChild(counter);
        
        messageInput.addEventListener('input', function() {
            const length = this.value.length;
            counter.textContent = `${length}/500 characters`;
            
            if (length > 500) {
                counter.style.color = '#e74c3c';
            } else if (length > 400) {
                counter.style.color = '#f39c12';
            } else {
                counter.style.color = '#7f8c8d';
            }
        });
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSpecializedValidation);
} else {
    initSpecializedValidation();
}