// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

// Smooth scrolling for CTA and nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Counter animation function
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50; // Adjust speed
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '%';
    }, 30);
}

// Subtle animation for progress bars on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target.querySelector('.fill');
            const percentElement = entry.target.querySelector('.percentage');
            const targetWidth = fill.style.width;
            const targetPercent = parseInt(targetWidth);
            fill.style.width = '0';
            percentElement.textContent = '0%';
            setTimeout(() => {
                fill.style.width = targetWidth;
                animateCounter(percentElement, targetPercent);
            }, 200);
        }
    });
});

document.querySelectorAll('.skill-bar').forEach(bar => observer.observe(bar));

// Enhanced typing animation for hero text
const roles = [
    "Data Analyst",
    "Data Scientist",
    "Data Engineer",
    "Reporting Analyst",
    "Operations Analyst",
    "Marketing Analyst",
    "Financial Analyst"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 120;
const deletingSpeed = 80;
const pauseTime = 2500;

function typeWriter() {
    const currentRole = roles[roleIndex];
    const typingText = document.getElementById('typing-text');

    if (!isDeleting) {
        // Typing forward
        typingText.innerHTML = currentRole.substring(0, charIndex + 1) + '<span class="cursor"></span>';
        charIndex++;

        if (charIndex === currentRole.length) {
            // Finished typing, pause with blinking cursor
            setTimeout(() => {
                isDeleting = true;
                typeWriter();
            }, pauseTime);
            return;
        }
    } else {
        // Deleting backward
        typingText.innerHTML = currentRole.substring(0, charIndex - 1) + '<span class="cursor"></span>';
        charIndex--;

        if (charIndex === 0) {
            // Finished deleting, move to next role
            typingText.innerHTML = '<span class="cursor"></span>';
            setTimeout(() => {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeWriter();
            }, 500);
            return;
        }
    }

    setTimeout(typeWriter, isDeleting ? deletingSpeed : typingSpeed);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000);

    // Create floating particles for enhanced background
    document.querySelectorAll('.animated-bg').forEach(bg => {
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 6 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 15 + 15) + 's';
            bg.appendChild(particle);
        }
    });
});

// Fade in sections on scroll
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Form validation and feedback
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = this;
    const inputs = form.querySelectorAll('input, textarea');
    const errorMessage = document.getElementById('error-message');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.checkValidity()) {
            input.style.borderColor = '#ff6b6b';
            input.style.animation = 'shake 0.5s';
            setTimeout(() => input.style.animation = '', 500);
            isValid = false;
        } else {
            input.style.borderColor = '#00d4aa';
        }
    });

    if (!isValid) {
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';
        // Simulate form submission
        const submitBtn = form.querySelector('button');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.backgroundColor = '#28a745';
            form.reset();
            inputs.forEach(input => input.style.borderColor = 'rgba(255, 255, 255, 0.2)');

            setTimeout(() => {
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '';
            }, 3000);
        }, 1000);
    }
});

// Resume modal functionality
const resumeBtn = document.querySelector('.resume-btn');
const modal = document.getElementById('resume-modal');
const closeBtn = document.querySelector('.close');

resumeBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Back to top button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});