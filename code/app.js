const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f463a96f9ee6b3233c3a141a391ac3cf"
const mainTemperature = document.getElementById('main-temperature');
const cityName = document.getElementById('city-name');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={f463a96f9ee6b3233c3a141a391ac3cf}const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f463a96f9ee6b3233c3a141a391ac3cf"

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={f463a96f9ee6b3233c3a141a391ac3cf}

//Main fetch for Stockoholm weather
fetch(weatherUrl)

  .then((response) => {
      return response.json();
  })
  .then((json) => {
    console.log(json);
    cityName.innerHTML =`${json.name}`;
    mainTemperature.innerHTML = `${json.main.temp} ºC`;
    sunrise.innerHTML = `Sunrise: ${json.sunrise}`;
    sunset.innerHTML = `Sunset: ${json.sunset}`;
    const sunriseValue = json.sys.sunrise; //Sunrise and Sunset times in UNIX
    const sunsetValue = json.sys.sunset;
    /* Multiply by 1000 because the data is given to us in UNIX which is in seconds, but Javascript uses milliseconds. */
    const sun = new Date(sunriseValue * 1000);
    const set = new Date(sunsetValue * 1000);
    const sunriseHour = sun.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: false,});
    const sunsetHour = set.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: false,});
    sunrise.innerHTML = `Sunrise: ${sunriseHour}`;
    sunset.innerHTML = `Sunset: ${sunsetHour}`;
  })