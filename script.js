const overcastContainer = document.getElementById("overcast");
const sunriseSunsetContainer = document.getElementById("sunrise-sunset");
const sunriseContainer = document.getElementById("sunrise");
const sunsetContainer = document.getElementById("sunset");
const buttonContainer = document.getElementById("button");
const forecastContainer = document.getElementById("forecast-container");
const hiddingButtonContainer = document.getElementById("hidding-button");

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const forecastURL = "https://api.openweathermap.org/data/2.5/forecast";
const API_KEY = "07b1e3ac4ed3c5e09fa788587b7c0a21";
const city = "Stockholm";

const URL = `${BASE_URL}?q=${city}&units=metric&APPID=${API_KEY}`;
const predictURL = `${forecastURL}?q=${city}&appid=${API_KEY}&units=metric`;
console.log(predictURL);
//console.log(URL);

fetch(URL)
  .then((response) => response.json())
  .then((response) => {
    //console.log(response);
    showOvercast(response.name, response.main.temp);
    showSunriseAndSunset(response.sys.sunrise, response.sys.sunset);

    response.weather.forEach((clima) => {
      overcastContainer.innerHTML += `<p> JSON Description: ${clima.description} </p>`;
    });
  });

// Overcast function
const showOvercast = (city, temperature) => {
  overcastContainer.innerHTML = `<h1> ${temperature.toFixed(1)} °Celcius </h1>`;
  overcastContainer.innerHTML += `<h2> City: ${city}</h2>`;
};

// Sunrise/sunset function
const showSunriseAndSunset = (sunrise, sunset) => {
  const sunriseDate = new Date(sunrise * 1000);
  const sunsetDate = new Date(sunset * 1000);
  sunriseContainer.innerHTML += `<p>Sunrise ${sunriseDate.getHours()}:${sunriseDate.getMinutes()} </p>`;
  sunsetContainer.innerHTML += `<p>Sunset ${sunsetDate.getHours()}:${sunsetDate.getMinutes()}</p>`;
};

// Button function
const toggleForecast = () => {
  if (forecastContainer.innerHTML != "") {
    forecastContainer.innerHTML = "";
  } else {
    showForecast();
  }
};
hiddingButtonContainer.addEventListener("click", toggleForecast);

//Function unixtime to weekday
const getWeekDay = (unixtime) => {
  const dateObject = new Date(unixtime * 1000);

  const numberOfWeekDay = dateObject.getDay();
  switch (numberOfWeekDay) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
};

// Forecast days ahead

const showForecast = () => {
  fetch(predictURL)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      const filteredForecast = response.list.filter((forecast) =>
        forecast.dt_txt.includes("12:00:00")
      );
      filteredForecast.forEach((forecast) => {
        forecastContainer.innerHTML += "<li>";
        forecastContainer.innerHTML += `Forecast:${getWeekDay(forecast.dt)}`;
        forecastContainer.innerHTML += `<img src = "https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">`;
        forecastContainer.innerHTML += `Forecast:${forecast.main.temp_max})`;
        forecastContainer.innerHTML += `Forecast:${forecast.main.temp_min})`;
        forecastContainer.innerHTML += "</li>";
      });
    });
};

showForecast();
