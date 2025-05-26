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

  // Project filtering functionality
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const projectsGrid = document.getElementById("projectsGrid");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      // Add filtering class for smooth transition
      projectsGrid.classList.add("filtering");

      setTimeout(() => {
        projectCards.forEach((card) => {
          if (filter === "all") {
            card.classList.remove("hidden");
            card.style.display = "block";
          } else {
            const cardStatus = card.getAttribute("data-status");
            if (cardStatus === filter) {
              card.classList.remove("hidden");
              card.style.display = "block";
            } else {
              card.classList.add("hidden");
              card.style.display = "none";
            }
          }
        });

        // Remove filtering class
        projectsGrid.classList.remove("filtering");

        // Update project count animation
        updateProjectCount(filter);
      }, 150);
    });
  });

  function updateProjectCount(filter) {
    const visibleCards = document.querySelectorAll(
      `.project-card:not(.hidden)`
    );

    // Animate the visible cards
    visibleCards.forEach((card, index) => {
      card.style.animation = "none";
      card.offsetHeight; // Trigger reflow
      card.style.animation = `fadeInUp 0.6s ease forwards`;
      card.style.animationDelay = `${index * 0.1}s`;
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

  // Add scroll effect to navigation
  let lastScrollTop = 0;
  const header = document.querySelector(".menu");

  window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up
      header.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });

  // Add intersection observer for project cards animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe project cards for animation
  projectCards.forEach((card) => {
    observer.observe(card);
  });

  // Add click effect to project cards (except disabled ones)
  projectCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      // Don't trigger if clicking on a link or if it's a planned project
      if (
        e.target.tagName !== "A" &&
        !e.target.closest("a") &&
        !e.target.closest(".project-link.disabled")
      ) {
        const link = this.querySelector(".project-link.primary:not(.disabled)");
        if (link) {
          window.open(link.href, "_blank");
        }
      }
    });
  });

  // Add hover effect for planned projects
  const plannedCards = document.querySelectorAll(
    '.project-card[data-status="planned"]'
  );

  plannedCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const icon = this.querySelector(".placeholder-content i");
      if (icon) {
        icon.style.transform = "scale(1.2) rotate(10deg)";
        icon.style.color = "var(--accent-color)";
      }
    });

    card.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".placeholder-content i");
      if (icon) {
        icon.style.transform = "scale(1) rotate(0deg)";
        icon.style.color = "";
      }
    });
  });

  // Add typing effect to page title
  const pageTitle = document.querySelector(".page-title");
  if (pageTitle) {
    const titleText = pageTitle.textContent;
    const icon = pageTitle.querySelector("i");
    const iconHTML = icon ? icon.outerHTML : "";

    pageTitle.innerHTML = iconHTML;
    let i = 0;
    const textWithoutIcon = titleText.replace("All Projects", "").trim();

    function typeWriter() {
      if (i < "All Projects".length) {
        pageTitle.innerHTML = iconHTML + "All Projects".substring(0, i + 1);
        i++;
        setTimeout(typeWriter, 100);
      }
    }

    setTimeout(typeWriter, 500);
  }

  // Add counter animation to stats
  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 30);
  }

  // Animate stats when they come into view
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const number = entry.target.querySelector(".stat-number");
        const target = parseInt(number.textContent);
        number.textContent = "0";
        animateCounter(number, target);
        statsObserver.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll(".stat-item").forEach((stat) => {
    statsObserver.observe(stat);
  });

  // Add search functionality (bonus feature)
  function addSearchFunctionality() {
    const searchContainer = document.createElement("div");
    searchContainer.className = "search-container";
    searchContainer.innerHTML = `
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Search projects..." id="projectSearch">
        <button class="clear-search" id="clearSearch" style="display: none;">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;

    const filterTabs = document.querySelector(".filter-tabs");
    filterTabs.parentNode.insertBefore(searchContainer, filterTabs);

    const searchInput = document.getElementById("projectSearch");
    const clearBtn = document.getElementById("clearSearch");

    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      clearBtn.style.display = searchTerm ? "block" : "none";

      projectCards.forEach((card) => {
        const title = card
          .querySelector(".project-title")
          .textContent.toLowerCase();
        const description = card
          .querySelector(".project-description")
          .textContent.toLowerCase();
        const tech = Array.from(card.querySelectorAll(".tech-tag"))
          .map((tag) => tag.textContent.toLowerCase())
          .join(" ");

        if (
          title.includes(searchTerm) ||
          description.includes(searchTerm) ||
          tech.includes(searchTerm)
        ) {
          card.style.display = "block";
          card.classList.remove("hidden");
        } else {
          card.style.display = "none";
          card.classList.add("hidden");
        }
      });
    });

    clearBtn.addEventListener("click", function () {
      searchInput.value = "";
      this.style.display = "none";
      projectCards.forEach((card) => {
        card.style.display = "block";
        card.classList.remove("hidden");
      });
      // Reset to "all" filter
      document.querySelector('.filter-btn[data-filter="all"]').click();
    });
  }

  // Uncomment the line below to enable search functionality
  addSearchFunctionality();
});
