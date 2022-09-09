// storing the API url as variables
const currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=072a011cef8c3eb73f98d70ebc36f439";
const forecastWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=072a011cef8c3eb73f98d70ebc36f439";

// all the DOM selectors stored as short variables
const sunriseSunset = document.getElementById("sunriseSunset");
const container = document.getElementById("container");
const weeklyWeather = document.getElementById("weeklyWeather");
const icon = document.getElementById("icon");
const message = document.getElementById("message");


// CURRENT DATE FETCH FROM API - STOCKHOLM
fetch(currentWeatherURL) // calling the currentWeatherURL
.then(response => {
    return response.json()
})

.then(cityWeatherData => { // cityWeatherData used as the name of the result from json
    // console.log(cityWeatherData)
    const weatherDescription = cityWeatherData.weather[0].main; // store the current weather description from api in a variable
    const weatherTemp = cityWeatherData.main.temp.toFixed(); // store the current temperature from api in a variable. toFixed = to a whole number (no decimal)
    
    // Declare variable to store the information from api about time of sunrise and sunset as well as timezone.
    let sunrise = cityWeatherData.sys.sunrise
    let sunset = cityWeatherData.sys.sunset
    let timeZone = cityWeatherData.timezone
    
    // Declaring new variables with end goal to show only hh:mm in local time no mather were you are
    // 1. new Date to get sunrise/sunset time in hours:minutes:seconds
    // 2. adding timezone to the sunrise and sunset to get the local time
    // 3. (new Date().getTimezoneOffset() * 60) = returns the difference between UTC time and local time in minutes
    // 4. multiply with 1000 since the data is given in seconds and JS uses milliseconds
    // 5. toLocaleTimeString([], {timeStyle: 'short'}) = to show the result in hh:mm
    let sunriseTime = new Date((sunrise + timeZone + (new Date().getTimezoneOffset() * 60)) * 1000).toLocaleTimeString([], {timeStyle: 'short'});
    let sunsetTime = new Date((sunset + timeZone + (new Date().getTimezoneOffset() * 60)) * 1000).toLocaleTimeString([], {timeStyle: 'short'});
    
    // using results from api and print our html in sunriseSunset section
    sunriseSunset.innerHTML += `
    <div class="weatherDescription">
    <p>${weatherDescription} | ${weatherTemp}º</p>
    <p>Sunrise: ${sunriseTime}</p>
    <p>Sunset: ${sunsetTime}</p>
    </div>
    `
    // creating a function that has an if/else to show different styling, icons and text depending on current weather description in api
    const currentWeatherStyle = () => {
      if (weatherDescription === "Rain") {
        icon.src = "./Design-2/icons/noun_Umbrella_2030530.svg"
        message.innerHTML = `<h1>Don't forget your umbrella. It's wet in ${cityWeatherData.name} today.</h1>`;
        container.classList.add("rain");
      } else if (weatherDescription === "Clouds") {
        icon.src = "./Design-2/icons/noun_Cloud_1188486.svg"
        message.innerHTML = `<h1>Light a fire and get cosy. ${cityWeatherData.name} is looking grey today.</h1>`;
        container.classList.add("cloud");
      } else if (weatherDescription === "Snow") {
        icon.src = "./Design-2/icons/noun_Cloud_1188486.svg"
        message.innerHTML = `<h1>Light a fire and get cosy. ${cityWeatherData.name} will get snow today.</h1>`;
        container.classList.add("cloud");
      }else {
        icon.src = "./Design-2/icons/noun_Sunglasses_2055147.svg"
        message.innerHTML = `<h1>Get your sunnies on. ${cityWeatherData.name} is looking rather great today.</h1>`;
        container.classList.add("clear");
      }
    }
    currentWeatherStyle(); // invoking the function
});


// FORECAST FETCH FROM API - STOCKHOLM
fetch(forecastWeatherURL) // calling the forecastWeatherURL
.then(response => {
    return response.json()
})
.then((data) => { // data used as the name of the result from json
    //console.log(data);
    const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00')) // filteredForecast is now an array with only the data from 12:00 each day
    filteredForecast.forEach((value) => { // looping through the array to get value for each day
      const forecastDate = new Date(value.dt * 1000); // dt = date and time. Multiply with 1000 since the data is given in seconds and JS uses milliseconds
      // console.log(value.dt)
      // using results from api and print our html in weeklyWeather div
      weeklyWeather.innerHTML += ` 
      <div class="day-temp">
        <p>${forecastDate.toLocaleString('en-US', {weekday: 'long'})}</p>
        <p>${value.main.temp.toFixed()}º</p>
        </div>
    `
    })
  })