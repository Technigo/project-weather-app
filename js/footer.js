const footer = document.getElementById("footer");

const socialInfo = {
  linkedin: {
    link: "https://www.linkedin.com/in/pernilla-sterner/",
    icon: "./assets/social-icons/linkedIn.svg",
    alt: "Linkedin",
  },
  github: {
    link: "https://github.com/pernillasterner",
    icon: "./assets/social-icons/github.svg",
    alt: "GitHub",
  },
  instagram: {
    link: "https://www.instagram.com/pernillasterner.se/",
    icon: "./assets/social-icons/instagram.svg",
    alt: "Instagram",
  },
};

const displayFooter = () => {
  Object.entries(socialInfo).forEach(([social, key]) => {
    footer.innerHTML += `
    <a href="${key.link}" target="_blank">
        <img src="${key.icon}" alt="${key.alt}"/>
    </a>
    `;
  });
};

displayFooter();
