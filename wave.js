class Wave {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.particles = [];
    this.numberOfParticles = 100;
    this.mouseX = this.width / 2;
    this.mouseY = this.height / 2;
    this.colors = ["#fec86a", "#fec86a33"]; // Primary color and its transparent version

    this.init();
    this.bindEvents();
    this.animate();
  }

  init() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Create particles
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 2 + 1,
        baseX: Math.random() * this.width,
        baseY: Math.random() * this.height,
        density: Math.random() * 30 + 1,
      });
    }
  }

  bindEvents() {
    window.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.particles.forEach((particle) => {
      let dx = this.mouseX - particle.x;
      let dy = this.mouseY - particle.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let forceDirectionX = dx / distance;
      let forceDirectionY = dy / distance;
      let maxDistance = 100;
      let force = (maxDistance - distance) / maxDistance;
      let directionX = forceDirectionX * force * particle.density;
      let directionY = forceDirectionY * force * particle.density;

      if (distance < maxDistance) {
        particle.x -= directionX;
        particle.y -= directionY;
      } else {
        if (particle.x !== particle.baseX) {
          let dx = particle.x - particle.baseX;
          particle.x -= dx / 10;
        }
        if (particle.y !== particle.baseY) {
          let dy = particle.y - particle.baseY;
          particle.y -= dy / 10;
        }
      }

      // Draw connecting lines
      this.particles.forEach((otherParticle) => {
        const dist = Math.sqrt(
          Math.pow(particle.x - otherParticle.x, 2) +
            Math.pow(particle.y - otherParticle.y, 2)
        );

        if (dist < 100) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(254, 200, 106, ${1 - dist / 100})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(otherParticle.x, otherParticle.y);
          this.ctx.stroke();
        }
      });

      // Draw particle
      this.ctx.beginPath();
      this.ctx.fillStyle = this.colors[0];
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fill();
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize wave effect when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("waveCanvas");
  new Wave(canvas);
});
