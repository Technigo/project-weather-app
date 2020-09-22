// Stockholm weather - Point to API and define a few locations in HTML
const weatherTodaySTHLM = 'http://api.openweathermap.org/data/2.5/weather?id=2673730&units=metric&appid=eb46c8c17530a3d02461794022d39d32'
const locationStockholm = document.getElementById('location-sthlm')
const sunriseSTHLM = document.getElementById('sunrise-sthlm')
const sunsetSTHLM = document.getElementById('sunset-sthlm')
const nowSTHLM = document.getElementById('now-sthlm')

// Fetch today's weather and display data - Stockholm
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

// Step 4 - Weather forecast
// Show a forecast for the next 5 days. You can choose how to display the forecast - perhaps you want to show the min and max temperature for each day, or perhaps you want to show the temperature from the middle of the day, or the humidity, what it feels like and so on.

// The API gives us the next 5 days but for every third hour. So a good idea could be to only use the weather data from the same time everyday. You can filter the forecast list array to only get the info from 12:00 each day for example. 

// HINTS Here



// Stockholm forecast - Define locations in HTML to display data
const forecastSTHLM = 'http://api.openweathermap.org/data/2.5/forecast?id=2673730&$cnt=5&units=metric&appid=eb46c8c17530a3d02461794022d39d32'
const fiveDay = document.getElementById('five-Day') 
// const day1DateSTHLM = document.getElementById('day1-date-sthlm')
// const day2DateSTHLM = document.getElementById('day2-date-sthlm')
// const day3DateSTHLM = document.getElementById('day3-date-sthlm')
// const day4DateSTHLM = document.getElementById('day4-date-sthlm')
// const day5DateSTHLM = document.getElementById('day5-date-sthlm')
// const day1STHLM = document.getElementById('day1-sthlm')
// const day2STHLM = document.getElementById('day2-sthlm')
// const day3STHLM = document.getElementById('day3-sthlm')
// const day4STHLM = document.getElementById('day4-sthlm')
// const day5STHLM = document.getElementById('day5-sthlm')

// Fetch and display a 5 day forecast - Stockholm
fetch(forecastSTHLM)
  .then((response) => {
    return response.json()
  })
  .then((fiveDaySTHLM) => {
    console.log(fiveDaySTHLM)
    const calcDay = new Date(fiveDaySTHLM.list[0].dt * 1000)
    const forecastDay = ( new Date(calcDay)).toLocaleDateString('en-US', { 
    weekday: 'short',
    day: 'numeric'
  })
    const dayFeelsLike = Math.round(fiveDaySTHLM.list[0].main.feels_like)
    const day = ''
  
    fiveDaySTHLM.list.forEach((day) => {
      fiveDay.innerHTML = `<p class="date">${forecastDay}</p><p p class="temp">${dayFeelsLike}\u00b0</p>`
    return day
  })
})


// types.innerHTML = snorlax.types.map((a) => a.type.name)
 // day1DateSTHLM.innerHTML = `${dayOne}`
    // day1STHLM.innerHTML = `${day1FeelsLike}\u00b0`
    

    // const calcDay1 = new Date(fiveDaySTHLM.list.dt * 1000)
    // const dayOne = ( new Date(calcDay1)).toLocaleDateString('en-US', { 
    //   weekday: 'short',
    //   day: 'numeric'
    // })
    // const day1FeelsLike = Math.round(fiveDaySTHLM.list[0].main.feels_like)
    // const day1FeelsLike = Math.round(fiveDaySTHLM.list[1].main.feels_like)
    // const day1FeelsLike = Math.round(fiveDaySTHLM.list[2].main.feels_like)
    // const day1FeelsLike = Math.round(fiveDaySTHLM.list[3].main.feels_like)
    // const day1FeelsLike = Math.round(fiveDaySTHLM.list[4].main.feels_like)

    // day1DateSTHLM.innerHTML = `${dayOne}`
    // day1STHLM.innerHTML = `${day1FeelsLike}\u00b0`


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
