const canvas = document.getElementById('qrcode');
canvas.width = 500;   // increased from 300
canvas.height = 500;  // increased from 300

const message = "TARA TAGAY"; // hidden message

// Gradient colors for smooth transition
const gradientColors = [
    ['#ff4d6d', '#ffb84d'],
    ['#4dff4d', '#4d4dff'],
    ['#ff4dff', '#00ffff'],
    ['#ffff4d', '#ff4d4d']
];

let step = 0;
const stepsPerTransition = 60; // smooth transition frames
let currentColors = gradientColors[0];
let nextColors = gradientColors[1];

// Interpolate between two colors
function interpolateColor(c1, c2, factor) {
    const parse = c => c.match(/\w\w/g).map(x => parseInt(x, 16));
    const [r1,g1,b1] = parse(c1.slice(1));
    const [r2,g2,b2] = parse(c2.slice(1));
    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);
    return `rgb(${r},${g},${b})`;
}

// Animate QR code with gradient
function animateQR() {
    let factor = step / stepsPerTransition;
    let color = interpolateColor(currentColors[0], nextColors[0], factor);
    let lightColor = interpolateColor(currentColors[1], nextColors[1], factor);

    QRCode.toCanvas(canvas, message, { color: { dark: color, light: lightColor } }, (err) => {
        if (err) console.error(err);
    });

    step++;
    if (step > stepsPerTransition) {
        step = 0;
        currentColors = nextColors;
        nextColors = gradientColors[Math.floor(Math.random() * gradientColors.length)];
    }
    requestAnimationFrame(animateQR);
}

animateQR();
