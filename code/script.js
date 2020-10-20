const WEATHER_API_KEY = '73c5730a60c903ea682b781b386e94b4';

// Variables
const body = document.querySelector('body');
const main = document.querySelector('main');
const today = document.getElementById('today');
const city = document.getElementById('city');
const time = document.getElementById('time');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const picto = document.getElementById('picto');
const sunset = document.getElementById('sunset');
const sunrise = document.getElementById('sunrise');
const forecasts = document.getElementsByClassName('forecast');
const selectButton = document.getElementById('citySubmit');
const searchButton = document.getElementById('citySearch');

// Background image based on weather conditions and time
const bodyBackgrounds = [
  {
    code: '01d',
    image: './assets/sun.jpg',
  },
  {
    code: '02d',
    image: './assets/sun.jpg',
  },
  {
    code: '03d',
    image: './assets/clouds.jpg',
  },
  {
    code: '50d',
    image: './assets/clouds.jpg',
  },
  {
    code: '04d',
    image: './assets/clouds.jpg',
  },
  {
    code: '09d',
    image: './assets/rain.jpg',
  },
  {
    code: '10d',
    image: './assets/rain.jpg',
  },
  {
    code: '11d',
    image: './assets/storm.jpg',
  },
  {
    code: '13d',
    image: './assets/snow.jpg',
  },
  {
    code: '01n',
    image: './assets/night.jpg',
  },
  {
    code: '02n',
    image: './assets/night.jpg',
  },
  {
    code: '03n',
    image: './assets/night.jpg',
  },
  {
    code: '50n',
    image: './assets/night.jpg',
  },
  {
    code: '04n',
    image: './assets/night.jpg',
  },
  {
    code: '09n',
    image: './assets/night.jpg',
  },
  {
    code: '10n',
    image: './assets/night.jpg',
  },
  {
    code: '11n',
    image: './assets/night.jpg',
  },
  {
    code: '13n',
    image: './assets/night.jpg',
  }
]

// Month array to be used with today's date
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

// Day array to be used with today's date
const days = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
]

// This function returns body background image depending on weather icon code
const returnBodyBackground = todayIcon => {
  bodyBackgrounds.forEach((item) => {
    if (item.code === todayIcon) {
      body.style.backgroundImage = `url(${item.image})`;
      body.style.backgroundSize = 'cover';
    }
  })
};

// This function returns gradient depending on temperature
const returnTempGradient = temp => {
  if (temp <= 0) {
    today.style.backgroundImage = 'linear-gradient(45deg, rgba(0,57,115,1) 0%, rgba(67,198,172,1) 100%)';
  } else if (temp <= 15) {
    today.style.backgroundImage = 'linear-gradient(45deg, rgba(67,198,172,1) 0%, rgba(248,255,174,1) 100%)';
  } else if (temp <= 30) {
    today.style.backgroundImage = 'linear-gradient(45deg, rgba(248,255,174,1) 0%, rgba(254,140,0,1) 100%)';
  } else {
    today.style.backgroundImage = 'linear-gradient(45deg, rgba(254,140,0,1) 0%, rgba(142,14,0,1) 100%)';
  }
};

// This function defines current location and passes information to showPosition()
const getLocation = () => {
  navigator.geolocation.getCurrentPosition(showPosition);
}

// This function stores current location and starts fetching based on current location
const showPosition = position => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  returnWeatherByLocation(latitude, longitude);
};

// This function starts page loading with current location
getLocation();

