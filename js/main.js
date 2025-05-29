// Main JavaScript file for Spoke Medical corporate website
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
      menuToggle.setAttribute('aria-expanded', !expanded);
    });
  }

  // Tab functionality
  const tabButtons = document.querySelectorAll('.tab-btn');
  if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        const tabId = this.id.replace('tab-', '');
        showTab(tabId, e);
      });
    });
  }

  // Function to handle tab switching
  window.showTab = function(tabId, event) {
    // Hide all tab panes
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabPanes.forEach(pane => pane.classList.remove('active'));
    
    // Deactivate all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
      button.classList.remove('active');
      button.setAttribute('aria-selected', 'false');
    });
    
    // Activate selected tab and button
    document.getElementById('panel-' + tabId).classList.add('active');
    if (event && event.target) {
      event.target.classList.add('active');
      event.target.setAttribute('aria-selected', 'true');
    } else {
      document.getElementById('tab-' + tabId).classList.add('active');
      document.getElementById('tab-' + tabId).setAttribute('aria-selected', 'true');
    }
  }

  // Form validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic validation
      let valid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });
      
      // Email validation
      const emailField = document.getElementById('email');
      if (emailField && emailField.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
          valid = false;
          emailField.classList.add('error');
        }
      }
      
      if (valid) {
        // In a real implementation, this would submit the form
        // For now, show a success message
        const formContainer = contactForm.parentElement;
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = '<h3>Thank you for your message!</h3><p>We will get back to you shortly.</p>';
        
        formContainer.innerHTML = '';
        formContainer.appendChild(successMessage);
      }
    });
  }

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Add fade-in animation to elements as they scroll into view
  const fadeElements = document.querySelectorAll('.section-header, .feature-card, .team-member, .stat-card');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    fadeElements.forEach(element => {
      element.classList.add('fade-in');
    });
  }

  // Add accessibility improvements for keyboard navigation
  const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
  focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
      this.classList.add('focus-visible');
    });
    element.addEventListener('blur', function() {
      this.classList.remove('focus-visible');
    });
  });
});
