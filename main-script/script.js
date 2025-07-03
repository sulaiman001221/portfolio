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
  animateTimeline();
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
