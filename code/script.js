//For this project I will add the api.js-file to Github. 
// But for other projects I will put it in the .gitignore-file
import { API_KEY } from './api.js';
let city = 'Lerum, Sweden';

// HTML QUERIES
const weeks = document.getElementsByClassName('day');
const currentTime = new Date().getHours();
const weatherImage = document.getElementById('weather-image');
const cityTag = document.getElementById('city');
const temperatureTag = document.getElementById('temperature');
const feelsLikeTag = document.getElementById('feels-like');
const weatherTag = document.getElementById('weather');
const sunriseTag = document.getElementById('sunrise');
const sunsetTag = document.getElementById('sunset');
const sunriseImg = document.getElementById('sunrise-image');
const sunsetImg = document.getElementById('sunset-image');
const changeLocInput = document.getElementById('location-input')
const changeLocButton = document.getElementById('location-button')
const weatherDescriptions = [
  {
    order: 1,
    name: 'Clear sky',
    img: 'https://media.giphy.com/media/WfMTAZcqJjCc8/source.gif'
  },
  {
    order: 2,
    name: 'Few clouds',
    img: 'https://media.giphy.com/media/BWIz61sNuzVF6/source.gif'
  },
  {
    order: 3,
    name: 'Scattered clouds',
    img: 'https://media.giphy.com/media/DjEysmrFX7S8w/source.gif'
  },
  {
    order: 4,
    name: 'Broken clouds',
    img: 'https://media.giphy.com/media/hXlyDvoSNzM6k/source.gif'
  },
  {
    order: 5,
    name: 'Shower rain',
    img: 'https://media.giphy.com/media/11NU4BxIpTYNGw/source.gif'
  },
  {
    order: 6,
    name: 'Rain',
    img: 'https://media.giphy.com/media/rdKs1wbHapaQ8/source.gif',
  },
  {
    order: 7,
    name: 'Thunderstorm',
    img: 'https://media.giphy.com/media/psD7xYVrU9Otq/source.gif'
  },
  {
    order: 8,
    name: 'Snow',
    img: 'https://media.giphy.com/media/pa29FhX16eFlS/source.gif'
  },
  {
    order: 9,
    name: 'Mist',
    img: 'https://media.giphy.com/media/14qIliCMe87BwA/source.gif'
  },
  {
    order: 10,
    name: 'Clouds',
    img: 'https://media.giphy.com/media/hXlyDvoSNzM6k/source.gif'
  }
];

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
      weatherTag.innerHTML = weatherArray[1][0].description;
      // Had to use weather-data for this because the weatherArray 
      // is changing depending on city - ie sunrise/sunset data changes index
      sunriseTag.innerText = convertUnixTimestamp(weather.sys.sunrise);
      sunsetTag.innerText = convertUnixTimestamp(weather.sys.sunset);

      // Change image depending on current weather
      const currentWeather = weatherArray[1][0].main;
      changeImage(currentWeather);

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
      // If error in search - remove weather-content, change image
    }).catch((error) => {
      console.error('Error:', error);
      cityTag.innerHTML = 'Oops!'
      weatherImage.src = 'https://media.giphy.com/media/pvO8ugi72HKww/source.gif'
      weatherTag.innerHTML = 'No city here. Search again!'
      temperatureTag.innerHTML = ''
      feelsLikeTag.innerHTML = "Something's wrong..."
      sunriseTag.innerText = ''
      sunsetTag.innerText = ''
      sunriseImg.src = './images/blank.png'
      sunsetImg.src = './images/blank.png'
    });
};



// 5-day Forecast API
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
        const img = week.weather[0].icon
        return { day, temp, img };
      });

      // Inject above generated-data into selected queries in HTML
      newWeek.forEach((item, index) => {
        weeks[index].querySelector('.day--name').innerText = item.day;
        weeks[index].querySelector('.day--temp').innerText = item.temp;
        weeks[index].querySelector('.day--img').innerHTML = `<img src="https://openweathermap.org/img/wn/${item.img}@2x.png"></img>`;
      });
      // If error in search - remove week-box div.
    }).catch(() => {
      document.querySelector('.week-box').style.display = 'none'
    });
};

// SEARCH-FUNCTION
//Changes location of weather data by changing variable 'city', rerun 
// fetch-functions based on that, and also clear the inputfield
changeLocButton.addEventListener('click', () => {
  city = changeLocInput.value;
  sunriseImg.src = './images/sunrise.png'
  sunsetImg.src = './images/sunset.png'
  document.querySelector('.week-box').style.display = 'block'
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
  } else if (weather == 'Clear') {
    weatherImage.src = weatherDescriptions[0].img;
  }
};

// Run main functions at page loading
fetchWeatherData('Lerum, Sweden');
fetchForecastData('Lerum, Sweden');

