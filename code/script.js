const navItems = document.querySelectorAll(".nav-item");

// Open menu
const toggleMenu = () => {
    menuBtn.classList.toggle("close");
    menu.classList.toggle("show");
    menuNav.classList.toggle("show");
    menuBranding.classList.toggle("show");
    navItems.forEach(item => item.classList.toggle("show"))
}

// Open or close menu by clicking or touching
menuBtn.addEventListener("click", toggleMenu);