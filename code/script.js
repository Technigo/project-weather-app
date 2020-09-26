/*** VARIABLES ***/

import { API_KEY } from './api.js';
const forecastContainer = document.getElementsByClassName('forecast-item');
const hourlyForecastContainer = document.getElementsByClassName('hour-item');
const input = document.getElementById('input');
let latitude = 59.334591; // fallback coordinates for Stockholm
let longitude = 18.06324;
let cityName = '';
let API_URL_TODAY_LONGLAT = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
let API_URL_TODAY = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${API_KEY}`;
let API_URL_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&APPID=${API_KEY}`;
let API_URL_FORECAST_LONGLAT = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

/*** EVENTLISTENER ***/

/* Eventlistener attached to input field, will perform search when enter key is
 pressed and then assign search value to cityName and get weather for that city */
input.addEventListener('keyup', function (e) {
  if (e.keyCode === 13) {
    const inputValue = input.value;
    cityName = inputValue;
    API_URL_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&APPID=${API_KEY}`;
    API_URL_TODAY = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${API_KEY}`;
    fetchWeatherToday(API_URL_TODAY);
    fetchWeatherForecast(API_URL_FORECAST);
    input.value = '';
    input.blur();
  }
});

/*** FUNCTIONS ***/

/* Function to get the geolocation of the user */
const getGeoLocation = () => {
  // set the options for the geolocation.getCurrentPosition() method
  const positionOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximunAge: 0,
  };

  // get the geolocation
  navigator.geolocation.getCurrentPosition(
    gotLocation,
    showError,
    positionOptions
  );

  // anonymous function as it is passed as an argument to the
  // geolocation.getCurrentPosition() method. Passes longitude and latitude of
  // current position to the API's
  function gotLocation(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    API_URL_TODAY_LONGLAT = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
    API_URL_FORECAST_LONGLAT = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
    fetchWeatherToday(API_URL_TODAY_LONGLAT);
    fetchWeatherForecast(API_URL_FORECAST_LONGLAT);
  }

  // anonymous function to handle errors and sets fallback coordinates if user
  // denies geolocation.
  function showError(error) {
    if (error.code === 'error.UNKNOWN_ERROR') {
      alert('An unknown error occured');
    } else {
      console.log(error.message);
    }
    fetchWeatherToday(API_URL_TODAY_LONGLAT);
    fetchWeatherForecast(API_URL_FORECAST_LONGLAT);
  }
};

/* function to fetch data about today's weather and add it to html */
const fetchWeatherToday = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((weatherArray) => {
      // get data from the array
      const temperature = numberNoDecimal(weatherArray.main.temp);
      const city = weatherArray.name;
      const description = weatherArray.weather[0].main;
      const date = new Date(weatherArray.dt * 1000);
      const hour = date.getHours();
      const sunrise = setTimestamp(weatherArray.sys.sunrise).timeString;
      const sunset = setTimestamp(weatherArray.sys.sunset).timeString;
      const feelsLike = numberNoDecimal(weatherArray.main.feels_like);
      const humidity = weatherArray.main.humidity;
      const pressure = weatherArray.main.pressure;
      const visibility = weatherArray.visibility;

      //set background and add data to html
      setBackground(hour, description, sunrise, sunset);
      document.getElementById(
        'main-temperature'
      ).innerHTML = `${temperature}\u00B0`;
      document.getElementById('main-city').innerHTML = city;
      document.getElementById('main-description').innerHTML = description;
      document.getElementById('sunrise').innerHTML = sunrise;
      document.getElementById('sunset').innerHTML = sunset;
      document.getElementById('feels-like').innerHTML = `${feelsLike}\u00B0`;
      document.getElementById('humidity').innerHTML = `${humidity}%`;
      document.getElementById('pressure').innerHTML = `${pressure} hPa`;
      document.getElementById('visibility').innerHTML = `${visibility} m`;
    });
};

/* Function to fetch data about today's min and max temperatures and the weather
 forecast and add it to html */
