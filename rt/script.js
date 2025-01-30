const roulette = document.querySelector('.roulette');
const fruitName = document.getElementById('fruit-name');
const fruitDescription = document.getElementById('fruit-description');
const flipSound = document.getElementById('flip-sound');

const fruits = [
  { name: "Lemon", description: "A sour and tangy citrus fruit.", letter: "L", color:"#fff80d" },
  { name: "Banana", description: "A long and yellow fruit.", letter: "B", color:"#eace00" },
  { name: "Pear", description: "A sweet and juicy fruit with a grainy texture.", letter: "P", color:"#a7ca00" },
  { name: "Grapes", description: "Small, juicy, and often used to make wine.", letter: "G", color:"#650082" },
  { name: "Apple", description: "A sweet and crunchy fruit.", letter: "A", color:"#e81e25" },
  { name: "Plum", description: "A sweet and slightly tart stone fruit.", letter: "P", color:"#660057" }
];

let currentIndex = 0;
const totalItems = fruits.length;
const angleIncrement = 360 / totalItems;

// Position letters around the roulette
function positionRouletteItems() {
  const items = document.querySelectorAll('.roulette-item');
  const radius = 250; // Distance from the center
  items.forEach((item, index) => {
    const angle = index * angleIncrement;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    item.style.transform = `translate(${x}px, ${y}px) rotate(${angle + 90}deg)`; // Adjust rotation
  });
}

// Update fruit info based on the selected letter
function updateFruitInfo(index) {
  fruitName.textContent = fruits[index].name;
  fruitDescription.textContent = fruits[index].description;
  fruitName.style.color = fruits[index].color;
}

// Highlight the selected letter
function highlightSelectedLetter(index) {
  const items = document.querySelectorAll('.roulette-item');
  items.forEach((item, i) => {
    item.classList.toggle('selected', i === index);
  });
}

// Play the flip sound
function playFlipSound() {
  flipSound.currentTime = 0; // Reset sound to start
  flipSound.play();
}

// Rotate the roulette
function rotateRoulette() {
  const rotation = -currentIndex * angleIncrement;
  roulette.style.transform = `rotate(${rotation - 90}deg)`; // Adjust for 9 o'clock position
}

// Handle click on a roulette item
function handleRouletteItemClick(index) {
  currentIndex = index;
  updateFruitInfo(currentIndex);
  highlightSelectedLetter(currentIndex);
  rotateRoulette();
  playFlipSound();
}

// Add click event listeners to roulette items
function addRouletteItemClickListeners() {
  const items = document.querySelectorAll('.roulette-item');
  items.forEach((item, index) => {
    item.addEventListener('click', () => handleRouletteItemClick(index));
  });
}

// Handle mouse wheel scroll
roulette.addEventListener('wheel', (event) => {
  event.preventDefault();
  if (event.deltaY > 0) {
    currentIndex = (currentIndex + 1) % totalItems; // Scroll down
  } else {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems; // Scroll up
  }
  updateFruitInfo(currentIndex);
  highlightSelectedLetter(currentIndex);
  rotateRoulette();
  playFlipSound(); // Play sound on scroll
});

// Initialize
positionRouletteItems();
updateFruitInfo(currentIndex);
highlightSelectedLetter(currentIndex);
rotateRoulette();
addRouletteItemClickListeners(); // Add click listeners