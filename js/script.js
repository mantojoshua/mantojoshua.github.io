document.addEventListener('DOMContentLoaded', (event) => {
  const element = document.getElementById('myName');
  typeEffect("Hello, I'm Joshua Manto", element);

  const backToTopButton = document.getElementById('backtotop');
  if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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