const fetchWeatherForecast = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((forecastArray) => {
      // filter the array to only get the temperatures for this day
      const dateNow = new Date().getDate();
      const filteredTodayArray = forecastArray.list.filter((item) =>
        item.dt_txt.includes(dateNow)
      );

      //map to create new array with temperatures for this day
      const temperatures = filteredTodayArray.map((temperature) => {
        const temp = numberOneDecimal(temperature.main.temp);
        return temp;
      });

      // get min and max values from the array
      const maxTemp = Math.max(...temperatures);
      const minTemp = Math.min(...temperatures);

      // add to html
      document.getElementById('min-temp').innerHTML = `${minTemp}\u00B0`;
      document.getElementById('max-temp').innerHTML = `${maxTemp}\u00B0`;

      // create a new array using the slice() method to get the first 7 elements
      const hourlyWeathers = forecastArray.list.slice(0, 7);

      // map to create new and filtered array of hourlyWeathers
      const hourly = hourlyWeathers.map((hour) => {
        const hourlyHour = setTimestamp(hour.dt).hourString;
        const hourlyIconSrc = `https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`;
        const hourlyTemperature = numberNoDecimal(hour.main.temp);
        return { hourlyHour, hourlyIconSrc, hourlyTemperature };
      });

      // forEach to add to html
      hourly.forEach((item, index) => {
        if (index === 0) {
          hourlyForecastContainer[index].querySelector('.hour-hour').innerText =
            'Now';
        } else {
          hourlyForecastContainer[index].querySelector('.hour-hour').innerText =
            item.hourlyHour;
        }
        hourlyForecastContainer[index].querySelector('.hour-icon').src =
          item.hourlyIconSrc;
        hourlyForecastContainer[index].querySelector(
          '.hour-temp'
        ).innerText = `${item.hourlyTemperature}\u00B0`;
      });

      // filter the array again to only contain the forecast for the five next days from this hour
      const hourNow = new Date().getHours();
      const filteredArray = forecastArray.list.filter((item) =>
        item.dt_txt.includes(calculateHour(hourNow))
      );

      // map to create new and filtered array of weather forecast
      const forecasts = filteredArray.map((forecast) => {
        const day = setTimestamp(forecast.dt).dayString;
        const date = setTimestamp(forecast.dt).dateString;
        const iconSrc = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        const temperature = numberNoDecimal(forecast.main.temp);
        const wind = numberOneDecimal(forecast.wind.speed);
        return { day, date, iconSrc, temperature, wind };
      });

      // forEach to add to html
      forecasts.forEach((item, index) => {
        forecastContainer[index].querySelector('.p-day').innerText = item.day;
        forecastContainer[index].querySelector('.p-date').innerText = item.date;
        forecastContainer[index].querySelector('.icon').src = item.iconSrc;
        forecastContainer[index].querySelector(
          '.temperature'
        ).innerText = `${item.temperature}\u00B0 / ${item.wind} m/s`;
      });
    });
};

/* Function to round a number to one decimal */
const numberOneDecimal = (number) => {
  return Math.round(number * 10) / 10;
};

/* Function to round a number to no decimal */
const numberNoDecimal = (number) => {
  return Math.round(number);
};

/* Function to calculate the hour to only return data from the forecast from that
 hour. Used to filter the forecastArray */
const calculateHour = (currentHour) => {
  if (currentHour >= 0 && currentHour < 3) {
    return '00:00';
  } else if (currentHour >= 3 && currentHour < 6) {
    return '03:00';
  } else if (currentHour >= 6 && currentHour < 9) {
    return '06:00';
  } else if (currentHour >= 9 && currentHour < 12) {
    return '09:00';
  } else if (currentHour >= 12 && currentHour < 15) {
    return '12:00';
  } else if (currentHour >= 15 && currentHour < 18) {
    return '15:00';
  } else if (currentHour >= 18 && currentHour < 21) {
    return '18:00';
  } else if (currentHour >= 21 && currentHour <= 24) {
    return '21:00';
  }
};

/* Function to convert a timestamp to a readable time, day, and date string. Returns
 an object */
const setTimestamp = (date) => {
  const timestamp = new Date(date * 1000);
  const hourString = timestamp.toLocaleTimeString([], {
    hour: '2-digit',
  });
  const timeString = timestamp.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const dayString = timestamp.toLocaleDateString('en-US', {
    weekday: 'short',
  });
  const dateString = timestamp.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  return { hourString, timeString, dayString, dateString };
};

const setBackground = (time, description, sunrise, sunset) => {
  const wrapper = document.getElementById('wrapper');
  sunrise = parseInt(sunrise);
  sunset = parseInt(sunset);
  if (time >= sunrise && time <= sunset) {
    if (description === 'Clear') {
      wrapper.style.backgroundImage = 'url(./assets/clear-day-medium.jpg)';
    } else if (description === 'Clouds') {
      wrapper.style.backgroundImage = 'url(./assets/clouds-day-medium.jpg)';
    } else if (description === 'Rain' || description === 'Drizzle') {
      wrapper.style.backgroundImage = 'url(./assets/rain-day-medium.jpg)';
    } else if (description === 'Thunderstorm') {
      wrapper.style.backgroundImage = 'url(./assets/thunder-day-medium.jpg)';
    } else if (description === 'Snow') {
      wrapper.style.backgroundImage = 'url(./assets/snow-day-medium.jpg)';
    } else if (description === 'Mist' || description === 'Fog') {
      wrapper.style.backgroundImage = 'url(./assets/mist-day-medium.jpg)';
    }
  } else if (time >= sunset || time <= sunrise) {
    if (description === 'Clear') {
      wrapper.style.backgroundImage = 'url(./assets/clear-night-medium.jpg)';
    } else if (description === 'Clouds') {
      wrapper.style.backgroundImage = 'url(./assets/clouds-night-medium.jpg)';
    } else if (description === 'Rain' || description === 'Drizzle') {
      wrapper.style.backgroundImage = 'url(./assets/rain-night-medium.jpg)';
    } else if (description === 'Thunderstorm') {
      wrapper.style.backgroundImage = 'url(./assets/thunder-night-medium.jpg)';
    } else if (description === 'Snow') {
      wrapper.style.backgroundImage = 'url(./assets/snow-night-medium.jpg)';
    } else if (description === 'Mist' || description === 'Fog') {
      wrapper.style.backgroundImage = 'url(./assets/mist-night-medium.jpg)';
    }
  }
};

/*** ECEXUTION ***/

getGeoLocation();
