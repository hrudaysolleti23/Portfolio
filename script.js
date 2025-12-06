window.addEventListener("scroll", function () {
  var scrollPosition = window.scrollY;
  var header = document.querySelector("header");

  // Calculate the scroll position relative to the document height
  var scrollPercentage =
    (scrollPosition / (document.body.scrollHeight - window.innerHeight)) * 100;

  // Change the header color when scrolled 50% of the page
  if (scrollPercentage >= 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

function copyEmail() {
  const email = "hrudaysolleti111@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    alert("Email copied to clipboard: " + email);
  }).catch(() => {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = email;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("Email copied to clipboard: " + email);
  });
}

function downloadResume() {
  var link = document.createElement("a");
  link.href = "asset/Hruday_Solleti_Resume.pdf";
  link.download = "HRUDAY_SOLLETI_RESUME.pdf";
  link.click();
}

function downloadaws() {
  var link = document.createElement("a");
  link.href = "asset/AWS Certified Developer - Associate certificate.pdf";
  link.download = "HRUDAY_AWS_Certificate.pdf";
  link.click();
}
function togglePortfolio() {
  var moreCards = document.querySelectorAll(".portfolio-card.hidden");
  moreCards.forEach((card) => {
    card.classList.remove("hidden");
  });
  var viewMoreButton = document.querySelector("button");
  viewMoreButton.style.display = "none";
}

function togglePortfolio() {
  var portfolioCards = document.querySelectorAll(".portfolio-card");
  portfolioCards.forEach(function (card) {
    card.classList.toggle("show");
    // Check if the card is being hidden, then show the button
    if (!card.classList.contains("show")) {
      card.querySelector("button").style.display = "inline-block";
    }
  });
  var viewMoreButton = document.querySelector("button");
  if (viewMoreButton.textContent === "View More") {
    viewMoreButton.textContent = "View Less";
  } else {
    viewMoreButton.textContent = "View More";
  }
}
function toggleCard(card) {
  card.classList.toggle("flipped");
}

// Function to check if an element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to flip the card after 1 second and then unflip it
function flipAndUnflipFirstCard() {
  // Get the first portfolio card
  const firstCard = document.querySelector(".portfolio-card");

  // Add the flipped class after 1 second if the portfolio section is in viewport
  if (isInViewport(firstCard)) {
    setTimeout(() => {
      firstCard.classList.add("flipped");
    }, 2000);

    // Remove the flipped class after 2 seconds to unflip the card
    setTimeout(() => {
      firstCard.classList.remove("flipped");
    }, 3000);
  }
}

// Call the flipAndUnflipFirstCard function when the window is scrolled
window.addEventListener("scroll", flipAndUnflipFirstCard);

// Mobile Menu Functionality
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

// Create overlay element
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  navOverlay.classList.toggle("active");
  document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "auto";
  
  const icon = mobileMenuBtn.querySelector("i");
  if (navLinks.classList.contains("active")) {
    icon.classList.remove("ri-menu-line");
    icon.classList.add("ri-close-line");
  } else {
    icon.classList.remove("ri-close-line");
    icon.classList.add("ri-menu-line");
  }
});

// Close mobile menu when clicking overlay
navOverlay.addEventListener("click", () => {
  navLinks.classList.remove("active");
  navOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
  const icon = mobileMenuBtn.querySelector("i");
  icon.classList.remove("ri-close-line");
  icon.classList.add("ri-menu-line");
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    navOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
    const icon = mobileMenuBtn.querySelector("i");
    icon.classList.remove("ri-close-line");
    icon.classList.add("ri-menu-line");
  });
});

