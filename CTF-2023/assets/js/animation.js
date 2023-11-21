const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 20;
const columns = Math.floor(canvas.width / fontSize);
const drops = [];
const phrase = "Flag Crack The";
const phraseLength = phrase.length;
let currentLetterIndex = 0;
const dropSpeed = 1;

for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * canvas.height);
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#FF0000';

    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        if (currentLetterIndex >= phraseLength) {
            currentLetterIndex = 0;
        }

        const text = phrase[currentLetterIndex];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i] += dropSpeed;
    }

    currentLetterIndex++;
}

function animateMatrix() {
    drawMatrix();
    requestAnimationFrame(animateMatrix);
}


window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height);
    }
});

animateMatrix();