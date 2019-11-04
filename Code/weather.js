
//Weatherdata for the  web app

//Current weather

const containerWeather = document.getElementById('weatherNow')
const containerTempNow = document.getElementById('weatherAndTempNow')
const containerWeatherShort = document.getElementById('weatherShort')
const containerSunrise = document.getElementById('sunrise')
const containerSunset = document.getElementById('sunset')
const containerIconNow = document.getElementById('iconNow')
const apiKey = '996158b88361cd2c1991a7aee0bf6883'
const background = document.getElementById('background')


fetch(`https://api.openweathermap.org/data/2.5/weather?q=Kalmar,SE&units=metric&APPID=${apiKey}`)
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    containerTempNow.innerHTML = `<p>${json.weather[0].main} | Temp ${json.main.temp.toFixed(0)}°</p>`
    console.log(containerTempNow)

    containerIconNow.innerHTML = `<img src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png" alt="" />`

    containerWeather.innerHTML = `<h1>The weather in ${json.name} is ${json.weather[0].description} and ${json.main.temp.toFixed(1)}°.</h1>`

    //fixing UNIX time stamp with help from Jolanta
    //Declare variable for the time of sunrise/sunset
    const unixTimestampSunrise = json.sys.sunrise
    const unixTimestampSunset = json.sys.sunset

    //To get sunrise/sunset time in hours:minutes:seconds
    const sunrise = new Date(unixTimestampSunrise * 1000)
    const sunset = new Date(unixTimestampSunset * 1000)

    //Declare new variable to show only hh:mm
    const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
    const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })

    containerSunrise.innerHTML = `<p>Sunrise ${sunriseTime}</p>`
    containerSunset.innerHTML = `<p>Sunset ${sunsetTime}</p>`
    console.log(json)

    //Some reponsive presentation with weather main as condition for color and message
    const mainWeather = json.weather[0].main
    if (mainWeather === "Rain") {
      console.log("Det finns inget dåligt väder")
      document.getElementById('background').classList.add('backgroundRain')
      background.innerHTML = `<p>It's cozy inside but nice outdoors with some rain - just take your joggers an' go running!</p>`
      return
    }
    else if (mainWeather === "Clear") {
      console.log("Hello Sun, beach-time")
      document.getElementById('background').classList.add('backgroundSun')
      background.innerHTML = `<p>Wonderful weather for a picknic or lunch outdoors!</p>`
      return
    }
    else if (mainWeather === "Clouds") {
      console.log("Go to the forest")
      document.getElementById('background').classList.add('backgroundClouds')
      background.innerHTML = `<p>Get creative today! Use the day for baking, painting, training or fixing something broken! Also take a walk in the forest!</p>`
      return
    }
    else if (mainWeather === "Drizzle") {
      console.log("Good for your skin (probably)")
      document.getElementById('background').classList.add('backgroundDrizzle')
      background.innerHTML = `<p>Maybe it is time to cook some tea? Get some air anyway!</p>`
      return
    }

    else if (mainWeather === "Thunderstorm") {
      console.log("Increase the volume of the music")
      document.getElementById('background').classList.add('.backgroundThunderstorm')
      background.innerHTML = `<p> Put on some music you love!</p>`
    }
    else if (mainWeather === "Snow") {
      console.log("Make an angel in the snow")
      document.getElementById('background').classList.add('backgroundSnow')
      background.innerHTML = `<p>Get out and get a little bit cold! Skiing or playing in the snow, maybe!</p>`
      return
    }
    else {
      console.log("Hello")
      document.getElementById('background').classList.add('backgroundElse')
      background.innerHTML = `<p>Hallo handsome, the weather is ok! Take a break! See you outside!</p>`
      return
    }

  })
  .catch((err) => {
    console.log('caught error', err)
  })


//Weather forecast (Damians solution - keeping all the comments)


