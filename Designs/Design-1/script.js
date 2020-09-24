
const apiWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=3d0d86970b5aff224fe8f40e9b4e2e78'
const container = document.getElementById('main');
const weatherElement = document.getElementById('weatherInfo');

fetch(apiWeatherUrl)

.then((response) => {
  return response.json();
})
.then((weatherArray) => {
  
  console.log(weatherArray)

  // Step **2 - Present city, temp, description, data on your web app.**

  weatherElement.innerHTML = weatherArray.name;

  const temperatureElement = document.getElementById('temperature');
  const y = weatherArray.main.temp;
  const x = Math.round(y);
  temperatureElement.innerText = x;
  
  const  weatherTypeElement = document.getElementById('weatherType');
  weatherTypeElement.innerText = weatherArray.weather[0].description;
 
  const sunriseElement = document.getElementById('sunrise');
  sunriseElement.innerText = weatherArray.sys.sunrise;

  const sunsetElement = document.getElementById('sunset');
  sunsetElement.innerText = weatherArray.sys.sunset;

});  


