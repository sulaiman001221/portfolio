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

    // Close the menu when a link is clicked
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

  // Check for saved theme preference or default to 'dark'
  const currentTheme = localStorage.getItem("theme") || "dark";

  // Apply the current theme
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

  // Add event listeners for theme toggle
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener("click", toggleTheme);
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
});
