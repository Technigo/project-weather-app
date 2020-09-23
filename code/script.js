import { API_KEY } from './api.js';
let city = 'Lerum,Sweden';

const apiUrl = `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${API_KEY}`;
const apiUrlForFiveDays = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

// Change looks of city-variable to look more readable for HTML
city = city.replace(',', ', ');

let currentWeather = {
  weather: undefined,
  temperature: undefined,
  sunrise: undefined,
  sunset: undefined,
};

const cityTag = document.getElementById('city');
const temperatureTag = document.getElementById('temperature');
const feelsLikeTag = document.getElementById('feels-like');
const weatherTag = document.getElementById('weather');
const sunriseTag = document.getElementById('sunrise');
const sunsetTag = document.getElementById('sunset');

const name1 = document.getElementById('name1');
const name2 = document.getElementById('name2');
const name3 = document.getElementById('name3');
const name4 = document.getElementById('name4');
const name5 = document.getElementById('name5');

const day1 = document.getElementById('day1');
const day2 = document.getElementById('day2');
const day3 = document.getElementById('day3');
const day4 = document.getElementById('day4');
const day5 = document.getElementById('day5');

// Weather API

const fetchWeatherData = () => {
  fetch(apiUrl)
    .then((results) => {
      return results.json();
    })
    .then((weather) => {
      // console.log(weather)
      currentWeather.weather = weather.weather[0].description;
      currentWeather.temperature = roundedNumber(weather.main.temp) + ` C°`;
      console.log(currentWeather);
      cityTag.innerHTML = city;
      temperatureTag.innerHTML = roundedNumber(weather.main.temp) + ` C°`;
      feelsLikeTag.innerHTML = roundedNumber(weather.main.feels_like) + ` C°`;
      weatherTag.innerHTML = weather.weather[0].description;
      sunriseTag.innerText = ` ${convertUnixTimestamp(weather.sys.sunrise)}`;
      sunsetTag.innerHTML = convertUnixTimestamp(weather.sys.sunset);

      if (roundedNumber(weather.main.temp) < 15) {
        document.querySelector('body').classList.add('cold-bg');
      }
    });
};

const fetchForecastData = (city) => {
  fetch(apiUrlForFiveDays)
    .then((results) => {
      return results.json();
    })
    .then((forecast) => {
      const filteredForecast = forecast.list.filter((item) =>
        item.dt_txt.includes('12:00')
      );

      day1.innerHTML = roundedNumber(filteredForecast[0].main.temp) + ` C°`;
      day2.innerHTML = roundedNumber(filteredForecast[1].main.temp) + ` C°`;
      day3.innerHTML = roundedNumber(filteredForecast[2].main.temp) + ` C°`;
      day4.innerHTML = roundedNumber(filteredForecast[3].main.temp) + ` C°`;
      day5.innerHTML = roundedNumber(filteredForecast[4].main.temp) + ` C°`;

      //   name1.innerHTML = getWeekday(filteredForecast[0].dt);
      name2.innerHTML = getWeekday(filteredForecast[1].dt);
      name3.innerHTML = getWeekday(filteredForecast[2].dt);
      name4.innerHTML = getWeekday(filteredForecast[3].dt);
      name5.innerHTML = getWeekday(filteredForecast[4].dt);

      console.log(forecast);
    });
};

fetchWeatherData();
fetchForecastData();

// Converting timestamp to time-format

const convertUnixTimestamp = (data) => {
  const sunsetTime = new Date(data * 1000);
  return sunsetTime.toLocaleTimeString('sv-SE', {
    timestyle: 'long',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getWeekday = (t) => {
  const dt = new Date(t * 1000);
  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return weekday[dt.getDay()];
};

// Rounding numbers down to one decimal
const roundedNumber = (number) => {
  return Math.round(number * 10) / 10;
};
