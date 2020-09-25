const API_KEY = 'e27fc7790a6a4c3537de471b9d7612ce'

let selectedCityName = 'Saigon';

// Default page base Ho Chi Minh City
updateWeatherData(selectedCityName);

document.getElementById('city-select').addEventListener('change', (event) => {
  const cityName = event.target.value;
  selectedCityName = cityName;
  updateWeatherData();
});

const CITIES = [
  {
    name: 'Saigon',
    timezone: 'Asia/Saigon'
  },
  {
    name: 'Stockholm',
    timezone: 'Europe/Stockholm'
  },
  {
    name: "Los Angeles",
    timezone: 'America/Los_Angeles'
  },
  {
    name: 'Tokyo',
    timezone: 'Japan'
  },
  {
    name: 'Paris',
    timezone: 'Europe/Paris'
  },
  {
    name: 'Santiago',
    timezone: 'America/Santiago'
  },
  {
    name: 'Cairo',
    timezone: 'Africa/Cairo'
  },
]

const selectElement = document.getElementById('city-select');
CITIES.forEach((item) => {
  selectElement.innerHTML += `<option value="${item.name}">${item.name}</option>`
})

//get location of the user-ask for consent
function showCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const todaysForecastUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
      const fiveDaysForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`

      fetchTodaysForecast(todaysForecastUrl);
      fetchFiveDayForecast(fiveDaysForecastUrl);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function fetchTodaysForecast(url) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((todayForecast) => {
      populateDetails(todayForecast);
      populateSummary(todayForecast);
    });
}

function fetchFiveDayForecast(url) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((forecast) => {
      const filteredForecast = forecast.list.filter(item => item.dt_txt.includes('12:00'));

      let output = '';

      filteredForecast.forEach((item) => {
        const temperature = item.main.temp;
        const tempShort = parseFloat(temperature).toFixed(1);
        const date = new Date(item.dt * 1000);
        const weekday = date.toLocaleDateString('en-US', {
          weekday: 'short'
        });
        output += `<p class="day">${weekday} <span>${tempShort}°C</span></p>`;
      });

      document.getElementById('forecast').innerHTML = output;
    });
}

function updateWeatherData() {
  const todayWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCityName}&units=metric&APPID=${API_KEY}`
  const fiveDaysForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCityName}&units=metric&appid=${API_KEY}`

  fetchTodaysForecast(todayWeatherUrl);
  fetchFiveDayForecast(fiveDaysForecastUrl);
}
  
function populateDetails(todayForecast) {
  const todayDescription = todayForecast.weather[0].description;
  const todayTemperature = todayForecast.main.temp;
  const todayTempOneDeci = parseFloat(todayTemperature).toFixed(1);

  const sunrise = new Date(todayForecast.sys.sunrise * 1000);
  const sunset = new Date(todayForecast.sys.sunset * 1000);
  const selectedItem = CITIES.find((item) => item.name === selectedCityName);

  const options = {
    timeZone: selectedItem.timezone,
    timeStyle: 'short',
    hour12: false,
  }
  const sunriseTime = new Intl.DateTimeFormat('en-US', options).format(sunrise);
  const sunsetTime = new Intl.DateTimeFormat('en-US', options).format(sunset);

  document.getElementById('des').innerHTML = `${todayDescription}`;
  document.getElementById('temp').innerHTML = `${todayTempOneDeci}°C`;
  document.getElementById('sunRise').innerHTML = `Sunrise: ${sunriseTime}`;
  document.getElementById('sunSet').innerHTML = `Sunset: ${sunsetTime}`;
}

function populateSummary(todayForecast) {
  const weatherTemplate = getWeatherTemplate(todayForecast);

  document.getElementById('img').src = weatherTemplate.image;
  document.getElementById('sumMessage').innerHTML = weatherTemplate.message;
  document.querySelector('.main-container').style.background = weatherTemplate.background;
  document.querySelector('.main-container').style.color = weatherTemplate.color;
}

function getWeatherTemplate(todayForecast) {
  const todayDescription = todayForecast.weather[0].description;
  const cityName = todayForecast.name;
  let weatherId = '';

  if (todayDescription.includes('rain')) {
    weatherId = 'rain';
  } else if (todayDescription.includes('cloud')) {
    weatherId = 'cloud';
  } else if (todayDescription.includes('clear')) {
    weatherId = 'clear';
  } else {
    weatherId = 'other';
  }

  const weatherTemplate = [
    {
      id: 'rain',
      description: todayDescription,
      image: './assets/rainyDay.svg',
      background:'linear-gradient(rgba(163,222,247,0.2), rgba(163,222,247,1))',
      color: '#164A68',
      message: `Don't forget your umbrella. It is wet in ${cityName} today.`
    },
    {
      id: 'cloud',
      description: todayDescription,
      image: './assets/cloudyDay.svg',
      background:'linear-gradient(rgba(244,247,248,0.2), rgba(244,247,248,1))',
      color:'#F47775',
      message: `Light a fire and get cosy. It is cloudy in ${cityName} today.`
    },
    {
      id: 'clear',
      description: todayDescription,
      image: './assets/sunnyDay.svg',
      background: 'linear-gradient(rgba(244,233,185,0.2), rgba(247,233,185,1))',
      color:'#2A5510',
      message: `Get your sunnies on. ${cityName} is looking rather great today.`
    },
   {
      id: 'other',
      description: todayDescription,
      image: './assets/cloud-moon-rain.svg',
      background: 'linear-gradient(rgba(216,187,255,0.2), rgba(216,187,255,1))',
      color:'#5a189a',
      message: `Enjoy the beauty of different weathers in ${cityName} today`
    }
  ]
  return weatherTemplate.find((item) => item.id === weatherId);
}


// document.getElementById('wrap').innerHTML = `<video class="video-background" autoplay muted loop><source scr:'./assets/Garden - 18230.mp4' type="video/mp4"></video> `


