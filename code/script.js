import { API_KEY } from './api.js';
const forecastContainer = document.getElementsByClassName('forecast-item');
const button = document.getElementById('search-button');
const input = document.getElementById('input');
console.log(typeof input.value);
let cityName = 'Stockholm'; // ändra till geolocation sen
let API_URL_TODAY = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${API_KEY}`;
let API_URL_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&APPID=${API_KEY}`;

input.addEventListener('keyup', function (e) {
  if (e.keyCode === 13) {
    console.log('inside eventlistener');

    console.log('inside event');
    const inputValue = input.value;

    cityName = inputValue;
    API_URL_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&APPID=${API_KEY}`;
    API_URL_TODAY = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${API_KEY}`;

    console.log(API_URL_FORECAST);

    console.log(inputValue);

    console.log(cityName);
    fetchWeatherToday(API_URL_TODAY);

    fetchWeatherForecast(API_URL_FORECAST);
    console.log(cityName);
    input.value = '';
    input.blur();
  }
});

const fetchWeatherForecast = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((forecastArray) => {
      // filter the array to only contain the forecast for 12:00
      const hourNow = new Date().getHours();
      const filteredArray = forecastArray.list.filter((item) =>
        item.dt_txt.includes(calculateHour(hourNow))
      );
      console.log(filteredArray);

      // map to create new and filtered array of weather forecast
      const forecasts = filteredArray.map((forecast) => {
        const day = setDayDate(forecast.dt).forecastDayString;
        const date = setDayDate(forecast.dt).forecastDateString;
        const iconSrc = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        const temperature = numberNoDecimal(forecast.main.temp);
        const wind = numberOneDecimal(forecast.wind.speed);
        return { day, date, iconSrc, temperature, wind };
      });

      console.log(forecasts);

      // forEach to add to HTML
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

const fetchWeatherToday = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((weatherArray) => {
      console.log(weatherArray);
      //const weathers = weatherArray.list.map((weather) => {
      const temperature = numberNoDecimal(weatherArray.main.temp);
      console.log(temperature);
      const city = weatherArray.name;
      const description = weatherArray.weather[0].main;
      const icon = `http://openweathermap.org/img/wn/${weatherArray.weather[0].icon}@2x.png`;
      const date = new Date(weatherArray.dt * 1000);
      console.log(date);
      const hour = date.getHours();
      console.log(hour, description);
      const sunrise = setSunTime(weatherArray.sys.sunrise);
      const sunset = setSunTime(weatherArray.sys.sunset);
      setBackground(hour, description, sunrise, sunset);
      console.log(hour, description);
      document.getElementById(
        'main-temperature'
      ).innerHTML = `${temperature}\u00B0`;
      document.getElementById('main-city').innerHTML = city;
      document.getElementById('main-description').innerHTML = description;
      // document.getElementById('main-icon').src = icon;
      document.getElementById('sunrise').innerHTML = sunrise;
      document.getElementById('sunset').innerHTML = sunset;
    });
};

const numberOneDecimal = (number) => {
  return Math.round(number * 10) / 10;
};

const numberNoDecimal = (number) => {
  return Math.round(number);
};

const setSunTime = (time) => {
  const sunTime = new Date(time * 1000);
  console.log(sunTime);
  const sunTimeString = sunTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  return sunTimeString;
};

const setDayDate = (date) => {
  const forecastDate = new Date(date * 1000);
  const forecastDayString = forecastDate.toLocaleDateString('en-US', {
    weekday: 'short',
  });
  const forecastDateString = forecastDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  return { forecastDayString, forecastDateString };
};

const setBackground = (time, description, sunrise, sunset) => {
  console.log(
    'inside setBackground ' + typeof time,
    description,
    sunrise,
    sunset
  );
  const wrapper = document.getElementById('wrapper');
  console.log(wrapper);
  // wrapper.style.backgroundImage = '';
  console.log(wrapper);
  sunrise = parseInt(sunrise);
  sunset = parseInt(sunset);
  console.log(sunrise, sunset, wrapper);
  // if (time > sunrise || time < sunset) {
  //   console.log('21');
  // }
  if (time >= sunrise && time <= sunset) {
    console.log('inside first if');
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
    console.log('inside second if');
    console.log(description);
    if (description === 'Clear') {
      wrapper.style.backgroundImage = 'url(./assets/clear-night-medium.jpg)';
    } else if (description === 'Clouds') {
      console.log('inside Clouds');
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
  console.log(wrapper);
};

const calculateHour = (currentHour) => {
  if (currentHour > 0 && currentHour < 3) {
    return '00:00';
  } else if (currentHour > 3 && currentHour < 6) {
    return '03:00';
  } else if (currentHour > 6 && currentHour < 9) {
    return '06:00';
  } else if (currentHour > 9 && currentHour < 12) {
    return '09:00';
  } else if (currentHour > 12 && currentHour < 15) {
    return '12:00';
  } else if (currentHour > 15 && currentHour < 18) {
    return '15:00';
  } else if (currentHour > 18 && currentHour < 21) {
    return '18:00';
  } else if (currentHour > 21 && currentHour < 24) {
    return '21:00';
  }
};
// fetch(
//   'http://api.openweathermap.org/data/2.5/forecast?q=stockholm&appid=a422826e5990e7c36cbb837c78c405fa'
// )
//   .then((response) => response.json())
//   .then((forecast) => {
//     const filteredForecast = forecast.list.filter((item) => {
//       return item.dt_txt.includes(calculateHour(hourNow));
//     });
//     console.log(filteredForecast);
//   });

const filterForecast = (forecastArray) => {
  const filteredForecast = forecastArray.list.filter((item) =>
    item.dt_txt.includes('12:00')
  );
  console.log(filteredForecast[0].main.temp);
  console.log(filteredForecast);
  return filteredForecast;
};

fetchWeatherForecast(API_URL_FORECAST);
fetchWeatherToday(API_URL_TODAY);
