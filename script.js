let currentCity = "Malmö"; // set Malmö to the default city

let weatherDescriptionDiv = document.getElementById("weatherDescription");
let cityNameDiv = document.getElementById("cityName");
let currentTemperatureDiv = document.getElementById("currentTemperature");
let sunriseDiv = document.getElementById("sunrise");
let sunsetDiv = document.getElementById("sunset");
let weeklyWeatherDiv = document.getElementById("weeklyWeather");
let changeCityMalmo = document.getElementById("cityMalmo");
let changeCityStockholm = document.getElementById("cityStockholm");
let mainWeatherPicture = document.getElementById("mainWeatherPicture");

const fetchCurrentWeather = (currentCity) => {
  let currentWeatherLink = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity},Sweden&units=metric&APPID=d73aa5f2cfee2a35632856b10b30a458`;

  fetch(currentWeatherLink)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      renderCurrentWeather(data);
      renderSunriseSunset(data);
      currentTime(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const fetchWeeklyWeather = (currentCity) => {
  let weeklyWeatherLink = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity},Sweden&units=metric&APPID=d73aa5f2cfee2a35632856b10b30a458`;

  fetch(weeklyWeatherLink)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      renderWeeklyWeather(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const currentTime = (data) => {
  let currentTime = data.dt;
  let currentTimeDate = new Date(currentTime * 1000);
  let currentTimeHour = currentTimeDate.getHours();
  let currentTimeMinute = currentTimeDate.getMinutes();
  let currentTimeRender =
    (currentTimeHour < 10 ? "0" + currentTimeHour : currentTimeHour) +
    "." +
    (currentTimeMinute < 10 ? "0" + currentTimeMinute : currentTimeMinute);
  console.log(currentTimeRender);
};

const renderCurrentWeather = (data) => {
  let weatherDescription = data.weather[0].description;
  let cityName = data.name;
  let currentTemperature = data.main.temp.toFixed();

  weatherDescriptionDiv.innerHTML = `${weatherDescription}`;
  cityNameDiv.innerHTML = `${cityName}`;
  currentTemperatureDiv.innerHTML = `${currentTemperature}°C`;
};

const renderSunriseSunset = (data) => {
  let fetchedSunrise = data.sys.sunrise;
  let sunriseTime = new Date(fetchedSunrise * 1000);
  let sunriseHours = sunriseTime.getHours();
  let sunriseMinutes = sunriseTime.getMinutes();
  let renderedSunrise =
    (sunriseHours < 10 ? "0" + sunriseHours : sunriseHours) +
    "." +
    (sunriseMinutes < 10 ? "0" + sunriseMinutes : sunriseMinutes); // making sure that if we get a one digit number we add 0 before it

  let fetchedSunset = data.sys.sunset;
  let sunsetTime = new Date(fetchedSunset * 1000);
  let sunsetHours = sunsetTime.getHours();
  let sunsetMinutes = sunsetTime.getMinutes();
  let renderedSunset =
    (sunsetHours < 10 ? "0" + sunsetHours : sunsetHours) +
    "." +
    (sunsetMinutes < 10 ? "0" + sunsetMinutes : sunsetMinutes);

  sunriseDiv.innerHTML = `${renderedSunrise}`;
  sunsetDiv.innerHTML = `${renderedSunset}`;
};

const renderWeeklyWeather = (data) => {
  //code from https://stackoverflowteams.com/c/technigo/questions/786
  weeklyWeatherDiv.innerHTML = "";
  const filteredForecast = data.list.filter((item) =>
    item.dt_txt.includes("12:00")
  );

  filteredForecast.forEach((day) => {
    const date = new Date(day.dt * 1000);

    // Make a Date object for right now
    const now = new Date();

    // Compare the forecast's day with the day right now
    const isTodaysForecast = date.getDay() === now.getDay();

    let dayName = date.toLocaleDateString("en-US", { weekday: "short" });

    // We don't want to include this forecast if it is for today
    if (!isTodaysForecast) {
      weeklyWeatherDiv.innerHTML += `<p>${dayName} <img src="http://openweathermap.org/img/wn/${
        day.weather[0].icon
      }.png" alt="${
        day.weather[0].description
      }">  ${day.main.temp.toFixed()}°C</p>`;
    }
  });
};

fetchCurrentWeather(currentCity);
fetchWeeklyWeather(currentCity);

changeCityMalmo.addEventListener("click", () => {
  fetchCurrentWeather("Malmö");
  fetchWeeklyWeather("Malmö");
});
changeCityStockholm.addEventListener("click", () => {
  fetchCurrentWeather("Stockholm");
  fetchWeeklyWeather("Stockholm");
});

const updateWeatherPicture = (data) => {

  // background changes depending on the weather type
  let weatherImage = data.weather[0].main;
  
  
  if (weatherImage === "Clear") {
    // https://openweathermap.org/weather-conditions The types should match the main types from this web?
    mainWeatherPicture.innerHTML = `
    <img id="" class="" src="/assets/sun.jpg">`
  } else if (weatherImage === "Thunderstorm") {
    mainWeatherPicture.innerHTML = `
    <img id="" class="" src=""/>`
  } else if (weatherImage === "Drizzle") {
    mainWeatherPicture.innerHTML = `
    <img id="" class="" src="./assets/sun.jpg"/>`
  } else if (weatherImage === "Rain") {
    mainWeatherPicture.innerHTML = `
    <img id="" class="" src="./assets/sun.jpg"/>`
  } else if (weatherImage === "Snow") {
    mainWeatherPicture.innerHTML = `
    <img id="" class="" src="/assets/cloudy.jpg">`
} else if (weatherImage === "Clouds") {
  mainWeatherPicture.innerHTML = `
  <img id="" class="" src="./assets/sun.jpg"/>`
} else {
  mainWeatherPicture.innerHTML = `
  <img id="" class="" src="./assets/sun.jpg"/>`
}
}


const time = new Date().toLocaleString([], {
  
})
// Background change
const dayToNight = () => {
  if (time < sunrise && time > sunset) {
    mainWeather.style.background = `
    
    `;
  }
};

dayToNight();


fetchWeather();



