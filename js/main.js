import Tab from './components/tab';
import Accordion from './components/accordion';
import Modal from './components/modal';

// Instantiate a tab
const tab = new Tab(document.querySelector('.tab'));

// Instantiate an accordion
const accordion = new Accordion(document.querySelector('.accordion-container'));

// Instantiate Login Modal
const modal = Modal({
  overlay: document.querySelector('.modal-overlay'),
  openButton: document.querySelector('#login'),
});
document.querySelector('#login').addEventListener('click', () => modal.open());

// Instantiate Mobile Navigation
const mobileNav = Modal({
  overlay: document.querySelector('.mobile-nav-overlay'),
  openButton: document.querySelector('#mobile-menu'),
});
document.querySelector('#mobile-menu').addEventListener('click', () => mobileNav.open());

// Download Cards (Intersection Observer API)
const reveal = (entries, observer) => {
  const [entry] = entries;

  if (entry.isIntersecting) {
    entry.target.classList.remove('opacity-0', 'translate-y-10');
    entry.target.classList.add('opacity-100', 'translate-y-0');
  }

  if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
    entry.target.classList.remove('opacity-100', 'translate-y-0');
    entry.target.classList.add('opacity-0', 'translate-y-10');
  }
};
document.querySelectorAll('.download').forEach((element) => {
  const observer = new IntersectionObserver(reveal, {
    root: null,
    threshold: 0.2,
  });

  observer.observe(element);
});

// Nav Link Smooth Scroll Behaviour
document.querySelector('.nav-links').addEventListener('click', (event) => {
  event.preventDefault();

  if (event.target.matches('.nav-link')) {
    const id = event.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Form submission
const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

const contactForm = document.querySelector('#contact-form');
const emailInput = contactForm.querySelector('input');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = emailInput.value.trim();

  emailInput.classList.remove('border-2', 'border-soft-red');
  contactForm.querySelector('svg').classList.add('hidden');
  contactForm.querySelector('.error').classList.add('hidden');

  if (!regex.test(email)) {
    emailInput.classList.add('border-2', 'border-soft-red');
    contactForm.querySelector('svg').classList.remove('hidden');
    contactForm.querySelector('.error').classList.remove('hidden');
    return;
  }
});
