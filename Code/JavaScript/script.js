// Select DOM items
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementsByClassName("show");
const menu = document.getElementById("menu");
const menuNav = document.getElementById("menuNav");
const menuBranding = document.getElementById("menuBranding");
const navItems = document.querySelectorAll(".nav-item");


// Open menu

const toggleMenu = () => {
  menuBtn.classList.add("close");
  menu.classList.add("show");
  menuNav.classList.add("show");
  menuBranding.classList.add("show");
  navItems.forEach(item => item.classList.add("show"))
}

// Close menu

const closeMenu = () => {
  menuBtn.classList.remove("close");
  menu.classList.remove("show");
  menuNav.classList.remove("show");
  menuBranding.classList.remove("show");
  navItems.forEach(item => item.classList.remove("show"))
}

const outsideClick = (click) => {

}

// Open or close menu by clicking or touching

menuBtn.addEventListener("click", toggleMenu);
menuBtn.addEventListener("touchstart", toggleMenu);

menu.addEventListener("click", closeMenu);
menu.addEventListener("touchstart", closeMenu);
