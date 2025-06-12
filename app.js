// MIST Cash Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initScrollAnimations();
    initInteractiveElements();
    initProgressiveDisclosure();
});

// Smooth scrolling functionality
function initSmoothScrolling() {
    // Hero CTA button scroll to problem section
    const heroCTA = document.querySelector('.hero-cta');
    if (heroCTA) {
        heroCTA.addEventListener('click', function(e) {
            e.preventDefault();
            const problemSection = document.getElementById('problem');
            if (problemSection) {
                problemSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // CTA section buttons
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.textContent.trim() === 'Learn More') {
                // Scroll back to top to show the complete journey
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else if (this.textContent.trim() === 'Contact Us') {
                // Create a simple contact modal or alert
                showContactInfo();
            }
        });
    });
}

// Scroll-triggered animations using Intersection Observer
function initScrollAnimations() {
    // Create intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in classes and observe elements
    const animatedElements = [
        '.problem-stats .stat-card',
        '.solution-components .component-card',
        '.feature-content',
        '.feature-visual',
        '.workflow-step',
        '.comparison-table',
        '.compliance-card'
    ];

    animatedElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.classList.add('fade-in');
            element.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(element);
        });
    });

    // Special animations for feature sections
    const ledgerContent = document.querySelector('#ledger .feature-content');
    const ledgerVisual = document.querySelector('#ledger .feature-visual');
    if (ledgerContent && ledgerVisual) {
        ledgerContent.classList.add('slide-in-left');
        ledgerVisual.classList.add('slide-in-right');
        observer.observe(ledgerContent);
        observer.observe(ledgerVisual);
    }

    const chamberContent = document.querySelector('#chamber .feature-content');
    const chamberVisual = document.querySelector('#chamber .feature-visual');
    if (chamberContent && chamberVisual) {
        chamberContent.classList.add('slide-in-right');
        chamberVisual.classList.add('slide-in-left');
        observer.observe(chamberContent);
        observer.observe(chamberVisual);
    }
}

// Interactive elements and hover effects
function initInteractiveElements() {
    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.stat-card, .component-card, .compliance-card, .workflow-step');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(0, 245, 255, 0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Interactive privacy icons in hero
    const privacyIcons = document.querySelectorAll('.privacy-icon');
    privacyIcons.forEach((icon, index) => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.boxShadow = '0 10px 30px rgba(0, 245, 255, 0.3)';
        });

        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '';
        });

        // Add click interaction
        icon.addEventListener('click', function() {
            showIconInfo(index);
        });
    });

    // Interactive comparison table highlighting
    const comparisonRows = document.querySelectorAll('.comparison-row');
    comparisonRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            if (!this.classList.contains('highlight')) {
                this.style.backgroundColor = 'rgba(0, 245, 255, 0.02)';
            }
        });

        row.addEventListener('mouseleave', function() {
            if (!this.classList.contains('highlight')) {
                this.style.backgroundColor = '';
            }
        });
    });
}

// Progressive disclosure for complex content
function initProgressiveDisclosure() {
    // Animated counters for stats (if numbers were present)
    animateOnScroll('.stat-card', (element) => {
        element.style.transform = 'scale(1.05)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    });

    // Sequential reveal of workflow steps
    const workflowSteps = document.querySelectorAll('.workflow-step');
    const workflowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const steps = Array.from(workflowSteps);
                steps.forEach((step, index) => {
                    setTimeout(() => {
                        step.classList.add('visible');
                        step.style.opacity = '1';
                        step.style.transform = 'translateY(0)';
                    }, index * 300);
                });
                workflowObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (workflowSteps.length > 0) {
        workflowSteps.forEach(step => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(30px)';
        });
        workflowObserver.observe(workflowSteps[0]);
    }

    // Progressive reveal of privacy features in comparison
    const privacyItems = document.querySelectorAll('.privacy-item');
    privacyItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.05}s`;
    });
}

// Utility function for scroll-based animations
function animateOnScroll(selector, animationFunction) {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animationFunction(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    elements.forEach(element => observer.observe(element));
}

// Show contact information
function showContactInfo() {
    // Create a simple modal-like alert with contact information
    const contactInfo = `
        📧 Contact MIST Cash
        
        For more information about MIST Cash:
        • Technical inquiries: tech@mistcash.com
        • Business partnerships: business@mistcash.com
        • General questions: hello@mistcash.com
        
        Follow our development:
        • GitHub: github.com/mistcash
        • Twitter: @mistcash
        • Documentation: docs.mistcash.com
    `;
    
    alert(contactInfo);
}

// Show privacy icon information
function showIconInfo(index) {
    const iconInfo = [
        "🔒 Confidentiality: Your transaction amounts are encrypted and private",
        "🛡️ Anonymity: Your identity is protected through advanced cryptographic techniques", 
        "✅ Compliance: Full regulatory compliance with auditable privacy features"
    ];
    
    if (iconInfo[index]) {
        // Create a tooltip-like display
        showTooltip(iconInfo[index]);
    }
}

// Simple tooltip display
function showTooltip(message) {
    // Remove existing tooltip
    const existingTooltip = document.querySelector('.tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }

    // Create new tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = message;
    tooltip.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 245, 255, 0.95);
        color: #0a0a23;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 1000;
        max-width: 300px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: fadeIn 0.3s ease-out;
    `;

    document.body.appendChild(tooltip);

    // Remove tooltip after 3 seconds
    setTimeout(() => {
        if (tooltip) {
            tooltip.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => tooltip.remove(), 300);
        }
    }, 3000);
}

// Add CSS for tooltip animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        to { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
    }
`;
document.head.appendChild(style);

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #00f5ff, #00ff88);
        z-index: 9999;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress on load
addScrollProgress();

// Smooth reveal for section transitions
function initSectionTransitions() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize section transitions after a short delay
setTimeout(initSectionTransitions, 500);