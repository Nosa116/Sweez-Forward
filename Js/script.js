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
