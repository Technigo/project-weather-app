//  /$$      /$$ /$$     /$$       /$$      /$$ /$$$$$$$$  /$$$$$$  /$$$$$$$$ /$$   /$$ /$$$$$$$$ /$$$$$$$         /$$$$$$  /$$$$$$$  /$$$$$$$ 
// | $$$    /$$$|  $$   /$$/      | $$  /$ | $$| $$_____/ /$$__  $$|__  $$__/| $$  | $$| $$_____/| $$__  $$       /$$__  $$| $$__  $$| $$__  $$
// | $$$$  /$$$$ \  $$ /$$/       | $$ /$$$| $$| $$      | $$  \ $$   | $$   | $$  | $$| $$      | $$  \ $$      | $$  \ $$| $$  \ $$| $$  \ $$
// | $$ $$/$$ $$  \  $$$$/        | $$/$$ $$ $$| $$$$$   | $$$$$$$$   | $$   | $$$$$$$$| $$$$$   | $$$$$$$/      | $$$$$$$$| $$$$$$$/| $$$$$$$/
// | $$  $$$| $$   \  $$/         | $$$$_  $$$$| $$__/   | $$__  $$   | $$   | $$__  $$| $$__/   | $$__  $$      | $$__  $$| $$____/ | $$____/ 
// | $$\  $ | $$    | $$          | $$$/ \  $$$| $$      | $$  | $$   | $$   | $$  | $$| $$      | $$  \ $$      | $$  | $$| $$      | $$      
// | $$ \/  | $$    | $$          | $$/   \  $$| $$$$$$$$| $$  | $$   | $$   | $$  | $$| $$$$$$$$| $$  | $$      | $$  | $$| $$      | $$   How to do it?   
// |__/     |__/    |__/          |__/     \__/|________/|__/  |__/   |__/   |__/  |__/|________/|__/  |__/      |__/  |__/|__/      |__/   Link at the end:)



//HERE THE URL PUZZLE using template literals--------------------------------------------------------------------------------------------------------------------//
const BASE_URL = "https://api.openweathermap.org/data/2.5/"
const API_KEY = "69cc94dd08e05801b495ee1b7a9cba03"
const cityCountry = "Stockholm,Sweden"

//https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=69cc94dd08e05801b495ee1b7a9cba03
const URL1 = `${BASE_URL}weather?q=${cityCountry}&units=metric&APPID=${API_KEY}`

//https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=69cc94dd08e05801b495ee1b7a9cba03
const URL2 =  `${BASE_URL}forecast?q=${cityCountry}&units=metric&APPID=${API_KEY}`


//HERE TODAYS WEATHER INFORMATION FUNCTION -----------------------------------------------------------------------------------------------------------------//
const updateHTML1 = (data) =>{
  //set main temperature
  const selectNowsTemperature = document.getElementById("nowsTemperature")
  const roundOneDecimal = Math.round(data.main.temp * 10)/10 //this to round to one decimal
  selectNowsTemperature.innerText = roundOneDecimal

  //set location
  const selectLocation = document.getElementById("location")
  selectLocation.innerText = data.name

  //set description
  const selectWeatherDescription = document.getElementById("weatherDescription")
  selectWeatherDescription.innerText = data.weather[0].description
  
  //set sunrise "the variable cascade hell-1"
  const selectSunraise = document.getElementById("sunraise")
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
} 

//HERE TODAYS WEATHER FORECAST FUNCTION -----------------------------------------------------------------------------------------------------------------//
// const updateHTML2 =()=>{

// }

//HERE FEATURE TODAYS WEATHER, MOTHER FETCH 1 ----------------------------------------------------------------------------------------------------//
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
    /* .then((data)=>{
      const selectForecast = document.getElementById("forecast")
      console.log (data.list) 
      console.log (data.list[1])
      const filterMiddayArray = data.list.filter(item=>item.dt_txt.includes("12:00"))
      console.log(data.list[0])
      const filterDateStamp = 
       array.forEach(element => filterMiddayArray{
        forecast.innerHTML =+`
        <div>
          <label>${}</label> //here we need the day of the week
          <img src=${}></img> //
          <h3>${}/${}°C</h3> //Here we need the max temperature and the min temperature 
        </div>`
      }); */
    .then((data) => {
      const selectForecast = document.getElementById("forecast"); // forecast is an HTML id
      const filterMiddayArray = data.list.filter(item => item.dt_txt.includes("12:00"));

      filterMiddayArray.forEach((item) => {
        // Get the day of the week
        const timestamp = item.dt;
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
        const dayOfWeek = date.getDay();
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayOfWeekString = daysOfWeek[dayOfWeek];

        // Get the weather icon
        const weatherIcon = item.weather[0].icon;

        // Get the max and min temperature
        const maxTemp = item.main.temp_max;
        const minTemp = item.main.temp_min;

        // Construct the HTML content for each forecast item
        const forecastHTML = `
          <div>
            <label>${dayOfWeekString}</label>
            <img src="https://openweathermap.org/img/wn/${weatherIcon}.png"></img>
            <h3>${maxTemp}/${minTemp}°C</h3>
          </div>`;
        
        // Append the HTML content to the forecast element
        selectForecast.innerHTML += forecastHTML;
      });

    })
    .catch((error) => {
      console.error(`Error fetching weather forecast data:`, error);
    });}

fetchWeatherForecast()


//https://patorjk.com/software/taag/#p=display&f=Graffiti&t=Type%20Something%20