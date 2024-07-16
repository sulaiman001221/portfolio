document.addEventListener("DOMContentLoaded", function () {
  const hamMenu = document.querySelector(".ham-menu");
  const topBar = document.querySelector(".top-bar");
  const menuLinks = document.querySelectorAll(".top-bar .menu-link"); // Select .menu-link within .top-bar

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
});
