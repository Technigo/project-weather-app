const WEATHER_API_KEY = config.WEATHER_API_KEY;

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=' + WEATHER_API_KEY;
const FORECAST_API_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=' + WEATHER_API_KEY;

const city = document.getElementById('city');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const picto = document.getElementById('picto');
const sunset = document.getElementById('sunset');
const sunrise = document.getElementById('sunrise');
const forecasts = document.getElementsByClassName('forecast');

fetch(WEATHER_API_URL)
  .then(response => response.json())
  .then(weatherArray => {
    // console.log(weatherArray);
    city.innerHTML = weatherArray.name;
    temperature.innerHTML = `${weatherArray.main.temp.toFixed(1)}\xB0`;
    description.innerHTML = weatherArray.weather.map((a) => a.description);
    sunrise.innerHTML = (new Date(weatherArray.sys.sunrise * 1000)).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });;
    sunset.innerHTML = (new Date(weatherArray.sys.sunset * 1000)).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });;
  });

fetch(FORECAST_API_URL)
  .then(response => response.json())
  .then((forecastArray) => {
    console.log(forecastArray);
    const filteredForecast = forecastArray.list.filter(item => item.dt_txt.includes('12:00'));
    console.log(filteredForecast);
    const forecastWeather = filteredForecast.map(day => {
      const dayName = (new Date(day.dt * 1000)).toLocaleDateString([], {
        weekday: 'short',
      });
      const main = day.weather.map((a) => a.main);
      const midTemp = `${day.main.temp.toFixed(1)}\xB0`;
      return { dayName, main, midTemp };
    });
    console.log(forecastWeather);
    forecastWeather.forEach((item, index) => {
      forecasts[index].querySelector('.day-name').innerHTML = item.dayName;
      forecasts[index].querySelector('.day-main').innerHTML = item.main;
      forecasts[index].querySelector('.day-temp').innerHTML = item.midTemp;
    })
  });