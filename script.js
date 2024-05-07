const letters = "0123456789";

let interval = null;
let isRolling = false;

const rollingNumber = document.querySelector("h1");

document.addEventListener("touchstart", handleTouchStart);
document.addEventListener("touchend", handleTouchEnd);

function handleTouchStart() {
    if (!isRolling) {
        startRolling();
    } else {
        stopRolling();
    }
}

function handleTouchEnd(event) {
    event.preventDefault(); // Prevent default touchend behavior (e.g., scrolling)
}

function startRolling() {
    isRolling = true;
    rollingNumber.classList.remove('stopped');

    clearInterval(interval);

    interval = setInterval(() => {
        const rollingDigits = rollingNumber.innerText.split("");
        const newDigits = rollingDigits.map(() => getRandomDigit());

        // Update the rolling number
        rollingNumber.innerText = newDigits.join("");

        // Apply fade-in animation to each digit
        newDigits.forEach((digit, index) => {
            setTimeout(() => {
                const digitSpan = document.createElement('span');
                digitSpan.textContent = digit;
                digitSpan.classList.add('rolling-digit', 'fade-in');
                rollingNumber.replaceChild(digitSpan, rollingNumber.children[index]);
            }, index * 100); // Adjust the duration based on the position of the digit
        });
    }, 80); // Change the interval duration (in milliseconds) for a slower roll
}

function stopRolling() {
    clearInterval(interval);
    isRolling = false;
    rollingNumber.classList.add('stopped');
}

function getRandomDigit() {
    return letters[Math.floor(Math.random() * 10)];
}
