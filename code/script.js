const weatherApiKey = config.WEATHER_API_KEY;

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=' + weatherApiKey;

const city = document.getElementById('city');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const picto = document.getElementById('picto');
const sunset = document.getElementById('sunset');
const sunrise = document.getElementById('sunrise');

fetch(WEATHER_API_URL)
  .then((response) => {
    return response.json();
  })
  .then((weatherArray) => {
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