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
const weatherTodayWrapper = document.getElementById("weather-today-wrapper")
const forecastWrapper = document.getElementById("forecast-wrapper")
const weatherTodayBg = document.getElementById("weather-today-background")
const weatherTodayImage = document.getElementById("weather-today-image")

const caTemperature = document.getElementById("jp-temperature")
const caCity = document.getElementById("jp-city")
const caWeatherDescription = document.getElementById("jp-weather-description")

const lkTemperature = document.getElementById("jp-temperature")
const lkCity = document.getElementById("jp-city")
const lkWeatherDescription = document.getElementById("jp-weather-description")



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
        // let rawTemp = json.main.temp 
        // let roundedTemp = rawTemp.toFixed(0)
        // temperature.innerHTML = `<p>${roundedTemp}&deg;C</p>`

        temperature.innerHTML = `<p>${(json.main.temp).toFixed(0)}&deg;C</p>`

    
        //feels like
        feelsLike.innerHTML += `<span>${json.main.feels_like.toFixed(0)}&deg;C</span>`
        //city
        let currentCity = json.name
        city.innerHTML = `<p>${currentCity}</p>`
        //weather description
        let weatherDes = json.weather.map((element) => (element.description))
        weatherDescription.innerHTML = `<p>${weatherDes}</p>`

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
       sunrise.innerHTML = `sunrise: ${sunriseDate.toLocaleTimeString([], options)}`;
   
       const sunset = document.getElementById("sunset")
       sunset.innerHTML = `sunset:  ${sunsetDate.toLocaleTimeString([], options)}`; 



       //Change style based on weather conditions
       let weatherCondition = json.weather.map((element) => (element.main))
       console.log(weatherCondition)
       let todayImageSrc = "";
       let todayWrapperBg = "";

       if (weatherCondition.includes("Clouds")) {
            todayImageSrc = "assets/clouds.png"  
            todayWrapperBg = "weather-today-wrapper weather-today-wrapper-clouds"        

       } else if (weatherCondition.includes("Rain" || "Drizzle")) {
            todayImageSrc = "assets/rain.png"  
            todayWrapperBg = "weather-today-wrapper weather-today-wrapper-rain"        

       } else if (weatherCondition.includes("Thunderstorm")) {  
            todayImageSrc = "assets/thunderstorm.png"  
            todayWrapperBg = "weather-today-wrapper weather-today-wrapper-thunderstorm" 


       } else if (weatherCondition.includes("Snow")) {
            todayImageSrc = "assets/snow.png"  
            todayWrapperBg = "weather-today-wrapper weather-today-wrapper-snow" 

           
       } else if (weatherCondition.includes("Clear")) {
            todayImageSrc = "assets/clear.png"  
            todayWrapperBg = "weather-today-wrapper weather-today-wrapper-clear" 


       } else {
            todayImageSrc = ""  
            todayWrapperBg = "weather-today-wrapper weather-today-wrapper-neutral"

       }

       weatherTodayWrapper.setAttribute("class", todayWrapperBg);
       weatherTodayImage.setAttribute("src", todayImageSrc)
    })
   
    fetch(californiaAPI)
     .then((response) => {
         return response.json()
     })
     .then((json) => {
         //temperature
         const ca =document.getElementById("ca")
         ca.innerHTML += `<p>${(json.main.temp).toFixed(0)}&deg;C</p>`
         //city
         let caCurrentCity = json.name
         ca.innerHTML += `<p>${caCurrentCity}, California </p>`
         //weather description
         let caWeatherDes = json.weather.map((element) => (element.description))
         ca.innerHTML += `<p>${caWeatherDes}</p>`;
   
       });

   
    fetch(colomboAPI)
     .then((response) => {
         return response.json()
     })
     .then((json) => {

        const lk =document.getElementById("lk")
         //temperature
         lk.innerHTML += `<p>${(json.main.temp).toFixed(0)}&deg;C</p>`
         //city
         let lkCurrentCity = json.name
         lk.innerHTML += `<p>${lkCurrentCity},  </br> Sri Lanka </p>`
         //weather description
         let lkWeatherDes = json.weather.map((element) => (element.description))
         lk.innerHTML += `<p>${lkWeatherDes}</p>`;
   
       });
   
    fetch(tokyoAPI)
     .then((response) => {
         return response.json()
     })
     .then((json) => {
        const jp =document.getElementById("jp")
         //temperature
         jp.innerHTML += `<p>${(json.main.temp).toFixed(0)}&deg;C</p>`
         //city
         let jpCurrentCity = json.name
         jp.innerHTML += `<p>${jpCurrentCity}, Japan </p>`
         //weather description
         let jpWeatherDes = json.weather.map((element) => (element.description))
         jp.innerHTML += `<p>${jpWeatherDes}</p>`;
   
       });

//Weather forecast Stockholm 5 days
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
                <span class = "forecast-day">${forecastDate} ${dayName}</span>
                <img class = "forecast-icon" src="https://openweathermap.org/img/wn/${weatherIconCode}@2x.png"/> 
                <span class = "forecast-temperature"> ${temp}</span>
            </div>
            `
            
            
           
        })
    });

    //const snowLink = "https://media3.giphy.com/media/ciYfVwZxBD0wPrO6nb/giphy.gif?cid=ecf05e47bdmeq3f5w8oxm7pz21kbeanhc2eos4qyx91tcg9v&rid=giphy.gif&ct=s%27"

            // rain const snowLink = "https://media.giphy.com/media/d2jjHeKDynBohPtm/giphy.gif"

            // const snowLink = "https://media.giphy.com/media/l0IsHVDSeZkk2WOZy/giphy.gif"
            //     const linearStyle = 'linear-gradient(#e66465, #9198e5)';
            //     weatherTodayWrapper.style.background = 'url('+snowLink+') center right  / contain no-repeat, '+linearStyle+' no-repeat';
      
   