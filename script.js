const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=Kiruna,Sweden&units=metric&appid=3500e3bacf630605ddf92aeaab386a9e';
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const sun = document.getElementById('sun');
const container = document.getElementById('main');

console.log('API Fetch starting')
//fetch sends a request to our server
//our js is executing line 11 directly after the fetch
//when the response comes back after x seconds the .then function is executed
//When you got the information from the stream (from server) - only then try to get the json
fetch(WEATHER_URL)
  .then((response) => {
    console.log(`Response OK? ${response.ok}`);
    console.log(`Response Status: ${response.status}`);
    console.log('Response recieved');
    //Now - convert it to json:
    return response.json();
  })
  // the conversion is available to us here:
  .then((data) => {
    console.log(data);
    cityName.innerHTML = ` ${data.city.name} `;
    // I moved the filtere
    const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
    
    filteredForecast.forEach(() => {
        temperature.innerHTML = ` ${(filteredForecast[0].main.temp).toFixed(0)}`;
        //description.innerHTLM = ` ${filteredForecast.weather.description}`;
    });
    
    
    sun.innerHTML = `
          <p>Sunrise is: ${new Date((data.city.sunrise + data.city.timezone + (new Date().getTimezoneOffset() * 60)) * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
          <p>Sunset is: ${new Date((data.city.sunset + data.city.timezone + (new Date().getTimezoneOffset() * 60)) * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
      `;
     
    filteredForecast.forEach((weather) => {
      //const temp = weather.main.temp; 
      //const type = weather.weather.description;
      
      container.innerHTML += `
        <section class="forecast">         
          <p>${(weather.main.temp).toFixed(0)}</p>
          <p>${weather.weather[0].description}</p>
        </section>`;
    });
  });
