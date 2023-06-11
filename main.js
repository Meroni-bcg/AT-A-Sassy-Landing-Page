// Get the canvas element
const canvas = document.getElementById('confetti');
const context = canvas.getContext('2d');

// Set the canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create an array to store the confetti particles
const confettiParticles = [];

// Function to create a confetti particle
function createConfettiParticle() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00']; // Customize the colors if desired
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    const size = Math.random() * 20 + 10; // Customize the size range if desired
    
    const x = Math.random() * canvas.width;
    const y = -size;

    const particle = {
        color,
        size,
        x,
        y,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 6 - 3,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 3 + 1,
    };

    confettiParticles.push(particle);
}

// Function to update and render the confetti particles
function updateConfettiParticles() {
    for (let i = 0; i < confettiParticles.length; i++) {
        const particle = confettiParticles[i];
        
        particle.y += particle.speedY;
        particle.x += particle.speedX;
        particle.rotation += particle.rotationSpeed;

        if (particle.y > canvas.height) {
            confettiParticles.splice(i, 1);
            i--;
        }
    }
}

// Function to render the confetti particles on the canvas
function renderConfettiParticles() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < confettiParticles.length; i++) {
        const particle = confettiParticles[i];
        
        context.save();
        context.translate(particle.x, particle.y);
        context.rotate((particle.rotation * Math.PI) / 180);
        context.fillStyle = particle.color;
        context.fillRect(-particle.size / 2, -particle.size / 2, particle.size
