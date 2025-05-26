document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu functionality
  const hamMenu = document.querySelector(".ham-menu");
  const topBar = document.querySelector(".top-bar");
  const menuLinks = document.querySelectorAll(".top-bar .menu-link");

  if (hamMenu && topBar) {
    hamMenu.addEventListener("click", () => {
      hamMenu.classList.toggle("active");
      topBar.classList.toggle("active");
    });

    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamMenu.classList.remove("active");
        topBar.classList.remove("active");
      });
    });
  }

  // Theme toggle functionality
  const themeToggle = document.getElementById("themeToggle");
  const mobileThemeToggle = document.getElementById("mobileThemeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const mobileThemeIcon = document.getElementById("mobileThemeIcon");
  const body = document.body;

  const currentTheme = localStorage.getItem("theme") || "dark";
  
  if (currentTheme === "light") {
    body.setAttribute("data-theme", "light");
    updateThemeIcons("light");
  } else {
    body.removeAttribute("data-theme");
    updateThemeIcons("dark");
  }

  function updateThemeIcons(theme) {
    const iconClass = theme === "light" ? "fas fa-moon" : "fas fa-sun";
    if (themeIcon) themeIcon.className = iconClass;
    if (mobileThemeIcon) mobileThemeIcon.className = iconClass;
  }

  function toggleTheme() {
    const isLight = body.getAttribute("data-theme") === "light";
    
    if (isLight) {
      body.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
      updateThemeIcons("dark");
    } else {
      body.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      updateThemeIcons("light");
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
  
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener("click", toggleTheme);
  }

  // Animated title typing effect
  function animateTitle() {
    const lines = document.querySelectorAll('.animated-title .line');
    
    lines.forEach((line, index) => {
      const text = line.textContent;
      line.textContent = '';
      line.style.opacity = '1';
      
      setTimeout(() => {
        let charIndex = 0;
        const typeInterval = setInterval(() => {
          line.textContent += text[charIndex];
          charIndex++;
          
          if (charIndex >= text.length) {
            clearInterval(typeInterval);
          }
        }, 50);
      }, index * 800);
    });
  }

  // Start title animation after a short delay
  setTimeout(animateTitle, 500);

  // Skill bars animation
  function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillLevel = entry.target.getAttribute('data-skill');
          entry.target.style.width = skillLevel + '%';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
      observer.observe(bar);
    });
  }

  animateSkillBars();

  // Floating elements animation
  function createFloatingAnimation() {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach((icon, index) => {
      icon.style.animationDelay = `${index * 0.5}s`;
      
      // Add random movement
      setInterval(() => {
        const randomX = Math.random() * 20 - 10;
        const randomY = Math.random() * 20 - 10;
        icon.style.transform = `translate(${randomX}px, ${randomY}px)`;
      }, 3000 + index * 1000);
    });
  }

  createFloatingAnimation();

  // Interest cards hover effect
  const interestCards = document.querySelectorAll('.interest-card');
  
  interestCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.interest-icon');
      icon.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.interest-icon');
      icon.style.transform = 'scale(1) rotate(0deg)';
    });
  });

  // Fun facts counter animation
  function animateCounters() {
    const factCards = document.querySelectorAll('.fact-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const factNumber = entry.target.querySelector('.fact-number');
          const targetNumber = parseInt(factNumber.textContent);
          
          if (!isNaN(targetNumber)) {
            let current = 0;
            const increment = targetNumber / 50;
            
            const counter = setInterval(() => {
              current += increment;
              if (current >= targetNumber) {
                current = targetNumber;
                clearInterval(counter);
              }
              factNumber.textContent = Math.floor(current).toString().padStart(2, '0');
            }, 30);
          }
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    factCards.forEach(card => {
      observer.observe(card);
    });
  }

  animateCounters();

  // Timeline animation
  function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => {
      observer.observe(item);
    });
  }

  animateTimeline();

  // Philosophy cards stagger animation
  function animatePhilosophyCards() {
    const philosophyCards = document.querySelectorAll('.philosophy-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 200);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    philosophyCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    });
  }

  animatePhilosophyCards();

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Parallax effect for hero section
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-elements');
    
    parallaxElements.forEach(element => {
      const speed = scrolled * 0.3;
      element.style.transform = `translateY(${speed}px)`;
    });
  });

  // Add scroll effect to navigation
  let lastScrollTop = 0;
  const header = document.querySelector('.menu');
  
  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });

  // Add dynamic background to code snippet
  function animateCodeSnippet() {
    const codeSnippet = document.querySelector('.code-snippet');
    if (codeSnippet) {
      setInterval(() => {
        codeSnippet.style.boxShadow = `
          0 10px 30px rgba(83, 155, 245, ${0.1 + Math.random() * 0.2}),
          0 0 20px rgba(83, 155, 245, ${0.05 + Math.random() * 0.1})
        `;
      }, 2000);
    }
  }

  animateCodeSnippet();

  // Add interactive hover effects to timeline markers
  const timelineMarkers = document.querySelectorAll('.timeline-marker');
  
  timelineMarkers.forEach(marker => {
    marker.addEventListener('mouseenter', function() {
      this.style.transform = 'translateX(-50%) scale(1.2)';
    });
    
    marker.addEventListener('mouseleave', function() {
      this.style.transform = 'translateX(-50%) scale(1)';
    });
  });

  // Add click effect to skill categories
  const skillCategories = document.querySelectorAll('.skill-category');
  
  skillCategories.forEach(category => {
    category.addEventListener('click', function() {
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  });

  // Easter egg: Konami code
  let konamiCode = [];
  const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];

  document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
      konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
      // Easter egg activated!
      document.body.style.animation = 'rainbow 2s infinite';
      setTimeout(() => {
        document.body.style.animation = '';
      }, 5000);
      
      // Show a fun message
      const message = document.createElement('div');
      message.textContent = '🎉 You found the easter egg! 🎉';
      message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--accent-color);
        color: white;
        padding: 20px;
        border-radius: 10px;
        font-size: 1.2rem;
        z-index: 9999;
        animation: bounce 1s ease;
      `;
      document.body.appendChild(message);
      
      setTimeout(() => {
        message.remove();
      }, 3000);
      
      konamiCode = [];
    }
  });

  // Add CSS for rainbow animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rainbow {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
    
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translate(-50%, -50%) translateY(0); }
      40% { transform: translate(-50%, -50%) translateY(-30px); }
      60% { transform: translate(-50%, -50%) translateY(-15px); }
    }
  `;
  document.head.appendChild(style);
});