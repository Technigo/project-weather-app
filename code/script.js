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
const feelsLikeBox = document.querySelector('.main-weather--feels-like')
const weatherTag = document.getElementById('weather');
const sunriseTag = document.getElementById('sunrise');
const sunsetTag = document.getElementById('sunset');
const sunriseImg = document.getElementById('sunrise-image');
const sunsetImg = document.getElementById('sunset-image');
const changeLocInput = document.getElementById('location-input')
const changeLocButton = document.getElementById('location-button')
const changeLocGeo = document.getElementById('location-geo')
const weekBox = document.querySelector('.week-box')

// General fetch for search-box.
const fetchAPILink = (selectedCity) => {
  city = selectedCity
  const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
  fetchForecastData(forecastApiUrl)
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${API_KEY}`;
  fetchWeatherData(weatherApiUrl)
};

// Separated the fetch-function from the api-declaration to be able
// to use the function for different types of API-requests
const fetchWeatherData = (apiUrl) => {
  fetch(apiUrl)
    .then((results) => {
      return results.json();
    })
    .then((weather) => {
      console.log(weather)
      cityTag.innerHTML = weather.name;
      temperatureTag.innerHTML = roundedNumber(weather.main.temp) + ` C°`;
      feelsLikeTag.innerHTML = roundedNumber(weather.main.feels_like) + ` C°`;
      weatherTag.innerHTML = weather.weather[0].description;
      sunriseTag.innerText = convertUnixTimestamp(weather.sys.sunrise);
      sunsetTag.innerHTML = convertUnixTimestamp(weather.sys.sunset);

      console.log(weather.weather[0].main)

      // run the changeImage-function depending on current weather
      const currentWeather = weather.weather[0].main;
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
      cityTag.innerText = 'Oops!'
      weatherImage.src = 'https://media.giphy.com/media/U3rFVRHeGBhbq/source.gif'
      weatherTag.innerText = 'No city here. Search again!'
      temperatureTag.innerText = ''
      feelsLikeBox.style.display = 'none'
      sunriseTag.innerText = ''
      sunsetTag.innerText = ''
      sunriseImg.src = './images/blank.png'
      sunsetImg.src = './images/blank.png'
    });
};

// 5-day Forecast Data
const fetchForecastData = (apiUrl) => {
  fetch(apiUrl)
    .then((results) => {
      return results.json();
    })
    .then((forecast) => {
      // Filter through the data and select the objects including a certain time
      const filteredForecast = forecast.list.filter((item) =>
        item.dt_txt.includes(calculateHour(currentTime))
      );

      // Function that returns day + temp
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
      weekBox.style.display = 'none'
    });
}

// Return the elements which are removed on search error
const returnErrorElements = () => {
  sunriseImg.src = './images/sunrise.png'
  sunsetImg.src = './images/sunset.png'
  weekBox.style.display = 'block'
  feelsLikeBox.style.display = 'block'
}

// SEARCH-FUNCTION
//Changes location of weather data by changing variable 'city', rerun 
// fetch-functions based on that, and also clear the inputfield
const changeLocation = () => {
  city = changeLocInput.value;
  returnErrorElements()
  fetchAPILink(city);
  changeLocInput.value = "";
}

// Call above function with the changeLocButton.
changeLocButton.addEventListener('click', changeLocation)

// YES, It's a quickfix. Did not have time to fix a proper form. So kill me!
changeLocInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    changeLocation()
  }
});

// Get current longitude- and latitude values and push them into a new API-link
// Then use the new API-link and fetch data.
const geoLocate = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      position.timeout = .5
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const geoLocationForecastAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      const geoLocationWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      returnErrorElements()
      fetchForecastData(geoLocationForecastAPI)
      fetchWeatherData(geoLocationWeatherAPI)
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Call above function with the Geolocate-button.
changeLocGeo.addEventListener('click', geoLocate)

// Convert timestamp to a better looking time-format
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
const getWeekday = (data) => {
  const newDate = new Date(data * 1000);
  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return weekday[newDate.getDay()];
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
  console.log(weather)
  switch (weather) {
    case 'Clear':
      return weatherImage.src ='https://media.giphy.com/media/WfMTAZcqJjCc8/source.gif'
    case 'Clouds':
      return weatherImage.src = 'https://media.giphy.com/media/hXlyDvoSNzM6k/source.gif'
    case 'Rain':
      return weatherImage.src = 'https://media.giphy.com/media/rdKs1wbHapaQ8/source.gif'
    case 'Drizzle':
      return weatherImage.src = 'https://media.giphy.com/media/Eh5hHMC9aXeQ8/source.gif'
    case 'Thunderstorm':
      return weatherImage.src = 'https://media.giphy.com/media/psD7xYVrU9Otq/source.gif'
    case 'Snow':
      return weatherImage.src = 'https://media.giphy.com/media/pa29FhX16eFlS/source.gif'
    case 'Mist':
      return weatherImage.src = 'https://media.giphy.com/media/14qIliCMe87BwA/source.gif'
    } 
}

// Run geolocate-function at page loading
geoLocate()