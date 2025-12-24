// Main JavaScript file for FitLife Gym website

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('FitLife Gym website loaded');
    
    // Initialize all components
    initMobileMenu();
    initTestimonialSlider();
    initServiceTabs();
    initFAQAccordion();
    initSmoothScrolling();
    initFormValidation();
    
    // Performance optimization: lazy load images
    initLazyLoading();
    
    // Accessibility enhancements
    initAccessibility();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (!menuToggle || !mainNav) return;
    
    menuToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('show');
        
        // Update hamburger animation
        const hamburger = this.querySelector('.hamburger');
        if (hamburger) {
            hamburger.classList.toggle('active');
        }
    });
    
    // Close menu when clicking on a link
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            mainNav.classList.remove('show');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
            menuToggle.setAttribute('aria-expanded', 'false');
            mainNav.classList.remove('show');
        }
    });
}

// Testimonial Slider
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;
    
    const testimonials = slider.querySelectorAll('.testimonial');
    const dots = slider.querySelectorAll('.dot');
    const prevBtn = slider.querySelector('.slider-btn.prev');
    const nextBtn = slider.querySelector('.slider-btn.next');
    
    let currentSlide = 0;
    const totalSlides = testimonials.length;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Validate index
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        // Hide all slides
        testimonials.forEach(slide => {
            slide.classList.remove('active');
            slide.setAttribute('aria-hidden', 'true');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        testimonials[index].classList.add('active');
        testimonials[index].setAttribute('aria-hidden', 'false');
        
        // Update active dot
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showSlide(index);
            }
        });
    });
    
    // Event listeners for navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            showSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            showSlide(currentSlide + 1);
        }
    });
    
    // Auto-advance slides (optional)
    let slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
    
    // Pause auto-advance on hover
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
    });
    
    // Initialize first slide
    showSlide(0);
}

// Service Tabs
function initServiceTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    if (tabBtns.length === 0) return;
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('aria-controls');
            
            // Update button states
            tabBtns.forEach(b => {
                b.setAttribute('aria-selected', 'false');
                b.classList.remove('active');
            });
            this.setAttribute('aria-selected', 'true');
            this.classList.add('active');
            
            // Update panel visibility
            tabPanels.forEach(panel => {
                if (panel.id === tabId) {
                    panel.classList.add('active');
                    panel.removeAttribute('hidden');
                } else {
                    panel.classList.remove('active');
                    panel.setAttribute('hidden', 'true');
                }
            });
        });
        
        // Keyboard navigation
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
            
            // Arrow key navigation
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const nextBtn = this.nextElementSibling || tabBtns[0];
                nextBtn.focus();
                nextBtn.click();
            }
            
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prevBtn = this.previousElementSibling || tabBtns[tabBtns.length - 1];
                prevBtn.focus();
                prevBtn.click();
            }
        });
    });
}

// FAQ Accordion
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const answerId = this.getAttribute('aria-controls');
            const answer = document.getElementById(answerId);
            
            // Toggle visibility
            this.setAttribute('aria-expanded', !isExpanded);
            if (answer) {
                answer.hidden = isExpanded;
            }
        });
        
        // Keyboard support
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or links to non-existent element
            if (href === '#' || href === '#!') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                // Calculate header height for offset
                const headerHeight = document.querySelector('.main-header').offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without scrolling
                history.pushState(null, null, href);
                
                // Focus the target for accessibility
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
                
                // Remove tabindex after blur to avoid breaking tab order
                targetElement.addEventListener('blur', function() {
                    this.removeAttribute('tabindex');
                }, { once: true });
            }
        });
    });
}

// Form Validation (basic setup - detailed validation in form-validation.js)
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Basic required field check
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Show error message if exists
                    const errorId = field.id + '-error';
                    const errorElement = document.getElementById(errorId);
                    if (errorElement) {
                        errorElement.textContent = 'This field is required';
                        errorElement.classList.add('show');
                    }
                } else {
                    field.classList.remove('error');
                    
                    // Hide error message if exists
                    const errorId = field.id + '-error';
                    const errorElement = document.getElementById(errorId);
                    if (errorElement) {
                        errorElement.classList.remove('show');
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                
                // Focus first invalid field
                const firstInvalid = this.querySelector('.error');
                if (firstInvalid) {
                    firstInvalid.focus();
                }
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
                
                const errorId = this.id + '-error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
            });
            
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    });
}

// Field validation helper
function validateField(field) {
    if (!field.hasAttribute('required')) return true;
    
    const value = field.value.trim();
    const errorId = field.id + '-error';
    const errorElement = document.getElementById(errorId);
    
    if (!value) {
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = 'This field is required';
            errorElement.classList.add('show');
        }
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && !isValidEmail(value)) {
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = 'Please enter a valid email address';
            errorElement.classList.add('show');
        }
        return false;
    }
    
    // Phone validation (basic)
    if (field.type === 'tel' && value && !isValidPhone(value)) {
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = 'Please enter a valid phone number';
            errorElement.classList.add('show');
        }
        return false;
    }
    
    field.classList.remove('error');
    if (errorElement) {
        errorElement.classList.remove('show');
    }
    return true;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation helper (basic)
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\D/g, '').length >= 10);
}

// Lazy Loading for Images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    }
}

// Accessibility Enhancements
function initAccessibility() {
    // Add focus styles for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Improve focus management for modals/dialogs
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    // Trap focus in modal (example implementation)
    function trapFocus(element) {
        const focusableContent = element.querySelectorAll(focusableElements);
        const firstFocusableElement = focusableContent[0];
        const lastFocusableElement = focusableContent[focusableContent.length - 1];
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
    
    // Apply to any modal-like elements
    document.querySelectorAll('.modal, [role="dialog"]').forEach(trapFocus);
    
    // Announce dynamic content changes for screen readers
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Could add aria-live region updates here
            }
        });
    });
    
    // Observe main content area
    const mainContent = document.querySelector('main');
    if (mainContent) {
        observer.observe(mainContent, { childList: true, subtree: true });
    }
}