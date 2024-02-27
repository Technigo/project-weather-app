const apiKey = "f9321b12d77c24027e5a25c9f625e63b";

const tipText = document.querySelector(".tip-text");
const getDailyWeather = () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=gothenburg&units=metric&appid=${apiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((weatherData) => {
      console.log(weatherData);
      (weatherData) => {
        displayDailyWeather(weatherData);
      };
    })
    .catch((err) => {
      console.log(err);
    });
};

getDailyWeather();

const displayDailyWeather = (weatherData) => {
  const { name } = weatherData;
  const { temp } = weatherData.main;
};

const sunriseTimestamp = 1709014431 * 1000;
const sunsetTimestamp = 1709051787 * 1000;
const sunriseDate = new Date(sunriseTimestamp);
const sunsetDate = new Date(sunsetTimestamp);
const formatTime = (date) => {
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${hours}:${formattedMinutes}`;
};
const sunriseTime = formatTime(sunriseDate);
const sunsetTime = formatTime(sunsetDate);
console.log(`0${sunriseTime}`);
console.log(`${sunsetTime}`);

const getWeeklyWeather = () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=gothenburg&appid=${apiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((weatherData) => {
      console.log(weatherData);
      //   (weatherData) => {
      //     displayWeeklyWeather(weatherData);
      //   };
    })
    .catch((err) => {
      console.log(err);
    });
};

getWeeklyWeather();
