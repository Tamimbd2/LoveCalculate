// DOM References
const name1Input = document.getElementById('name1');
const name2Input = document.getElementById('name2');
const calculateBtn = document.getElementById('calculateBtn');
const tryAgainBtn = document.getElementById('tryAgainBtn');
const calculatorDiv = document.getElementById('calculator');
const resultDiv = document.getElementById('result-display');
const percentageSpan = document.getElementById('percentage');
const messageP = document.getElementById('message');
const resultHeader = resultDiv.querySelector('h2');
const heartPath = resultDiv.querySelector('.heart-path');

// Events
calculateBtn.addEventListener('click', calculateLove);
tryAgainBtn.addEventListener('click', resetCalculator);

// Functions
function calculateLove() {
  const name1 = name1Input.value.trim();
  const name2 = name2Input.value.trim();

  if (name1 === '' || name2 === '') {
    alert('Please enter both names!');
    return;
  }

  calculatorDiv.classList.add('hidden');
  resultDiv.classList.remove('hidden');
  resultDiv.style.opacity = '0';

  startCalculationAnimation(name1, name2);
}

function resetCalculator() {
  resultDiv.classList.add('hidden');
  calculatorDiv.classList.remove('hidden');
  name1Input.value = '';
  name2Input.value = '';
  percentageSpan.textContent = '0%';
  percentageSpan.classList.add('opacity-0');
  resultHeader.textContent = 'Your Result is...';
  heartPath.style.animation = 'none';
  heartPath.offsetHeight;
  heartPath.style.animation = null;
}

function startCalculationAnimation(name1, name2) {
  setTimeout(() => {
    resultDiv.style.opacity = '1';
    heartPath.style.animation = 'draw-heart 3s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards';
  }, 100);

  setTimeout(() => {
    const score = calculateScore(name1, name2);
    animatePercentage(score);
  }, 2500);
}

function animatePercentage(finalScore) {
  percentageSpan.classList.remove('opacity-0');
  let currentScore = 0;
  const interval = setInterval(() => {
    currentScore++;
    percentageSpan.textContent = `${currentScore}%`;
    if (currentScore >= finalScore) {
      clearInterval(interval);
      messageP.textContent = getResultMessage(finalScore);
    }
  }, 30);
}

function calculateScore(n1, n2) {
  const combined = (n1 + n2).toLowerCase().replace(/ /g, '');
  let sum = 0;
  for (let i = 0; i < combined.length; i++) {
    sum += combined.charCodeAt(i);
  }
  return (sum % 61) + 40;
}

function getResultMessage(score) {
  if (score > 90) return "It's a perfect match! So sweet!";
  if (score > 80) return "You two are adorable together!";
  if (score > 70) return "A very strong and happy connection!";
  if (score > 60) return "There's a spark of something special.";
  if (score > 50) return "A good friendship is a great start!";
  return "Every great love story starts somewhere.";
}

// Background Hearts
const heartsContainer = document.getElementById('hearts-container');
const numHearts = 15;

for (let i = 0; i < numHearts; i++) {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.animationDelay = `${Math.random() * 8}s`;
  const size = Math.random() * 20 + 10;
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  heart.style.opacity = Math.random() * 0.5 + 0.2;
  heartsContainer.appendChild(heart);
}
