const weatherContainer = document.getElementById("weather-container");
const cityWeatherContainer = document.getElementById("weather-city");
const searchButton = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const forecastContainer = document.getElementById("forecast-container");

const API_KEY = "KEY_API";

const fetchWeather = async (cityName) => {
  try {
    // CHANGE TO THE FIRST LONGURL LINE 13 AND UNCOMMENT LINE 70  FOR TRYING DIFFERENT CITIES

    //let longUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${API_KEY}`;
    let longUrl = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`;
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
        <p>City: ${currentWeather.name}</p>
        <p>Temp: ${parseInt(currentWeather.main.temp)}<span>°C</span></p>
        <p>Description:${currentWeather.weather[0].description}</p>
        <p>Humidity:${currentWeather.main.humidity + "%"}</p>
        <p>Sunrise: ${formattedSunrise}</p>
        <p>Sunset: ${formattedSunset}</p>
        `;

    const coordinates = currentWeather.coord;
    const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}`;
    const responseFromApi2 = await fetch(weatherURL);
    const weatherInfo = await responseFromApi2.json();
    const weatherList = weatherInfo.list;

    //filtered temperatur from 12:00 each day
    const filteredForecast = weatherList.filter((day) =>
      day.dt_txt.includes("12:00")
    );

    filteredForecast.forEach((day) => {
      //get correct format for day
      const dateFilteredForecast = new Date(day.dt_txt);
      console.log(dateFilteredForecast);

      const options = { weekday: "long" };
      const weekdayFilteredForecast = new Intl.DateTimeFormat(
        "en-UK",
        options
      ).format(dateFilteredForecast);
      console.log(weekdayFilteredForecast);
      // print fivedays forecast
      forecastContainer.innerHTML += `
      <p>${weekdayFilteredForecast}</p>
      <p>${day.weather[0].description}</p>
      <p>Temp: ${parseInt(currentWeather.main.temp)}<span>°C</span></p>
      `;
    });
  } catch (error) {
    console.log(error);
  }
};
fetchWeather();

// seach weather by city input

/*searchButton.addEventListener("click", () => {
  const cityName = cityInput.value;
  if (cityName) {
    fetchWeather(cityName);
  } else {
    cityWeatherContainer.innerHTML = "Please enter a city name";
  }
});
*/
