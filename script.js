const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=Kiruna,Sweden&units=metric&appid=3500e3bacf630605ddf92aeaab386a9e';
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const sun = document.getElementById('sun');
const container = document.getElementById('main');

console.log('API Fetch starting')

fetch(WEATHER_URL)
  .then((response) => {
    console.log(`Response OK? ${response.ok}`);
    console.log(`Response Status: ${response.status}`);
    console.log('Response recieved');
    return response.json();
  })

  .then((data) => {
    console.log(data);
    cityName.innerHTML = ` ${data.city.name} `;
    const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
    
    filteredForecast.forEach(() => {
        temperature.innerHTML = ` ${(filteredForecast[0].main.temp).toFixed(0)}`;
    });
    
    filteredForecast.forEach((weather) => {
      description.innerHTML = `${weather.weather[0].description}`
    })

    sun.innerHTML = `
          <p>Sunrise is: ${new Date((data.city.sunrise + data.city.timezone + (new Date().getTimezoneOffset() * 60)) * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
          <p>Sunset is: ${new Date((data.city.sunset + data.city.timezone + (new Date().getTimezoneOffset() * 60)) * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
      `;
    
      
    filteredForecast.forEach((weather) => {
      container.innerHTML += `
        <section class="forecast">         
          <p>${(weather.main.temp).toFixed(0)}</p>
          <img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png">
          <p>${weather.weather[0].description}</p>
        </section>`;
    });
  });
