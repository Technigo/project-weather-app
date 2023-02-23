const API = "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=0885d110db76ae5dbaae0c2672772fdf"
const californiaAPI = "http://api.openweathermap.org/data/2.5/weather?q=Crestline,California,USA&units=metric&APPID=0885d110db76ae5dbaae0c2672772fdf"
const colomboAPI = "http://api.openweathermap.org/data/2.5/weather?q=Colombo,LK%20&units=metric&APPID=0885d110db76ae5dbaae0c2672772fdf"
const tokyoAPI = "http://api.openweathermap.org/data/2.5/weather?q=Tokyo,JP%20&units=metric&APPID=0885d110db76ae5dbaae0c2672772fdf"

//DOM Selectors
const temperature = document.getElementById("temperature")
const city = document.getElementById("city")
const weatherDescription = document.getElementById("weather-description")

const caTemperature = document.getElementById("ca-temperature")
const caCity = document.getElementById("ca-city")
const caWeatherDescription = document.getElementById("ca-weather-description")

const lkTemperature = document.getElementById("lk-temperature")
const lkCity = document.getElementById("lk-city")
const lkWeatherDescription = document.getElementById("lk-weather-description")

const jpTemperature = document.getElementById("jp-temperature")
const jpCity = document.getElementById("jp-city")
const jpWeatherDescription = document.getElementById("jp-weather-description")


fetch(API)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        //temperature
        let rawTemp = json.main.temp 
        let roundedTemp = rawTemp.toFixed(0)
        temperature.innerHTML = `<h1>${roundedTemp}&deg;C</h1>`
        //city
        let currentCity = json.name
        city.innerHTML = `<h2>${currentCity}</h2>`
        //weather description
        let weatherDes = json.weather.map((element) => (element.description))
        weatherDescription.innerHTML = `<h2>${weatherDes}</h2>`;


        // access the sunrise and sunset times directly from the API response
    const sunriseTimestamp = json.sys.sunrise;
    const sunsetTimestamp = json.sys.sunset;

    // create Date objects from the timestamps
    const sunriseDate = new Date(sunriseTimestamp * 1000);
    const sunsetDate = new Date(sunsetTimestamp * 1000);

    // format the sunrise and sunset times as strings with only hours and minutes
        const options = {hour: '2-digit', minute: '2-digit'};
        const sunriseTime = sunriseDate.toLocaleTimeString([], options);
        const sunsetTime = sunsetDate.toLocaleTimeString([], options);
  
    // display the sunrise and sunset times in the app
    const sunrise = document.getElementById("sunrise")
    sunrise.innerHTML = `Sunrise: ${sunriseDate.toLocaleTimeString([], options)}`;

    const sunset = document.getElementById("sunset")
    sunset.innerHTML = `Sunset: ${sunsetDate.toLocaleTimeString([], options)}`;
        console.log(sunsetDate)
        console.log(sunriseDate)
  });

  fetch(californiaAPI)
  .then((response) => {
      return response.json()
  })
  .then((json) => {
      //temperature
      let caRawTemp = json.main.temp 
      let caRoundedTemp = caRawTemp.toFixed(0)
      caTemperature.innerHTML = `<h1>${caRoundedTemp}&deg;C</h1>`
      //city
      let caCurrentCity = json.name
      caCity.innerHTML = `<h2>${caCurrentCity},California </h2>`
      //weather description
      let caWeatherDes = json.weather.map((element) => (element.description))
      weatherDescription.innerHTML = `<h2>${caWeatherDes}</h2>`;

    });
    fetch(colomboAPI)
  .then((response) => {
      return response.json()
  })
  .then((json) => {
      //temperature
      let lkRawTemp = json.main.temp 
      let lkRoundedTemp = lkRawTemp.toFixed(0)
      lkTemperature.innerHTML = `<h1>${lkRoundedTemp}&deg;C</h1>`
      //city
      let lkCurrentCity = json.name
      lkCity.innerHTML = `<h2>${lkCurrentCity},Sri Lanka </h2>`
      //weather description
      let lkWeatherDes = json.weather.map((element) => (element.description))
      weatherDescription.innerHTML = `<h2>${lkWeatherDes}</h2>`;

    });

    fetch(tokyoAPI)
  .then((response) => {
      return response.json()
  })
  .then((json) => {
      //temperature
      let jpRawTemp = json.main.temp 
      let jpRoundedTemp = jpRawTemp.toFixed(0)
      jpTemperature.innerHTML = `<h1>${jpRoundedTemp}&deg;C</h1>`
      //city
      let jpCurrentCity = json.name
      jpCity.innerHTML = `<h2>${jpCurrentCity},Japan </h2>`
      //weather description
      let jpWeatherDes = json.weather.map((element) => (element.description))
      weatherDescription.innerHTML = `<h2>${jpWeatherDes}</h2>`;

    });

   

   

    
    
    
    
    
    
    
    