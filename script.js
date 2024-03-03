//  /$$      /$$ /$$     /$$       /$$      /$$ /$$$$$$$$  /$$$$$$  /$$$$$$$$ /$$   /$$ /$$$$$$$$ /$$$$$$$         /$$$$$$  /$$$$$$$  /$$$$$$$ 
// | $$$    /$$$|  $$   /$$/      | $$  /$ | $$| $$_____/ /$$__  $$|__  $$__/| $$  | $$| $$_____/| $$__  $$       /$$__  $$| $$__  $$| $$__  $$
// | $$$$  /$$$$ \  $$ /$$/       | $$ /$$$| $$| $$      | $$  \ $$   | $$   | $$  | $$| $$      | $$  \ $$      | $$  \ $$| $$  \ $$| $$  \ $$
// | $$ $$/$$ $$  \  $$$$/        | $$/$$ $$ $$| $$$$$   | $$$$$$$$   | $$   | $$$$$$$$| $$$$$   | $$$$$$$/      | $$$$$$$$| $$$$$$$/| $$$$$$$/
// | $$  $$$| $$   \  $$/         | $$$$_  $$$$| $$__/   | $$__  $$   | $$   | $$__  $$| $$__/   | $$__  $$      | $$__  $$| $$____/ | $$____/ 
// | $$\  $ | $$    | $$          | $$$/ \  $$$| $$      | $$  | $$   | $$   | $$  | $$| $$      | $$  \ $$      | $$  | $$| $$      | $$      
// | $$ \/  | $$    | $$          | $$/   \  $$| $$$$$$$$| $$  | $$   | $$   | $$  | $$| $$$$$$$$| $$  | $$      | $$  | $$| $$      | $$   How to do it?   
// |__/     |__/    |__/          |__/     \__/|________/|__/  |__/   |__/   |__/  |__/|________/|__/  |__/      |__/  |__/|__/      |__/   Link at the end:)



//HERE THE URL PUZZLE using template literals-------------------------------------------------------------------------------------------------------------------//
const BASE_URL = "https://api.openweathermap.org/data/2.5/"
const API_KEY = "69cc94dd08e05801b495ee1b7a9cba03"
const cityCountry = "Stockholm,Sweden"

//https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=69cc94dd08e05801b495ee1b7a9cba03
const URL1 = `${BASE_URL}weather?q=${cityCountry}&units=metric&APPID=${API_KEY}`

//https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=69cc94dd08e05801b495ee1b7a9cba03
const URL2 =  `${BASE_URL}forecast?q=${cityCountry}&units=metric&APPID=${API_KEY}`


//HERE TODAYS WEATHER INFORMATION FUNCTION ---------------------------------------------------------------------------------------------------------------------//
const updateHTML1 = (data) =>{
  
   //set main temperature
   const selectNowsTemperature = document.getElementById("nowsTemperature")
   const roundOneDecimal = Math.round(data.main.temp * 10)/10 //this to round to one decimal
   selectNowsTemperature.innerHTML = roundOneDecimal

  //set weather icon
  const todaysIcon = document.getElementById("todays-icon")
  iconCode = data.weather[0].icon
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
  todaysIcon.src = iconUrl
  
  //set location
  const selectLocation = document.getElementById("location")
  selectLocation.innerText = data.name

  //set description
  const selectWeatherDescription = document.getElementById("weatherDescription")
  const descrip = data.weather[0].description
  selectWeatherDescription.innerText = descrip.charAt(0).toUpperCase() + descrip.slice(1)

  
  //set sunrise "the variable cascade hell-1"
  const selectSunraise = document.getElementById("sunrise")
  const sunriseTimeStamp = data.sys.sunrise*1000
  const sunriseTime = new Date (sunriseTimeStamp)
  const sunriseHours = sunriseTime.getHours()
  const sunriseMinutes = sunriseTime.getMinutes() 
  selectSunraise.innerText = `${sunriseHours}:${sunriseMinutes}`

  //set sunset "the variable cascade hell-2"
  const selectSunset = document.getElementById("sunset")
  const sunsetTimestamp = data.sys.sunset * 1000
  const sunsetTime = new Date (sunsetTimestamp)
  const sunsetHours = sunsetTime.getHours()
  const sunsetMinutes = sunsetTime.getMinutes()
  selectSunset.innerText = `${sunsetHours}:${sunsetMinutes}`
  console.log(data)
} 

