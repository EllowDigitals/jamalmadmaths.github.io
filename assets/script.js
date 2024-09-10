// Function to generate a random hex color
const getRandomColor = () => `#${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')}`;

// Function to animate pixel colors
const animateColors = () => {
    document.querySelectorAll('.pushing-pixels div').forEach(pixel => {
        pixel.style.backgroundColor = getRandomColor();
    });
};

// Document ready event
document.addEventListener('DOMContentLoaded', function () {
    const scrollToContact = document.querySelector('.scroll-to-contact');
    const scrollProgress = document.getElementById('scrollProgress');
    const header = document.querySelector('header');

    // Function to check if the user has scrolled past the header
    function checkScroll() {
        const headerHeight = header.offsetHeight;
        const scrollY = window.scrollY;

        if (scrollY > headerHeight) {
            scrollToContact.style.display = 'block';
            scrollProgress.style.display = 'block';
        } else {
            scrollToContact.style.display = 'none';
            scrollProgress.style.display = 'none';
        }
    }

    // Check on page load and on scroll
    checkScroll();
    window.addEventListener('scroll', checkScroll);

    // Animate pixel colors at regular intervals
    animateColors(); // Initial color animation
    setInterval(animateColors, 500); // Change colors every 500ms

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // Remove the '#' from the href
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Scroll down button functionality
    const scrollDownBtn = document.querySelector('.scroll-down a');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Scroll button for dynamic scrolling direction
    const scrollButton = document.getElementById('scroll-button');
    if (scrollButton) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;

            if (scrollPosition + windowHeight >= documentHeight - 50) {
                // Change to "scroll up" at the bottom
                scrollButton.href = '#';
                scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
            } else {
                // Change to "scroll down" when not at the bottom
                scrollButton.href = '#contact';
                scrollButton.innerHTML = '<i class="fas fa-arrow-down"></i>';
            }
        });

        // Smooth scroll to top when clicking the "up" arrow
        scrollButton.addEventListener('click', function (e) {
            if (scrollButton.getAttribute('href') === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // Form validation with feedback
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (event) => {
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let valid = true;

            // Validate name
            if (name.value.trim() === '') {
                name.classList.add('error');
                valid = false;
            } else {
                name.classList.remove('error');
            }

            // Validate email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value.trim())) {
                email.classList.add('error');
                valid = false;
            } else {
                email.classList.remove('error');
            }

            // Validate message
            if (message.value.trim() === '') {
                message.classList.add('error');
                valid = false;
            } else {
                message.classList.remove('error');
            }

            // Prevent form submission if invalid
            if (!valid) {
                event.preventDefault();
                alert('Please fill out all required fields correctly.');
            }
        });
    }

    // Function to update the scroll progress bar width
    window.addEventListener('scroll', () => {
        const scrollProgress = document.getElementById('scrollProgress');
        if (scrollProgress) {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            scrollProgress.style.width = scrollPercentage + '%';
        }
    });
});

// Wait for the page to fully load
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '1';
        preloader.style.transition = 'opacity 0.5s ease-out';

        // Fade out preloader
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 500); // Matches the transition duration
        }, 0); // Ensure opacity change is applied before setting display to 'none'
    }
});
