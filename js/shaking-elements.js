// Function to add and remove the 'shake' class for a brief shake effect
function shakeElement(element, interval) {
    setInterval(() => {
      element.classList.add('shake'); // Add shake class
      setTimeout(() => {
        element.classList.remove('shake'); // Remove shake class after 0.5 seconds
      }, 500); // Shake duration
    }, interval); // Shake interval
  }

  // Get elements by tag name
  const headings = document.querySelectorAll('h1, h2, h3');
  const paragraphs = document.querySelectorAll('p');
  const images = document.querySelectorAll('img');
  const buttons = document.querySelectorAll('button');
  const divs = document.querySelectorAll('div');

  // Apply shake effect to each type of element with different offsets
  headings.forEach((heading, index) => {
    shakeElement(heading, 3000 + index * 500); // Shake every 3 to 3.5 seconds for headings
  });

  paragraphs.forEach((paragraph, index) => {
    shakeElement(paragraph, 4000 + index * 500); // Shake every 4 to 4.5 seconds for paragraphs
  });

  images.forEach((image, index) => {
    shakeElement(image, 5000 + index * 500); // Shake every 5 to 5.5 seconds for images
  });

  buttons.forEach((button, index) => {
    shakeElement(button, 6000 + index * 500); // Shake every 6 to 6.5 seconds for buttons
  });

  divs.forEach((div, index) => {
    shakeElement(div, 7000 + index * 500); // Shake every 7 to 7.5 seconds for divs
  });
