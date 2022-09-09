const currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=072a011cef8c3eb73f98d70ebc36f439";
const forecastWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=072a011cef8c3eb73f98d70ebc36f439";
const sunriseSunset = document.getElementById("sunriseSunset");
const container = document.getElementById("container");
const weeklyWeather = document.getElementById("weeklyWeather");
const icon = document.getElementById("icon");
const message = document.getElementById("message");


// CURRENT DATE
fetch(currentWeatherURL)
.then(response => {
    return response.json()
})

.then(cityWeatherData => {
    console.log(cityWeatherData)

    const weatherDescription = cityWeatherData.weather[0].main;
    const weatherTemp = cityWeatherData.main.temp.toFixed(); // toFixed = to a whole number (no decimal)
    const sunriseTime = new Date(cityWeatherData.sys.sunrise * 1000).toLocaleString('se-SE', {hour:'numeric', minute: 'numeric'})
    const sunsetTime = new Date(cityWeatherData.sys.sunset * 1000).toLocaleString('se-SE', {hour:'numeric', minute: 'numeric'})

    sunriseSunset.innerHTML += `
    <div class="weatherDescription">
    <p>${weatherDescription} | ${weatherTemp}º</p>
    <p>Sunrise: ${sunriseTime}</p>
    <p>Sunset: ${sunsetTime}</p>
    </div>
    `
    // different styling, icons and text depending on current weather description in api
    
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

// FORECAST
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