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
        minute: "2-digit"
      });

      const sunset = new Date(json.sys.sunset * 1000);
      const timeForSunset = sunset.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });

      weatherContainer.innerHTML = `
    ${json.weather[0].description} | ${json.main.temp.toFixed(1)}° 
    <p>Sunrise ${timeForSunrise}</p><p>Sunset ${timeForSunset}</p>
    `;

      //Function to change backround color and icon depending on the weather.
      const warmColdBackround = () => {
        if (json.weather[0].main === "Clouds") {
          cityContainer.innerHTML += `
        <img src="./assets/icons/noun_Cloud_1188486.svg" alt="Cloud">
        <h1>Light a fire and get cosy. ${json.name} is looking grey today.</h1>`;
          document.body.style.backgroundColor = "#F4F7F8";
          document.body.style.color = "#F47775";
        } else if (json.weather[0].main === "Rain") {
          cityContainer.innerHTML += `
        <img src="./assets/icons/noun_Umbrella_2030530.svg" alt="Umbrella">
        <h1>Don't forget your umbrella. It's wet in ${json.name} today.</h1>`;
          document.body.style.backgroundColor = "#BDE8FA";
          document.body.style.color = "#164A68";
        } else if (json.weather[0].main === "Clear") {
          cityContainer.innerHTML += `
        <img src="./assets/icons/noun_Sunglasses_2055147.svg" alt="Sunglasses">
        <h1>Get your sunnies on. ${json.name} is looking rather great today.</h1>`;
          document.body.style.backgroundColor = "#F7E9B9";
          document.body.style.color = "#2A5510";
        } else {
          cityContainer.innerHTML += ` 
        <img src="./assets/icons/noun_Umbrella_white.svg" alt="Umbrella">
        <h1>Get your warm coat on. It's cold in ${json.name} today.</h1>`;
          document.body.style.backgroundColor = "#58537B";
          document.body.style.color = "#FFFFFF"; //Just added this else for all other different weathers that's not "clouds, rain or clear". Next step would be to have a color & icon for each different weather groups.
        }
      };
      warmColdBackround(); //Invoke function to show different colors.
    });
};
fetchTodaysWeather(); //Invoke function to show todays weather city.

//Function using API to fetch a 5-days weather forecast. Using filter in the API list to only get data from 12.00 each day.
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
        const weatherTemp = day.main.temp.toFixed(); //Here I wanted the temp to show without the decimals.

        weatherForecastWeek.innerHTML += `
          <div class="days">${new Date(dayOfWeek).toLocaleDateString("en", {
            weekday: "short",
          })}</div>
          <div class="temp">${weatherTemp}°</div>`;
      });
    });
};
fetchWeatherForecast(); //Invoke function to show the 5-day weather forecast.
