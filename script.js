const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Animate skill bars when scrolled into view
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (isElementInViewport(bar)) {
            bar.style.width = width + '%';
        }
    });
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


// Copy email to clipboard
document.querySelector('.email-copy-btn').addEventListener('click', function(e) {
    e.preventDefault();
    const email = 'yash.aj303@gmail.com';
    
    navigator.clipboard.writeText(email).then(() => {
        // Show success message
        const originalText = this.querySelector('span').textContent;
        this.querySelector('span').textContent = 'Copied!';
        
        setTimeout(() => {
            this.querySelector('span').textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        const originalText = this.querySelector('span').textContent;
        this.querySelector('span').textContent = 'Copied!';
        
        setTimeout(() => {
            this.querySelector('span').textContent = originalText;
        }, 2000);
    });
});

// In your script.js, add this for touch devices:
document.addEventListener('touchstart', function() {}, {passive: true});

// Close menu when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    }
});

// Initial check on page load
window.addEventListener('load', animateSkillBars);

// Check on scroll
window.addEventListener('scroll', animateSkillBars);

