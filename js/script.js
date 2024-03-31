document.addEventListener('DOMContentLoaded', (event) => {
  const element = document.getElementById('myName');
  typeEffect("Hello, I'm Joshua Manto", element);

  const backToTopButton = document.getElementById('backtotop');

  if (backToTopButton) {
    backToTopButton.style.display = 'none'; // Hide the button initially

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 100) { // Show the button if the page is scrolled down by 100px or more
        backToTopButton.style.display = 'block';
      } else { // Hide the button if the page is scrolled back to the top
        backToTopButton.style.display = 'none';
      }
    });
  }
});

function typeEffect(text, element) {
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
    }
  }, 100);
}