// This function handles the eventual response from the API (at the bottom)
const handle5DayForecast = (json) => {
  // I have a <ul> in the DOM with an id of forecast which is where I want to put
  // the daily forecast once we've built it.
  const forecastContainer = document.getElementById('forecast')

  // The json we have in this function has a property called 'list' which has around
  // 40 objects - each with the weather for a time in the upcoming days. It's ~40 items
  // because it returns the temperature for every 3 hours.
  //
  // Since we only want to show 1 entry in the forecast div per day, we need to group
  // those 40 entries. This 'dates' object is what I'm going to use for that. In the end,
  // it will have a property for each date, and each property's value will be an array of all the 
  // weather objects for that day.
  // 
  // For example:
  //  { "2019-10-30": [...] }
  const dates = {}

  // Iterate over each of these ungrouped weather objects.
  json.list.forEach((weather) => {
    // Each weather object has a 'dt_txt' property which looks like '2019-10-31 18:00'.
    // I want the '2019-10-31' to be able to say which date this entry belongs to, but I don't care
    // about what time of day the entry is for.
    // 
    // So, if we split the date on ' ', we end up with an array with the date and the time, 
    // like this: ['2019-10-31', '18:00']. Then I select the first item from that array [0]
    // and assign it to the 'date' variable.
    const date = weather.dt_txt.split(' ')[0]

    // This is where we start adding values to the arrays in the 'dates' object we defined above.
    // First, we check if the 'dates' object already has a property for the date we got from the
    // string above...
    if (dates[date]) {
      // If the 'dates' object DID have the date we're working with, then we know we already
      // have an array, so we can push this weather object into it.
      dates[date].push(weather)
    } else {
      // If it DID NOT have this date, then it's the first instance of this new date, so
      // we can add a new property to our 'dates' object with a value which is an array
      // with the weather object we have in this iteration of the .forEach loop we're in.
      dates[date] = [weather]
    }
  })

  // So, now we have grouped weather objects by day we can use Object.entries to turn the object
  // into an array which we can loop over with .forEach. See the Object.entries docs here:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
  Object.entries(dates).forEach((item, index) => {
    // The first item in our dates list is going to be today, so we can skip it (we're showing the current
    // weather at the top of our weather app)
    if (index === 0) {
      return
    }

    // Object.entries breaks our object into an array, where the first item is the key and the second
    // item is the value. So, for example, if our object was { "2019-10-30": [] }, then the 'item' variable we
    // have here will be ['2019-10-30', []]. We can assign those two items in our array to more meaningful
    // variables:
    const date = item[0]
    const weatherValues = item[1]

    //Fixing dates to days (with the help fo Damian And Linda I)
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const todaysDate = new Date(date)
    const weekdayName = `${weekDays[todaysDate.getDay()]}`

    // So now our new 'weatherValues' is the array of weather objects for the current date we're iterating.
    // We can use .map to select a bunch of values from those objects - their temps. See .map docs here:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    const temps = weatherValues.map((value) => value.main.temp)

    // We want to get the min and max temps from the array of temperatures we constructed above, but
    // unfortunately, the Math.max and Math.min functions can't just be passed arrays of values. So, 
    // we can use the very useful spread operator (...) to invoke those functions as if the array was 
    // a bunch of arguments instead of a single array. See the docs for spread, and Math here:
    // Spread - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    // Math.min - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
    // Math.max - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
    const minTemp = Math.min(...temps)
    const maxTemp = Math.max(...temps)

    // Finally! Now we have the date, along with the min and max temp for that day. We can add it to
    // the list of <li> elements in the forecastDiv.
    forecastContainer.innerHTML += `<li>${weekdayName} ${minTemp.toFixed(0)}°-${maxTemp.toFixed(0)}°</li>`
  })
}

// Call the forecast endpoint for the selected city, parse the json, then call the function above
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Kalmar,SE&appid=${apiKey}&units=metric`)
  .then((res) => res.json())
  .then(handle5DayForecast)
  .catch((err) => {
    console.log('caught error', err)
  })
