
document.addEventListener("DOMContentLoaded", function() {
  const slides = document.querySelectorAll(".slider img");
  const navLinks = document.querySelectorAll(".slider-nav a");
  let currentIndex = 0;

  function showSlide(index) {
      // Move slides based on current index
      slides.forEach((slide, i) => {
          slide.style.display = i === index ? "block" : "none"; // Show current slide
          navLinks[i].classList.toggle("active", i === index); // Highlight active nav link
      });
  }

  function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length; // Loop back to the first slide
      showSlide(currentIndex);
  }

  // Event listener for manual navigation
  navLinks.forEach((link, index) => {
      link.addEventListener("click", (event) => {
          event.preventDefault(); // Prevent default anchor behavior
          currentIndex = index; // Update current index
          showSlide(currentIndex); // Show selected slide
      });
  });

  // Initialize the first slide
  showSlide(currentIndex);

  // Set interval for the slider to move every 2 seconds
  setInterval(nextSlide, 2000); // 2000 milliseconds = 2 seconds
});


  const toggleButton = document.getElementById('dark-mode-toggle');
  const body = document.body;

  toggleButton.addEventListener('click', () => {
      // Toggle dark-mode class on body
      body.classList.toggle('dark-mode');

      // Update the button text based on current mode
      if (body.classList.contains('dark-mode')) {
          toggleButton.textContent = 'Light Mode';
      } else {
          toggleButton.textContent = 'Dark Mode';
      }
  });

