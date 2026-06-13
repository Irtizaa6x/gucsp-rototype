/**
 * GUCC Cyber Security Society - Main JavaScript
 * Handles: Mobile menu, active page highlighting, countdown timer,
 *          animated statistics, smooth scrolling, navbar effects, contact form
 * Version: 1.0.0
 */

// ==================== WAIT FOR DOM TO LOAD ====================
document.addEventListener('DOMContentLoaded', function() {
    "use strict";

    // ==================== MOBILE MENU TOGGLE ====================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
            // Prevent body scroll when menu is open (mobile)
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (navToggle) {
                    const icon = navToggle.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                }
                document.body.style.overflow = '';
            }
        });
    });

    // ==================== ACTIVE PAGE HIGHLIGHTING ====================
    // Get current page filename (e.g., "index.html", "events.html")
    let currentPage = window.location.pathname.split('/').pop();
    if (currentPage === '' || currentPage === '/') currentPage = 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else if (currentPage === 'index.html' && href === 'index.html') {
            link.classList.add('active');
        } else if (currentPage === '' && href === 'index.html') {
            link.classList.add('active');
        }
    });

    // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
    // For homepage internal section links (e.g., #about, #events)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (navToggle) {
                        const icon = navToggle.querySelector('i');
                        if (icon) {
                            icon.classList.add('fa-bars');
                            icon.classList.remove('fa-times');
                        }
                    }
                    document.body.style.overflow = '';
                }
                // Scroll to target with offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== COUNTDOWN TIMER ====================
    // Target date: June 10, 2026 (you can change this)
    const targetDate = new Date(2026, 5, 10, 0, 0, 0); // Year, Month (0-11), Day, Hour, Minute, Second
    
    function updateCountdown() {
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        // Only run if countdown elements exist on the page
        if (!daysEl) return;
        
        const now = new Date();
        const difference = targetDate - now;
        
        if (difference <= 0) {
            daysEl.innerText = '00';
            hoursEl.innerText = '00';
            minutesEl.innerText = '00';
            secondsEl.innerText = '00';
            return;
        }
        
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (86400000)) / (3600000));
        const minutes = Math.floor((difference % (3600000)) / (60000));
        const seconds = Math.floor((difference % (60000)) / 1000);
        
        daysEl.innerText = days.toString().padStart(2, '0');
        hoursEl.innerText = hours.toString().padStart(2, '0');
        minutesEl.innerText = minutes.toString().padStart(2, '0');
        secondsEl.innerText = seconds.toString().padStart(2, '0');
    }
    
    // Update every second
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ==================== ANIMATED COUNTERS (Intersection Observer) ====================
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;
    
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersStarted) {
                    countersStarted = true;
                    statNumbers.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-target'));
                        if (isNaN(target)) return;
                        let current = 0;
                        const increment = target / 50; // Smooth animation over ~50 frames
                        const updateCounter = () => {
                            current += increment;
                            if (current < target) {
                                counter.innerText = Math.floor(current);
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        updateCounter();
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        // Observe the stats section
        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    // ==================== NAVBAR SCROLL EFFECT ====================
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(5, 5, 16, 0.98)';
                navbar.style.backdropFilter = 'blur(15px)';
            } else {
                navbar.style.background = 'rgba(5, 5, 16, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        });
    }

    // ==================== HERO SCROLL BUTTON ====================
    const scrollBtn = document.querySelector('.hero-scroll');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', function() {
            const featuresSection = document.querySelector('.features');
            if (featuresSection) {
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                const targetPosition = featuresSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // ==================== CONTACT FORM HANDLER ====================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simple validation
            const nameInput = this.querySelector('input[placeholder*="Name"]');
            const emailInput = this.querySelector('input[type="email"]');
            const messageInput = this.querySelector('textarea');
            
            if (nameInput && nameInput.value.trim() === '') {
                alert('Please enter your name.');
                nameInput.focus();
                return;
            }
            if (emailInput && emailInput.value.trim() === '') {
                alert('Please enter your email address.');
                emailInput.focus();
                return;
            }
            if (emailInput && !isValidEmail(emailInput.value.trim())) {
                alert('Please enter a valid email address.');
                emailInput.focus();
                return;
            }
            if (messageInput && messageInput.value.trim() === '') {
                alert('Please enter your message.');
                messageInput.focus();
                return;
            }
            
            // Success message (you can replace with actual AJAX submission later)
            alert('Thank you! Your message has been sent successfully. We will get back to you soon.');
            this.reset();
        });
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const re = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
        return re.test(email);
    }

    // ==================== ADD SCROLL REVEAL FOR FADE-IN ELEMENTS ====================
    // (Optional: ensures fade-in elements become visible if they were hidden due to CSS)
    const fadeElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    if (fadeElements.length) {
        // The CSS animation already triggers on load, but we can add a fallback
        // For elements that might have been hidden, we do nothing – CSS handles it.
    }

    // ==================== ADD HOVER EFFECT ON ACTIVITY CARDS (already in CSS) ====================
    
    // ==================== REMOVE BODY OVERFLOW ON WINDOW RESIZE (mobile menu fix) ====================
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) {
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
            document.body.style.overflow = '';
        }
    });
    
    // ==================== LOG THAT SCRIPT IS LOADED (optional) ====================
    console.log('GUCC Cyber Security Society website loaded successfully.');
});
