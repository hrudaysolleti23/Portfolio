/**
 * Shooting Stars Background - Vanilla JS Version
 * Converted from React component to work with HTML/CSS/JS portfolio
 * 
 * Features:
 * - Multiple shooting stars with different colors and speeds
 * - Randomized trajectories from screen edges
 * - Smooth animations with trails
 * - Twinkling star background
 */

class ShootingStarsBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      console.error('Canvas element not found');
      return;
    }
    
    console.log('Shooting Stars Background initialized');
    this.ctx = this.canvas.getContext('2d');
    this.animationFrameId = null;
    
    // Configuration
    this.stars = [];
    this.staticStars = [];
    this.starConfigs = [
      {
        starColor: '#FFFFFF',
        trailColor: '#E8E8E8',
        minSpeed: 15,
        maxSpeed: 35,
        minDelay: 1000,
        maxDelay: 3000,
        starWidth: 6,
        starHeight: 1
      },
      {
        starColor: '#F5F5F5',
        trailColor: '#D0D0D0',
        minSpeed: 10,
        maxSpeed: 25,
        minDelay: 2000,
        maxDelay: 4000,
        starWidth: 5,
        starHeight: 1
      },
      {
        starColor: '#FFFFFF',
        trailColor: '#CCCCCC',
        minSpeed: 20,
        maxSpeed: 40,
        minDelay: 1500,
        maxDelay: 3500,
        starWidth: 7,
        starHeight: 1
      }
    ];
    
    this.init();
    this.createStaticStars();
    this.startShootingStars();
    this.render();
  }
  
  init() {
    this.resize();
    this.bindEvents();
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }
  
  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createStaticStars();
    });
  }
  
  // Create static twinkling stars background
  createStaticStars() {
    this.staticStars = [];
    const numStars = Math.floor((this.width * this.height) / 8000); // Density based on screen size
    
    for (let i = 0; i < numStars; i++) {
      this.staticStars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2
      });
    }
  }
  
  // Get random starting point from screen edges
  getRandomStartPoint() {
    const side = Math.floor(Math.random() * 4);
    const offset = Math.random();
    
    switch (side) {
      case 0: // Top
        return { 
          x: offset * this.width, 
          y: -20, 
          angle: 45 + (Math.random() - 0.5) * 60 
        };
      case 1: // Right
        return { 
          x: this.width + 20, 
          y: offset * this.height, 
          angle: 135 + (Math.random() - 0.5) * 60 
        };
      case 2: // Bottom
        return { 
          x: offset * this.width, 
          y: this.height + 20, 
          angle: 225 + (Math.random() - 0.5) * 60 
        };
      case 3: // Left
        return { 
          x: -20, 
          y: offset * this.height, 
          angle: 315 + (Math.random() - 0.5) * 60 
        };
      default:
        return { x: 0, y: 0, angle: 45 };
    }
  }
  
  // Create a new shooting star
  createShootingStar(config) {
    const { x, y, angle } = this.getRandomStartPoint();
    const speed = Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed;
    
    const star = {
      id: Date.now() + Math.random(),
      x: x,
      y: y,
      angle: angle,
      speed: speed,
      distance: 0,
      scale: 1,
      config: config,
      trail: []
    };
    
    this.stars.push(star);
    
    // Schedule next star
    const delay = Math.random() * (config.maxDelay - config.minDelay) + config.minDelay;
    setTimeout(() => this.createShootingStar(config), delay);
  }
  
  // Start creating shooting stars for each configuration
  startShootingStars() {
    this.starConfigs.forEach((config, index) => {
      // Stagger the initial creation
      setTimeout(() => this.createShootingStar(config), index * 500);
    });
  }
  
  // Update shooting stars
  updateShootingStars() {
    this.stars = this.stars.filter(star => {
      // Calculate new position
      const radians = (star.angle * Math.PI) / 180;
      star.x += star.speed * Math.cos(radians);
      star.y += star.speed * Math.sin(radians);
      star.distance += star.speed;
      star.scale = 1 + star.distance / 800; // Reduced scaling effect
      
      // Add to trail
      star.trail.push({ x: star.x, y: star.y, opacity: 1 });
      if (star.trail.length > 12) { // Slightly longer trail
        star.trail.shift();
      }
      
      // Update trail opacity
      star.trail.forEach((point, index) => {
        point.opacity = index / star.trail.length;
      });
      
      // Remove if off screen
      return !(star.x < -50 || star.x > this.width + 50 || 
               star.y < -50 || star.y > this.height + 50);
    });
  }
  
  // Draw static twinkling stars
  drawStaticStars() {
    const time = Date.now() * 0.001;
    
    this.staticStars.forEach(star => {
      const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.5 + 0.5;
      const opacity = star.opacity * (0.3 + twinkle * 0.7);
      
      this.ctx.save();
      this.ctx.globalAlpha = opacity;
      this.ctx.fillStyle = '#ffffff';
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });
  }
  
  // Create gradient for shooting star trail
  createStarGradient(star, x1, y1, x2, y2) {
    const gradient = this.ctx.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, this.hexToRgba(star.config.trailColor, 0));
    gradient.addColorStop(1, this.hexToRgba(star.config.starColor, 1));
    return gradient;
  }
  
  // Convert hex color to rgba
  hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  
  // Draw shooting stars
  drawShootingStars() {
    this.stars.forEach(star => {
      const config = star.config;
      const width = config.starWidth * star.scale;
      const height = config.starHeight;
      
      // Draw trail
      if (star.trail.length > 1) {
        for (let i = 1; i < star.trail.length; i++) {
          const prev = star.trail[i - 1];
          const curr = star.trail[i];
          
          this.ctx.save();
          this.ctx.globalAlpha = curr.opacity * 0.6; // Increased trail opacity
          this.ctx.strokeStyle = this.createStarGradient(star, prev.x, prev.y, curr.x, curr.y);
          this.ctx.lineWidth = (width * (i / star.trail.length)) * 0.7; // Slightly thicker trail
          this.ctx.beginPath();
          this.ctx.moveTo(prev.x, prev.y);
          this.ctx.lineTo(curr.x, curr.y);
          this.ctx.stroke();
          this.ctx.restore();
        }
      }
      
      // Draw main star
      this.ctx.save();
      this.ctx.translate(star.x, star.y);
      this.ctx.rotate((star.angle * Math.PI) / 180);
      
      // Create gradient for the star
      const gradient = this.ctx.createLinearGradient(-width/2, 0, width/2, 0);
      gradient.addColorStop(0, this.hexToRgba(config.trailColor, 0));
      gradient.addColorStop(1, this.hexToRgba(config.starColor, 1));
      
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(-width/2, -height/2, width, height);
      
      // Add glow effect
      this.ctx.shadowBlur = 8; // Increased glow for better visibility
      this.ctx.shadowColor = config.starColor;
      this.ctx.fillRect(-width/2, -height/2, width, height);
      
      this.ctx.restore();
    });
  }
  
  // Main render loop
  render() {
    // Clear canvas with black background
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // Draw background gradient
    const gradient = this.ctx.createRadialGradient(
      this.width / 2, this.height / 2, 0,
      this.width / 2, this.height / 2, Math.max(this.width, this.height) / 2
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
    gradient.addColorStop(0.8, 'rgba(0, 0, 0, 0)');
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // Draw static stars
    this.drawStaticStars();
    
    // Update and draw shooting stars
    this.updateShootingStars();
    this.drawShootingStars();
    
    this.animationFrameId = requestAnimationFrame(() => this.render());
  }
  
  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.resize);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if canvas exists
  const canvas = document.getElementById('shooting-stars-canvas');
  if (canvas) {
    console.log('Shooting Stars Canvas found, initializing animation...');
    new ShootingStarsBackground('shooting-stars-canvas');
  } else {
    console.error('Shooting Stars Canvas not found!');
  }
});