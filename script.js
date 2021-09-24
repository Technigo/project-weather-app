const API_URL ='https://api.openweathermap.org/data/2.5/weather?q=Gothenburg,Sweden&units=metric&APPID=affe19113e10ebc0685623d229879d1f';

const API_URL_5DAY =
  'https://api.openweathermap.org/data/2.5/forecast?q=Gothenburg,Sweden&units=metric&APPID=affe19113e10ebc0685623d229879d1f';

const body = document.getElementById("body");
const sunsetSunrise = document.getElementById('sunset-sunrise');
const weatherContainer = document.getElementById('weather-container');
const text = document.getElementById('text');
const forecastContainer = document.getElementById('forecast-container');

//Sunrise, sunset feature
fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    // This function adds a zero in case the time units consist of only one digit
    const addZero = (sec) => {
      if (sec < 10) {
        sec = '0' + sec;
      }
      return sec;
    };

    // Fetch data for sunrise and sunset times
    let sunriseTime = new Date (data.sys.sunrise * 1000)
    let sunsetTime = new Date(data.sys.sunset * 1000)
    // Convert sunrise and sunset times from milliseconds to hh:min:sec
    let formattedHourSunrise =
      addZero(sunriseTime.getHours()) +
      ':' +
      addZero(sunriseTime.getMinutes()) +
      ':' +
      addZero(sunriseTime.getSeconds());
    let formattedHourSunset =
      addZero(sunsetTime.getHours()) +
      ':' +
      addZero(sunsetTime.getMinutes()) +
      ':' +
      addZero(sunsetTime.getSeconds());

    // Display sunrise and sunset times on screen
    sunsetSunrise.innerHTML += `
    <h2>${data.weather[0].description} | ${data.main.temp.toFixed(1)} C°</h2>
    <h2>Sunrise: ${formattedHourSunrise} </h2>
    <h2>Sunset: ${formattedHourSunset}</h2>`;
    // Display basic location and weather info

    // If else statement with different weather icons and matching weather descriptions
    if (data.weather[0].main === 'Clear' && data.main.temp >= 20) {
      text.innerHTML += `<img src="./Designs/Design-2/icons/noun_Sunglasses_2055147.svg" alt="sunglasses icon">
      <h1>Get your sunnies on, it looks rather warm in ${data.name} today.</h1>`
      body.classList.add("sunny")
    } else if (data.weather[0].main === 'Rain') {
      text.innerHTML += `
      <img src="./Designs/Design-2/icons/noun_Umbrella_2030530.svg" alt="umbrella icon">
      <h1>Get your umbrella, it looks rather wet in ${data.name} today.</h1>`
      body.classList.add("rainy")
    } else if (data.weather[0].main === 'Clouds') {
      text.innerHTML += `<img src="./Designs/Design-2/icons/noun_Cloud_1188486.svg" alt="cloud icon">
      <h1>It looks rather cloudy in ${data.name} today.</h1>`
      body.classList.add("cloudy")
    } else {
      text.innerHTML += `<img src="./Designs/Design-2/icons/cloudy-cloud-svgrepo-com.svg" alt="cloudy cloud icon" width="20%">
      <h1>You can chillout, it is neutral weather in ${data.name} today.</h1>`
      body.classList.add("neutral")
    
    }
  })

  .catch((data) => text.innerHTML += `<h1>Sorry, API not working right now. Please wait a few minutes and try again!</h1>`);

//Function for turning a date to a string short weekday
const getWeekDay = (data) => {
  const dateDay = new Date(data * 1000); //Timestamp to milliseconds
  return dateDay.toLocaleDateString('en-GB', {
    //Setting how to show day
    weekday: 'short',
  });
};

//5 day forecast feature
fetch(API_URL_5DAY)
  .then((response) => response.json())
  .then((data) => {
    const filteredForecast = data.list.filter((item) =>
      item.dt_txt.includes('12:00')
    );
    forecastContainer.innerHTML += `
      <div class="days">${getWeekDay(filteredForecast[0].dt)}</div>
      <div class="temp">${filteredForecast[0].main.temp.toFixed(0)}°</div>
      <div class="dotted"></div>
      <div class="days">${getWeekDay(filteredForecast[1].dt)}</div>
      <div class="temp">${filteredForecast[1].main.temp.toFixed(0)}°</div> 
      <div class="dotted"></div>
      <div class="days">${getWeekDay(filteredForecast[2].dt)}</div>
      <div class="temp">${filteredForecast[2].main.temp.toFixed(0)}°</div>
      <div class="dotted"></div>
      <div class="days">${getWeekDay(filteredForecast[3].dt)}</div>
      <div class="temp">${filteredForecast[3].main.temp.toFixed(0)}°</div>
      <div class="dotted"></div>
      <div class="days">${getWeekDay(filteredForecast[4].dt)}</div>
      <div class="temp" >${filteredForecast[4].main.temp.toFixed(0)}°</div>
      <div class="dotted"></div>
      `;
  });
