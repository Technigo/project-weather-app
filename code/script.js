const weatherApiKey = config.WEATHER_API_KEY;

const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=' + weatherApiKey;

const city = document.getElementById('city');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');

fetch(apiUrl)
  .then((response) => {
    return response.json();
  })
  .then((weatherArray) => {
    console.log(weatherArray);
    city.innerHTML = weatherArray.name;
    temperature.innerHTML = `${weatherArray.main.temp.toFixed(1)}\xB0`;
    description.innerHTML = weatherArray.weather.map((a) => a.description);
  })