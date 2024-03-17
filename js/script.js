document.addEventListener('DOMContentLoaded', (event) => {
    const element = document.getElementById('myName');
    typeEffect("Hello, I'm Joshua Manto", element);
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