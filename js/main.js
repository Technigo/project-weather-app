import { getGeolocationData } from "./geolocation.js";

const main = document.getElementById("main");
const currentWeatherSection = document.getElementById(
  "section__current-weather"
);
console.log(currentWeatherSection);
export const loadWeatherContent = (data) => {
  // Controlling the color of main
  main.style.backgroundColor = data.backgroundColor;
  main.style.color = data.colorText;

  currentWeatherSection.innerHTML += `
  <div class="current-weather-container">
    <div class="current-weather">
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

const initializeApp = () => {
  getGeolocationData();
};

// Run initialization when the DOM is loaded
document.addEventListener("DOMContentLoaded", initializeApp);
