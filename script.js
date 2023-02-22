const weather = document.getElementById("weather");
const descriptionToday = document.getElementById("description-today");
const tempToday = document.getElementById("temp-today");

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Malmo,Sweden&units=metric&APPID=7916e2ff30e82c8f4b79258c3235d9c2"
)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    // Update weather in Malmo from API
    weather.innerHTML = `<h1>Today's weather in ${json.name}</h1>`;

    descriptionToday.innerHTML = `<h2>The weather is ${json.weather[0].description}</h2>`;

    tempToday.innerHTML = `<h3>The temperature is ${
      Math.round(json.main.temp * 10) / 10
    }°C in ${json.name}</h3>`;
  });

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
