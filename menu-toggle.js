document.addEventListener('DOMContentLoaded', function() {
    const hamMenu = document.querySelector(".ham-menu");
    const topBar = document.querySelector(".top-bar");
  
    hamMenu.addEventListener("click", () => {
      hamMenu.classList.toggle("active");
      topBar.classList.toggle("active");
    });
  });
  