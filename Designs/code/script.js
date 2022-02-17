// Decide on class and id names for elements
// DOM selectors

const currentWeather = document.getElementById('currentWeather')
//const upcomingWeather = document.getElementById('upcomingWeather')

const searchForm = document.getElementById("search-form")
const cityInput = document.getElementById("search-input")


//const APP_ID = '94506b4af0e0a236471b8ee0da3c2281'

//global variables
let today = new Date().toLocaleDateString('en', {weekday: 'short'})
//console.log('today',today) 
let city = 'Helsinki'

const fetchWeather = (city) =>{
let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=94506b4af0e0a236471b8ee0da3c2281`
let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=94506b4af0e0a236471b8ee0da3c2281`       


//Today's temperature, city, weather type, sunrise and sunset

    
    fetch(weatherURL)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        //if the user input city is not a real city, we will give an error message to try again
        if (json.message){
            currentWeather.innerHTML = ``
            upcomingWeather.innerHTML = 'Ups, no city with that name, try again!'
        }
        else{
        console.log(json)
        const roundedTemp = Math.round(json.main.temp * 10) / 10
        let sunriseTime = new Date(1644992567*1000)
        let sunriseHours = sunriseTime.getHours()
        let sunriseMinutes =  sunriseTime.getMinutes()
        let sunsetTime = new Date(1645022395*1000)
        let sunsetHours = sunsetTime.getHours()
        let sunsetMinutes =  sunsetTime.getMinutes()
    

        currentWeather.innerHTML += `
        <h1 class="main-temp">${roundedTemp} <span class="celsius">&#8451;</span></h1>
        <h2 class="city-name">${json.name}</h2>
        <p class="weather-type">${json.weather[0].main}</p>
        <div class="rise-set">Sunrise ${sunriseHours}:${sunriseMinutes} Sunset ${sunsetHours}:${sunsetMinutes}</div>
         `

        }
    })
//This is fetching the 5-day forecast
    fetch(forecastURL)   
    .then((response) => {
    return response.json()
 
    })
    .then((forecastdata) => {
    console.log(forecastdata)

   
    //Here we declare variables for min temp at midnight and max temp at noon:
    const filteredForecastNoon = forecastdata.list.filter(item => item.dt_txt.includes('12:00')) 
    const filteredForecastMidnight = forecastdata.list.filter(item => item.dt_txt.includes('00:00:00')) 
    
        

    //console.log to test
    console.log('noon', filteredForecastNoon)
    console.log('midnight', filteredForecastMidnight)

    for(let day =0; day < filteredForecastNoon.length; day++) {
        //getting the weekday of forecasted temperature
        let weekDay = filteredForecastNoon[day].dt_txt
        //printing the short versin of the weekday (e.g Mon,Tue,Wed,Thu,Fri,Sat,Sun)
        let shortWeekday = new Date(weekDay).toLocaleDateString('en', {weekday: 'short'})
        
        
        //here if statement if shortWeekDay does not equels to today, then executes following:
        if (shortWeekday !== today) {
        //weatherType storage the value of forecast days's weather type
        let weatherType = filteredForecastNoon[day].weather[0].main
        console.log(weatherType)
        //if statements what weather image we should use for forecasted days:
        //here comes if statement 
        
        if (weatherType === 'Snow'){
            typeImg = 'snow.png'
        }
        else if (weatherType === 'Clouds'){
            typeImg = 'cloudy.png'
        }
        else if (weatherType === 'Clear'){
            typeImg = 'sunny.png'
        }
        else if (weatherType === 'Rain'){
            typeImg = 'rain.png'
        }
        else {
            typeImg = 'partly.png'
        }
     

        //to make temperatures rounded to one decimal
        let roundedWeekMaxTemp = Math.round(filteredForecastNoon[day].main.temp_max)
        let roundedWeekMinTemp = Math.round(filteredForecastMidnight[day].main.temp_min)
        upcomingWeather.innerHTML += `<div class="each-day">
        <div class="each-weekday">${shortWeekday}</div>
        <div class="each-icon"><img class="small-weather-icons" src="./assets/${typeImg}"></div> 
        <div class="each-temps">${roundedWeekMaxTemp}<span class="celsius">°</span> / ${roundedWeekMinTemp} <span class="celsius">&#8451;</span></div>
        </div>`
        }    
    }

    })
}
//invokes the fetchWeather function when page loaded
fetchWeather(city)

