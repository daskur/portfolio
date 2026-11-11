// Mobile navigation
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen);
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

// Close the mobile menu when a link is clicked
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
    });
});

// Add a shadow to the header while scrolling
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
});

// Highlight the navigation link for the section currently on screen
const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {
    const scrollPosition = window.scrollY + 140;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === "#" + sectionId) {
                    link.classList.add("active");
                }
            });
        }
    });
}

window.addEventListener("scroll", updateActiveLink);

// Reveal elements when they enter the viewport
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach((element) => revealObserver.observe(element));

// Dark and light mode toggle
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector(".theme-icon");
const savedTheme = localStorage.getItem("portfolio-theme");

function applyTheme(theme) {
    const isDark = theme === "dark";
    document.body.classList.toggle("dark-mode", isDark);
    themeIcon.textContent = isDark ? "☀" : "☾";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

applyTheme(savedTheme || "light");

themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    const newTheme = isDark ? "dark" : "light";
    localStorage.setItem("portfolio-theme", newTheme);
    applyTheme(newTheme);
});

// Contact form validation
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formStatus = document.getElementById("formStatus");

function setError(input, message) {
    const formGroup = input.closest(".form-group");
    formGroup.classList.add("invalid");
    formGroup.querySelector(".error-message").textContent = message;
}

function clearError(input) {
    const formGroup = input.closest(".form-group");
    formGroup.classList.remove("invalid");
    formGroup.querySelector(".error-message").textContent = "";
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    let isValid = true;

    clearError(nameInput);
    clearError(emailInput);
    clearError(messageInput);
    formStatus.textContent = "";

    if (name === "") {
        setError(nameInput, "Please enter your name.");
        isValid = false;
    }

    if (email === "") {
        setError(emailInput, "Please enter your email address.");
        isValid = false;
    } else if (!validateEmail(email)) {
        setError(emailInput, "Please enter a valid email address.");
        isValid = false;
    }

    if (message === "") {
        setError(messageInput, "Please enter a message.");
        isValid = false;
    } else if (message.length < 10) {
        setError(messageInput, "Your message must be at least 10 characters.");
        isValid = false;
    }

    if (isValid) {
        formStatus.textContent = "Thank you! Your message is ready to be sent.";
        contactForm.reset();
    }
});

// Clear an error as soon as the user types in a field
[nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener("input", () => clearError(input));
});

// Display the current year in the footer
document.getElementById("year").textContent = new Date().getFullYear();
