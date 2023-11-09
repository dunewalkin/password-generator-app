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
   const strengthStatus = document.querySelector('.strength-status');

   if (activeButtons >= 4 && tempSliderValue >= 8) {
      squaresToUpdate.forEach(square => {
         square.style.border = '2px solid hsl(var(--clr-primary-2))';
         square.style.background = 'hsl(var(--clr-primary-2))';
      });
      strengthStatus.textContent = 'strong';
   } else if (activeButtons >= 3 && tempSliderValue >= 6) {
      squaresToUpdate.forEach((square, index) => {
         if (index < 3) {
            square.style.border = '2px solid hsl(var(--clr-password-3))';
            square.style.background = 'hsl(var(--clr-password-3))';
         } else {
            square.style.border = `2px solid hsl(var(--clr-primary-1))`;
            square.style.background = 'transparent';
         }
      });
      strengthStatus.textContent = 'medium';
   } else if (activeButtons >= 2 && tempSliderValue >= 4) {
      squaresToUpdate.forEach((square, index) => {
         if (index < 2) {
            square.style.border = '2px solid hsl(var(--clr-password-2))';
            square.style.background = 'hsl(var(--clr-password-2))';
         } else {
            square.style.border = `2px solid hsl(var(--clr-primary-1))`;
            square.style.background = 'transparent';
         }
      });
      strengthStatus.textContent = 'weak';
   } else if (activeButtons >= 1 && tempSliderValue >= 1) {
      squaresToUpdate.forEach((square, index) => {
         if (index === 0) {
            square.style.border = '2px solid hsl(var(--clr-password-1))';
            square.style.background = 'hsl(var(--clr-password-1))';
         } else {
            square.style.border = `2px solid hsl(var(--clr-primary-1))`;
            square.style.background = 'transparent';
         }
      });
      strengthStatus.textContent = 'too weak!';
   } else {
      squaresToUpdate.forEach(square => {
         square.style.border = `2px solid hsl(var(--clr-primary-1))`;
         square.style.background = 'transparent';
      });
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





