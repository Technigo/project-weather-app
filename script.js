//DOM selectors
const weatherContainer = document.getElementById("weather-container");
const cityContainer = document.getElementById("city-container");
const weatherForecastWeek = document.getElementById("weather-week-container");


//Function using API to fetch selected weather data.
const fetchTodaysWeather = () => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=18169ba1f8859ef1f0186e26f6fac435"
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const sunrise = new Date(json.sys.sunrise * 1000);
      const timeForSunrise = sunrise.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const sunset = new Date(json.sys.sunset * 1000);
      const timeForSunset = sunset.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      weatherContainer.innerHTML = `
    ${json.weather[0].description} | ${json.main.temp.toFixed(1)}° 
    <p>Sunrise ${timeForSunrise}</p><p>Sunset ${timeForSunset}</p>
    `;
      cityContainer.innerHTML = `
    ${json.name}
    `;
    });
};
fetchTodaysWeather(); //Invoke todays weather and which city.

//Function using API to fetch a 5-days weather forecast. Using filter in the list to only get data from 12.00 each day.
const fetchWeatherForecast = () => {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=18169ba1f8859ef1f0186e26f6fac435"
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const filterForcast = json.list.filter((day) =>
        day.dt_txt.includes("12:00")
      );
      filterForcast.forEach((day) => {
        const dayOfWeek = new Date(day.dt * 1000);
        const weatherTemp = day.main.temp.toFixed();

        weatherForecastWeek.innerHTML += `
          ${new Date(dayOfWeek).toLocaleDateString("en", { weekday: "short" })}
          ${weatherTemp}°`;
      });
    });
};
fetchWeatherForecast(); //Invoke the 5-day weather forecast.
