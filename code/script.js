const WEATHER_API_KEY = '73c5730a60c903ea682b781b386e94b4';

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
const button = document.getElementById('citySubmit');

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
const returnBodyBackground = (todayIcon) => {
  bodyBackgrounds.forEach((item) => {
    if (item.code === todayIcon) {
      body.style.backgroundImage = `url(${item.image})`;
      body.style.backgroundSize = 'cover';
    }
  })
};

// This function returns main colors depending on weather icon code
const returnMainColor = (temp) => {
  if (temp <= 0) {
    main.style.backgroundImage = 'linear-gradient(45deg, rgba(122,184,234,1) 0%, rgba(255,255,255,1) 100%)';
  } else if (temp <= 15) {
    main.style.backgroundImage = 'linear-gradient(45deg, rgba(245,244,221,1) 0%, rgba(255,210,85,1) 100%)';
  } else if (temp <= 30) {
    main.style.backgroundImage = 'linear-gradient(45deg, rgba(255,210,85,1) 0%, rgba(226,104,58,1) 100%)';
  } else {
    main.style.backgroundImage = 'linear-gradient(45deg, rgba(221,24,24,1) 0%, rgba(127,0,0,1) 100%)';
  }
};

// This function defines current location and passes information to showPosition()
const getLocation = () => {
  navigator.geolocation.getCurrentPosition(showPosition);
}

// This function stores current location and starts fetching based on current location
const showPosition = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  returnWeatherByLocation(latitude, longitude);
};

// This function starts page loading with current location
getLocation();

// This function displays today's weather
const displayTodaysWeather = (weatherArray) => {
  city.innerHTML = weatherArray.name;
  const timeStamp = new Date((weatherArray.dt + weatherArray.timezone - 7200) * 1000);
  time.innerHTML = `${days[timeStamp.getDay()]} ${timeStamp.getDate()} ${months[timeStamp.getMonth()]} ${timeStamp.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })}`;
  const temp = weatherArray.main.temp;
  temperature.innerHTML = `${temp.toFixed(0)}\xB0`;
  const descriptionArray = weatherArray.weather.map((a) => a.main);
  description.innerHTML = descriptionArray[0];
  const iconArray = weatherArray.weather.map((a) => a.icon);
  const todayIcon = iconArray[0];
  returnBodyBackground(todayIcon);
  returnMainColor(temp);
  picto.src = 'https://openweathermap.org/img/wn/' + todayIcon + '@2x.png';
  sunrise.innerHTML = (new Date((weatherArray.sys.sunrise + weatherArray.timezone - 7200) * 1000)).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  sunset.innerHTML = (new Date((weatherArray.sys.sunset + weatherArray.timezone - 7200) * 1000)).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

// This function displays 5 days weather forecast
const displayForecast = (forecastArray) => {
  const timeZone = forecastArray.city.timezone;
  const filteredForecast = forecastArray.list.filter(item => item.dt_txt.includes('12:00'));
  const forecastWeather = filteredForecast.map(day => {
    const dayName = (new Date((day.dt + timeZone - 7200) * 1000)).toLocaleDateString([], {
      weekday: 'short',
    });
    const iconArray = day.weather.map((a) => a.icon);
    const icon = iconArray[0];
    const midTemp = `${day.main.temp.toFixed(0)}\xB0`;
    return { dayName, icon, midTemp };
  });
  forecastWeather.forEach((item, index) => {
    forecasts[index].querySelector('.day-name').innerHTML = item.dayName;
    forecasts[index].querySelector('.day-icon').src = 'https://openweathermap.org/img/wn/' + item.icon + '.png';
    forecasts[index].querySelector('.day-temp').innerHTML = item.midTemp;
  });
}

// This function fetchs weather information and forecast based on location
const returnWeatherByLocation = (latitude, longitude) => {
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=` + WEATHER_API_KEY;
  const FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&APPID=` + WEATHER_API_KEY;
  fetch(WEATHER_API_URL)
    .then(response => response.json())
    .then(weatherArray => {
      displayTodaysWeather(weatherArray);
    });
  fetch(FORECAST_API_URL)
    .then(response => response.json())
    .then((forecastArray) => {
      displayForecast(forecastArray);
    });
}

// This function fetchs weather information and forecast based on city name
const returnWeatherByCity = (cityValue) => {
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&APPID=` + WEATHER_API_KEY;
  const FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityValue}&units=metric&APPID=` + WEATHER_API_KEY;
  fetch(WEATHER_API_URL)
    .then(response => response.json())
    .then(weatherArray => {
      displayTodaysWeather(weatherArray);
    });
  fetch(FORECAST_API_URL)
    .then(response => response.json())
    .then((forecastArray) => {
      displayForecast(forecastArray);
    });
}

// This function updates weather information based on city name entered by user
button.addEventListener('click', () => {
  const cityValue = citySelector.value;
  returnWeatherByCity(cityValue);
});