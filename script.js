const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=Kiruna,Sweden&units=metric&appid=3500e3bacf630605ddf92aeaab386a9e';
const WEATHERFORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=Kiruna,Sweden&units=metric&appid=3500e3bacf630605ddf92aeaab386a9e';
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const container = document.getElementById('forecast-section');
const todaysImg = document.getElementById('todays-img');
const temperatureToday = document.getElementById('temperature');
const weekday = document.getElementById('forecast-day');
const header = document.getElementById('main-header');

fetch(WEATHER_URL)
  .then((response) => {
    return response.json();
  })

  .then((data) => {
  // todays weather:
    const city = data.city.name;
    //const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'));
    const sunriseTime = document.getElementById('sunrise');
    const sunsetTime = document.getElementById('sunset');
    const sunrise = new Date((data.city.sunrise + data.city.timezone + (new Date().getTimezoneOffset() * 60)) * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const sunset = new Date((data.city.sunset + data.city.timezone + (new Date().getTimezoneOffset() * 60)) * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const temp = (filteredForecast[0].main.temp).toFixed(0);
    const imgID = data.weather[0].icon;
  
    todaysImg.innerHTML = `<img src="http://openweathermap.org/img/wn/${imgID}@2x.png" class="today-img">`;
    description.innerHTML = `${data.weather[0].description}`;
    cityName.innerHTML = `${city}`;
    temperature.innerHTML = `${temp}°`;
    sunriseTime.innerHTML = `sunrise ${sunrise}`;
    sunsetTime.innerHTML = `sunset ${sunset}`;
    
  //changing background color depending on temperature
    const checkTemperature = () => {
      if (filteredForecast[0].main.temp < 0) {
        temperatureToday.style.color = 'cold';
      }
      else if (filteredForecast[0].main.temp < 5 && filteredForecast[0].main.temp > 0){
        temperatureToday.style.color = 'slightly-cold';
      }
      else if (filteredForecast[0].main.temp < 15 && filteredForecast[0].main.temp > 5.01){
        temperatureToday.style.color = 'lightly-warm';
      }
      else if (filteredForecast[0].main.temp < 25 && filteredForecast[0].main.temp > 15.01){
        temperatureToday.style.color = 'warm';
      }
      else{
        temperatureToday.style.color = 'hot';
      }
    };
    checkTemperature ();
  })

  // 5 day-forecast:
  etch(WEATHERFORECAST_URL)
  .then((response) => {
    return response.json();
  })

  .then((dataForecast) => {
    const filteredForecast = dataForecast.list.filter(item => item.dt_txt.includes('12:00'));

    
    filteredForecast.forEach((dataForecast => {
      const temp = (dataForecast.main.temp).toFixed(0);
      const imgID = dataForecast.weather[0].icon;
      const weatherDescription = dataForecast.weather[0].description;
      const forecastDay = (new Date(dataForecast.dt * 1000)).toLocaleDateString("en-US", {weekday: "short"});
      console.log(dataForecast)
        
        container.innerHTML += `
          <section class="forecast"> 
            <p class="forecast-day">${forecastDay}</p>
            <p class="temperature">${temp}</p>
            <img src='http://openweathermap.org/img/wn/${imgID}@2x.png' class='weather-img'>
            <p class="weather-type">${weatherDescription}</p>
          </section>`;
    }))
  })
