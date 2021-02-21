const todaysWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f463a96f9ee6b3233c3a141a391ac3cf"
const todaysWeatherBar = "https://api.openweathermap.org/data/2.5/weather?q=Barcelona,Spain&units=metric&appid=96757b909ab14fd81c8ce5bb9ee9ad53"
const todaysWeatherUrlBA = "http://api.openweathermap.org/data/2.5/weather?q=Buenos%20Aires,Argentina&units=metric&appid=96757b909ab14fd81c8ce5bb9ee9ad53"
const fiveDayForecastStockholm = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&appid=f463a96f9ee6b3233c3a141a391ac3cf"
const mainTemperature = document.getElementById('main-temperature');
const cityName = document.getElementById('city-name');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const fiveDayForecast = document.getElementById('five-day-forecast');
const weatherDescription = document.getElementById('weather-description');
const weatherIcon = document.getElementById('weather-icon');
const weatherFeelsLike = document.getElementById('weather-feels-like');


//Stockoholm current weather 
fetch(todaysWeatherUrl)
  .then((response) => {
      return response.json();
  })
  .then((json) => {
    cityName.innerHTML =`
      <h2>${json.name}</h2>
      `;
    mainTemperature.innerHTML = `
      <h3>${json.main.temp.toFixed(1)} ºC</h3>
      `;
    weatherIcon.innerHTML += `
      <img class="main-icon" src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png" height="150px" alt="${json.weather[0].description} icon" />
      `;
    weatherDescription.innerHTML += `
      ${json.weather[0].description}
      `;
    weatherFeelsLike.innerHTML += `
      <h4> Feels like ${json.main.feels_like.toFixed(1)}ºC</h4>
      `; 
    const sunriseValue = json.sys.sunrise; //times in UNIX
      sunrise.innerHTML = `Sunrise: ${json.sunrise}`;
      const sun = new Date(sunriseValue * 1000);/* Multiply by 1000 because the data is in UNIX (seconds), and Javascript uses milliseconds. */
      const sunriseHour = 
        sun.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: false,});
        sunrise.innerHTML = `
        <h3> Sunrise: ${sunriseHour}</h3>
        `; 
    const sunsetValue = json.sys.sunset;
      sunset.innerHTML = `Sunset: ${json.sunset}`;
      const set = new Date(sunsetValue * 1000);
      const sunsetHour = 
        set.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: false,});
        sunset.innerHTML = `
        <h3>Sunset: ${sunsetHour}</h3>
        `; 
    const weatherId = json.weather[0].id;
      console.log(weatherId)
      if (weatherId <= 232){ 
       document.getElementById('container').style.background = 'linear-gradient(-45deg, #c2b6b6 0%, #576574 74%)';
      } else if (weatherId <= 531) { 
          document.getElementById('container').style.background = 'linear-gradient(-45deg, #f5f7fa, #c3cfe2)';    
      } else if (weatherId <= 622) { 
          document.getElementById('container').style.background = 'linear-gradient(-45deg, #b8c6db 0%, #f5f7fa 74%)'; 
      } else if (weatherId <=781 ) { 
          document.getElementById('container').style.background = 'linear-gradient(-45deg,#a7db9c, #d3aaba, #81c6df, #a5e5d6)'; 
      } else if (weatherId === 800) { 
          document.getElementById('container').style.background = 'linear-gradient(-45deg, #a3bded, #6991c7)'; 
      } else  { 
          document.getElementById('container').style.background = 'linear-gradient(-45deg, #a1c4fd, #c2e9fb)';
      }   
  })
  .catch(error => {
    container.innerHTML = error;
  })
  .finally(() => console.log('Finished!'));

//Five day Stockholm forecast
fetch(fiveDayForecastStockholm)
  .then((response) => {
    return response.json();
  })
  .then((forecast) => {
    const filteredForecast = 
      forecast.list.filter(item => item.dt_txt.includes('12:00'))
    filteredForecast.forEach(item => {
      let temperature = 
        (item.main.temp).toFixed(1);
      let weekday = 
        (new Date(item.dt * 1000)).toLocaleDateString("en-US", { weekday: "short" })
      let icon = `
        <img class="forecast-icon" src=https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png></img>
        `;
      fiveDayForecast.innerHTML += `
        <p class="forecast">
          <span>${weekday}</span> 
          <span>${icon}</span>
          <span>${temperature}ºC</span>
        </p>
        `; 
    }); 
  });

 
  //Barcelona current weather
  fetch(todaysWeatherBar)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);
    barcelonaName.innerHTML =`
      <h2>${json.name}</h2>
      `;
      barcelonaTemperature.innerHTML = `
      <h3>${json.main.temp.toFixed(1)} ºC</h3>
      `;
      barcelonaIcon.innerHTML += `
      <img class="main-icon" src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png" alt="${json.weather[0].description} icon" />
      `;
  })
  .catch(error => {
    barcelona.innerHTML = error;
  })
  .finally(() => console.log('Finished!'));

  //Buenos Aires current weather
  fetch(todaysWeatherUrlBA)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    bsAsName.innerHTML =`
      <h2>${json.name}</h2>
      `;
    bsAsTemperature.innerHTML = `
      <h3>${json.main.temp.toFixed(1)} ºC</h3>
      `;
    bsAsIcon.innerHTML += `
      <img class="main-icon" src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png" alt="${json.weather[0].description} icon" />
      `;
  })
  .catch(error => {
    bsAs.innerHTML= error;
  })
  .finally(() => console.log('Finished!'));



     