// Project Data
// const projects = [
//   {
//     title: "Portfolio Website",
//     subtitle: "Personal Portfolio",
//     description:
//       "A modern, responsive portfolio website built with HTML, CSS, and JavaScript featuring smooth animations and interactive elements.",
//     image: "asset/portfolio.png",
//     category: "web",
//     techStack: ["HTML5", "CSS3", "JavaScript"],
//     links: {
//       live: "#",
//       github: "https://github.com/gowtham012/Portfolio",
//     },
//   },
//   {
//     title: "Decentralized Exchange",
//     subtitle: "Web3 Project",
//     description:
//       "A decentralized cryptocurrency exchange platform built on Ethereum blockchain with smart contracts.",
//     image: "asset/dex.png",
//     category: "blockchain",
//     techStack: ["Solidity", "Web3.js", "React", "Node.js"],
//     links: {
//       live: "#",
//       github: "https://github.com/gowtham012/dex",
//     },
//   },
//   {
//     title: "Cloud File Storage",
//     subtitle: "AWS Cloud Project",
//     description:
//       "Secure file storage system built using AWS S3, Lambda, and API Gateway with user authentication.",
//     image: "asset/cloud-storage.png",
//     category: "cloud",
//     techStack: ["AWS", "Node.js", "React", "MongoDB"],
//     links: {
//       live: "#",
//       github: "https://github.com/gowtham012/cloud-storage",
//     },
//   },
// ];

// Experience Data
const experiences = [
  {
    date: "2023 - Present",
    title: "Software Developer",
    company: "Self-Employed",
    description:
      "Working on innovative web3 and cloud projects, focusing on decentralized applications and cloud architecture.",
    tags: ["Web3", "AWS", "React", "Node.js"],
  },
  {
    date: "2022 - 2023",
    title: "Graduate Research Assistant",
    company: "University",
    description:
      "Conducted research in cloud computing and distributed systems, published papers in leading conferences.",
    tags: ["Research", "Cloud Computing", "Academic Writing"],
  },
  {
    date: "2021 - 2022",
    title: "Software Engineering Intern",
    company: "Tech Company",
    description:
      "Developed and maintained web applications, worked with modern JavaScript frameworks and cloud services.",
    tags: ["JavaScript", "React", "AWS", "Node.js"],
  },
];

// DOM Elements
const portfolioGrid = document.querySelector(".portfolio-grid");
const filterButtons = document.querySelectorAll(".filter-btn");
const experienceTimeline = document.querySelector(".experience-timeline");
const mouseTrail = document.querySelector(".mouse-trail");
const scrollProgress = document.querySelector(".scroll-progress");
const loadingBar = document.querySelector(".loading-bar");
const navContainer = document.querySelector(".nav-container");

// Create Project Cards
function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = "portfolio-card";
  card.dataset.category = project.category;

  card.innerHTML = `
    <div class="project-category">${project.subtitle}</div>
    <h3 class="project-title">${project.title}</h3>
    <p class="project-description">${project.description}</p>
    <div class="tech-stack">
      ${project.techStack
        .map((tech) => `<span class="tech-item">${tech}</span>`)
        .join("")}
    </div>
    <div class="project-links">
      <a href="${project.links.live}" class="project-link">
        <i class="ri-external-link-line"></i>
        <span>Live Demo</span>
      </a>
      <a href="${project.links.github}" class="project-link">
        <i class="ri-github-line"></i>
        <span>Source Code</span>
      </a>
    </div>
    <div class="project-image">
      <img src="${project.image}" alt="${project.title}">
      <div class="image-overlay"></div>
    </div>
  `;

  return card;
}

// Create Experience Items
function createExperienceItem(experience) {
  const item = document.createElement("div");
  item.className = "timeline-item";

  item.innerHTML = `
    <div class="timeline-content">
      <span class="timeline-date">${experience.date}</span>
      <h3 class="timeline-title">${experience.title}</h3>
      <h4 class="timeline-subtitle">${experience.company}</h4>
      <p class="timeline-description">${experience.description}</p>
      <div class="timeline-tags">
        ${experience.tags
          .map((tag) => `<span class="timeline-tag">${tag}</span>`)
          .join("")}
      </div>
    </div>
    <div class="timeline-dot"></div>
  `;

  return item;
}

