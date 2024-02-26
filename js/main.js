const data = {
  forecast: "cloudy",
  forecast_temp: "23",
  icon: "./assets/weather-icons/noun_Cloud_1188486.svg",
  alt: "cloudy",
  colorText: "#f47775",
  backgroundColor: "#f4f7f8",
  text: "Get your sunnies on. Stockholm is looking rather great today.",
  sunset: "22.30",
  sunrise: "08.00",
};

const main = document.getElementById("main");
const forecastSection = document.getElementById("section__forecast-info");

const loadWeatherContent = () => {
  // Controlling the color of main
  main.style.backgroundColor = data.backgroundColor;
  main.style.color = data.colorText;

  forecastSection.innerHTML += `
  <div class="forecast-container">
    <div class="forecast-info">
        <p>${data.forecast} | ${data.forecast_temp}</p>
        <p>sunrise ${data.sunrise}</p>
        <p>sunset ${data.sunset}</p>
        </div>
        <img
        src="${data.icon}"
        alt="${data.alt}"
        width="80"
        height="80"
        />
    </div>
    <div class="forecast-title">
        <h1>${data.text}</h1>
    </div>
    `;
};

// Call the displayFooter function when the page is loaded
window.onload = loadWeatherContent;
