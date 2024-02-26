const data = {
  forecast: "cloudy",
  icon: "./assets/weather-icons/noun_Sunglasses_2055147.svg",
  alt: "cloudy",
  colorText: "#f47775",
  backgroundColor: "#f4f7f8",
  text: "Get your sunnies on. Stockholm is looking rather great today.",
};

const main = document.getElementById("main");

const loadWeatherContent = () => {
  // Controlling the color of main
  main.style.backgroundColor = data.backgroundColor;
  main.style.color = data.colorText;

  main.innerHTML += `

      `;
};

// Call the displayFooter function when the page is loaded
window.onload = loadWeatherContent;
