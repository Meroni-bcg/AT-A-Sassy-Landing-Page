import React, { useEffect, useState } from 'react';

const ConfettiDrop = () => {
  const [confettiParticles, setConfettiParticles] = useState([]);

  useEffect(() => {
    const canvas = document.getElementById('confetti');
    const context = canvas.getContext('2d');
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00']; // Customize the colors if desired
    const maxParticles = 100;
    let requestId;

    const createConfettiParticle = () => {
      if (confettiParticles.length >= maxParticles) return;
      const size = Math.random() * 20 + 10; // Customize the size range if desired
      const x = Math.random() * canvas.width;
      const y = -size;

      const particle = {
        color: colors[Math.floor(Math.random() * colors.length)],
        size,
        x,
        y,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 6 - 3,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 3 + 1,
      };

      setConfettiParticles((prevParticles) => [...prevParticles, particle]);
    };

    const updateConfettiParticles = () => {
      setConfettiParticles((prevParticles) =>
        prevParticles.filter((particle) => particle.y <= canvas.height)
      );
    };

    const renderConfettiParticles = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      confettiParticles.forEach((particle) => {
        const { color, size, x, y, rotation } = particle;

        context.save();
        context.translate(x, y);
        context.rotate((rotation * Math.PI) / 180);
        context.fillStyle = color;
        context.fillRect(-size / 2, -size / 2, size, size);
        context.restore();
      });
    };

    const animateConfetti = () => {
      updateConfettiParticles();
      renderConfettiParticles();
      createConfettiParticle();

      requestId = requestAnimationFrame(animateConfetti);
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    animateConfetti();

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, []);

  return <canvas id="confetti" style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999 }} />;
};

export default ConfettiDrop;

