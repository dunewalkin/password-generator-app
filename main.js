const slider = document.querySelector(".slider");
const sliderValue = document.getElementById("rangeValue");
const parameterButton = document.querySelectorAll(".secondary-btn");
const strengthStatus = document.querySelector('.strength-status');
const squares = document.querySelectorAll('.square');

let activeButtons = 0;
let tempSliderValue = 0;

slider.addEventListener("input", (event) => {
   tempSliderValue = event.target.value; 
   sliderValue.textContent = tempSliderValue;
   
   const progress = (tempSliderValue / slider.max) * 100;
 
   slider.style.background = `linear-gradient(to right,hsl(var(--clr-primary-2)) ${progress}%, hsl(var(--clr-neutral-3)) ${progress}%)`;

   updateStylesForActiveButtons(activeButtons, tempSliderValue);
});

function updateStylesForActiveButtons(activeButtons, tempSliderValue) {
   const squaresToUpdate = document.querySelectorAll('.schematic-group .square');

   squaresToUpdate.forEach((square, index) => {
      if (activeButtons >= index + 1) {
         square.style.border = `2px solid ${getColor(activeButtons, tempSliderValue)}`;
         square.style.background = getColor(activeButtons, tempSliderValue);
      } else {
         square.style.border = '2px solid hsl(var(--clr-primary-1))';
         square.style.background = 'transparent';
      }
   });

   updateStrengthStatus(activeButtons, tempSliderValue);
}

function getColor(activeButtons, tempSliderValue) {
   if (activeButtons >= 4 && tempSliderValue >= 8) {
      return 'hsl(var(--clr-primary-2))';
   } else if (activeButtons >= 3 && tempSliderValue >= 6) {
      return 'hsl(var(--clr-password-3))';
   } else if (activeButtons >= 2 && tempSliderValue >= 4) {
      return 'hsl(var(--clr-password-2))';
   } else if (activeButtons >= 1 && tempSliderValue >= 1) {
      return 'hsl(var(--clr-password-1))';
   } else {
      return 'hsl(var(--clr-primary-1))';
   }
}

function updateStrengthStatus(activeButtons, tempSliderValue) {
   const strengthStatus = document.querySelector('.strength-status');
   
   if (activeButtons >= 4 && tempSliderValue >= 8) {
      strengthStatus.textContent = 'strong';
   } else if (activeButtons >= 3 && tempSliderValue >= 6) {
      strengthStatus.textContent = 'medium';
   } else if (activeButtons >= 2 && tempSliderValue >= 4) {
      strengthStatus.textContent = 'weak';
   } else if (activeButtons >= 1 && tempSliderValue >= 1) {
      strengthStatus.textContent = 'too weak!';
   } else {
      strengthStatus.textContent = '';
   }
}

parameterButton.forEach(button => {
   button.addEventListener('click', () => {
      button.classList.toggle('active-btn');
      
      activeButtons = document.querySelectorAll('.secondary-btn.active-btn').length;

      updateStylesForActiveButtons(activeButtons, tempSliderValue);
   });
});


const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

function getRandomCharacter(charSet) {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    return charSet[randomIndex];
}

function generatePassword(length, useUppercase, useLowercase, useNumbers, useSymbols) {
    let chars = '';
    if (useUppercase) chars += uppercaseChars;
    if (useLowercase) chars += lowercaseChars;
    if (useNumbers) chars += numberChars;
    if (useSymbols) chars += symbolChars;

    let password = '';
    for (let i = 0; i < length; i++) {
        password += getRandomCharacter(chars);
    }
    return password;
}

const generateButton = document.getElementById('generateButton');
generateButton.addEventListener('click', () => {
    const sliderValue = parseInt(document.getElementById('rangeValue').textContent);
    const useUppercase = document.querySelector('.uppercase-btn').classList.contains('active-btn');
    const useLowercase = document.querySelector('.lowercase-btn').classList.contains('active-btn');
    const useNumbers = document.querySelector('.number-button').classList.contains('active-btn');
    const useSymbols = document.querySelector('.symbols-btn').classList.contains('active-btn');

    const password = generatePassword(sliderValue, useUppercase, useLowercase, useNumbers, useSymbols);
    document.getElementById('passwordDisplay').textContent = password;
    document.getElementById('passwordDisplay').classList.add('output-active');
});


const copyButton = document.querySelector('.copy-btn');
const copiedText = document.querySelector('.copied-message');

copyButton.addEventListener('click', () => {
    const passwordDisplay = document.getElementById('passwordDisplay');
    if (passwordDisplay.classList.contains('output-active')) {
    const password = passwordDisplay.textContent;

    const textarea = document.createElement('textarea');
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        copiedText.removeAttribute('hidden');
        setTimeout(() => {
            copiedText.setAttribute('hidden', true);
        }, 2000); 
    } catch (err) {
        console.error('Unable to copy password to clipboard:', err);
    }

    document.body.removeChild(textarea);
   }
});





