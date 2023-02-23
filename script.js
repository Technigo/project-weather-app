const weather = document.getElementById("weather");
const descriptionToday = document.getElementById("description-today");
const tempToday = document.getElementById("temp-today");
const sunUp = document.getElementById("sunrise");
const sunDown = document.getElementById("sunset");
const windGust = document.getElementById("wind");

// Define weatherIcons object
const weatherIcons = {
  "clear sky": "./images/sun.png",
  "few clouds": "./images/partly-cloudy.png",
  "scattered clouds": "./images/partly-cloudy.png",
  "overcast clouds": "./images/cloud.png",
  "shower rain": "./images/heavy-rain.png",
  rain: "./images/heavy-rain.png",
  thunderstorm: "./images/storm.png",
  snow: "./images/snow.png",
  mist: "./images/haze.png",
};

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Malmo,Sweden&units=metric&APPID=7916e2ff30e82c8f4b79258c3235d9c2"
)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    // Update weather in Malmo from API

    weather.innerHTML = `<h1>Today's weather in ${json.name}</h1>`;

    // Describe weather and change weatherIcon based on weather description
    descriptionToday.innerHTML = `<h2>The weather is ${json.weather[0].description}</h2>`;
    // Change weatherIcon based on weather description
    if (json.weather[0].description) {
      const iconFileName =
        weatherIcons[json.weather[0].description.toLowerCase()];
      descriptionToday.innerHTML += `<img src="${iconFileName}" alt="Weather icon">`;
    }

    tempToday.innerHTML = `<h3>The temperature is ${
      Math.round(json.main.temp * 10) / 10
    }°C in ${json.name}</h3>`;

    const sunrise = json.sys.sunrise;
    const sunriseTimepoint = new Date(sunrise * 1000);
    const sunriseHrMin = sunriseTimepoint.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    sunUp.innerHTML = `<h3>The sun rises at ${sunriseHrMin}</h3>`;
    console.log(json.sys.sunrise);

    const sunset = json.sys.sunset;
    const sunsetTimepoint = new Date(sunset * 1000);
    const sunsetHrMin = sunsetTimepoint.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    sunDown.innerHTML = `<h3>The sun sets at ${sunsetHrMin}</h3>`;
    console.log(json.sys.sunset);

    const wind = json.wind.gust;
    windGust.innerHTML = `<h3>The wind blows gusts up to ${wind} meters per second`;
  });

//ändra bakgrund beroende på väder, som JL?

//weekly forecast

//avsluta med en .catch((err) => {
//console.log('error caught', err)
//})

//Eventlisteners?

// Five day weather forecast

const fiveDayApiUrl =
  "https://api.openweathermap.org/data/2.5/forecast?lat=55.6059&lon=13.0007&units=metric&appid=7916e2ff30e82c8f4b79258c3235d9c2";

const weatherFiveDays = document.getElementById("weather-five-days");

const fiveDayForecast = () => {
  fetch(fiveDayApiUrl)
    .then((response) => {
      return response.json();
    })

    .then((fiveDayArray) => {
      const filteredForecast = fiveDayArray.list.filter((item) =>
        item.dt_txt.includes("12:00")
      );

      filteredForecast.forEach((eachDay) => {
        weatherFiveDays.innerHTML += generateHTMLForForecast(eachDay);
      });
    });
};

fiveDayForecast();

// A function that retrieve and convert data from the API in a readable format.
function generateHTMLForForecast(day) {
  const weekdayUnix = day.dt;
  const weekdayLong = new Date(weekdayUnix * 1000);
  const weekdayName = weekdayLong
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();
  const dayTemp = `${Math.round(day.main.temp * 10) / 10}`;

  // And creates HTML code that is returned
  let fiveDayForecastHTML = "";
  fiveDayForecastHTML += `<div class="weather-five-days">`;
  fiveDayForecastHTML += `<p class="weekday-name">${weekdayName}</p>`;
  fiveDayForecastHTML += `<p class="day-temp">${dayTemp}°C</p>`;
  fiveDayForecastHTML += `</div>`;
  return fiveDayForecastHTML;
}
