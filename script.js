document.addEventListener("DOMContentLoaded", function () {
  const blowButton = document.getElementById('blowButton');
  const cakeVideo = document.getElementById('cakeVideo');
  const arch = document.getElementById('birthdayArch');
  const giftButton = document.getElementById('giftButton');
  const videoWrapper = document.getElementById('videoWrapper');
  const revealOverlay = document.getElementById('revealOverlay');

  blowButton.addEventListener('click', function () {
    cakeVideo.pause();
    cakeVideo.src = 'cake-blowout.mp4';
    cakeVideo.loop = false;
    cakeVideo.load();
    cakeVideo.play();

    blowButton.style.display = 'none';
    arch.style.display = 'none';

    cakeVideo.onended = function () {
      videoWrapper.classList.add('blurred');
      giftButton.style.display = 'block';
    };
  });

  giftButton.addEventListener('click', function () {
    revealOverlay.style.display = 'flex';
    setTimeout(() => {
      revealOverlay.style.opacity = '1';
    }, 50);

    startFireworks();
  });
});


function startFireworks() {
  const canvas = document.getElementById('fireworksCanvas');
  const ctx = canvas.getContext('2d');
  resizeCanvas();

  const particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);

  function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    const count = 100;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const speed = Math.random() * 3 + 2;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: `hsl(${Math.floor(Math.random() * 360)}, 100%, 60%)`
      });
    }
  }

  function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.01;
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();
      if (p.alpha <= 0) particles.splice(i, 1);
    });
    ctx.globalAlpha = 1.0;
    requestAnimationFrame(animate);
  }

  setInterval(createFirework, 800);
  animate();
}
