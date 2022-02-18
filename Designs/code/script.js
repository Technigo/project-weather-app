// Decide on class and id names for elements
// DOM selectors

const currentWeather = document.getElementById('currentWeather')
const currentWeatherWrapper = document.getElementById('current-weather-wrapper')
const upcomingWeather = document.getElementById('upcomingWeather')
const searchForm = document.getElementById("search-form")
const cityInput = document.getElementById("search-input")



//const APP_ID = '94506b4af0e0a236471b8ee0da3c2281'



//global variables
let today = new Date().toLocaleDateString('en', {weekday: 'short'})
let city = 'Helsinki' //default value for city, when page loaded
let mainIcon = ""
let inputPlaceholder = cityInput.placeholder


const fetchWeather = (city) =>{
  
  //URL variables, the city is based on the input of the user
  let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=94506b4af0e0a236471b8ee0da3c2281`
  let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=94506b4af0e0a236471b8ee0da3c2281`       

    
  fetch(weatherURL)
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    //if the user input city is not a real city, we will give an error message to try again
    if (json.message){
      currentWeather.innerHTML = `<div class="errormsg">Ups, no city with that name, try again!</div>`
      upcomingWeather.innerHTML = ''
    }
    else {
      
      const roundedTemp = Math.round(json.main.temp * 10) / 10
      // This is showing the local time for sunrise transformed into a 2-digit form for hours and minutes.
      let sunriseTime = new Date((json.sys.sunrise + json.timezone + new Date().getTimezoneOffset() * 60) * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    
      // This is showing the local time for sunsetTime transformed into a 2-digit form for hours and minutes.
      let sunsetTime = new Date((json.sys.sunset + json.timezone + new Date().getTimezoneOffset() * 60) * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      // This variable stores the current weather
      const mainWeather = json.weather[0].main;
      let weatherDescription = json.weather[0].description
      

      // This function shows the weather icons that are changing according to the current weather
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

      //invoking the showMainWeatherIcon function
      showMainWeatherIcon();

      //This function changes the background color based on the temperature of today (in displayed city)
      const changeTempBackground = () => {
        if (roundedTemp < 5) {
          currentWeatherWrapper.style.background =
          'linear-gradient(50deg, #663399 0%, #b9bfff 50%, #22277A 100%)'
          } 
        else if (roundedTemp > 5 && roundedTemp < 19) {
          currentWeatherWrapper.style.background =
          'linear-gradient(50deg, #1c9bf6e8 0%, #d8d8d8 60%, #1c9cf6e8 100%)'
          } 
        else {
          currentWeatherWrapper.style.background =
          'linear-gradient(50deg, #F6412D 0%, #FFF682 60%, #FF5607 100%)'
          } 
        }

        //invoking the schangeTempBackground function
        changeTempBackground()

        // This is showing the current weather for the city location.
        currentWeather.innerHTML += `
            <div class="main-icon-main-temp-container">
            <h1 class="main-temp">${roundedTemp} <span class="celsius">&#8451;</span></h1>
              <div class="main-icon"> ${mainIcon}</div>
            </div>
            <h2 class="city-name">${json.name}</h2>
            <p class="weather-type">${weatherDescription}</p>
            <div class="rise-set">
              <p class="sunrise">Sunrise ${sunriseTime} <img src="./assets/sunrise.png"></p>
              <p class="sunset">Sunset ${sunsetTime} <img src="./assets/sunset.png"></p>
            </div>
            `;
            
    //This is fetching the 5-day forecast
    fetch(forecastURL)   
    .then((response) => {
    return response.json()
 
    })
    .then((forecastdata) => {
   
      /*Here we declare variables for min and max temperatures, because the data was given
      every third hours, we decided to use for the min temperature the lowest temperature at 
      midnight and for the max temperature the highest temperature at noon*/

      //here we define arrays to filter data of next days at noon and midnight
      const filteredForecastNoon = forecastdata.list.filter(item => item.dt_txt.includes('12:00')) 
      const filteredForecastMidnight = forecastdata.list.filter(item => item.dt_txt.includes('00:00:00'))

      /*This is for loop to go through the filteredForecastNoon and filteredForecastMidnight arrays 
      and print our the info we need for the 5 day forecast*/
      for(let day =0; day < filteredForecastNoon.length; day++) {

        //getting the weekday of forecasted days
        let weekDay = filteredForecastNoon[day].dt_txt
      

        //printing the short versin of the weekday (e.g Mon,Tue,Wed,Thu,Fri,Sat,Sun)
        let shortWeekday = new Date(weekDay).toLocaleDateString('en', {weekday: 'short'})
        
        /*this if statement makes sure that we only print out the weekdays that do not equal to today 
        (this happens if the time is between 00-12, then it will forecast the same day, so with this if statement 
        we avoid that happening*/
        if (shortWeekday !== today) {
          //weatherType storage the value of forecast days's weather type
          let weatherType = filteredForecastNoon[day].weather[0].main
      
          // if and if else statements what weather icon we should use for forecasted days:
          
          if (weatherType === 'Snow'){
              typeImg = 'snow2.png'
          }
          else if (weatherType === 'Rain'){
              typeImg = 'rain2.png'
          }
          else if (weatherType === 'Thunderstorm'){
              typeImg = 'thunderstorm2.png'
          }
          else if (weatherType === 'Clear'){
            typeImg = 'clear2.png'
          }
          else if (weatherType === 'Clouds'){
            typeImg = 'cloudy2.png'
          }
          else if (weatherType === 'Squall'){
            typeImg = 'squall2.png'
          }
          else if (weatherType === 'Tornado'){
            typeImg = 'tornado2.png'
          }
          else if (weatherType === `Fog` || weatherType === `Mist` || weatherType === `Haze`){
            typeImg = 'fog2.png'
          }
          else if (mainWeather === `Dust` || mainWeather === `Sand` || mainWeather === `Smoke` || mainWeather === `Ash`){
            typeImg = 'dust2.png'
          }

          //to make temperatures rounded without decimals
          let roundedWeekMaxTemp = Math.round(filteredForecastNoon[day].main.temp_max)
          let roundedWeekMinTemp = Math.round(filteredForecastMidnight[day].main.temp_min)
          //to diplay weekday, weather icon and min/max temperature in the upcominWeather section
          upcomingWeather.innerHTML += `<div class="each-day">
          <div class="each-weekday">${shortWeekday}</div>
          <div class="each-icon"><img class="small-weather-icons" src="./assets/${typeImg}"></div> 
          <div class="each-temps">${roundedWeekMaxTemp}<span class="celsius">°</span> / ${roundedWeekMinTemp}<span class="celsius">&#8451;</span></div>
          </div>`

        }  
      }
    })        
  }
})
/*Here we set the input field valu to empty string again
(this makes that after the search the search input placeholder shows the text:
'Type city here' instead of searches city name)*/
cityInput.value = '' 

} //ending curly brackets checked



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
    fetchWeather(city)
  })
  

 