//HERE TODAYS WEATHER FORECAST FUNCTION ----------------------------------------------------------------------------------------------------------------------//
// const updateHTML2 =()=>{

// }

//HERE FEATURE TODAYS WEATHER, MOTHER FETCH 1 ----------------------------------------------------------------------------------------------------------------//
const fetchWeaterData = () =>{
  fetch(URL1)
    .then(response=>response.json())
    .then((data)=>{
      updateHTML1(data)  
    })
    .catch ((error) =>{
      console.error(`Error fetching weather data:`, error)
    })   
}
fetchWeaterData()

//HERE FEATURE WEATHER FORECAST, MOTHER FETCH 2 --------------------------------------------------------------------------------------------------------------//
const fetchWeatherForecast = () =>{
  fetch(URL2)
  .then(response=>response.json())
    .then((data) => {
    const selectForecast = document.getElementById("forecast"); // forecast is an HTML id
    const filterMiddayArray = data.list.filter(item => item.dt_txt.includes("12:00"));
    console.log(filterMiddayArray)
    filterMiddayArray.forEach((item) => {
      // Get the day of the week
      const timestamp = item.dt;
      const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
      const dayOfWeek = date.getDay();
      // console.log(item.dt)
      // console.log(date)
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dayOfWeekString = daysOfWeek[dayOfWeek];
      
      // Get the weather icon
      const weatherIcon = item.weather[0].icon;
      
      // Get the max and min temperature
      const maxTemp = item.main.temp_max;
      // console.log(maxTemp)
      const roundMaxTemp = Math.round(maxTemp * 10)/10 //this to round to one decimal
      const minTemp = item.main.temp_min;
      // console.log(minTemp)
      const roundMinTemp = Math.round(minTemp * 10)/10 //this to round to one decimal
      
      // Construct the HTML content for each forecast item
      const forecastHTML = `
      <div class="forecast-day">
      <label>${dayOfWeekString}</label>
      <div class="forecast-day-right">
      <img src="https://openweathermap.org/img/wn/${weatherIcon}.png"></img>
      <i>${roundMaxTemp} / ${roundMinTemp} °C</i>
      </div>
      </div>`;
      
      // Append the HTML content to the forecast element
      selectForecast.innerHTML += forecastHTML;
    });
    
  })
  .catch((error) => {
    console.error(`Error fetching weather forecast data:`, error);
  })
  ;}
  
  fetchWeatherForecast()
  

//DOM selectors-------------------------------------------------------------------------------------------------------------------------------------------------//
const selectButton = document.getElementById("containerBtn")
const selectArrow = document.getElementById("arrow")
const selectBackgroundCircle = document.getElementById("backgroundCircle")

//HERE BUTTON AND FALLING DOWN HEADER BACKGROUND ------------------------------------------------------------------------------------------------------------//
let isOpen = false //initial state

const dropdownForecast =()=>{
  isOpen = !isOpen

  if (isOpen){
    selectArrow.style.borderWidth = "0 6px 6px 0"
    selectBackgroundCircle.style.transform = "translate(-50%, -99%)"
    selectButton.style.top = "43%"
  } else {
    selectArrow.style.borderWidth = "6px 0 0 6px"
    selectBackgroundCircle.style.transform = "translate(-50%, -50%)"
    selectButton.style.top = "80%"
  }
}

selectButton.addEventListener("click", dropdownForecast)

//https://patorjk.com/software/taag/#p=display&f=Graffiti&t=Type%20Something%20