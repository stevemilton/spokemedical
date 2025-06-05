// Enhanced JavaScript for Spoke Medical Website
// Adds interactive functionality and animations

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ===== ENHANCED TAB FUNCTIONALITY =====
    function initTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    content.style.display = 'none';
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding content with animation
                const targetContent = document.querySelector(`[data-tab-content="${targetTab}"]`);
                if (targetContent) {
                    targetContent.style.display = 'block';
                    targetContent.classList.add('active');
                    
                    // Add fade-in animation
                    targetContent.style.opacity = '0';
                    targetContent.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        targetContent.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        targetContent.style.opacity = '1';
                        targetContent.style.transform = 'translateY(0)';
                    }, 10);
                }
            });
        });
        
        // Initialize first tab as active
        if (tabButtons.length > 0) {
            tabButtons[0].click();
        }
    }
    
    // ===== SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll('.card, .section-header, .hero-content');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // ===== ENHANCED BUTTON INTERACTIONS =====
    function initButtonInteractions() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            // Add ripple effect on click
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
            
            // Add loading state for form submissions
            if (button.type === 'submit' || button.classList.contains('btn-submit')) {
                button.addEventListener('click', function() {
                    if (!this.classList.contains('loading')) {
                        this.classList.add('loading');
                        const originalText = this.textContent;
                        this.textContent = 'Loading...';
                        
                        // Remove loading state after 3 seconds (adjust as needed)
                        setTimeout(() => {
                            this.classList.remove('loading');
                            this.textContent = originalText;
                        }, 3000);
                    }
                });
            }
        });
    }
    
    // ===== NAVIGATION ACTIVE STATE =====
    function initNavigationActiveState() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        
        function updateActiveNavigation() {
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveNavigation);
        updateActiveNavigation(); // Initial call
    }
    
    // ===== FORM ENHANCEMENTS =====
    function initFormEnhancements() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                // Add floating label effect
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    if (!this.value) {
                        this.parentElement.classList.remove('focused');
                    }
                });
                
                // Real-time validation
                input.addEventListener('input', function() {
                    validateField(this);
                });
            });
        });
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const required = field.hasAttribute('required');
        
        // Remove existing validation classes
        field.classList.remove('valid', 'invalid');
        
        if (required && !value) {
            field.classList.add('invalid');
            return false;
        }
        
        // Email validation
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.classList.add('invalid');
                return false;
            }
        }
        
        // Phone validation
        if (type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                field.classList.add('invalid');
                return false;
            }
        }
        
        if (value) {
            field.classList.add('valid');
        }
        
        return true;
    }
    
    // ===== MOBILE MENU FUNCTIONALITY =====
    function initMobileMenu() {
        const mobileMenuButton = document.querySelector('.mobile-menu-button');
        const mobileMenu = document.querySelector('.mobile-menu');
        const body = document.body;
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', function() {
                const isOpen = mobileMenu.classList.contains('open');
                
                if (isOpen) {
                    mobileMenu.classList.remove('open');
                    body.classList.remove('menu-open');
                    this.setAttribute('aria-expanded', 'false');
                } else {
                    mobileMenu.classList.add('open');
                    body.classList.add('menu-open');
                    this.setAttribute('aria-expanded', 'true');
                }
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                    mobileMenu.classList.remove('open');
                    body.classList.remove('menu-open');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Close menu on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                    body.classList.remove('menu-open');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }
    
    // ===== LAZY LOADING FOR IMAGES =====
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ===== SCROLL TO TOP BUTTON =====
    function initScrollToTop() {
        const scrollButton = document.createElement('button');
        scrollButton.innerHTML = '↑';
        scrollButton.className = 'scroll-to-top';
        scrollButton.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollButton);
        
        function toggleScrollButton() {
            if (window.scrollY > 300) {
                scrollButton.classList.add('visible');
            } else {
                scrollButton.classList.remove('visible');
            }
        }
        
        scrollButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', toggleScrollButton);
        toggleScrollButton(); // Initial call
    }
    
    // ===== PERFORMANCE MONITORING =====
    function initPerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('web-vital' in window) {
            // This would integrate with web-vitals library if included
            // For now, we'll just log basic performance metrics
            window.addEventListener('load', function() {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                }, 0);
            });
        }
    }
    
    // ===== INITIALIZE ALL FUNCTIONALITY =====
    function init() {
        initSmoothScrolling();
        initTabs();
        initScrollAnimations();
        initButtonInteractions();
        initNavigationActiveState();
        initFormEnhancements();
        initMobileMenu();
        initLazyLoading();
        initScrollToTop();
        initPerformanceMonitoring();
        
        console.log('Spoke Medical website enhancements loaded successfully');
    }
    
    // Start initialization
    init();
});

// ===== CSS FOR JAVASCRIPT ENHANCEMENTS =====
// Add this CSS to your stylesheet or include it in a <style> tag

const additionalCSS = `
/* Ripple effect for buttons */
.btn {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

/* Loading state for buttons */
.btn.loading {
    pointer-events: none;
    opacity: 0.7;
}

/* Scroll to top button */
.scroll-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--color-primary);
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: var(--shadow-lg);
}

.scroll-to-top.visible {
    opacity: 1;
    visibility: visible;
}

.scroll-to-top:hover {
    background: var(--color-primary-dark);
    transform: translateY(-2px);
}

/* Form field enhancements */
.form-field {
    position: relative;
    margin-bottom: var(--space-md);
}

.form-field input,
.form-field textarea {
    width: 100%;
    padding: var(--space-sm);
    border: 2px solid var(--color-border);
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    transition: var(--transition-normal);
}

.form-field input:focus,
.form-field textarea:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(0, 166, 147, 0.1);
}

.form-field input.valid {
    border-color: var(--color-success);
}

.form-field input.invalid {
    border-color: #EF4444;
}

/* Mobile menu styles */
.mobile-menu-button {
    display: none;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: var(--space-xs);
}

.mobile-menu {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--color-background);
    z-index: 1000;
    padding: var(--space-xl);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
}

.mobile-menu.open {
    transform: translateX(0);
}

.body.menu-open {
    overflow: hidden;
}

@media (max-width: 768px) {
    .nav {
        display: none;
    }
    
    .mobile-menu-button {
        display: block;
    }
    
    .mobile-menu {
        display: block;
    }
}

/* Lazy loading images */
img.lazy {
    opacity: 0;
    transition: opacity 0.3s;
}

img.lazy.loaded {
    opacity: 1;
}

/* Animation delays for staggered effects */
.card:nth-child(1) { animation-delay: 0.1s; }
.card:nth-child(2) { animation-delay: 0.2s; }
.card:nth-child(3) { animation-delay: 0.3s; }
.card:nth-child(4) { animation-delay: 0.4s; }
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);

