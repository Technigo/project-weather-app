// Current weather
const stockholm = 2673730

// const cities = [
//   {
//     name: 'Stockholm',
//     id: 2673730
//   },
//   {
//     name: 'San Francisco',
//     id: 5391959
//   },
//   {
//     name: 'London',
//     id: 2643743
//   },
//   {
//     name: 'Taipei',
//     id: 1665148
//   }
// ]
// need method of picking city along with default to Stockholm on page load.

const weatherSTHLM = `http://api.openweathermap.org/data/2.5/weather?id=${stockholm}&units=metric&appid=eb46c8c17530a3d02461794022d39d32`
const where = document.getElementById('location')
const sunriseTime = document.getElementById('sunrise')
const sunsetTime = document.getElementById('sunset')
const now = document.getElementById('now')
const ico = document.getElementById('now-icon')
const desc = document.getElementById('now-desc')

fetch(weatherSTHLM)
  .then((response) => {
    return response.json()
})
  .then((city) => {
    console.log(city)
    const dateCheck = new Date(city.dt * 1000)
    const todayIs = (new Date(dateCheck)).toLocaleDateString()
    console.log(`TODAY: ${todayIs}`)


    const tempNow = Math.round(city.main.temp)
    const nowFeelsLike = Math.round(city.main.feels_like)
    const sunriseCalc = new Date(city.sys.sunrise * 1000)
    const sunrise = (new Date(sunriseCalc)).toLocaleTimeString('sv-SE', {
      hour12: false, 
      hour: '2-digit',
      minute: '2-digit'
    })
    const sunsetCalc = new Date(city.sys.sunset * 1000)
    const sunset = (new Date(sunsetCalc)).toLocaleTimeString('sv-SE', {
      hour12: false, 
      hour: '2-digit',
      minute: '2-digit'
    })
    where.innerHTML = `${city.weather[0].main} | ${tempNow}\u00b0C`
    sunriseTime.innerHTML = `Sunrise ${sunrise}`
    sunsetTime.innerHTML = `Sunset ${sunset}`
    now.innerHTML = `It feels like ${nowFeelsLike}\u00b0C in ${city.name}.`
    desc.innerHTML = city.weather[0].description
    ico.src = `http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`
})

// Stockholm - 5 day forecast
const forecastSTHLM = `http://api.openweathermap.org/data/2.5/forecast?id=${stockholm}&units=metric&appid=eb46c8c17530a3d02461794022d39d32`
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

      console.log(date)

      fiveDay.innerHTML += 
      `<p class="date">${dayName}</p>
      <p class="temp">${dayTemp}\u00b0C</p>
      <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" />
      <p class="description">${day.weather[0].description}</p>`    
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
// - Add multiple cities 
// Give the user the option to choose between a couple of your favorite cities.
// - Include visual indicators for the type of weather, cloudy/sunny/rainy/etc

// ⚫  Black Level (Advanced Goals)
// - **Use your location *
// Use the [Geolocation API](https://www.w3schools.com/html/html5_geolocation.asp) that is built in to your browser to fetch the city that you are located in atm and show the weather for your location.
// - Explore the API and use another endpoint of the Weather API to include supplementary information
// - Add some CSS animations to your app, e.g. pulsating sun/rain drops
