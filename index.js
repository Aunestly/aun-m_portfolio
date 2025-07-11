document.addEventListener('DOMContentLoaded', () => {
  // --- High-tech background spotlight effect ---
  document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  });

  // --- 3D interactive card effect ---
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const cardEl = e.currentTarget;
      const rect = cardEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
      const rotateY = ((x - centerX) / centerX) * 10; // Max rotation 10deg

      cardEl.style.setProperty('--card-rotate-x', `${rotateX}deg`);
      cardEl.style.setProperty('--card-rotate-y', `${rotateY}deg`);
    });

    card.addEventListener('mouseleave', (e) => {
      const cardEl = e.currentTarget;
      cardEl.style.setProperty('--card-rotate-x', '0deg');
      cardEl.style.setProperty('--card-rotate-y', '0deg');
    });
  });


  // --- Observer for active navigation link highlighting ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a');

  const navObserverOptions = {
    root: null,
    rootMargin: '-81px 0px -50% 0px', // top margin is header height + 1px
    threshold: 0,
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const navLink = document.querySelector(`.main-nav a[href="#${id}"]`);
      
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLink) {
          navLink.classList.add('active');
        }
      }
    });
  }, navObserverOptions);

  sections.forEach(section => {
    navObserver.observe(section);
  });

  // --- Observer for scroll animations ---
  const animatedElements = document.querySelectorAll('[data-scroll-animate]');

  const animationObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      // Add a staggered delay for list items
      if (entry.target.tagName === 'LI') {
        entry.target.style.setProperty('--i', index.toString());
      }

      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, animationObserverOptions);

  animatedElements.forEach(el => {
    animationObserver.observe(el);
  });
});
