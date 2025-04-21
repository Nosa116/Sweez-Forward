// Scroll-triggered animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

// Observe all elements with reveal class
document.querySelectorAll('.reveal').forEach((element) => {
  observer.observe(element);
});

// Handle team card delays
document.querySelectorAll('.team-card').forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
  observer.observe(card);
});

// Hamburger Menu Functionality
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');

if (hamburger && mainNav) {
  // Toggle menu on hamburger click
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      hamburger.classList.toggle('active');
      mainNav.classList.toggle('active');
    }
  });

  // Close menu when clicking outside (mobile only)
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && mainNav.classList.contains('active')) {
      if (!mainNav.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        mainNav.classList.remove('active');
      }
    }
  });

  // Close menu on link click (mobile only)
  document.querySelectorAll('#mainNav a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        hamburger.classList.remove('active');
        mainNav.classList.remove('active');
      }
    });
  });

  // Reset menu on window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      hamburger.classList.remove('active');
      mainNav.classList.remove('active');
    }
  });
}

// Sponsor Marquee Logic
const sponsorsWrapper = document.querySelector('.sponsors-wrapper');
const sponsorsList = document.querySelector('.sponsors');

// Clone sponsor logos once
const items = Array.from(sponsorsList.children);
items.forEach(item => {
  const clone = item.cloneNode(true);
  sponsorsList.appendChild(clone);
});

const scrollSpeed = 1; // Adjust speed here

function scrollMarquee() {
  sponsorsWrapper.scrollLeft += scrollSpeed;
  const maxScroll = sponsorsList.scrollWidth / 2;
  if (sponsorsWrapper.scrollLeft >= maxScroll) {
    sponsorsWrapper.scrollLeft -= maxScroll;
  }
  requestAnimationFrame(scrollMarquee);
}

scrollMarquee();