// Initialize Portfolio Grid
function initPortfolio() {
  projects.forEach((project) => {
    portfolioGrid.appendChild(createProjectCard(project));
  });
}

// Initialize Experience Timeline
function initExperience() {
  experiences.forEach((experience) => {
    experienceTimeline.appendChild(createExperienceItem(experience));
  });
}

// Filter Projects
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    document.querySelectorAll(".portfolio-card").forEach((card) => {
      if (filter === "all" || card.dataset.category === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Custom Cursor
const cursor = document.querySelector(".custom-cursor");
let cursorVisible = true;
let cursorEnlarged = false;

// Update cursor position with smooth animation
const onMouseMove = (e) => {
  requestAnimationFrame(() => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
};

// Ensure cursor is always visible
document.addEventListener("mousemove", onMouseMove);

// Handle cursor enlargement
const cursorEnlarge = () => {
  if (!cursorEnlarged) {
    cursorEnlarged = true;
  }
};

const cursorReset = () => {
  if (cursorEnlarged) {
    cursorEnlarged = false;
  }
};

// Add hover effect for all clickable elements
const clickableElements = document.querySelectorAll(
  "a, button, .tech-item, .project-link, .nav-links a, .social-link, .scroll-dot, .submit-btn, .hero-cta, .filter-btn, .mobile-menu-btn, .certification-badge"
);

clickableElements.forEach((elem) => {
  elem.addEventListener("mouseover", cursorEnlarge);
  elem.addEventListener("mouseout", cursorReset);
});

// Add text cursor for text input elements
const textElements = document.querySelectorAll(
  'input[type="text"], input[type="email"], textarea, [contenteditable]'
);

textElements.forEach((elem) => {
  elem.classList.add("text-select");
});

// Scroll Progress
window.addEventListener("scroll", () => {
  const scrolled =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;
  scrollProgress.style.transform = `scaleX(${scrolled / 100})`;

  if (window.scrollY > 50) {
    navContainer.classList.add("scrolled");
  } else {
    navContainer.classList.remove("scrolled");
  }
});

// Intersection Observer for Timeline Items
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Floating Elements Animation
function createFloatingElements() {
  const container = document.querySelector(".floating-elements");
  const numElements = 10;

  for (let i = 0; i < numElements; i++) {
    const element = document.createElement("div");
    element.className = "floating-element";

    const size = Math.random() * 100 + 50;
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;

    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.left = `${startX}px`;
    element.style.top = `${startY}px`;
    element.style.setProperty("--moveX", `${Math.random() * 200 - 100}px`);
    element.style.setProperty("--moveY", `${Math.random() * 200 - 100}px`);

    container.appendChild(element);
  }
}

// Contact Form Handling
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", async (e) => {
  // Don't prevent default - let the form submit to FormSubmit
  // Just add loading state to button
  const submitBtn = contactForm.querySelector(".submit-btn");
  submitBtn.innerHTML = '<i class="ri-loader-4-line"></i> Sending...';
  submitBtn.disabled = true;
  
  // Form will submit naturally to FormSubmit.co
});

// Initialize Everything
document.addEventListener("DOMContentLoaded", () => {
  initPortfolio();
  initExperience();
  createFloatingElements();

  // Observe timeline items
  document.querySelectorAll(".timeline-item").forEach((item) => {
    observer.observe(item);
  });

  // Hide loading bar after page load
  setTimeout(() => {
    loadingBar.style.display = "none";
  }, 2000);
});

// Portfolio scroll indicators
const scrollDots = document.querySelectorAll(".scroll-dot");
const cards = document.querySelectorAll(".portfolio-card");

// Update active dot based on scroll position
portfolioGrid.addEventListener("scroll", () => {
  const scrollPosition = portfolioGrid.scrollLeft;
  const cardWidth = cards[0].offsetWidth + 32; // Including gap
  const activeIndex = Math.round(scrollPosition / cardWidth);

  scrollDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === activeIndex);
  });
});

