const todaysWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f463a96f9ee6b3233c3a141a391ac3cf"
//const todaysWeatherUrlBA = "https://api.openweathermap.org/data/2.5/weather?q=BsAs,Argentina&units=metric&APPID=96757b909ab14fd81c8ce5bb9ee9ad53"
const fiveDayForecastStockholm = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&appid=f463a96f9ee6b3233c3a141a391ac3cf"
// const fiveDayForecastBarcelona = "https://api.openweathermap.org/data/2.5/forecast?q=Barcelona,Spain&units=metric&appid=f463a96f9ee6b3233c3a141a391ac3cf"
// const fiveDayForecastBuenosAires = "https://api.openweathermap.org/data/2.5/forecast?q=BsAs,Argentina&units=metric&APPID=96757b909ab14fd81c8ce5bb9ee9ad53"
const mainTemperature = document.getElementById('main-temperature');
const cityName = document.getElementById('city-name');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const fiveDayForecast = document.getElementById('five-day-forecast');
const weatherDescription = document.getElementById('weather-description');
const weatherIcon = document.getElementById('weather-icon');
const weatherFeelsLike = document.getElementById('weather-feels-like');

//Main fetch for Stockoholm weather
fetch(todaysWeatherUrl)
  .then((response) => {
      return response.json();
  })
  .then((json) => {
    console.log(json);
    cityName.innerHTML =`
      <h2>${json.name}</h2>
      `;
    mainTemperature.innerHTML = `
      <h3>${json.main.temp.toFixed(1)} ºC</h3>
      `;
    weatherIcon.innerHTML += `
      <img src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png" height="150px" alt="${json.weather[0].description} icon" />
      `;
    weatherDescription.innerHTML += `
      ${json.weather[0].description}
      `;
    weatherFeelsLike.innerHTML += `
      <h4> - Feels like: ${json.main.feels_like.toFixed(1)}ºC</h4>
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
      if (weatherId <= 232){ //thunderstorm
       document.getElementById('container').style.background = 'linear-gradient(315deg, #0cbaba 0%, #380036 74%)'; 
      } else if (weatherId <= 321) { //drizzle
          document.getElementById('container').style.background = 'linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)'; 
      } else if (weatherId <= 531) { //rain
          document.getElementById('container').style.background = 'linear-gradient(315deg, #f8ceec 0%, #a88beb 74%)'; 
      } else if (weatherId <= 622) { //snow
          document.getElementById('container').style.background = 'linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)'; 
      } else if (weatherId <=781 ) { //atmosphere
          document.getElementById('five-day-forecast').style.background = 'linear-gradient(-45deg, #a7db9c, #d3aaba, #81c6df, #a5e5d6)'; 
      } else if (weatherId === 800) { //clear
          document.getElementById('container').style.background = 'linear-gradient(-45deg, #a7db9c, #d3aaba, #81c6df, #a5e5d6)'; 
      } else  { //clouds
          document.getElementById('container').style.background = 'linear-gradient(-45deg, #28b10d, #e73c7e, #23a6d5, #23d5ab)'
      }
  })
  .catch(error => {
    container.innerHTML = error;
  })
  .finally(() => console.log('Finished!'));

//Five day forecast
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
        (new Date(item.dt * 1000)).toLocaleDateString("en-US", { weekday: "long" })
      let icon = `
        <img src=https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png></img>
        `;
    fiveDayForecast.innerHTML += `
      <span> ${weekday} ${temperature}ºC ${icon}</span>
      `; 
    });
  });

  



     
