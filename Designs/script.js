const weatherData = document.getElementById('weatherdata')

const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?q=stockholm,Sweden&units=metric&APPID=5caaaf25021b2d7aa4d206126b6a3351";

fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    weatherData.innerHTML = `
      <p>City: ${data.name}</p>
      <p>Temp: ${data.main.temp.toFixed(1)}°C</p>  
      <p>Weather: ${data.weather[0].description}</p>
    `// toFixed(1) rounds the temp to one decimal
  })
  .catch((error) => console.error('Error: ', error))
  .finally(() => console.log('Request done'))


const getForecastForCity = (cityName, callbackFunction) => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=5caaaf25021b2d7aa4d206126b6a3351`)
    .then((response) => response.json())
    .then((data) => {
      callbackFunction(data);
    })
    .catch((error) => console.error('Error: ', error))
    .finally(() => console.log('Request done'));
}


const dropdownCities = document.getElementById ('dropdown-cities');
const handleWeatherApiResponse = (forecastForCity) => {
  console.log(forecastForCity)
 //copied other template so we see changes in live in chrome. we can remove this when we merge and add getForecastForCity and the API.
  weatherData.innerHTML = `
  <p>City: ${forecastForCity.name}</p>
  <p>Temp: ${forecastForCity.main.temp.toFixed(1)}°C</p>  
  <p>Weather: ${forecastForCity.weather[0].description}</p>
  `
}

const onCityChanged = () => {
  getForecastForCity (dropdownCities.value, handleWeatherApiResponse);
  }
dropdownCities.addEventListener('change', onCityChanged);
