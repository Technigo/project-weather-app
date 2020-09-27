const WEATHER_API_KEY = '73c5730a60c903ea682b781b386e94b4';

const body = document.querySelector('body');
const main = document.querySelector('main');
const city = document.getElementById('city');
const time = document.getElementById('time');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const picto = document.getElementById('picto');
const sunset = document.getElementById('sunset');
const sunrise = document.getElementById('sunrise');
const forecasts = document.getElementsByClassName('forecast');
const button = document.getElementById('citySubmit');

const backgrounds = [
  {
    description: 'Clear sky',
    code: '01d',
    color: 'rgb(142,197,252,0.5)',
    gradient: 'linear-gradient(45deg, rgba(142,197,252,0.5) 0%, rgba(252,242,195,0.5) 100%)',
    text: 'rgb(0,0,0)',
  },
  {
    description: 'Few clouds',
    code: '02d',
    color: 'rgb(150,150,150,0.5)',
    gradient: 'linear-gradient(45deg, rgba(150,150,150,0.5) 0%, rgba(252,242,195,0.5) 100%)',
    text: 'rgb(0,0,0)',
  },
  {
    description: 'Scattered clouds',
    code: '03d',
    color: 'rgb(153,156,162,0.5)',
    gradient: 'linear-gradient(45deg, rgba(153,156,162,0.5) 0%, rgba(245,243,239,0.5) 100%)',
    text: 'rgb(0,0,0)',
  },
  {
    description: 'Mist',
    code: '50d',
    color: 'rgb(153,156,162,0.5)',
    gradient: 'linear-gradient(45deg, rgba(153,156,162,0.5) 0%, rgba(245,243,239,0.5) 100%)',
    text: 'rgb(0,0,0)',
  },
  {
    description: 'Broken clouds',
    code: '04d',
    color: 'rgb(76,77,80,0.5)',
    gradient: 'linear-gradient(45deg, rgba(76,77,80,0.5) 0%, rgba(153,156,162,0.5) 100%)',
    text: 'rgb(0,0,0)',
  },
  {
    description: 'Shower rain',
    code: '09d',
    color: 'rgb(76,77,80,0.5)',
    gradient: 'linear-gradient(45deg, rgba(76,77,80,0.5) 0%, rgba(153,156,162,0.5) 100%)',
    text: 'rgb(0,0,0)',
  },
  {
    description: 'Rain',
    code: '10d',
    color: 'rgb(76,77,80,0.5)',
    gradient: 'linear-gradient(45deg, rgba(76,77,80,0.5) 0%, rgba(153,156,162,0.5) 100%)',
    text: 'rgb(0,0,0)',
  },
  {
    description: 'Thunderstorm',
    code: '11d',
    color: 'rgb(76,77,80,0.5)',
    gradient: 'linear-gradient(45deg, rgba(76,77,80,0.5) 0%, rgba(153,156,162,0.5) 100%)',
    text: 'rgb(0,0,0)',
  },
  {
    description: 'Snow',
    code: '13d',
    color: 'rgb(76,77,80,0.5)',
    gradient: 'linear-gradient(45deg, rgba(76,77,80,0.5) 0%, rgba(153,156,162,0.5) 100%)',
    text: 'rgb(0,0,0)',
  },
  {
    description: 'Clear sky night',
    code: '01n',
    color: 'rgb(17,34,121,0.5)',
    gradient: 'linear-gradient(45deg, rgba(17,34,121,0.5) 0%, rgba(208,213,236,0.5) 100%)',
    text: 'rgb(255,255,255)',
  },
  {
    description: 'Few clouds night',
    code: '02n',
    color: 'rgb(17,34,121,0.5)',
    gradient: 'linear-gradient(45deg, rgba(17,34,121,0.5) 0%, rgba(180,180,180,0.5) 100%)',
    text: 'rgb(255,255,255)',
  },
  {
    description: 'Scattered clouds night',
    code: '03n',
    color: 'rgb(17,34,121,0.5)',
    gradient: 'linear-gradient(45deg, rgba(17,34,121,0.5) 0%, rgba(153,156,162,0.5) 100%)',
    text: 'rgb(255,255,255)',
  },
  {
    description: 'Mist night',
    code: '50n',
    color: 'rgb(17,34,121,0.5)',
    gradient: 'linear-gradient(45deg, rgba(17,34,121,0.5) 0%, rgba(153,156,162,0.5) 100%)',
    text: 'rgb(255,255,255)',
  },
  {
    description: 'Broken clouds night',
    code: '04n',
    color: 'rgb(17,34,121,0.5)',
    gradient: 'linear-gradient(45deg, rgba(17,34,121,0.5) 0%, rgba(76,77,80,0.5) 100%)',
    text: 'rgb(255,255,255)',
  },
  {
    description: 'Shower rain night',
    code: '09n',
    color: 'rgb(17,34,121,0.5)',
    gradient: 'linear-gradient(45deg, rgba(17,34,121,0.5) 0%, rgba(76,77,80,0.5) 100%)',
    text: 'rgb(255,255,255)',
  },
  {
    description: 'Rain night',
    code: '10n',
    color: 'rgb(17,34,121,0.5)',
    gradient: 'linear-gradient(45deg, rgba(17,34,121,0.5) 0%, rgba(76,77,80,0.5) 100%)',
    text: 'rgb(255,255,255)',
  },
  {
    description: 'Thunderstorm night',
    code: '11n',
    color: 'rgb(17,34,121,0.5)',
    gradient: 'linear-gradient(45deg, rgba(17,34,121,0.5) 0%, rgba(76,77,80,0.5) 100%)',
    text: 'rgb(255,255,255)',
  },
  {
    description: 'Snow night',
    code: '13n',
    color: 'rgb(17,34,121,0.5)',
    gradient: 'linear-gradient(45deg, rgba(17,34,121,0.5) 0%, rgba(76,77,80,0.5) 100%)',
    text: 'rgb(255,255,255)',
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

// This function returns main colors depending on weather icon code
const returnColor = (todayIcon) => {
  backgrounds.forEach((item) => {
    if (item.code === todayIcon) {
      main.style.backgroundColor = item.color;
      main.style.backgroundImage = item.gradient;
      main.style.color = item.text;
    }
  })
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
  temperature.innerHTML = `${weatherArray.main.temp.toFixed(0)}\xB0`;
  description.innerHTML = weatherArray.weather.map((a) => a.main)[0];
  const todayIcon = (weatherArray.weather.map((a) => a.icon)[0]).toString();
  returnColor(todayIcon);
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
    const icon = day.weather.map((a) => a.icon)[0];
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
  console.log(cityValue);
  returnWeatherByCity(cityValue);
});