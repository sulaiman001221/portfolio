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

  // Hero stats counter animation
  function animateCounters() {
    const statNumbers = document.querySelectorAll(".stat-number[data-target]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute("data-target"));
            let current = 0;
            const increment = target / 50;

            const counter = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(counter);
              }
              entry.target.textContent = Math.floor(current);
            }, 30);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach((stat) => {
      observer.observe(stat);
    });
  }

  // Skill bars animation
  function animateSkillBars() {
    const skillBars = document.querySelectorAll(".level-bar[data-level]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillLevel = entry.target.getAttribute("data-level");
            setTimeout(() => {
              entry.target.style.width = skillLevel + "%";
            }, 200);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    skillBars.forEach((bar) => {
      observer.observe(bar);
    });
  }

  // About page specific animations
  if (document.querySelector(".animated-title")) {
    function animateTitle() {
      const lines = document.querySelectorAll(".animated-title .line");

      lines.forEach((line, index) => {
        setTimeout(() => {
          line.style.opacity = "1";
          line.style.transform = "translateY(0)";
          line.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        }, index * 300);
      });
    }

    // Initialize title lines
    const titleLines = document.querySelectorAll(".animated-title .line");
    titleLines.forEach((line) => {
      line.style.opacity = "0";
      line.style.transform = "translateY(30px)";
    });

    setTimeout(animateTitle, 500);
  }

  // About page skill bars animation (different from main page)
  function animateAboutSkillBars() {
    const skillBars = document.querySelectorAll(".progress-fill[data-skill]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillLevel = entry.target.getAttribute("data-skill");
            setTimeout(() => {
              entry.target.style.width = skillLevel + "%";
            }, 200);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    skillBars.forEach((bar) => {
      observer.observe(bar);
    });
  }

  // Timeline animation
  function animateTimeline() {
    const timelineItems = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.3 }
    );

    timelineItems.forEach((item) => {
      observer.observe(item);
    });
  }

  // Interest cards hover effect
  const interestCards = document.querySelectorAll(".interest-card");

  interestCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const icon = this.querySelector(".interest-icon");
      if (icon) {
        icon.style.transform = "scale(1.1) rotate(5deg)";
      }
    });

    card.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".interest-icon");
      if (icon) {
        icon.style.transform = "scale(1) rotate(0deg)";
      }
    });
  });

  // Fun facts counter animation
  function animateFunFactCounters() {
    const factCards = document.querySelectorAll(".fact-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const factNumber = entry.target.querySelector(".fact-number");
            if (factNumber) {
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
                  factNumber.textContent = Math.floor(current)
                    .toString()
                    .padStart(2, "0");
                }, 30);
              }
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    factCards.forEach((card) => {
      observer.observe(card);
    });
  }

  // Philosophy cards stagger animation
  function animatePhilosophyCards() {
    const philosophyCards = document.querySelectorAll(".philosophy-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
            }, index * 200);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    philosophyCards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(card);
    });
  }

  // Projects page filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (filterButtons.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        // Add active class to clicked button
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");

        projectCards.forEach((card) => {
          if (
            filter === "all" ||
            card.getAttribute("data-category") === filter
          ) {
            card.style.display = "block";
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";

            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
              card.style.transition = "opacity 0.3s ease, transform 0.3s ease";
            }, 100);
          } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            setTimeout(() => {
              card.style.display = "none";
            }, 300);
          }
        });
      });
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Parallax effect for hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".floating-elements");

    parallaxElements.forEach((element) => {
      const speed = scrolled * 0.3;
      element.style.transform = `translateY(${speed}px)`;
    });

    // Floating tech elements parallax
    const floatingTech = document.querySelectorAll(".floating-tech");
    floatingTech.forEach((element, index) => {
      const speed = scrolled * (0.1 + index * 0.05);
      element.style.transform = `translateY(${speed}px)`;
    });
  });

  // Add scroll effect to navigation
  let lastScrollTop = 0;
  const header = document.querySelector(".menu");

  window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });

  // Add dynamic background to code snippet
  function animateCodeSnippet() {
    const codeSnippet = document.querySelector(".code-snippet");
    if (codeSnippet) {
      setInterval(() => {
        codeSnippet.style.boxShadow = `
          0 10px 30px rgba(83, 155, 245, ${0.1 + Math.random() * 0.2}),
          0 0 20px rgba(83, 155, 245, ${0.05 + Math.random() * 0.1})
        `;
      }, 2000);
    }
  }

  // Add interactive hover effects to timeline markers
  const timelineMarkers = document.querySelectorAll(".timeline-marker");

  timelineMarkers.forEach((marker) => {
    marker.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(-50%) scale(1.2)";
    });

    marker.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(-50%) scale(1)";
    });
  });

  // Add click effect to skill categories
  const skillCategories = document.querySelectorAll(".skill-category");

  skillCategories.forEach((category) => {
    category.addEventListener("click", function () {
      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    });
  });

  // Typing effect for code editor
  function typeCodeEffect() {
    const typingLine = document.querySelector(".typing-line .code-text");
    if (typingLine) {
      const text = typingLine.textContent;
      typingLine.textContent = "";

      let i = 0;
      const typeInterval = setInterval(() => {
        typingLine.textContent += text[i];
        i++;

        if (i >= text.length) {
          clearInterval(typeInterval);
        }
      }, 100);
    }
  }

  // Initialize typing effect after a delay
  setTimeout(typeCodeEffect, 2000);

  // Contact form animation (if exists)
  const contactCards = document.querySelectorAll(".contact-card");

  contactCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";

    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    }, index * 200);
  });

  // Message bubbles animation
  function animateMessageBubbles() {
    const bubbles = document.querySelectorAll(".message-bubble");

    bubbles.forEach((bubble, index) => {
      bubble.style.opacity = "0";
      bubble.style.transform = "translateY(20px)";

      setTimeout(() => {
        bubble.style.opacity = "1";
        bubble.style.transform = "translateY(0)";
        bubble.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      }, index * 1000);
    });
  }

  // Start message bubbles animation
  setTimeout(animateMessageBubbles, 1000);

  // Project cards hover effect enhancement
  const projectCards2 = document.querySelectorAll(".project-card");

  projectCards2.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const icon = this.querySelector(".project-icon, .project-icon-large");
      if (icon) {
        icon.style.transform = "scale(1.05) rotate(5deg)";
      }
    });

    card.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".project-icon, .project-icon-large");
      if (icon) {
        icon.style.transform = "scale(1) rotate(0deg)";
      }
    });
  });

  // Skill cards animation on scroll
  function animateSkillCards() {
    const skillCards = document.querySelectorAll(".skill-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
            }, index * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    skillCards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(card);
    });
  }

  // Easter egg: Konami code
  let konamiCode = [];
  const konamiSequence = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ];

  document.addEventListener("keydown", function (e) {
    konamiCode.push(e.code);

    if (konamiCode.length > konamiSequence.length) {
      konamiCode.shift();
    }

    if (konamiCode.join(",") === konamiSequence.join(",")) {
      // Easter egg activated!
      document.body.style.animation = "rainbow 2s infinite";
      setTimeout(() => {
        document.body.style.animation = "";
      }, 5000);

      // Show a fun message
      const message = document.createElement("div");
      message.textContent = "🎉 You found the easter egg! 🎉";
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
  const style = document.createElement("style");
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

  // Initialize all animations
  animateCounters();
  animateSkillBars();
  animateAboutSkillBars();
  animateTimeline();
  animateFunFactCounters();
  animatePhilosophyCards();
  animateCodeSnippet();
  animateSkillCards();

  // Page-specific initializations
  const currentPage = window.location.pathname;

  if (
    currentPage.includes("about.html") ||
    document.querySelector(".about-hero")
  ) {
    // About page specific code
    console.log("About page loaded");
  }

  if (
    currentPage.includes("projects.html") ||
    document.querySelector(".projects-hero")
  ) {
    // Projects page specific code
    console.log("Projects page loaded");
  }

  // Performance optimization: Debounce scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Apply debouncing to scroll events
  const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations here
  }, 10);

  window.addEventListener("scroll", debouncedScrollHandler);

  // Lazy loading for images (if any are added later)
  function lazyLoadImages() {
    const images = document.querySelectorAll("img[data-src]");

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }

  lazyLoadImages();

  // Add loading state management
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");

    // Trigger any load-dependent animations
    setTimeout(() => {
      const heroElements = document.querySelectorAll(
        ".hero-badge, .hero-title, .hero-description"
      );
      heroElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
        element.classList.add("animate-in");
      });
    }, 100);
  });

  // Add error handling for missing elements
  function safeQuerySelector(selector, callback) {
    const element = document.querySelector(selector);
    if (element && typeof callback === "function") {
      callback(element);
    }
  }

  // Safe initialization of optional features
  safeQuerySelector(".hero-stats", (stats) => {
    stats.classList.add("stats-loaded");
  });

  safeQuerySelector(".code-editor", (editor) => {
    editor.classList.add("editor-loaded");
  });

  // Add accessibility improvements
  function improveAccessibility() {
    // Add skip link
    const skipLink = document.createElement("a");
    skipLink.href = "#main";
    skipLink.textContent = "Skip to main content";
    skipLink.className = "skip-link";
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--accent-color);
      color: white;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 10000;
      transition: top 0.3s;
    `;

    skipLink.addEventListener("focus", () => {
      skipLink.style.top = "6px";
    });

    skipLink.addEventListener("blur", () => {
      skipLink.style.top = "-40px";
    });

    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main landmark if it doesn't exist
    const main = document.querySelector("main");
    if (main && !main.id) {
      main.id = "main";
    }

    // Improve focus management for mobile menu
    const mobileMenuLinks = document.querySelectorAll(".top-bar .menu-link");
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("focus", () => {
        if (topBar && !topBar.classList.contains("active")) {
          hamMenu?.click();
        }
      });
    });
  }

  improveAccessibility();

  console.log("Portfolio JavaScript loaded successfully!");
});
