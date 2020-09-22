// Stockholm - Current weather
const weatherTodaySTHLM = 'http://api.openweathermap.org/data/2.5/weather?id=2673730&units=metric&appid=eb46c8c17530a3d02461794022d39d32'
const locationStockholm = document.getElementById('location-sthlm')
const sunriseSTHLM = document.getElementById('sunrise-sthlm')
const sunsetSTHLM = document.getElementById('sunset-sthlm')
const nowSTHLM = document.getElementById('now-sthlm')

fetch(weatherTodaySTHLM)
  .then((response) => {
    return response.json()
})
  .then((sthlm) => {
    console.log(sthlm)
    const tempNow = Math.round(sthlm.main.temp)
    const nowFeelsLike = Math.round(sthlm.main.feels_like)
    const sunriseCalc = new Date(sthlm.sys.sunrise * 1000)
    const sunrise = ( new Date(sunriseCalc)).toLocaleTimeString('sv-SE', {
      hour12: false, 
      hour: '2-digit',
      minute: '2-digit'
    })
    const sunsetCalc = new Date(sthlm.sys.sunset * 1000)
    const sunset = ( new Date(sunsetCalc)).toLocaleTimeString('sv-SE', {
      hour12: false, 
      hour: '2-digit',
      minute: '2-digit'
    })
    locationStockholm.innerHTML = `${sthlm.weather[0].main} | ${tempNow} \u00b0`
    sunriseSTHLM.innerHTML = `Sunrise ${sunrise}`
    sunsetSTHLM.innerHTML = `Sunset ${sunset}`
    nowSTHLM.innerHTML = `Right now we're seeing ${sthlm.weather[0].description} and it feels like ${nowFeelsLike} \u00b0 in ${sthlm.name}.`
})

// Stockholm - 5 day forecast
const forecastSTHLM = 'http://api.openweathermap.org/data/2.5/forecast?id=2673730&units=metric&appid=eb46c8c17530a3d02461794022d39d32'
const fiveDay = document.getElementById('five-Day') 


fetch(forecastSTHLM)
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    console.log(json)
    const filteredForecast = json.list.filter(item =>item.dt_txt.includes('12:00'))
    console.log(filteredForecast)
    filteredForecast.forEach((day) => {
      const date = new Date(day.dt * 1000)
      const dayName = date.toLocaleDateString('en-US', { 
        weekday: 'short',
        day: 'numeric'
      })
      const dayTemp = Math.round(day.main.feels_like)
      
      fiveDay.innerHTML += 
      `<p class="date">${dayName}</p>
      <p class="description">(day.weather.description)</p>
      <p class="temp">${dayTemp}\u00b0</p>`    
  })
})

    
// Step 5 - Style your weather app

// Once you get the data onto your site, style it to look like one of the provided designs.



// Requirements
// 🔵  Blue Level (Minimum Requirements)
// - You should fetch data from the API using `fetch()` in JavaScript
// - All data in the sketch above should be present and fetched from the API
// - The presentation of the data should be in the specified format.
// - The page should work on mobile (mobile first!), tablet and desktop (Be responsive)

// Make sure you've committed and pushed a version of your project before starting with the intermediary and advanced goals.

// 🔴  Red Level (Intermediary Goals)
// - Change the colors of the page based on the weather. If the weather is warm – use warm colors. If the weather is colder, use cold colors. If you really want to push you CSS muscles you can even make a [background gradient](https://www.w3schools.com/css/css3_gradients.asp)
// - Add multiple cities 🏙
// Give the user the option to choose between a couple of your favorite cities.
// - Include visual indicators for the type of weather, cloudy/sunny/rainy/etc

// ⚫  Black Level (Advanced Goals)
// - **Use your location 🗺**
// Use the [Geolocation API](https://www.w3schools.com/html/html5_geolocation.asp) that is built in to your browser to fetch the city that you are located in atm and show the weather for your location.
// - Explore the API and use another endpoint of the Weather API to include supplementary information
// - Add some CSS animations to your app, e.g. pulsating sun/rain drops
