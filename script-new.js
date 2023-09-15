const weatherContainer = document.getElementById("zurichWeather");
const weatherForecast = document.getElementById("forecast");
const sunriseSunset = document.getElementById("sunriseSunset");

// Where to find the weather data
const appID = "d1af2f27692b758fb8f71728de60753b";
const units = "metric";
const baseURL = "https://api.openweathermap.org/data/2.5/";
const searchString = (searchTerm, searchCity) => {
  return `${baseURL}${searchTerm}?q=${searchCity}&units=${units}&APPID=${appID}`;
};

// Depending on time, the background changes
const hours = new Date().getHours();
const isDayTime = hours > 8 && hours < 20;

if (isDayTime) {
  document.body.className = "day";
  console.log("daytime");
} else {
  console.log("nighttime");
}

// Getting the current weather from API
fetch(searchString("weather", "Zurich, Switzerland"))
  .then((response) => response.json())
  .then((json) => {
    let temperature = json.main.temp;
    let cityName = json.name;
    let weatherCondition = json.weather[0].description;
    let feelsLike = json.main.feels_like;
    let sunrise = new Date(json.sys.sunrise * 1000);
    const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: "short" });
    let sunset = new Date(json.sys.sunset * 1000);
    const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: "short" });

    console.log(`city` + cityName);
    console.log(weatherCondition);
    console.log(`temp` + temperature);
    console.log(`feels like` + feelsLike);
    console.log(sunriseTime);
    console.log(sunsetTime);

    weatherContainer.innerHTML = `
      <h1>${temperature} °C</h1>
      <p>${cityName}</p>
      <p>${weatherCondition}</p>
      <p>Feels like: ${feelsLike} °C</p>
    `;
    sunriseSunset.innerHTML = `
      <p>Sunrise ${sunriseTime}</p>
      <p>Sunset ${sunsetTime}</p>
    `;
  });

// Getting the weather forecast for the next five days
fetch(searchString("forecast", "Zurich, Switzerland"))
  .then((response) => response.json())
  .then((json) => {
    const dailyWeather = json.list.filter((item) =>
      item.dt_txt.includes("12:00:00")
    );

    let today = new Date().toDateString();
    console.log(today);
    let iteration = 1;

    dailyWeather.forEach((item) => {
      let day = new Date(item.dt_txt);
      let dailyTemperature = item.main.temp;
      let dailyFeelsLike = item.main.feels_like;
      let dailyWeatherConditions = item.weather[0].description;

      console.log(day);
      console.log(dailyTemperature);
      console.log(dailyFeelsLike);
      console.log(dailyWeatherConditions);

      if (day.toDateString() !== today) {
        forecast(
          iteration,
          day,
          dailyTemperature,
          dailyFeelsLike,
          dailyWeatherConditions
        );
        iteration++;
      }
    });
  });

const forecast = (
  iter,
  day,
  dailyTemperature,
  dailyFeelsLike,
  dailyWeatherConditions
) => {
  const forecastInfo = document.getElementById(`forecast${iter}`);

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let today = weekDays[date.getDay()];
  console.log(`today it is `, today);
};
