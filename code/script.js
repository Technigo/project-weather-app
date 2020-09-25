const API_KEY = 'e27fc7790a6a4c3537de471b9d7612ce'

let selectedCityName = 'Ho Chi Minh';

// Default page base Ho Chi Minh City
updateWeatherData(selectedCityName);

document.getElementById('city-select').addEventListener('change', (event) => {
  const cityName = event.target.value;
  selectedCityName = cityName;
  updateWeatherData();
});

const CITIES = [
  {
    name: 'Ho Chi Minh',
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
    name: 'Dubai',
    timezone: 'Asia/Dubai'
  },
  {
    name: 'Santiago',
    timezone: 'America/Santiago'
  },
  {
    name: 'Cairo',
    timezone: 'Africa/Cairo'
  },
  {
    name: 'Ulaanbaatar',
    timezone: 'Asia/Ulaanbaatar'
  },
  {
    name: 'Brisbane',
    timezone: 'Australia/Brisbane'
  }
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
        const temperature = parseFloat(item.main.temp).toFixed(1);
        const date = new Date(item.dt * 1000);
        const weekday = date.toLocaleDateString('en-US', {
          weekday: 'short'
        });
        output += `<p class="day">${weekday} <span>${temperature}°C</span></p>`;
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
  const todayTemperature = parseFloat(todayForecast.main.temp).toFixed(1);
  const todayFeelLike = parseFloat(todayForecast.main.feels_like).toFixed(1);

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
  document.getElementById('temp').innerHTML = `${todayTemperature}°C`;
  document.getElementById('feel-like').innerHTML = `Feel like ${todayFeelLike}°C`;
  document.getElementById('sunRise').innerHTML = `Sunrise ${sunriseTime}`;
  document.getElementById('sunSet').innerHTML = `Sunset ${sunsetTime}`;
}

function populateSummary(todayForecast) {
  const weatherTemplate = getWeatherTemplate(todayForecast);

  document.getElementById('img').src = weatherTemplate.image;
  document.getElementById('img').classList.add('wobble');
  setTimeout(() => {
  document.getElementById('img').classList.remove('wobble');
  }, 6000)
  document.querySelector('.background-container').innerHTML = `
    <video class="background-video" autoplay muted loop
      poster= ${weatherTemplate.poster} >
      <source id="video" src="${weatherTemplate.videoSrc}" type="video/mp4">
    </video>
  `;
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
      background: 'rgba(0,0,0,0.34)',
      color: '#fff',
      videoSrc: './assets/Forest - 31450.mp4',
      poster: './assets/lake-4873148_1920.jpg',
      message: `Don't forget your umbrella. It is wet in ${cityName} today.`
    },
    {
      id: 'cloud',
      description: todayDescription,
      image: './assets/cloudyDay.svg',
      background: 'rgba(0,0,0,0.34)',
      color: '#fff',
      videoSrc: './assets/Clouds - 1154.mp4',
      poster: './assets/cloud-2941420_1920.jpg',
      message: `Light a fire and get cosy. It is cloudy in ${cityName} today.`
    },
    {
      id: 'clear',
      description: todayDescription,
      image: './assets/sunnyDay.svg',
      bbackground: 'rgba(0,0,0,0.34)',
      color: '#F7E9B9',
      videoSrc: './assets/Nature - 38393.mp4',
      poster: './assets/summer-2391348_1920.jpg',
      message: `Get your sunnies on. ${cityName} is looking rather great today.`
    },
   {
      id: 'other',
      description: todayDescription,
      image: './assets/thunderstorm-sun.svg',
      background: 'rgba(0,0,0,0.34)',
      color: '#fff',
      videoSrc: './assets/Sunrise - 22204.mp4',
      poster: './assets/dancer-2793110_1920.jpg',
      message: `Enjoy the beauty of different weathers in ${cityName} today`
    }
  ]
  return weatherTemplate.find((item) => item.id === weatherId);
}




