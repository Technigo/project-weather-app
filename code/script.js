//For this project I will add the api.js-file to Github. 
// But for other projects I will put it in the .gitignore-file
import { API_KEY } from './api.js';
let city = 'Lerum, Sweden';
const weeks = document.getElementsByClassName('day');
const currentTime = new Date().getHours();
const weatherImage = document.getElementById('weather-image');
const weatherDescriptions = [
  {
    order: 1,
    name: 'Clear sky',
    img: 'https://openweathermap.org/img/wn/01d@2x.png'
  },
  {
    order: 2,
    name: 'Few clouds',
    img: 'https://openweathermap.org/img/wn/02d@2x.png'
  },
  {
    order: 3,
    name: 'Scattered clouds',
    img: 'https://openweathermap.org/img/wn/03d@2x.png'
  },
  {
    order: 4,
    name: 'Broken clouds',
    img: 'https://openweathermap.org/img/wn/04d@2x.png'
  },
  {
    order: 5,
    name: 'Shower rain',
    img: 'https://openweathermap.org/img/wn/09d@2x.png'
  },
  {
    order: 6,
    name: 'Rain',
    img: 'https://openweathermap.org/img/wn/10d@2x.png',
    text: "It's raining cats and dogs right now!"
  },
  {
    order: 7,
    name: 'Thunderstorm',
    img: 'https://openweathermap.org/img/wn/11d@2x.png'
  },
  {
    order: 8,
    name: 'Snow',
    img: 'https://openweathermap.org/img/wn/13d@2x.png'
  },
  {
    order: 9,
    name: 'Mist',
    img: 'https://openweathermap.org/img/wn/50d@2x.png'
  },
  {
    order: 10,
    name: 'Clouds',
    img: 'https://openweathermap.org/img/wn/04d@2x.png'
  }
];

// HTML-tags
const cityTag = document.getElementById('city');
const temperatureTag = document.getElementById('temperature');
const feelsLikeTag = document.getElementById('feels-like');
const weatherTag = document.getElementById('weather');
const sunriseTag = document.getElementById('sunrise');
const sunsetTag = document.getElementById('sunset');

const changeLocInput = document.getElementById('location-input')
const changeLocButton = document.getElementById('location-button')


// Main function - Main Weather API
const fetchWeatherData = (selectedCity) => {
  city = selectedCity
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${API_KEY}`;
  fetch(apiUrl)
    .then((results) => {
      return results.json();
    })
    .then((weather) => {
      // Tried to create an array of the API-object
      const weatherArray = Object.values(weather);

      cityTag.innerHTML = city;
      temperatureTag.innerHTML = roundedNumber(weatherArray[3].temp) + ` C°`;
      feelsLikeTag.innerHTML = roundedNumber(weatherArray[3].feels_like) + ` C°`;

      // Variable for today's weather to use when selecting image
      const currentWeather = weatherArray[1][0].main;
      weatherTag.innerHTML = currentWeather;
      // Change image depending on today's weather-variable
      changeImage(currentWeather);

      // Had to use weather-data for this because the weatherArray 
      // is changing depending on city - ie sunrise/sunset data changes index
      sunriseTag.innerText = convertUnixTimestamp(weather.sys.sunrise);
      sunsetTag.innerText = convertUnixTimestamp(weather.sys.sunset);

      // Change background gradient for cold/hot temperatures
      if (roundedNumber(weather.main.temp) < 15) {
        document.querySelector('body').classList.remove('hot-bg');
        document.querySelector('body').classList.add('cold-bg');
      } else if (roundedNumber(weather.main.temp) > 25) {
        document.querySelector('body').classList.remove('cold-bg');
        document.querySelector('body').classList.add('hot-bg');
      } else {
        document.querySelector('body').classList.remove('hot-bg');
        document.querySelector('body').classList.remove('cold-bg');
      }
    });
};

// Main function - 5-day Forecast API
const fetchForecastData = (selectedCity) => {
  city = selectedCity
  const apiUrlForFiveDays = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
  fetch(apiUrlForFiveDays)
    .then((results) => {
      return results.json();
    })
    .then((forecast) => {
      // Filter through the data and select the objects including a certain time
      const filteredForecast = forecast.list.filter((item) =>
        item.dt_txt.includes(calculateHour(currentTime))
      );

      // Function that returns day + temp
      // from each object from filteredForecast
      const newWeek = filteredForecast.map((week) => {
        const day = getWeekday(week.dt);
        const temp = roundedNumber(week.main.temp) + ` C°`;
        return { day, temp };
      });

      // Inject newWeek-data into selected queries in HTML
      newWeek.forEach((item, index) => {
        weeks[index].querySelector('.day--name').innerText = item.day;
        weeks[index].querySelector('.day--temp').innerText = item.temp;
      });
    });
};

// To change location of weather data by changing variable city, rerun 
// fetch-functions based on that, and also clear the inputfield
changeLocButton.addEventListener('click', () => {
  city = changeLocInput.value;
  fetchWeatherData(city);
  fetchForecastData(city);
  changeLocInput.value = "";
});

// Convert timestamp to correct time-format
const convertUnixTimestamp = (data) => {
  const sunsetTime = new Date(data * 1000);
  return sunsetTime.toLocaleTimeString('sv-SE', {
    timestyle: 'long',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Convert tamestamp to weekday-string
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

// To calculate the time of which the filteredForecast is filtered by
const calculateHour = (currentHour) => {
  if (currentHour >= 0 && currentHour <= 2) {
    return '21:00';
  } else if (currentHour >= 3 && currentHour <= 5) {
    return '00:00';
  } else if (currentHour >= 6 && currentHour <= 8) {
    return '03:00';
  } else if (currentHour >= 9 && currentHour <= 11) {
    return '06:00';
  } else if (currentHour >= 12 && currentHour <= 14) {
    return '09:00';
  } else if (currentHour >= 15 && currentHour <= 17) {
    return '12:00';
  } else if (currentHour >= 18 && currentHour <= 20) {
    return '15:00';
  } else if (currentHour >= 21 && currentHour <= 23) {
    return '18:00';
  }
};

const changeImage = (weather) => {
  if (weather == weatherDescriptions[0].name) {
    weatherImage.src = weatherDescriptions[0].img;
  } else if (weather == weatherDescriptions[1].name) {
    weatherImage.src = weatherDescriptions[1].img;
  } else if (weather == weatherDescriptions[2].name) {
    weatherImage.src = weatherDescriptions[2].img;
  } else if (weather == weatherDescriptions[3].name) {
    weatherImage.src = weatherDescriptions[3].img;
  } else if (weather == weatherDescriptions[4].name) {
    weatherImage.src = weatherDescriptions[4].img;
  } else if (weather == weatherDescriptions[5].name) {
    weatherImage.src = weatherDescriptions[5].img;
  } else if (weather == weatherDescriptions[6].name) {
    weatherImage.src = weatherDescriptions[6].img;
  } else if (weather == weatherDescriptions[7].name) {
    weatherImage.src = weatherDescriptions[7].img;
  } else if (weather == weatherDescriptions[8].name) {
    weatherImage.src = weatherDescriptions[8].img;
  } else if (weather == weatherDescriptions[9].name) {
    weatherImage.src = weatherDescriptions[9].img;
  } else if (weather == 'Haze') {
    weatherImage.src = weatherDescriptions[8].img;
  }
};

// Run main functions at page loading
fetchWeatherData('Lerum, Sweden');
fetchForecastData('Lerum, Sweden');