//here are addEventListeners
/*when you search a city the evenlistener activates with submit and it will 
refresh upcomingWeather.innerHTML and currentWeather.innerHTML to empty first and then 
it takes the input value as a city argument to the fetchWeather function*/
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    upcomingWeather.innerHTML = ``
    currentWeather.innerHTML = ``
    city = cityInput.value;
    console.log('city:', city)
    fetchWeather(city)

    
  })
  
 

const currentWeather = document.getElementById("currentWeather");
const upcomingWeather = document.getElementById("upcomingWeather");
const currentWeatherWrapper = document.getElementById('current-weather-wrapper')

//const APP_ID = '94506b4af0e0a236471b8ee0da3c2281'

// Global variable
let mainIcon = "";

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Rovaniemi,Finland&units=metric&APPID=94506b4af0e0a236471b8ee0da3c2281"
)
  .then((response) => {
    return response.json();
  })

  .then((json) => {
    console.log(json);
    // This is showing the current temperature rounded to an integer.
    const roundedTemp = 10
    //Math.round(json.main.temp * 10) / 10;
    // This is showing local time for sunrise transformed into 2-digit form for hours and minutes.
    let sunriseTime = new Date(
      (json.sys.sunrise + json.timezone + new Date().getTimezoneOffset() * 60) *
        1000
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // This is showing local time for sunrise transformed into 2-digit form for hours and minutes.
    let sunsetTime = new Date(
      (json.sys.sunset + json.timezone + new Date().getTimezoneOffset() * 60) *
        1000
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // This is the weather condition icons that are showing depending on the weather
    const mainWeather = json.weather[0].main;

    const showMainWeatherIcon = () => {
      if (mainWeather === `Snow` ) {
        mainIcon = `<img src="./assets/snow.png"/>`
      } else if (mainWeather === `Rain` || mainWeather === `Drizzle`) {
        mainIcon = `<img src="./assets/rain.png" />`
      } else if (mainWeather === `Thunderstorm`) {
        mainIcon = `<img src="./assets/thunderstorm.png" />`
      } else if (mainWeather === `Clear`) {
        mainIcon = `<img src="./assets/clear.png" />`
      } else if (mainWeather === `Clouds`) {
        mainIcon = `<img src="./assets/cloudy.png" />`
      } else if (mainWeather === `Squall`) {
        mainIcon = `<img src="./assets/squall.png" />`
      } else if (mainWeather === `Tornado`) {
        mainIcon = `<img src="./assets/tornado.png" />`
      } else if (mainWeather === `Fog` || mainWeather === `Mist` || mainWeather === `Haze`) {
        mainIcon = `<img src="./assets/fog.png" />`
      } else if (mainWeather === `Dust` || mainWeather === `Sand` || mainWeather === `Smoke` || mainWeather === `Ash`) {
        mainIcon = `<img src="./assets/dust.png" />`
      }

    };
    showMainWeatherIcon();
    const changeTempBackground = () => {
        if (roundedTemp < 5) {
            currentWeatherWrapper.style.background =
            'linear-gradient(50deg, #663399 0%, #b9bfff 50%, #22277A 100%)'
        } else if (roundedTemp > 5 && roundedTemp < 19) {
            currentWeatherWrapper.style.background =
            'linear-gradient(50deg, #1c9bf6e8 0%, #d8d8d8 60%, #1c9cf6e8 100%)'
        } else {
            currentWeatherWrapper.style.background =
            'linear-gradient(50deg, #F6412D 0%, #FFF682 60%, #FF5607 100%)'
        } 
    }
    changeTempBackground()

    // This is showing the current weather for the location.
    currentWeather.innerHTML += `
        <div class="main-icon-container">
          <div class = "main-icon"> ${mainIcon}</div>
        </div>
        <h1 class="main-temp">${roundedTemp} <span class="celsius">&#8451;</span></h1>
        <h2 class="city-name">${json.name}</h2>
        <p class="weather-type">${mainWeather}</p>
        <div class="rise-set">
          <p class="sunrise">Sunrise ${sunriseTime}</p>
          <p class="sunset">Sunset ${sunsetTime}</p>
        </div>
         `;
  });