// This function displays today's weather
const displayTodaysWeather = weatherArray => {
  // city name
  city.innerHTML = weatherArray.name;
  // date with customized format
  const timeStamp = new Date((weatherArray.dt + weatherArray.timezone - 7200) * 1000); // Time recalculated as local time
  time.innerHTML = `${days[timeStamp.getDay()]} ${timeStamp.getDate()} ${months[timeStamp.getMonth()]} ${timeStamp.toLocaleTimeString('en-US', { // Customized date format
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })}`;
  // Temperature with one decimal
  const temp = weatherArray.main.temp;
  temperature.innerHTML = `${temp.toFixed(1)}\xB0`;
  returnTempGradient(temp); // First section's color based on temperature 
  // Weather description
  const descriptionArray = weatherArray.weather.map(a => a.main);
  description.innerHTML = descriptionArray[0]; // Retrieving first description in case of multiple descriptions in order to fit in the layout
  //Weather icon
  const iconArray = weatherArray.weather.map(a => a.icon);
  const todayIcon = iconArray[0]; // Retrieving first icon in case of multiple icon codes
  returnBodyBackground(todayIcon); // Body background based on icon code
  picto.src = 'https://openweathermap.org/img/wn/' + todayIcon + '@2x.png'; // Current weather icon
  // Sunrise
  sunrise.innerHTML = (new Date((weatherArray.sys.sunrise + weatherArray.timezone - 7200) * 1000)).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  // Sunset
  sunset.innerHTML = (new Date((weatherArray.sys.sunset + weatherArray.timezone - 7200) * 1000)).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

// This function displays 5 days weather forecast
const displayForecast = (forecastArray) => {
  const timeZone = forecastArray.city.timezone; // Time difference to UTC
  // Array of weathers at 12.00
  const filteredForecast = forecastArray.list.filter(item => item.dt_txt.includes('12:00'));
  // Array of days, icons and temperature at 12.00
  const forecastWeather = filteredForecast.map(day => {
    const dayName = (new Date((day.dt + timeZone - 7200) * 1000)).toLocaleDateString('en-US', {
      weekday: 'short',
    });
    const iconArray = day.weather.map(a => a.icon);
    const icon = iconArray[0];
    const midTemp = `${day.main.temp.toFixed(1)}\xB0`;
    return { dayName, icon, midTemp };
  });
  // Displaying day, weather icon and temperature for each day in the forecast at 12.00
  forecastWeather.forEach((item, index) => {
    forecasts[index].querySelector('.day-name').innerHTML = item.dayName;
    forecasts[index].querySelector('.day-icon').src = 'https://openweathermap.org/img/wn/' + item.icon + '.png';
    forecasts[index].querySelector('.day-temp').innerHTML = item.midTemp;
  });
}

// This function fetchs weather information and forecast based on location
const returnWeatherByLocation = (latitude, longitude) => {
  const WEATHER_GEOLOC_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=` + WEATHER_API_KEY;
  const FORECAST_GEOLOC_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&APPID=` + WEATHER_API_KEY;
  fetch(WEATHER_GEOLOC_API_URL)
    .then(response => response.json())
    .then(weatherArray => {
      displayTodaysWeather(weatherArray);
    });
  fetch(FORECAST_GEOLOC_API_URL)
    .then(response => response.json())
    .then((forecastArray) => {
      displayForecast(forecastArray);
    });
}

// This function fetchs weather information and forecast based on city name
const returnWeatherByCity = cityValue => {
  const WEATHER_SEARCH_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&APPID=` + WEATHER_API_KEY;
  const FORECAST_SEARCH_API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityValue}&units=metric&APPID=` + WEATHER_API_KEY;
  fetch(WEATHER_SEARCH_API_URL)
    .then(response => response.json())
    .then(weatherArray => {
      displayTodaysWeather(weatherArray);
    });
  fetch(FORECAST_SEARCH_API_URL)
    .then(response => response.json())
    .then((forecastArray) => {
      displayForecast(forecastArray);
    });
}

// This function updates weather information based on city name selected by user
selectButton.addEventListener('click', () => {
  const cityValue = citySelector.value;
  returnWeatherByCity(cityValue);
});

// This function updates weather information based on city name entered by user
searchButton.addEventListener('click', () => {
  const citySearch = input.value;
  returnWeatherByCity(citySearch);
});