// Scroll to card when clicking dots
scrollDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    const cardWidth = cards[0].offsetWidth + 32; // Including gap
    portfolioGrid.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
  });
});


// Project Details Data
const projectDetails = {
  'job-portal': {
    title: 'AI-Powered Job Portal',
    content: `
      <h3>Project Overview</h3>
      <p>Developed a comprehensive React.js-based Job Portal platform that revolutionizes the recruitment process through AI-powered automation and intelligent matching algorithms.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>AI-based resume parsing using Natural Language Processing (NLP) to automatically extract candidate details including skills, experience, and education</li>
        <li>LLM-powered chatbot assistant that helps job seekers find relevant positions and provides personalized resume improvement suggestions</li>
        <li>Automated job matching algorithms using machine learning to improve candidate-job relevance by 40%</li>
        <li>Real-time HR Dashboard with analytics on applicant tracking, job post engagement, and candidate conversion rates</li>
        <li>Real-time notifications for application status updates, interview scheduling, and recruiter-candidate interactions</li>
        <li>Automated validation scripts for resume screening, ensuring compliance with job requirements</li>
      </ul>

      <h3>Technical Implementation</h3>
      <ul>
        <li>Frontend built with <span class="tech-highlight">React.js</span>, <span class="tech-highlight">Tailwind CSS</span>, and <span class="tech-highlight">Vite</span> for optimal performance</li>
        <li>Cloud infrastructure using <span class="tech-highlight">AWS S3</span> for secure storage and <span class="tech-highlight">CloudFront</span> for content delivery</li>
        <li>Integrated <span class="tech-highlight">OpenAI API</span> and custom <span class="tech-highlight">LLM models</span> for intelligent automation</li>
        <li>Containerized with <span class="tech-highlight">Docker</span> and deployed on <span class="tech-highlight">AWS EC2</span></li>
      </ul>

      <h3>Impact</h3>
      <p>Reduced manual screening time by 60% and improved candidate-job match accuracy by 40%. The platform streamlines the entire recruitment workflow from application to hiring.</p>

      <h3>Duration</h3>
      <p>October 2024 - Present</p>
    `
  },
  'patient-connect': {
    title: 'Patient Connect - Healthcare Automation',
    content: `
      <h3>Project Overview</h3>
      <p>Developed an innovative RPA-based automation system that extracts and consolidates patient information from multiple U.S. healthcare insurance websites, creating a unified patient record system.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>Automated data extraction from multiple healthcare insurance providers using Python RPA and Selenium</li>
        <li>LLM-powered document analysis bot that extracts key patient details including medications, insurance coverage, and visit history</li>
        <li>Intelligent data formatting system that adapts to different insurance provider requirements</li>
        <li>Secure cloud storage integration with AWS S3 for patient records</li>
        <li>Doctor portal providing instant access to consolidated patient histories and insurance information</li>
        <li>Automated validation scripts ensuring accuracy and HIPAA compliance</li>
      </ul>

      <h3>Technical Implementation</h3>
      <ul>
        <li>Built with <span class="tech-highlight">Python</span> using <span class="tech-highlight">Selenium</span> for web automation</li>
        <li>Implemented <span class="tech-highlight">Large Language Models</span> for intelligent document parsing</li>
        <li>Cloud infrastructure on <span class="tech-highlight">AWS EC2</span> and <span class="tech-highlight">S3</span></li>
        <li>Containerized with <span class="tech-highlight">Docker</span> for scalable deployment</li>
        <li>Automated workflows for downloading, merging, and uploading patient records</li>
      </ul>

      <h3>Impact</h3>
      <p>Reduced manual data entry time by 80% and improved data accuracy. Doctors can now access complete patient histories instantly, leading to better healthcare decisions and improved patient management.</p>

      <h3>Duration</h3>
      <p>April 2024 - September 2024</p>
    `
  },
  'brain-tumor': {
    title: 'Brain Neoplasm Detection using CNN & VGG-16',
    content: `
      <h3>Project Overview</h3>
      <p>Led the development of a deep learning system using Convolutional Neural Networks (CNN) with the VGG-16 architecture to detect and classify brain neoplasms from MRI images with high accuracy.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>Automated brain neoplasm detection and classification from MRI scans</li>
        <li>Advanced image preprocessing pipeline for optimal model performance</li>
        <li>Transfer learning implementation using pre-trained VGG-16 model</li>
        <li>Comprehensive performance evaluation with accuracy, precision, and recall metrics</li>
        <li>Real-time prediction capabilities for clinical use</li>
      </ul>

      <h3>Technical Implementation</h3>
      <ul>
        <li>Built with <span class="tech-highlight">Python</span>, <span class="tech-highlight">TensorFlow</span>, and <span class="tech-highlight">Keras</span></li>
        <li>Image processing using <span class="tech-highlight">OpenCV</span>, <span class="tech-highlight">NumPy</span>, and <span class="tech-highlight">Pandas</span></li>
        <li>Implemented <span class="tech-highlight">VGG-16</span> architecture with custom classification layers</li>
        <li>Data augmentation techniques to improve model generalization</li>
      </ul>

      <h3>Results</h3>
      <ul>
        <li>Achieved <strong>95% accuracy</strong> on validation dataset</li>
        <li>Achieved <strong>82% accuracy</strong> on test dataset</li>
        <li>Reduced manual interpretation errors significantly</li>
        <li>Faster and more accurate detection compared to traditional methods</li>
      </ul>

      <h3>Future Enhancements</h3>
      <p>Plans include integrating multimodal data, expanding datasets with more diverse MRI scans, and enhancing model interpretability for clinical adoption.</p>

      <h3>Duration</h3>
      <p>January 2023 - June 2024 (Team Lead)</p>
    `
  },
  'hospital-appointment': {
    title: 'Hospital Appointment Finder',
    content: `
      <h3>Project Overview</h3>
      <p>Designed and developed a mobile application that streamlines the hospital appointment scheduling process, making healthcare more accessible and efficient for patients.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>Intuitive appointment booking system with real-time availability</li>
        <li>Doctor search and filtering by specialty, location, and availability</li>
        <li>Patient profile management with medical history</li>
        <li>Appointment reminders and notifications</li>
        <li>Integration with hospital management systems</li>
        <li>Secure patient data handling with encryption</li>
      </ul>

      <h3>Technical Implementation</h3>
      <ul>
        <li>Native Android development using <span class="tech-highlight">Java</span> and <span class="tech-highlight">XML</span></li>
        <li>Backend API integration using <span class="tech-highlight">REST APIs</span></li>
        <li>Local data storage with <span class="tech-highlight">SQLite</span></li>
        <li>Cloud synchronization with <span class="tech-highlight">Firebase</span></li>
        <li>Material Design UI/UX principles for intuitive user experience</li>
      </ul>

      <h3>Impact</h3>
      <p>Reduced appointment scheduling time by 70% and improved patient satisfaction. The app provides a seamless experience for patients to find and book appointments with healthcare providers.</p>

      <h3>Duration</h3>
      <p>September 2023 - January 2024</p>
    `
  },
  'study-buddy': {
    title: 'Study Buddy - Student Time Management',
    content: `
      <h3>Project Overview</h3>
      <p>Developed a comprehensive web-based application designed to help students manage their time effectively, organize study schedules, and achieve their learning objectives.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>Interactive study schedule planner with drag-and-drop functionality</li>
        <li>Task management system with priority levels and deadlines</li>
        <li>Progress tracking and analytics dashboard</li>
        <li>Study session timer with Pomodoro technique integration</li>
        <li>Goal setting and achievement tracking</li>
        <li>Responsive design for desktop and mobile devices</li>
      </ul>

      <h3>Technical Implementation</h3>
      <ul>
        <li>Frontend built with <span class="tech-highlight">HTML5</span>, <span class="tech-highlight">CSS3</span>, and <span class="tech-highlight">JavaScript</span></li>
        <li>Enhanced interactivity using <span class="tech-highlight">jQuery</span></li>
        <li>Client-side data persistence with <span class="tech-highlight">LocalStorage</span></li>
        <li>Responsive design using CSS Grid and Flexbox</li>
        <li>Clean, modern UI with smooth animations</li>
      </ul>

      <h3>Impact</h3>
      <p>Helped students improve their time management skills and study efficiency. The application provides a structured approach to learning with visual progress tracking and organized schedules.</p>

      <h3>Duration</h3>
      <p>January 2023 - May 2023</p>
    `
  },
  'medical-portal': {
    title: 'Medical Supervision Portal',
    content: `
      <h3>Project Overview</h3>
      <p>Designed and developed a comprehensive web-based system for hospitals to manage medical records securely, ensuring efficient data management and accessibility for healthcare professionals.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>Secure patient record management with role-based access control</li>
        <li>Comprehensive medical history tracking and documentation</li>
        <li>Appointment scheduling and tracking system</li>
        <li>Prescription management and medication tracking</li>
        <li>Lab results and diagnostic reports integration</li>
        <li>HIPAA-compliant data security and encryption</li>
      </ul>

      <h3>Technical Implementation</h3>
      <ul>
        <li>Frontend built with <span class="tech-highlight">HTML</span>, <span class="tech-highlight">CSS</span>, and <span class="tech-highlight">JavaScript</span></li>
        <li>Backend developed using <span class="tech-highlight">PHP</span> for server-side logic</li>
        <li>Database architecture using <span class="tech-highlight">MySQL</span> for secure and scalable data handling</li>
        <li>Implemented normalized database structures for optimal performance</li>
        <li>Secure authentication and authorization system</li>
      </ul>

      <h3>Impact</h3>
      <p>Streamlined hospital operations by providing a centralized system for medical record management. Improved data accessibility for healthcare providers while maintaining strict security standards.</p>

      <h3>Duration</h3>
      <p>September 2022 - January 2023</p>
    `
  },
  'homeinsight': {
    title: 'HomeInsight - Property Management System',
    content: `
      <h3>Project Overview</h3>
      <p>Designed and implemented a scalable property management system to efficiently manage tenant records and property data, addressing data security and growth challenges for property managers.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>Comprehensive tenant record management with detailed profiles</li>
        <li>Property listing and maintenance tracking</li>
        <li>Lease agreement management and renewal tracking</li>
        <li>Payment processing and rent collection system</li>
        <li>Maintenance request tracking and resolution</li>
        <li>Reporting and analytics for property performance</li>
      </ul>

      <h3>Technical Implementation</h3>
      <ul>
        <li>Built with <span class="tech-highlight">Java</span> for robust backend logic</li>
        <li>Database management using <span class="tech-highlight">DBMS</span> and <span class="tech-highlight">SQL</span></li>
        <li>Implemented secure data storage with encryption</li>
        <li>Scalable database design to handle growing data volumes</li>
        <li>User-friendly interface for property managers and tenants</li>
      </ul>

      <h3>Impact</h3>
      <p>Simplified property management operations by providing easy access to tenant and property data. Enhanced data security and enabled efficient tracking of leases, payments, and maintenance activities.</p>

      <h3>Duration</h3>
      <p>January 2022 - May 2022</p>
    `
  }
};

// Modal functionality
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDetails = document.getElementById('modal-details');
const closeBtn = document.querySelector('.modal-close');

// Add click event to all view details buttons
document.querySelectorAll('.view-details-btn').forEach(button => {
  button.addEventListener('click', function() {
    const projectId = this.getAttribute('data-project');
    const project = projectDetails[projectId];
    
    if (project) {
      modalTitle.textContent = project.title;
      modalDetails.innerHTML = project.content;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

// Close modal when clicking X
closeBtn.addEventListener('click', function() {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
modal.addEventListener('click', function(e) {
  if (e.target === modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});
