const myAPIKey = `0885d110db76ae5dbaae0c2672772fdf`
const API_today = `http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${myAPIKey}`
const californiaAPI = "http://api.openweathermap.org/data/2.5/weather?q=Crestline,California,USA&units=metric&APPID=0885d110db76ae5dbaae0c2672772fdf"
const colomboAPI = "http://api.openweathermap.org/data/2.5/weather?q=Colombo,LK%20&units=metric&APPID=0885d110db76ae5dbaae0c2672772fdf"
const tokyoAPI = "http://api.openweathermap.org/data/2.5/weather?q=Tokyo,JP%20&units=metric&APPID=0885d110db76ae5dbaae0c2672772fdf"
const API_forecast = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${myAPIKey}`
//DOM Selectors
const temperature = document.getElementById("temperature")
const feelsLike = document.getElementById("feels-like")
const city = document.getElementById("city")
const weatherDescription = document.getElementById("weather-description")

const caTemperature = document.getElementById("jp-temperature")
const caCity = document.getElementById("jp-city")
const caWeatherDescription = document.getElementById("jp-weather-description")

const lkTemperature = document.getElementById("jp-temperature")
const lkCity = document.getElementById("jp-city")
const lkWeatherDescription = document.getElementById("jp-weather-description")
const weatherTodayWrapper = document.getElementById("weather-today-wrapper")


const jpTemperature = document.getElementById("jp-temperature")
const jpCity = document.getElementById("jp-city")
const jpWeatherDescription = document.getElementById("jp-weather-description")

//Weather for today
fetch(API_today)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        //temperature
        let rawTemp = json.main.temp 
        let roundedTemp = rawTemp.toFixed(0)
        temperature.innerHTML = `<h1>${roundedTemp}&deg;C</h1>`
        //feels like
        feelsLike.innerHTML += `<span>${json.main.feels_like.toFixed(0)}&deg;C</span>`
        //city
        let currentCity = json.name
        city.innerHTML = `<h2>${currentCity}</h2>`
        //weather description
        let weatherDes = json.weather.map((element) => (element.description))
        weatherDescription.innerHTML = `<h2>${weatherDes}</h2>`

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
       sunset.innerHTML = `Sunset: ${sunsetDate.toLocaleTimeString([], options)}`; })
   
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
         caCity.innerHTML = `<h2>${caCurrentCity}, California </h2>`
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
         lkCity.innerHTML = `<h2>${lkCurrentCity}, Sri Lanka </h2>`
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
         jpCity.innerHTML = `<h2>${jpCurrentCity}, Japan </h2>`
         //weather description
         let jpWeatherDes = json.weather.map((element) => (element.description))
         weatherDescription.innerHTML = `<h2>${jpWeatherDes}</h2>`;
   
       });
   
       fetch(API_forecast)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00')) //filters out only the forecast at 12.00 each day
        console.log(filteredForecast)
        
        filteredForecast.map((day) => {
            const date = new Date(day.dt * 1000) //Convert Unix timestamp to time in JavaScript
            const forecastDate = date.toLocaleDateString("en-GB", {
                    day: "numeric"
           })
            const dayName = date.toLocaleDateString("en-GB", {
                 weekday: "short"
            })
            const weatherIconCode = `${day.weather[0].icon}`
            const temp = `${day.main.temp.toFixed(0)}`
            
            console.log(date, dayName, weatherIconCode, temp)    

            forecastWrapper.innerHTML += `
            <div class ="forecast-row">
                <span class = "day">${forecastDate} ${dayName}</span>
                <img class = "forecast-icon" src="https://openweathermap.org/img/wn/${weatherIconCode}@2x.png"/> 
                <span class = "temperature"> ${temp}</span>
            </div>
            `

            //Change style based on weather conditions
            const weatherCondition = json.list[0].weather[0].main
           
            console.log(weatherCondition)
            if (weatherCondition.includes("Clouds")) {
                const cloudsLink = ``
                weatherTodayWrapper.style.background ='url('+cloudsLink+') center left  / cover no-repeat, no-repeat';

            } else if (weatherCondition.includes("Rain" || "Drizzle")) {
                const rainLink = ``
                weatherTodayWrapper.style.background ='url('+rainLink+') center left  / cover no-repeat, no-repeat';

            } else if (weatherCondition.includes("Thunderstorm")) {  
                const thunderStormLink = ``
                weatherTodayWrapper.style.background ='url('+thunderStormLink+') center left  / cover no-repeat, no-repeat';

            } else if (weatherCondition.includes("Snow")) {
                const snowLink = ""
                weatherTodayWrapper.style.background ='url('+snowLink+') center left  / cover no-repeat, no-repeat';
            } else if (weatherCondition.includes("Clear")) {

            } else {
                //something neutral
            }
           
        })
    });
      
   