const API_KEY = 'e27fc7790a6a4c3537de471b9d7612ce'

// Default page base Ho Chi Minh City
updateWeatherData('Ho chi minh');

document.getElementById('city-select').addEventListener('change', (event) => {
  const cityName = event.target.value;
  console.log(cityName);
  updateWeatherData(cityName);
});

function updateWeatherData(cityName) {
  const todayWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${API_KEY}`
  const fiveDaysForecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
  
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
  const todayDescription = todayForecast.weather[0].description;
  const rainyDay = todayDescription.includes('rain');
  const cloudyDay = todayDescription.includes('cloud');
  const sunnyDay = todayDescription.includes('clear');
  const city = todayForecast.name;

  if (rainyDay) {
    document.getElementById('img').src = '../assets/rainnyDay.svg';
    document.getElementById('sumMessage').innerHTML = `Don't forget your umbrellar. It is wet in ${city} today.`;
    document.querySelector('.main-container').classList.add('rainy-day');
  } else if (cloudyDay) {
    document.getElementById('img').src = '../assets/cloudyDay.svg';
    document.getElementById('sumMessage').innerHTML = `Light a fire and get cosy. It is cloudy in ${city} today.`;
    document.querySelector('.main-container').classList.add('cloudy-day');
  } else if (sunnyDay){
    document.getElementById('img').src = '../assets/sunnyDay.svg';
    document.getElementById('sumMessage').innerHTML = `Get your sunnies on. ${city} is looking rather great today.`;
    document.querySelector('.main-container').classList.add('sunny-day');
  } else {
    document.getElementById('sumMessage').innerHTML = `Get yourself ready for the all-weather-in-one today`;
  }
}

function getTimeZone(city) {
  if (city === 'Ho Chi Minh') {
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




  



