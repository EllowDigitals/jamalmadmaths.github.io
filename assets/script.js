// Wait for the page to fully load
window.addEventListener('load', () => {
    // Hide the preloader after the page is fully loaded
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s ease-out';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500); // Delay to match the transition duration
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


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

        // If form is not valid, prevent submission
        if (!valid) {
            event.preventDefault(); // Prevent form submission
            alert('Please fill out all required fields correctly.');
        }
    });
}
