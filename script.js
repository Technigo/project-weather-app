const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=Kiruna,Sweden&units=metric&appid=3500e3bacf630605ddf92aeaab386a9e';
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const container = document.getElementById('forecast-section');
const todaysImg = document.getElementById('todays-img')

fetch(WEATHER_URL)
  .then((response) => {
    return response.json();
  })

  .then((data) => {
  // todays weather:
    const city = data.city.name;
    const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'));
    const sunriseTime = document.getElementById('sunrise');
    const sunsetTime = document.getElementById('sunset');
    const sunrise = new Date((data.city.sunrise + data.city.timezone + (new Date().getTimezoneOffset() * 60)) * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const sunset = new Date((data.city.sunset + data.city.timezone + (new Date().getTimezoneOffset() * 60)) * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const temp = (filteredForecast[0].main.temp).toFixed(0);


    filteredForecast.forEach((data) => {
      const imgID = data.weather[0].icon;
      todaysImg.innerHTML = `<img src="http://openweathermap.org/img/wn/${imgID}@2x.png" class="today-img">`;
    }); 
    
    
    cityName.innerHTML = `${city}`;
    temperature.innerHTML = `${temp}°`;
    sunriseTime.innerHTML = `sunrise ${sunrise}`;
    sunsetTime.innerHTML = `sunset ${sunset}`;
    
    filteredForecast.forEach((data) => {
      description.innerHTML = `${data.weather[0].description}`;
    }); 

  // 5 day-forecast:
    filteredForecast.forEach((data) => {
    const temp = (data.main.temp).toFixed(0);
    const imgID = data.weather[0].icon;
    const weatherDescription = data.weather[0].description;
      
      container.innerHTML += `
        <section class="forecast">         
          <p class="temperature">${temp}</p>
          <img src="http://openweathermap.org/img/wn/${imgID}@2x.png" class="weather-img">
          <p class="weathertype">${weatherDescription}</p>
        </section>`;
    });
  });
