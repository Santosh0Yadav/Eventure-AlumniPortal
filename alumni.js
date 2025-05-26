document.addEventListener('DOMContentLoaded', () => {
  // Smooth Scroll for Navigation Links
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').startsWith('#') ? link.getAttribute('href') : '#' + link.getAttribute('href').split('#')[1];
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 100, // Adjust for fixed header
          behavior: 'smooth'
        });
      }
    });
  });

  // Fade-In Animation for Sections
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    threshold: 0.1
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    section.classList.add('fade-out');
    sectionObserver.observe(section);
  });

  // Parallax Effect for Banner
  const banner = document.querySelector('#banner');
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    banner.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
  });

  // Enhanced Event Card Hover Effects
  const eventCards = document.querySelectorAll('.event');
  eventCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.05)';
      card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.1)';
    });
  });

  // Smooth Dropdown Transition
  const dropdown = document.querySelector('.nav-dropdown');
  const dropdownContent = document.querySelector('.nav-dropdown-content');
  dropdown.addEventListener('mouseenter', () => {
    dropdownContent.style.opacity = '1';
    dropdownContent.style.transform = 'translateY(0)';
  });
  dropdown.addEventListener('mouseleave', () => {
    dropdownContent.style.opacity = '0';
    dropdownContent.style.transform = 'translateY(-10px)';
  });

  // Form Submission Feedback
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      button.textContent = 'Submitting...';
      button.style.backgroundColor = '#4CAF50';
      setTimeout(() => {
        button.textContent = 'Submit';
        button.style.backgroundColor = '#262b2f';
        alert('Form submitted successfully! (This is a demo)');
      }, 1500);
    });
  });

  // Scroll Progress Bar
  const progressBar = document.createElement('div');
  progressBar.style.position = 'fixed';
  progressBar.style.top = '0';
  progressBar.style.left = '0';
  progressBar.style.width = '0';
  progressBar.style.height = '4px';
  progressBar.style.backgroundColor = '#00407f';
  progressBar.style.zIndex = '1001';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${scrollPercent}%`;
  });
});

// Additional CSS for Animations (Injected via JS)
const style = document.createElement('style');
style.textContent = `
  .fade-out {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  .fade-in {
    opacity: 1;
    transform: translateY(0);
  }
  .nav-dropdown-content {
    opacity: 0;
    transform: translateY(-10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  .event {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
`;
document.head.appendChild(style);