const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "ea8ddf441b50c5601343ca1ba4aa982c";
const city = "Stockholm";
const weatherURL = `${BASE_WEATHER_URL}${city}&units=metric&APPID=${API_KEY}`;
const BASE_FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast?q=";
const forecastURL = `${BASE_FORECAST_URL}${city}&units=metric&APPID=${API_KEY}`;

//DOM Selectors
const tempWeather = document.getElementById("tempWeather");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const image = document.getElementById("image");
const imageContainer = document.getElementById("imageContainer");
const currentCity = document.getElementById("currentCity");
const forecast = document.getElementById("fourDayForecast");
const body = document.getElementById("body");

//functions to update the image and text depending on weather description
const clouds = () => {
  image.src = "./design/design2/icons/noun_Cloud_1188486.svg";
  body.classList.add("clouds");
  textContainer.innerHTML = `Light a fire and get cozy. ${city} is looking grey today.
  `;
};

const clearSky = () => {
  image.src = "./design/design2/icons/noun_Sunglasses_2055147.svg";
  body.classList.add("clear");
  textContainer.innerHTML = `Get your sunnies on. ${city} is looking rather great today.`;
};

const rain = () => {
  image.src = "./design/design2/icons/noun_Umbrella_2030530.svg";
  body.classList.add("rain");
  textContainer.innerHTML = `Don't foreget your umbrella. It's wet in ${city} today.`;
};

//fetch weather data
const fetchWeatherData = () => {
  fetch(weatherURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      //get weather description and temp at local city
      const getWeatherDescription = () => {
        const weatherDescription = data.weather[0].description;
        const roundedTemp = Math.round(data.main.temp * 10) / 10;

        tempWeather.textContent = `
        ${weatherDescription} | ${roundedTemp}°c
        `;

        if (
          weatherDescription === "few clouds" ||
          weatherDescription === "scattered clouds" ||
          weatherDescription === "broken clouds" ||
          weatherDescription === "fog"
        ) {
          clouds();
        } else if (weatherDescription === "clear sky") {
          clearSky();
        } else {
          rain();
        }
      };
      getWeatherDescription();

      //handle sunrise and sunset time
      const sunriseTime = new Date(data.sys.sunrise * 1000);
      const sunriseHours = sunriseTime.getHours().toString().padStart(2, "0");
      const sunriseMinutes = sunriseTime
        .getMinutes()
        .toString()
        .padStart(2, "0");

      const sunsetTime = new Date(data.sys.sunset * 1000);
      const sunsetHours = sunsetTime.getHours().toString().padStart(2, "0");
      const sunsetMinutes = sunsetTime.getMinutes().toString().padStart(2, "0");

      const formattedSunset = `
      ${sunsetHours}.${sunsetMinutes}
      `;

      const formattedSunrise = `
      ${sunriseHours}.${sunriseMinutes}
      `;

      sunrise.innerHTML = `
      sunrise ${formattedSunrise} 
      `;

      sunset.innerHTML = `
      sunset ${formattedSunset}
      `;

      const cityName = data.name;
    })
    .catch((error) => {
      console.log("Fetch error:", error);
    });
};

fetchWeatherData();

//fetch five day forecast
const fetchForecast = () => {
  fetch(forecastURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const forecastList = data.list;
      //put today's date in var and convert it to yyy-mm-dd format
      const todaysDate = new Date().toISOString().split("T")[0];
      //create empty object
      const dailyTemperatures = {};

      forecastList.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        //exclude today's date and fetcgh the min/max temp of each item and put in var
        if (date !== todaysDate) {
          const maxTemp = Math.round(item.main.temp_max);
          const minTemp = Math.round(item.main.temp_min);
          //if the date doesnt have an object in the empty object, then create an object for each date with the min/max temp
          if (!dailyTemperatures[date]) {
            dailyTemperatures[date] = {
              maxTemp: maxTemp,
              minTemp: minTemp,
            };
          } else {
            //compares all the min/max values and logs the highest and lowest one
            dailyTemperatures[date].maxTemp = Math.max(
              dailyTemperatures[date].maxTemp,
              maxTemp
            );
            dailyTemperatures[date].minTemp = Math.min(
              dailyTemperatures[date].minTemp,
              minTemp
            );
          }
        }
      });

      for (const date in dailyTemperatures) {
        const minTemp = dailyTemperatures[date].minTemp;
        const maxTemp = dailyTemperatures[date].maxTemp;

        const weekdayName = new Date(date).toLocaleDateString("en-US", {
          weekday: "short",
        });

        forecast.innerHTML += `
          <div class="forecast-container">
            <span class="forecast-day">${weekdayName}</span>
            <span class="forecast-temp">
            <span class="min-temp">${minTemp}°</span>/<span class="max-temp">${maxTemp}°c</span>
            </span>
          </div>
          `;
      }
    })
    .catch((error) => {
      console.log("Fetch error:", error);
    });
};

fetchForecast();
