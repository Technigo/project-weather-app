// Step 1 - Get started with the weather API.
// You will need to use the `fetch()` function in JavaScript to load the weather data into your page, and then select the values you want to inject into the DOM from the JSON which comes from the API.
// Read the [endpoint documentation](https://openweathermap.org/current) for the current weather

const fetchSTHLM = () => {
  fetch('http://api.openweathermap.org/data/2.5/weather?id=2673730&units=metric&callback=sthlm&appid=eb46c8c17530a3d02461794022d39d32')
    .then((response) => {
      return response.json()
      // console.log(response)
  })
    .then((sthlm) => {
      console.log(sthlm)

      const locationStockholm = document.getElementById('location-sthlm')
      const sunriseSTHLM = document.getElementById('sunrise-sthlm')
      const sunsetSTHLM = document.getElementById('sunset-sthlm')
      const nowSTHLM = document.getElementById('now-sthlm')

      locationStockholm.innerHTML = `${sthlm.weather.main} | ${sthlm.main.temp}`
      sunriseSTHLM.innerHTML = sthlm.sys.sunrise
      sunsetSTHLM.innerHTML = sthlm.sys.sunset
      nowSTHLM.innerHTML = `It is currently ${sthlm.weather.description} and feels like ${sthlm.main.feels_like} in ${sthlm.name}.`
  })
  //   .catch((error) => {
  //     console.log(error)  
  // })
};
fetchSTHLM()

const day1STHLM = document.getElementById('day1-sthlm')
const day2STHLM = document.getElementById('day2-sthlm')
const day3STHLM = document.getElementById('day3-sthlm')
const day4STHLM = document.getElementById('day4-sthlm')
const day5STHLM = document.getElementById('day5-sthlm')

//  Step 2 - Present some data on your web app.
// Your task is to present the data: the city name, the temperature (rounded to 1 decimal place), and what type of weather it is (the "description" in the JSON)



// Step 3 - Sunrise and sunset
// Show the time for sunrise and sunset in a readable time format (Example: 13:00 or 1 PM).
// You will have to **format the date from milliseconds to a readable format**.
// [Here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) is a useful resource for how to do this.



// Step 4 - Weather forecast
// Show a forecast for the next 5 days. You can choose how to display the forecast - perhaps you want to show the min and max temperature for each day, or perhaps you want to show the temperature from the middle of the day, or the humidity, what it feels like and so on.
// [https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=YOUR_API_KEY](https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=YOUR_API_KEY)

// The API gives us the next 5 days but for every third hour. So a good idea could be to only use the weather data from the same time everyday. You can filter the forecast list array to only get the info from 12:00 each day for example. 

// HINTS Here




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
