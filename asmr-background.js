/**
 * ASMR Static Background - Vanilla JS Version
 * Converted from React component to work with HTML/CSS/JS portfolio
 * 
 * Features:
 * - High-density particle system using HTML5 Canvas
 * - Reactive "magnetic vortex" effect on mouse hover
 * - Visual "friction glow" when particles accelerate
 * - Glass-shard and charcoal-dust aesthetic
 */

class ASMRStaticBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      console.error('Canvas element not found');
      return;
    }
    
    console.log('ASMR Background initialized');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: -1000, y: -1000 };
    this.animationFrameId = null;
    
    // Configuration
    this.PARTICLE_COUNT = 1000;
    this.MAGNETIC_RADIUS = 280;
    this.VORTEX_STRENGTH = 0.07;
    this.PULL_STRENGTH = 0.12;
    
    this.init();
    this.bindEvents();
    this.render();
  }
  
  init() {
    this.resize();
    this.createParticles();
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.PARTICLE_COUNT; i++) {
      this.particles.push(new Particle(this.canvas.width, this.canvas.height));
    }
  }
  
  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });
    
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    
    window.addEventListener('touchmove', (e) => {
      if (e.touches[0]) {
        this.mouse.x = e.touches[0].clientX;
        this.mouse.y = e.touches[0].clientY;
      }
    });
    
    // Hide mouse when it leaves the window
    window.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });
  }
  
  render() {
    // Create slight motion blur effect
    this.ctx.fillStyle = 'rgba(10, 10, 12, 0.18)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw particles
    this.particles.forEach(particle => {
      particle.update(this.mouse, this.MAGNETIC_RADIUS, this.VORTEX_STRENGTH, this.PULL_STRENGTH, this.canvas.width, this.canvas.height);
      particle.draw(this.ctx);
    });
    
    this.animationFrameId = requestAnimationFrame(() => this.render());
  }
  
  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('touchmove', this.handleTouchMove);
  }
}

class Particle {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.reset();
  }
  
  reset() {
    this.x = Math.random() * this.canvasWidth;
    this.y = Math.random() * this.canvasHeight;
    this.size = Math.random() * 1.5 + 0.5;
    this.vx = (Math.random() - 0.5) * 0.2;
    this.vy = (Math.random() - 0.5) * 0.2;
    
    // 70% Charcoal, 30% Glass particles for visibility on black background
    const isGlass = Math.random() > 0.7;
    this.color = isGlass ? '240, 245, 255' : '180, 180, 185'; // Lighter charcoal for visibility
    this.alpha = Math.random() * 0.4 + 0.1;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.05;
    this.frictionGlow = 0;
  }
  
  update(mouse, magneticRadius, vortexStrength, pullStrength, canvasWidth, canvasHeight) {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist < magneticRadius && dist > 0) {
      const force = (magneticRadius - dist) / magneticRadius;
      
      // Magnetic center pull
      this.vx += (dx / dist) * force * pullStrength;
      this.vy += (dy / dist) * force * pullStrength;
      
      // Swirl vortex motion (Perpendicular to radius)
      this.vx += (dy / dist) * force * vortexStrength * 10;
      this.vy -= (dx / dist) * force * vortexStrength * 10;
      
      // Glow based on proximity and velocity
      this.frictionGlow = force * 0.7;
    } else {
      this.frictionGlow *= 0.92;
    }
    
    // Physics application
    this.x += this.vx;
    this.y += this.vy;
    
    // Friction/Damping
    this.vx *= 0.95;
    this.vy *= 0.95;
    
    // Background jitter (frozen static feel)
    this.vx += (Math.random() - 0.5) * 0.04;
    this.vy += (Math.random() - 0.5) * 0.04;
    
    this.rotation += this.rotationSpeed + (Math.abs(this.vx) + Math.abs(this.vy)) * 0.05;
    
    // Screen wrap
    if (this.x < -20) this.x = canvasWidth + 20;
    if (this.x > canvasWidth + 20) this.x = -20;
    if (this.y < -20) this.y = canvasHeight + 20;
    if (this.y > canvasHeight + 20) this.y = -20;
  }
  
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    
    const finalAlpha = Math.min(this.alpha + this.frictionGlow, 0.9);
    ctx.fillStyle = `rgba(${this.color}, ${finalAlpha})`;
    
    if (this.frictionGlow > 0.3) {
      ctx.shadowBlur = 8 * this.frictionGlow;
      ctx.shadowColor = `rgba(180, 220, 255, ${this.frictionGlow})`;
    }
    
    // Sharp shard geometry
    ctx.beginPath();
    ctx.moveTo(0, -this.size * 2.5);
    ctx.lineTo(this.size, 0);
    ctx.lineTo(0, this.size * 2.5);
    ctx.lineTo(-this.size, 0);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if canvas exists
  const canvas = document.getElementById('asmr-canvas');
  if (canvas) {
    console.log('ASMR Canvas found, initializing animation...');
    new ASMRStaticBackground('asmr-canvas');
  } else {
    console.error('ASMR Canvas not found!');
  }
});