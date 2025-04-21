// Scroll-triggered animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('active', entry.isIntersecting);
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

// Team card delays
document.querySelectorAll('.team-card').forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
});

// Marquee functionality
const sponsorsWrapper = document.querySelector('.sponsors-wrapper');
const sponsorsList = document.querySelector('.sponsors');
const items = Array.from(sponsorsList.children);
const cloneCount = Math.ceil(sponsorsWrapper.offsetWidth / (items[0].offsetWidth + 20)) + 1; // Dynamic clone count

// Clone items enough to fill container
sponsorsList.append(...Array(cloneCount).fill().flatMap(() => 
  items.map(item => item.cloneNode(true))
));

let scrollPos = 0;
const scrollSpeed = 1; // Adjust for desired speed

function animate() {
  scrollPos += scrollSpeed;
  if (scrollPos >= sponsorsList.scrollWidth / 2) {
    scrollPos = 0;
  }
  sponsorsWrapper.scrollLeft = scrollPos;
  requestAnimationFrame(animate);
}
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

// Start animation when visible
const marqueeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animate();
    } else {
      scrollPos = entry.target.scrollLeft;
    }
  });
});

marqueeObserver.observe(sponsorsWrapper);