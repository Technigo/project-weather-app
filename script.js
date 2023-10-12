const apiKey = "6675145806c7290b2d43a240155a964d";

const container = document.querySelector(".weather-container");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchExitBtn = document.getElementById("search-exit-btn");
const citiesSearchBtn = document.getElementById("cities-search-btn");
const favouriteCitiesBtn = document.getElementById("fav-cities-btn");

const errorMsg = document.createElement("div");
errorMsg.classList.add("error-msg");

// Favourite cities
const favouriteCities = [
  "Vancouver",
  "New York",
  "San Fransisco",
  "Madrid",
  "Sydney",
  "Dubai",
  "Tokyo",
];
// Starting index should be 0
let currentCity = 0;

// Fetch Data
const fetchWeatherData = (city) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;
  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      getFiveDaysForecast(data.coord);
      const cityName = data.name;
      const temperature = Math.floor(data.main.temp);
      const description = data.weather[0].description;

      // Sunrise and sunset times
      const sunrise = data.sys.sunrise * 1000;
      const sunset = data.sys.sunset * 1000;
      const sunriseTime = new Date(sunrise);
      const sunsetTime = new Date(sunset);
      const sunriseHours = sunriseTime.getHours();
      const sunriseMinutes = sunriseTime.getMinutes();
      const sunsetHours = sunsetTime.getHours();
      const sunsetMinutes = sunsetTime.getMinutes();

      const sunriseTimeString = `${
        sunriseHours < 10 ? "0" : ""
      }${sunriseHours}:${sunriseMinutes < 10 ? "0" : ""}${sunriseMinutes}`;

      const sunsetTimeString = `${sunsetHours < 10 ? "0" : ""}${sunsetHours}:${
        sunsetMinutes < 10 ? "0" : ""
      }${sunsetMinutes}`;

      const heading = document.createElement("h1");
      const temp = document.createElement("h2");
      const weatherDescription = document.createElement("p");
      const sunriseElement = document.createElement("p");
      const sunsetElement = document.createElement("p");
      const divElement = document.createElement("div");
      divElement.classList.add("sunrise-sunset");

      heading.textContent = cityName;
      temp.textContent = `${temperature}°C`;
      weatherDescription.textContent = description;
      sunriseElement.textContent = `Sunrise   ${sunriseTimeString}`;
      sunsetElement.textContent = `Sunset   ${sunsetTimeString}`;
      divElement.append(sunriseElement, sunsetElement);

      container.textContent = "";
      container.append(temp, heading, weatherDescription, divElement);

      return data;
    })
    .catch((err) => {
      errorMsg.textContent = `Network response was not ok (${err})`;
      container.append(errorMsg);
    });
};

// Output data: Set default city to Stockholm when page first loads
fetchWeatherData("Stockholm");

// Search cities when clicking search button
citiesSearchBtn.addEventListener("click", () => {
  if (searchInput.value) {
    fetchWeatherData(searchInput.value);
  }
});

//Toggle search button
searchBtn.addEventListener("click", () => {
  searchInput.style.visibility = "initial";
  citiesSearchBtn.style.display = "initial";
  searchBtn.style.display = "none";
  searchExitBtn.style.display = "initial";
});
//Toggle exit button
searchExitBtn.addEventListener("click", () => {
  searchInput.style.visibility = "hidden";
  citiesSearchBtn.style.display = "none";
  searchBtn.style.display = "initial";
  searchExitBtn.style.display = "none";
});
favouriteCitiesBtn.addEventListener("click", () => {
  fetchWeatherData(favouriteCities[currentCity]);
  currentCity++;
  if (currentCity === favouriteCities.length) {
    currentCity = 0;
  }
});

//5 days weather forecast

const weatherForecastContainer = document.querySelector(".weather-forecast");

const getFiveDaysForecast = ({ lat, lon }) => {
  // const lat = 59.3293;
  // const lon = 18.0686;
  const exclude = "current,hourly,minutely,alerts";
  const units = "metric";
  const weatherForcastApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&units=${units}&appid=6675145806c7290b2d43a240155a964d`;

  const table = document.getElementById("weather-forecast");
  table.textContent = "";

  fetch(weatherForcastApi)
    .then((response) => {
      if (!response.ok) {
        throw console.log(`Network response was not ok (${response.status})`);
      }
      return response.json();
    })
    .then((forecastData) => {
      // check if the response contains forecast data
      const forecast = forecastData.daily.slice(1, 6); // get the 5 days data
      console.log(forecast);
      console.log(`5 days weather forecast for Stockholm`);
      forecast.forEach((day) => {
        //convert timestamp to date and display the short day name
        const date = new Date(day.dt * 1000);
        const options = { weekday: "short" };
        const dayOfWeek = date.toLocaleDateString("en-US", options);

        // get data from api and store into a variable

        const weatherDes = day.weather[0].description;
        const maxDegree = Math.floor(day.temp.max);
        const minDegree = Math.floor(day.temp.min);
        console.log(
          `${date.toDateString()}: ${weatherDes}, Temperature: ${maxDegree}/ ${minDegree}°C`
        );
        // create rows and store in a variable
        const row = table.insertRow();
        const daysCell = row.insertCell(0);
        const descriptionCell = row.insertCell(1);
        const temperatureCell = row.insertCell(2);

        //insert class name for weatherIcon
        descriptionCell.classList.add = "weather-icon";

        //create function that show icon as per weather condition
        let weatherIcon;

        switch (weatherDes.toLowerCase()) {
          case "clear sky":
            weatherIcon = "☀️";
            break;
          case "rain":
          case "moderate rain":
          case "light rain":
          case "heavy rain":
            weatherIcon = "🌧️";
            break;
          case "cloudy":
            weatherIcon = "☁️";
            break;
          case "partly cloudy":
            weatherIcon = "⛅️";
            break;
          case "thunderstorm":
            weatherIcon = "🌩️";
            break;
          case "snow":
            weatherIcon = "❄️";
            break;
          default:
            weatherIcon = "";
        }
        //insert the value from the data in the created rows

        daysCell.textContent = dayOfWeek;
        descriptionCell.textContent = weatherIcon;
        temperatureCell.textContent = `${maxDegree}° / ${minDegree} °C`;
      });
    })
    .catch((error) => {
      console.log("Error fetching data:", error);
    });
};
