const weatherContainer = document.getElementById("weather-container");
const cityWeatherContainer = document.getElementById("weather-city");
const searchButton = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const forecastContainer = document.getElementById("forecast-container");
const sunriseSunsetContainer = document.getElementById("sun-container");

const API_KEY = "api-key";
let cityName = "Gothenburg";
const fetchWeather = async (cityName) => {
  try {
    const longUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${API_KEY}`;
    const responseFromApi = await fetch(longUrl);
    const currentWeather = await responseFromApi.json();

    // get correct format for sunset, sunrise
    const sunriseDate = new Date(currentWeather.sys.sunrise * 1000);
    const sunsetDate = new Date(currentWeather.sys.sunset * 1000);
    const format = { hour: "2-digit", minute: "2-digit" };
    const formattedSunrise = sunriseDate.toLocaleTimeString("en-US", format);
    const formattedSunset = sunsetDate.toLocaleTimeString("en-US", format);
    // print weather info for city
    cityWeatherContainer.innerHTML = `
        <h1>${parseInt(currentWeather.main.temp)}<span>°C</span></h1>
        <h2>${currentWeather.name}</h2>
        <p>${currentWeather.weather[0].description}</p>
        <p>Humidity:${currentWeather.main.humidity + "%"}</p>
        `;

    sunriseSunsetContainer.innerHTML = `
      <p>Sunrise: ${formattedSunrise}</p>
      <p>Sunset: ${formattedSunset}</p>
      `;

    const coordinates = currentWeather.coord;
    const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}`;
    const responseFromApi2 = await fetch(weatherURL);
    const weatherInfo = await responseFromApi2.json();
    const weatherList = weatherInfo.list;
    console.log(weatherList);

    //filtered temperatur from 12:00 each day
    const filteredForecast = weatherList.filter((day) =>
      day.dt_txt.includes("12:00")
    );
    console.log(filteredForecast);


    filteredForecast.forEach((day) => {
      //get weather icons 
      let weatherIcon = day.weather[0].main; 
      if(weatherIcon === "Thunderstorm"){
        iconType = "Thunderstorm.png";
      }
      else if (weatherIcon === "Drizzle"){
        iconType = "Drizzle.png";
      }
      else if (weatherIcon === "Rain"){
        iconType = "Rain.png";
      }
      else if (weatherIcon === "Snow"){
        iconType = "Snow.png";
      }
      else if(weatherIcon === "Mist"){
        iconType = "Mist.png";
      }
      else if(weatherIcon === "Smoke"){
        iconType = "Smoke.png";
      }
      else if(weatherIcon === "Haze"){
        iconType = "Haze.png";
      }
      else if(weatherIcon === "Dust"){
        iconType = "Dust.png";
      }
      //Fog icon similar smoke
      else if(weatherIcon === "Fog"){
        iconType = "Smoke.png";
      }
      //Sand icon similar dust
      else if(weatherIcon === "Sand"){
        iconType = "Dust.png";
      }
      //Ash icon similar Drizzle
      else if(weatherIcon === "Ash"){
        iconType = "Drizzle.png";
      }
      else if(weatherIcon === "Squall"){
        iconType = "Squall.png";
      }
      else if(weatherIcon === "Tornado"){
        iconType = "Tornado.png";
      }

      else if (weatherIcon === "Clear"){
        iconType = "Clear.png";
      }
      else if
      (weatherIcon === "Clouds"){
        iconType = "Cloud.png";
      }

      //get correct format for day
      const dateFilteredForecast = new Date(day.dt_txt);
      const options = { weekday: "short" };
      const weekdayFilteredForecast = new Intl.DateTimeFormat(
        "en-UK",
        options
      ).format(dateFilteredForecast);

      // create container for day
      const forecast = document.createElement("div");
      forecast.classList.add("forecast-item");

      //print fivedays forecast
      forecast.innerHTML += `
      <p>${weekdayFilteredForecast}</p>
      <p><img src="./design/design1/assets/${iconType}" height="30" width="30"/></p>
      <p>${day.wind.speed} m/s</p>
      <p>${parseInt(currentWeather.main.temp)}<span>°C</span></p>
      `;

      forecastContainer.appendChild(forecast);
    });
  } catch (error) {
    console.log(error);
  }
  cityInput.value='';
};
fetchWeather(cityName);

// seach weather by city input
searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  cityWeatherContainer.innerHTML = ``;
  forecastContainer.innerHTML = ``;
  cityName = cityInput.value;
  fetchWeather(cityName);
});
