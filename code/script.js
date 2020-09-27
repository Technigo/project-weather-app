import { API_KEY } from "./api_key.js";
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Orebro,Sweden&units=metric&APPID=${API_KEY}`;
const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Orebro,Sweden&units=metric&APPID=${API_KEY}`;

const location = document.getElementById("location");
const currentTemperature = document.getElementById("currentTemperature");
const feelsLikeTemperature = document.getElementById("feelsLikeTemperature");
const todayMax = document.getElementById("todayMax");
const todayMin = document.getElementById("todayMin");
const weatherDescription = document.getElementById("weatherDescription");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const fiveDayForeCast = document.getElementsByClassName("one-day-container");
console.log(fiveDayForeCast);

fetch(weatherApiUrl)
  .then((response) => {
    return response.json();
  })
  .then((weatherToday) => {
    location.innerHTML = weatherToday.name;
    // If you would like to display the temperature with a decimal, you can change to toFixed(1)
    currentTemperature.innerHTML = weatherToday.main.temp.toFixed();
    feelsLikeTemperature.innerHTML = weatherToday.main.feels_like.toFixed();
    todayMax.innerHTML = weatherToday.main.temp_max.toFixed();
    todayMin.innerHTML = weatherToday.main.temp_min.toFixed();

    //image

    weatherDescription.innerHTML = weatherToday.weather[0].description;

    sunrise.innerHTML = new Date(
      weatherToday.sys.sunrise * 1000
    ).toLocaleTimeString("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    sunset.innerHTML = new Date(
      weatherToday.sys.sunset * 1000
    ).toLocaleTimeString("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    console.log(weatherToday.weather[0].description);
  });

fetch(forecastApiUrl)
  .then((response) => {
    return response.json();
  })
  .then((forecast) => {
    const filteredForecast = forecast.list.filter((item) =>
      item.dt_txt.includes("12:00")
    );

    const newWeek = filteredForecast.map((day) => {
      const weekday = new Date(day.dt * 1000).toLocaleDateString("en-US", {
        weekday: "short",
      });
      const description = day.weather[0].description;
      const maxTemp = day.main.temp_max.toFixed();
      const minTemp = day.main.temp_min.toFixed();

      return { weekday, description, maxTemp, minTemp };
    });
    // console.log(newWeek);

    newWeek.forEach((item, index) => {
      fiveDayForeCast[index].querySelector(".weekday").innerText = item.weekday;
      fiveDayForeCast[index].querySelector(".forecast-max").innerText =
        item.maxTemp;
      fiveDayForeCast[index].querySelector(".forecast-min").innerText =
        item.minTemp;
      console.log(item.description);
    });
  });

// const displaySearch = () => {
//   const locationInput = document.getElementById("locationInput");
//   locationInput.classList.toggle("active");
// };
