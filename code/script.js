const API_KEY = 'e27fc7790a6a4c3537de471b9d7612ce'

// Default page base Ho Chi Minh City
updateWeatherData('Saigon');


document.getElementById('city-select').addEventListener('change', (event) => {
  const cityName = event.target.value;
  updateWeatherData(cityName);
});

function updateWeatherData(cityName) {
  const todayWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${API_KEY}`
  const fiveDaysForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
  
  fetch(todayWeatherUrl)
    .then((response) => {
      return response.json();
    })
    .then((todayForecast) => {
      populateDetails(todayForecast, cityName);
      populateSummary(todayForecast);
    });
  
  fetch(fiveDaysForecastUrl)
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
  
function populateDetails(todayForecast, cityName) {
  const todayDescription = todayForecast.weather[0].description;
  const todayTemperature = todayForecast.main.temp;

  const sunrise = new Date(todayForecast.sys.sunrise * 1000);
  const sunset = new Date(todayForecast.sys.sunset * 1000);
  const options = {
    timeZone: getTimeZone(cityName),
    timeStyle: 'short',
    hour12: false,
  }
  const sunriseTime = new Intl.DateTimeFormat('en-US', options).format(sunrise);
  const sunsetTime = new Intl.DateTimeFormat('en-US', options).format(sunset);

  document.getElementById('des').innerHTML = `${todayDescription}`;
  document.getElementById('temp').innerHTML = `${todayTemperature}°C`;
  document.getElementById('sunRise').innerHTML = `Sunrise: ${sunriseTime}`;
  document.getElementById('sunSet').innerHTML = `Sunset: ${sunsetTime}`;
}

function populateSummary(todayForecast) {
  console.log(todayForecast);
  const weatherTemplate = getWeatherTemplate(todayForecast);
  console.log('weatherTemplate', weatherTemplate);

  document.getElementById('img').src = weatherTemplate.image;
  document.getElementById('sumMessage').innerHTML = weatherTemplate.message;
  document.querySelector('.main-container').style.background = weatherTemplate.background;
  document.querySelector('.main-container').style.color = weatherTemplate.color;
}

function getWeatherTemplate(todayForecast) {
  const todayDescription = todayForecast.weather[0].description;
  const city = todayForecast.name;
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

  console.log('weatherId', weatherId);

  const weatherTemplate = [
    {
      id: 'rain',
      description: todayDescription,
      image: './assets/rainyDay.svg',
      background: 'linear-gradient(rgba(163,222,247,0.2), rgba(163,222,247,1))',
      color: '#164A68',
      message: `Don't forget your umbrella. It is wet in ${city} today.`
    },

    {
      id: 'cloud',
      description: todayDescription,
      image: './assets/cloudyDay.svg',
      background: 'linear-gradient(rgba(244,247,248,0.2), rgba(244,247,248,1))',
      color:'#F47775',
      message: `Light a fire and get cosy. It is cloudy in ${city} today.`
    },

    {
      id: 'clear',
      description: todayDescription,
      image: './assets/sunnyDay.svg',
      background: 'linear-gradient(rgba(244,233,185,0.2), rgba(247,233,185,1))',
      color:'#2A5510',
      message: `Get your sunnies on. ${city} is looking rather great today.`
    },

   {
      id: 'other',
      description: todayDescription,
      image: './assets/cloud-moon-rain.svg',
      background: 'linear-gradient(rgba(216,187,255,0.2), rgba(216,187,255,1))',
      color:'#5a189a',
      message: `Enjoy the beauty of different weathers in ${city} today`
    }
  ]
  return weatherTemplate.find((item) => item.id === weatherId);
}

function getTimeZone(city) {
  if (city === 'Saigon') {
    return 'Asia/Saigon'
  } else if(city === "Los Angeles") {
    return 'America/Los_Angeles'
  } else if (city === 'Tokyo') {
    return 'Japan'
  } else if (city === 'Paris') {
    return 'Europe/Paris'
  } else if (city === 'Santiago') {
    return 'America/Santiago'
  } else if (city === 'Cairo') {
    return 'Africa/Cairo'
  }
}

  



