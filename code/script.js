const weatherApiKey = config.WEATHER_API_KEY;

const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=' + weatherApiKey;

fetch(apiUrl)
  .then((response) => {
    return response.json();
  })
  .then((weatherArray) => {
    console.log(weatherArray);
  })