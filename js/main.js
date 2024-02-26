import { getGeolocationData } from "./geolocation.js";

const main = document.getElementById("main");
const forecastSection = document.getElementById("section__forecast-info");

export const loadWeatherContent = (data) => {
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

const initializeApp = () => {
  getGeolocationData();
};

// Run initialization when the DOM is loaded
document.addEventListener("DOMContentLoaded", initializeApp);
