const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const containerWeather = document.getElementById("weather");
const containerTemp = document.getElementById("temp");
const containersunrise = document.getElementById("sunrise");
const containersunset = document.getElementById("sunset");

const forecast = document.querySelector("#forecast");

// API for today
fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=68b38084465c789f4422e7d217060b68"
)
  .then(response => {
    return response.json();
  })
  .then(json => {
    //To get sunrise/sunset time in hours:minutes:seconds
    const sunrise = new Date(json.sys.sunrise * 1000);
    const sunset = new Date(json.sys.sunset * 1000);

    //Declare new variable to show only hh:mm
    const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: "short" });
    const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: "short" });

    containerWeather.innerHTML = `<p><img src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png"><br>${json.weather[0].main}</p>`;
    containerTemp.innerHTML = `<p>${Math.round(json.main.temp)} C°</p>`;
    containersunrise.innerHTML = `<p><img src="sunrise.png">${sunriseTime}</p>`;
    containersunset.innerHTML = `<p><img src="sunset.png">${sunsetTime}</p>`;
  });

/// API for 5 days
fetch(
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&cnt=40&APPID=68b38084465c789f4422e7d217060b68"
)
  .then(response => {
    return response.json();
  })
  .then(json => {
    // Get today's week day number
    let currentDay = new Date().getDay();

    json.list.forEach(item => {
      // Getting current item's day number
      const day = new Date(item.dt * 1000).getDay();

      // Check if saved day number is already printed
      // (to only print one timestamp from each day)
      if (day === currentDay) {
        return;
      }

      // Gives back a number between 0-6 to select a day from the array 'days'

      // Prints out the data we've collected, and divied them into divs and classes.
      forecast.innerHTML +=
        `<div class="item">` +
        `<div class="day">${days[currentDay]}</div>` +
        `<div class="main">` +
        `<img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="${item.weather[0].main}" />` +
        `</div>` +
        `<div class="temp">${Math.round(item.main.temp)}°</div>` +
        `</div>`;

      // Save printed day number
      currentDay = day;
    });
  });
