document.addEventListener("DOMContentLoaded", function () {
    const teamSection = document.querySelector(".team-section");
    const teamContainer = document.querySelector(".team-container");
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            teamContainer.classList.add("animate");
            observer.unobserve(teamSection); // Stop observing after animation triggers
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    );
  
    observer.observe(teamSection);
  });

  document.addEventListener('DOMContentLoaded', () => {
    // Configure the intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class to parent section
          entry.target.classList.add('visible');
          
          // Animate child elements with delays
          const children = entry.target.querySelectorAll('[data-reveal]');
          children.forEach((child, index) => {
            child.style.transitionDelay = `${index * 0.1}s`;
            child.classList.add('visible');
          });
          
          // Stop observing after animation
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2 // Trigger when 20% visible
    });
  
    // Observe all sections with data-reveal attribute
    document.querySelectorAll('[data-reveal]').forEach(section => {
      observer.observe(section);
    });
  });