const currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=072a011cef8c3eb73f98d70ebc36f439";
const forecastWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=072a011cef8c3eb73f98d70ebc36f439";

const sunriseSunset = document.getElementById("SunriseSunset");

const city = document.getElementById("city");

const weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const weeklyWeather = document.getElementById("weeklyWeather");

fetch(currentWeatherURL)
.then(response => {
    return response.json()
})

.then(cityWeatherData => {
    console.log(cityWeatherData)

    const weatherDescription = cityWeatherData.weather[0].description;
    sunriseSunset.innerHTML += `<p>Description: ${weatherDescription}</p>`
    

    const unixTimestampSunrise = cityWeatherData.sys.sunrise    //Declare variable for the time of sunrise/sunset
    const sunriseCalc = new Date(unixTimestampSunrise * 1000)   //To get sunrise/sunset time in hours:minutes:seconds
    const sunriseTime = sunriseCalc.toLocaleTimeString([], { timeStyle: 'short' }) //Declare new variable to show only hh:mm
    sunriseSunset.innerHTML += `<p>Sunrise: ${sunriseTime}</p>`

    const unixTimestampSunset = cityWeatherData.sys.sunset
    const sunsetCalc = new Date(unixTimestampSunset * 1000)
    const sunsetTime = sunsetCalc.toLocaleTimeString([], { timeStyle: 'short' })
    sunriseSunset.innerHTML += `<p>Sunset: ${sunsetTime}</p>`

    city.innerHTML = cityWeatherData.name;

    const today = new Date();
    city.innerHTML += today;
    city.innerHTML += cityWeatherData.main.temp;
});

fetch(forecastWeatherURL)
.then(response => {
    return response.json()
})
.then((data) => {
    const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
    filteredForecast.forEach((value) => {
      const forecastDate = new Date(value.dt * 1000);
      console.log(value.dt)
      weeklyWeather.innerHTML += `
      <div class="day-temp">
        <p>${forecastDate.toLocaleString('en-US', {weekday: 'long'})}</p>
        <p>${value.main.temp.toFixed()}º</p>
      </div>
      `
    })
  })
  

