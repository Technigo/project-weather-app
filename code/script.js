/* API Key to Open Weather: 3f1c95b540a45d2a48ff596267d9d939 */

const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');

fetch('http://api.openweathermap.org/data/2.5/weather?q=Panama&units=metric&appid=3f1c95b540a45d2a48ff596267d9d939')
  .then((response) => {
    return response.json();
  })

  .then((json) => {
    console.log(json);

    cityName.innerText = json.name;
    temperature.innerText = Math.floor(json.main.temp);
    description.innerText = json.weather[0].description;
  })

  .catch((error) => {
    console.log(error);
  });