// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 1000);
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
    if (!mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      mobileMenuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
    }
  });
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  const icon = mobileMenuToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

// Sticky header effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Scroll animation for sections
const fadeInElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

fadeInElements.forEach(element => {
  observer.observe(element);
});

// Portfolio slider
const slider = document.getElementById('portfolio-slider');
const slides = document.querySelectorAll('.portfolio-slide');
const prevButton = document.getElementById('prev-slide');
const nextButton = document.getElementById('next-slide');
let currentIndex = 0;

function updateSlider() {
  const offset = window.innerWidth < 768 ? -currentIndex * 100 : -currentIndex * 33.33;
  slider.style.transform = `translateX(${offset}%)`;
}

prevButton.addEventListener('click', () => {
  currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
  updateSlider();
});

nextButton.addEventListener('click', () => {
  currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
  updateSlider();
});

// Modal for portfolio images
const modal = document.getElementById('portfolio-modal');
const modalImage = document.getElementById('modal-image');
const closeModal = document.getElementById('close-modal');
const portfolioItems = document.querySelectorAll('.portfolio-slide .group');

portfolioItems.forEach(item => {
  item.addEventListener('click', () => {
    modalImage.src = item.dataset.image;
    modal.classList.remove('hidden');
  });
});

closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

// Contact form validation
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  let isValid = true;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Reset error messages
  document.querySelectorAll('.error').forEach(error => error.classList.add('hidden'));

  // Validate inputs
  if (!nameInput.value.trim()) {
    nameInput.nextElementSibling.classList.remove('hidden');
    isValid = false;
  }
  if (!emailInput.value.trim() || !emailPattern.test(emailInput.value)) {
    emailInput.nextElementSibling.classList.remove('hidden');
    isValid = false;
  }
  if (!messageInput.value.trim()) {
    messageInput.nextElementSibling.classList.remove('hidden');
    isValid = false;
  }

  if (isValid) {
    successMessage.classList.remove('hidden');
    contactForm.reset();
    setTimeout(() => {
      successMessage.classList.add('hidden');
    }, 3000);
  }
});