const currentContainer = document.getElementById('current')
// const weatherPicture = document.getElementById("image")
const currentTemp = document.getElementById('temp-info')
const currentDescription = document.getElementById('weather-text')
const currentPic = document.getElementById('weather-icon')
const weatherHighlight = document.getElementById('weather-info')
const lightContainer = document.getElementById('sunlightAndDescription')
// const futureContainer = document.getElementById('forecast')


//Fetch/request data
fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=e6f81f7ee0b06f58ce16c675c25714c4')
  //consume the data (promise)
  .then((response) => {
    //below is another promise inside the promise
    return response.json()
  })
  .then((json) => {
    const temp = Math.round(json.main.temp)
    const sunrise = new Date(json.sys.sunrise * 1000)
    const sunset = new Date(json.sys.sunset * 1000)
    const sunriseShort = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
    const sunsetShort = sunset.toLocaleTimeString([], { timeStyle: 'short' })

    currentContainer.innerHTML = `<h2>${json.name}</h2>`
    currentTemp.innerHTML = `<h1>${temp}</h1>`
    lightContainer.innerHTML = `<p id="sunriseP"><img src="sunrise.png" width="60px">Sunrise <span>${sunriseShort}</span></p > <p id="sunsetP"><img src="sunset.png" width="60px">Sunset <span>${sunsetShort}</span></p>`

    json.weather.forEach((weather) => {
      currentDescription.innerHTML += `<p class="descriptionText"> ${weather.description}</p> `
      currentPic.innerHTML += `<img src="https://openweathermap.org/img/wn/${weather.icon}` + `@2x.png">`
    })


    if (temp >= 16) {
      weatherHighlight.style.color = "#ffa500"
    } else if (temp >= 15) {
      weatherHighlight.style.color = "white"
    }
    else if (temp <= 14) {
      weatherHighlight.style.color = "#4a6f83"
    } else if (temp <= 0) {
      weatherHighlight.style.color = "darkslategray"
    } else {
      curweatherHighlightrentTemp.style.color = "green"
    }

  })



const handle5DayForecast = (json) => {

  const forecastDiv = document.getElementById('forecast')

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
  //    { "2019-10-30": [...] }
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


  // const date = newDate()
  // const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

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
    forecastDiv.innerHTML += `<li>${date} - min: ${minTemp.toFixed(1)}, max: ${maxTemp.toFixed(1)}</li>`
  })
}

// Call the forecast endpoint for the selected city, parse the json, then call the function above
fetch(`http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=e6f81f7ee0b06f58ce16c675c25714c4`)
  .then((res) => res.json())
  .then(handle5DayForecast)


          //API: Key	Name	e6f81f7ee0b06f58ce16c675c25714c4


          //Data jag vill ha:
          //CHECK: Stad: "name" - ett object, ej en string. Som med astro: antal. 
          //Dagens temperatur: "main.temp" (rounded to 1 decimal place
          //Dagens description: "weather.description"
          //Sunrise: "sys.sunrise"
          //Sunset: "sys.sunset"
//Forecast: dag + temperatur