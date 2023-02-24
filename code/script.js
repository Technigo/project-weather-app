//Elements
const navigation = document.getElementById("navigation");
const currentCity = document.getElementById("current-city");
const currentTemp = document.getElementById("current-temp");
const currentWeather = document.getElementById("current-weather");
const cityOne = document.getElementById("city-one");
const cityTwo = document.getElementById("city-two");
const sunUpTime = document.getElementById("sun-up-time");
const sunDownTime = document.getElementById("sun-down-time");
const arrowButton = document.getElementById("arrow-button");
const weekList = document.getElementById("week-list");
const topRightIcon = document.getElementById("weather-icon-container")
const bodyContainer = document.querySelector(".body-container")


//Global variables
let apiResponse;
let nightTemp;

let date = new Date();

const stylingTimer = () => {
  if (date.getHours() >= 7 && date.getHours() <= 18) {
    bodyContainer.classList.add("day");
  } else {
  bodyContainer.classList.add("night");
}
}
stylingTimer()

//API Fetch()
fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Gothenburg,swe&units=metric&APPID=191f229fc0a6e0f86812a75292074cb9"
)
  .then((response) => response.json())
  .then((data) => {
    apiResponse = data;
    console.log(apiResponse);
    const sunriseTime = new Date(apiResponse.sys.sunrise * 1000);// API date/time value needs to be multiplied by 1000 for .toLocaleTimeString() to return the correct value
    //console.log(sunriseTime.toLocaleTimeString())
    sunGoesUp = sunriseTime.toLocaleTimeString();//why doesn't it work to just put this at the end of sunriseTime?
    const sunSetTime = new Date(apiResponse.sys.sunset * 1000);
    sunGoesDown = sunSetTime.toLocaleTimeString();
    getForecastData()
  });

//Async before it was cool...this is just a timer to wait for the response
//Since the fetch() will be async we need to fix this :)
setTimeout(() => {
  currentCity.innerHTML = `${apiResponse.name}`;
  currentTemp.innerHTML = `${Math.round(apiResponse.main.temp * 10) / 10} °C`;
  currentWeather.innerHTML = `${apiResponse.weather.map((weather) => {
    return weather.description;
  })}`;
  sunUpTime.innerHTML = `${sunGoesUp}`;
  sunDownTime.innerHTML = `${sunGoesDown}`;
  topRightIcon.innerHTML += `<img id="top-right-icon" src="http://openweathermap.org/img/wn/${apiResponse.weather[0].icon}@4x.png">`
},
  1000);

//let date = new Date(time);

//API Forecast fetch
const getForecastData = () => {
  fetch("https://api.openweathermap.org/data/2.5/forecast?lat=57.70&lon=11.97&units=metric&appid=191f229fc0a6e0f86812a75292074cb9")
    .then((response) => response.json())
    .then((data) => {
      //forecastResponse = data;
      const filteredForecast = data.list.filter(item => item.dt_txt.includes('09:00')) //Makes a 5 day array read at 12
      console.log(filteredForecast);

      const filteredForecastNight = data.list.filter(item => item.dt_txt.includes('21:00'))
      console.log(filteredForecastNight);

      filteredForecast.forEach(day => {
        const date = new Date(day.dt * 1000);
        let dayName = date.toLocaleDateString("en", { weekday: "short" });//gives the name of each day
      
        filteredForecastNight.map(day => {
           nightTemp = day.main.temp
          console.log(nightTemp)
        })

      
      weekList.innerHTML += `<div id="weekDayRow"><p>${dayName}</p>
      <img id="week-list-icon" src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png">
      <p>${Math.round(day.main.temp * 10) / 10} / ${Math.round(nightTemp * 10) / 10} °C</p></div>`;
    })
    
   
  })
}
//TO DO
//add a logo to the top right that changes depending on time and weather. 
//Put in another city and current location in the nav menu?
//either make the arrow button show more info about weather, or remove it
// styling and media queries
//fix suntime to show hh:mm and not seconds + am/pm 
