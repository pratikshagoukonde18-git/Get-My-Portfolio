// ==========================================
// TYPING EFFECT FOR NAME
// ==========================================
const typingText = document.querySelector('.typing-text');
const words = ["Pratiksha Goukonde!"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 100 : 150;

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start typing effect when page loads
document.addEventListener('DOMContentLoaded', typeEffect);


// ==========================================
// HAMBURGER MENU TOGGLE
// ==========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('#nav-menu li a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));


// ==========================================
// ABOUT SECTION - TAB SWITCHING
// ==========================================
const tabLinks = document.querySelectorAll('.tab-links');
const tabContents = document.querySelectorAll('.tab-contents');

function opentab(tabName) {
    // Remove active class from all links and contents
    tabLinks.forEach(link => link.classList.remove('active-link'));
    tabContents.forEach(content => content.classList.remove('active-tab'));
    
    // Add active class to clicked tab
    event.target.classList.add('active-link');
    document.getElementById(tabName).classList.add('active-tab');
}


// ==========================================
// SMOOTH SCROLLING FOR NAV LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================
const revealElements = document.querySelectorAll('.skill-card, .project-card, .about-content, .contact-content');

function reveal() {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', reveal);
// Trigger once on page load
reveal();


// ==========================================
// CONTACT FORM - SUBMIT TO GOOGLE SHEET
// ==========================================
const scriptURL = 'https://docs.google.com/spreadsheets/d/1on04CKqpWvRApIt9Ah7M1h9w95Qyz9cmup7unxBzo2I/edit?usp=sharing';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            msg.innerHTML = "Message sent successfully!";
            setTimeout(function(){
                msg.innerHTML = "";
            }, 5000);
            form.reset();
        })
        .catch(error => {
            msg.innerHTML = "Error! Message not sent.";
            setTimeout(function(){
                msg.innerHTML = "";
            }, 5000);
        });
});


// ==========================================
// STICKY NAVIGATION ON SCROLL
// ==========================================
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        nav.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});


// ==========================================
// ACTIVE LINK HIGHLIGHT ON SCROLL
// ==========================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});