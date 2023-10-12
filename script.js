const weatherContainer = document.getElementById("weather-container");

async function getWeather() {
  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=162e87975bc70dc88548f3920f1c4fdf"
    );
    const weather = await response.json();

    const li = document.createElement("li");
    li.innerHTML += `
			<div>
				<h2>
					${weather.name}
				</h2>
				<p>Temperature ${weather.main.temp.toFixed(1)}</p>
				<p>Description: ${weather.weather[0].description}</p>
			</div>`;

    weatherContainer.appendChild(li);
  } catch (err) {
    console.error(err);
  }
}

const forecastContainer = document.getElementById("forecast-container");
const forecastURL =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=693dd010904bcc0402e15bf40afeee28";

async function getForecast() {
  try {
    const response = await fetch(forecastURL);
    const forecast = await response.json();

    const noonWeather = forecast.list.filter((obj) =>
      obj.dt_txt.includes("12:00:00")
    );
    for (let element of noonWeather) {
      forecastContainer.innerHTML += `
		<li class="forecast-li">
			<div class="forecast-li-day">${element.dt_txt}</div>
			<div class="forecast-li-weather">${element.weather[0].description}</div>
		</li>`;
    }
  } catch (err) {
    console.error(err);
  }
}

// search funtion here

// Function calls here
getForecast();
getWeather();
