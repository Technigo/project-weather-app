const TODAYS_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Kiruna,Sweden&units=metric&appid=3500e3bacf630605ddf92aeaab386a9e'
const WEATHERFORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=Kiruna,Sweden&units=metric&appid=3500e3bacf630605ddf92aeaab386a9e';
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const container = document.getElementById('forecast-section');
const todaysImg = document.getElementById('todays-img');
const temperatureToday = document.getElementById('temperature');
const weekday = document.getElementById('forecast-day');
const header = document.getElementById('main-header');

fetch(TODAYS_WEATHER_URL)
  .then((response) => {
    return response.json();
  })

  .then((data) => {
  // todays weather
    const city = data.name;
    const sunriseTime = document.getElementById('sunrise');
    const sunsetTime = document.getElementById('sunset');
    const sunrise = new Date((data.sys.sunrise + data.timezone + (new Date().getTimezoneOffset() * 60)) * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const sunset = new Date((data.sys.sunset + data.timezone + (new Date().getTimezoneOffset() * 60)) * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const temp = data.main.temp.toFixed(1);
    const imgID = data.weather[0].icon;


    todaysImg.innerHTML = `<img src="http://openweathermap.org/img/wn/${imgID}@2x.png" class="today-img">`;
    description.innerHTML = `${data.weather[0].description}`; 
    cityName.innerHTML = `${city}`;
    temperature.innerHTML = `${temp}°`;
    sunriseTime.innerHTML = `sunrise ${sunrise}`;
    sunsetTime.innerHTML = `sunset ${sunset}`;
    
  //changing background color depending on temperature
    const checkTemperature = () => {
      if (data.main.temp < 0) {
        header.classList.add('cold');
      }
      else if (data.main.temp < 5){
        header.classList.add('slightly-cold');
      }
      else if (data.main.temp < 15){
        header.classList.add('slightly-warm');
      }
      else if (data.main.temp < 25){
        header.classList.add('warm');
      }
      else{
        header.classList.add('hot');
      }
    };
    checkTemperature ();
  })

  // 5 day-forecast:
fetch(WEATHERFORECAST_URL)
  .then((response) => {
    return response.json();
  })

  .then((dataForecast) => {
    const filteredForecast = dataForecast.list.filter(item => item.dt_txt.includes('12:00'));
 
    filteredForecast.forEach((dataForecast => {
      const temp = (dataForecast.main.temp).toFixed(1);
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
