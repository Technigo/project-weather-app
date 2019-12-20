const apiKey = '42da1ed967bb60f77a80f7975f8783b9'
const myLocation = 'Stockholm,SE'

const currentCity = document.getElementById("current-city")
const currentTemp = document.getElementById("current-temp")
const currentType = document.getElementById("current-type")
const currentIcon = document.getElementById("current-icon")
const currentSunRise = document.getElementById("current-sunrise")
const currentSunSet = document.getElementById("current-sunset")


fetch(`https://api.openweathermap.org/data/2.5/weather?q=${myLocation}&units=metric&appid=${apiKey}`)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        //Declare variable for the time of sunrise/sunset
        const unixTimestampSunrise = json.sys.sunrise
        const unixTimestampSunset = json.sys.sunset

        //To get sunrise/sunset time in hours:minutes:seconds
        const sunrise = new Date(unixTimestampSunrise * 1000)
        const sunset = new Date(unixTimestampSunset * 1000)

        //Declare new variable to show only hh:mm
        const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
        const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })

        currentCity.innerHTML = `<h1>Todays weather in ${json.name}</h1>`
        currentTemp.innerHTML += `<h3>Temp ${json.main.temp.toFixed(0)} &#8451;</h3>`

        currentSunRise.innerHTML += `<p>Sunrise: ${sunriseTime}</p>`
        currentSunSet.innerHTML += `<p>Sunset: ${sunsetTime}</p>`

        json.weather.forEach((currenttype) => {
            currentType.innerHTML += `<h3>${currenttype.description}</h3>`
            currentIcon.innerHTML += `<img src="https://openweathermap.org/img/wn/${currenttype.icon}@2x.png"/>`
        })
    })



// Iterate over the items in json 'list' property. Group them by day. Iterate over each day. Calculate values.

// This function handles the response from the API and puts it in <ul>"5-day-forecast"</ul> in the DOM.
const handle5DayForecast = (json) => {
    const list5DayForecast = document.getElementById("5-day-forecast")

    // json property 'list' has 40 objects, returns temperature for every 3 hours.
    // To show 1 entry/day – group those 40 entries.
    // This empty 'dates' object will store a property for each date with value as array of all
    // weather objects that day.  { "2019-10-30": [...] }
    const dates = {}

    // Iterate over each ungrouped weather objects.
    json.list.forEach((weather) => {
        // Each weather object has a 'dt_txt': '2019-10-31 18:00'. We want the date only.
        // split the date on ' ', end up with an array with the date and the time,['2019-10-31', '18:00']
        // Select the first item from that array [0] and assign it to the 'date' variable.
        const date = weather.dt_txt.split(' ')[0]

        // Start adding values to the arrays in the 'dates' object above.
        // Check if the 'dates' object already has a property for the date we got from the
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
        // Commented out since it only showed 4 days forecast
        if (index === 0) {
            return
        }

        // Object.entries breaks our object into an array, where the first item is the key and the second
        // item is the value. So, for example, if our object was { "2019-10-30": [] }, then the 'item' variable we
        // have here will be ['2019-10-30', []]. We can assign those two items in our array to more meaningful
        // variables:
        // Adding day names after Damiens code
        const days = ['SUN', 'MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT']
        // Changing the variable 'date': const date = item[0] to get day names instead of dates
        const date = days[new Date(item[0]).getDay()]
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
        // the list of <li> elements in the list5DaysForecast.
        list5DayForecast.innerHTML += `<li>${date} ${minTemp.toFixed(1)}&#8451;/${maxTemp.toFixed(1)}&#8451;</li>`
    })
}

// Call the forecast endpoint for the selected city, parse the json, then call the function above
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${myLocation}&appid=${apiKey}&units=metric`)
    .then((res) => res.json())
    .then(handle5DayForecast)

