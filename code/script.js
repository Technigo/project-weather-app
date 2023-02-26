// DOM selectors
const todaysWeather = document.getElementById("todays-weather");
const cityWeather = document.getElementById("city-weather");
const forecast = document.getElementById("forecast-section");
const weatherBody = document.getElementById("weather-body");

let weatherResults;
let city = "Gothenburg" //Default city

const fetchingWeather = () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=7ff627bd38e63e85c26d65d579c38c04`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      weatherResults = json;

      //Setting the different alternatives for the "city-weather" section
      weatherDescription(weatherResults.weather[0].main,weatherResults.name)
    })
    const weatherDescription = (localWeatherToday, city) => {   
      if (localWeatherToday === "Clear") {
        cityWeather.innerHTML = `<div class= "Clear">
                  <img class= "sunny" src="images/sun-glasses.png"/>
                  <h1> Sunglass-up. ${city} is shining and so are you.</h1>
                    <div class= "todays-item">
                      <p>Recommended clothing item:</p>
                      <img class= "item" src="images/keps.png"/>
                    </div>
                  </div>`;
        document.body.style.backgroundColor = "#F7E9B9";
        document.body.style.color = "#2A5510";
        citySelector.style.backgroundColor = "#F7E9B9";
        citySelector.style.color = "#2A5510";
      } else if (localWeatherToday === "Rain") {
        cityWeather.innerHTML = `<div class= "rain">
                  <img class= "rain" src="images/umbrella.png"/>
                  <h1> Fetch that umbrella. ${city} is crying today.</h1>
                    <div class= "todays-item">
                      <p>Recommended clothing item:</p>
                      <img class= "item" src="images/beanie.png"/>
                    </div>
                  </div>`;
        document.body.style.backgroundColor = "#A3DEF7";
        document.body.style.color = "#164A68";
        citySelector.style.backgroundColor = "#A3DEF7";
        citySelector.style.color = "#164A68";
      } else {
        cityWeather.innerHTML = `<div class= "clouds">
                  <img class= "rain" src="images/clouds.png"/>
                  <h1> Cuddle up! The ${city} sky is grey today.</h1>
                    <div class= "todays-item">
                      <p>Recommended clothing item:</p>
                      <img class= "item" src="images/gloves.png"/>
                    </div>
                  </div>`;
        document.body.style.backgroundColor = "#FBF4F4";
        document.body.style.color = "#F47775";
        citySelector.style.backgroundColor = "#FBF4F4";
        citySelector.style.color = "#F47775";
      }
      console.log(localWeatherToday);

      console.log(weatherResults);
      todaysWeather.innerHTML = `<p> ${
        weatherResults.weather[0].description
      } | ${Math.round(weatherResults.main.temp * 10) / 10}° </p>
      <p>
      sunrise ${new Date(weatherResults.sys.sunrise * 1000).toLocaleTimeString(
        [],
        { hour: "2-digit", minute: "2-digit" }
      )}</p>
      <p>sunset ${new Date(weatherResults.sys.sunset * 1000).toLocaleTimeString(
        [],
        { hour: "2-digit", minute: "2-digit" }
      )}</p>`;
    };
};

// Calling the fetching function for the first 2 sections, today's weather and city's weather
fetchingWeather();

//Setting the forecast section and its rows

const fetchingWeatherForecast = () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=072c88c2b7f1a1c7fb7704f9f847b690`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const forecastData = json; //not a neccessary step but we tried to be extra clear
      console.log(forecastData);
      const filteredForecast = forecastData.list.filter((item) =>
        item.dt_txt.includes("12:00")
      );
      console.log(filteredForecast);

      const getDay = (weekday) => {
        const dates = new Date(weekday * 1000);
        return dates.toLocaleDateString("en", { weekday: "short" });
      };

      // should do some kind of map here
      forecast.innerHTML = ` 
          <div class="forecast-row">
            <div class="forecast-item">
              ${getDay(filteredForecast[0].dt)}
            </div>
            <div class="forecast-item">
              ${Math.round(filteredForecast[0].main.temp * 10) / 10}°
            </div>
          </div>
          <div class="forecast-row">
            <div class="forecast-item">
              ${getDay(filteredForecast[1].dt)}
            </div>
            <div class="forecast-item">
              ${Math.round(filteredForecast[1].main.temp * 10) / 10}°
            </div>
          </div>
          <div class="forecast-row">
            <div class="forecast-item">
              ${getDay(filteredForecast[2].dt)}
            </div>
            <div class="forecast-item">
              ${Math.round(filteredForecast[2].main.temp * 10) / 10}°
            </div>
          </div>
          <div class="forecast-row">
            <div class="forecast-item">
              ${getDay(filteredForecast[3].dt)}
            </div>
            <div class="forecast-item">
              ${Math.round(filteredForecast[3].main.temp * 10) / 10}°
            </div>
          </div>
          <div class="forecast-row">
            <div class="forecast-item">
              ${getDay(filteredForecast[4].dt)}
            </div>
            <div class="forecast-item">
              ${Math.round(filteredForecast[4].main.temp * 10) / 10}°
            </div>
          </div>`;
    });
};

const selectCity = () =>{
  city = citySelector.options[citySelector.selectedIndex].value
  fetchingWeather()
  fetchingWeatherForecast();
}

// Calling the fetching function for forecast
fetchingWeatherForecast();

citySelector.addEventListener("change", selectCity)
