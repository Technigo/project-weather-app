const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=Kiruna,Sweden&units=metric&appid=3500e3bacf630605ddf92aeaab386a9e';
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const sun = document.getElementById('sun');
const weatherContainer = document.getElementById('header-container');
const forecastContainer = document.getElementById('main');


fetch(WEATHER_URL)
  .then((response) => {
    return response.json();
  })


  .then((data) => {
    let tempToday = data.list.filter(item => item.dt_txt.includes('12:00'));
    let cityName = data.city.name;
    let sunriseTime = new Date((data.city.sunrise + data.city.timezone + (new Date().getTimezoneOffset() * 60)) * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    let sunsetTime = new Date((data.city.sunset + data.city.timezone + (new Date().getTimezoneOffset() * 60)) * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    let weatherDescription = data.list[0[2]];

    weatherContainer.innerHTML = `
    <div class='weatherToday'>
        <h1>${tempToday}</h1>
        <h1>${cityName}</h1>
        <h1>${weatherDescription}</h1>
    </div>
    <div class='sunTime'>
        <p>Sunrise is: ${sunriseTime}</p>
        <p>Sunset is: ${sunsetTime}</p>
    </div>
    `
    })


    // const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'));
    // const tempToday = () => (filteredForecast[0].main.temp).toFixed(0);


    /*filteredForecast.forEach((weather) => {
      container.innerHTML += `
        <section class="forecast">         
          <p>${(weather.main.temp).toFixed(0)}</p>
          <p>${weather.weather[0].description}</p>
        </section>`;
    });
*/
 