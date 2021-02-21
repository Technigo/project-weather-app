const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=Kiruna,Sweden&units=metric&appid=3500e3bacf630605ddf92aeaab386a9e';
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const container = document.getElementById('forecast-section');
const todaysImg = document.getElementById('todays-img');
const headerBackground = document.getElementById('main-header');

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
    description.innerHTML = `${data.weather[0].description}`  
    }); 

  
    cityName.innerHTML = `${city}`;
    temperature.innerHTML = `${temp}°`;
    sunriseTime.innerHTML = `sunrise ${sunrise}`;
    sunsetTime.innerHTML = `sunset ${sunset}`;
    
  //changing background color depending on temperature
    const checkTemperature = () => {
      if (filteredForecast[0].main.temp < 0) {
        alert(`jacket and scarf might be an idea today`)
      }
      else if (filteredForecast[0].main.temp < 5){
        alert(`it's about to get chilly - put on those warm socks`)
      }
      else if (filteredForecast[0].main.temp < 15 && filteredForecast[0].main.temp > 5.01){
        alert(`it's that kind of day, where you might need a jacket or you don't`)
      }
      else if (filteredForecast[0].main.temp < 25 && filteredForecast[0].main.temp > 15.01){
        alert(`this temperature screams for a nice run!`)
      }
      else{
        alert(`today is a day for icream, shadow, water, suncream`)
      }
    }
    checkTemperature ();
    console.log(checkTemperature);


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
