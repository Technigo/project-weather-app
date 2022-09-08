const currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=072a011cef8c3eb73f98d70ebc36f439";
const forecastWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=072a011cef8c3eb73f98d70ebc36f439";
const sunriseSunset = document.getElementById("sunriseSunset");
const city = document.getElementById("city");
const body = document.getElementById("body");
const weeklyWeather = document.getElementById("weeklyWeather");

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
      if (weatherDescription == "Rain") {
        city.innerHTML += `<img src="">`;
        city.innerHTML = `Don't forget your umbrella. It's wet in ${cityWeatherData.name} today.`;
        body.classList.add("rain");
      } else if (weatherDescription == "Clouds") {
        city.innerHTML += `<img src="Design-2/icons/noun_Cloud_1188486.svg">`;
        city.innerHTML = `Light a fire and get cosy. ${cityWeatherData.name} is looking grey today.`;
        body.classList.add("cloud");
      } else if (weatherDescription == "Snow") {
        city.innerHTML += `<img src="">`;
        city.innerHTML = `Light a fire and get cosy. ${cityWeatherData.name} will get snow today.`;
        body.classList.add("cloud");
      }else {
        city.innerHTML += `<img src="">`;
        city.innerHTML = `Get your sunnies on. ${cityWeatherData.name} is looking rather great today.`;
        body.classList.add("clear");
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