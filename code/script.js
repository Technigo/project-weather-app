/*
API KEY: 3c481a17ec1c4b275eed746ad29d58b1
API CALL: http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}

5 day forecast example for Stockholm and the units is metric
api.openweathermap.org/data/2.5/forecast?id=2673730&units=metric&appid=3c481a17ec1c4b275eed746ad29d58b1

city id stockholm: 2673730
*/

// Testing to print out some of the respons from the api
const city = document.getElementById("city")
const temp = document.getElementById("temp")
const wind = document.getElementById("wind")
const description = document.getElementById("description")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const forecast = document.getElementById("forecast")
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


// Fetch weather url
const weatherKey = "3c481a17ec1c4b275eed746ad29d58b1" //Should be hidden in .gitignore
const stockholm = "2673730"
const units = "metric"
const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?id=${stockholm}&units=${units}&appid=${weatherKey}`


const getWeatherForecast = async (url) => {
  await fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((myJson) => {
      // Update weather in Stockholm
      todayForecast(myJson)
      // Invoke fivedayforecast function when its done here
      fiveDayForecast(myJson)
    })
    .catch((err) => {
      console.log(err)
    })
}

getWeatherForecast(weatherUrl);


const todayForecast = (myJson) => {
  // Targeting my id and update with current information from api.
  // This is how I can show big card information about stockholm.
  // Add icon depending on myJson.list[0].weather.id, rain, cloudy, sunny etc.
  city.innerHTML = `City: ${myJson.city.name}`
  temp.innerHTML = `Current temp in ${myJson.city.name} is ${myJson.list[0].main.temp}&#176`
  wind.innerHTML = `Wind speed: ${myJson.list[0].wind.speed} m/s`
  description.innerHTML = `Description: ${myJson.list[0].weather[0].description}`

  // Convert sunrise and sunset from unix timestamp
  let convertedSunrise = new Date(myJson.city.sunrise * 1000) 
  let convertedSunset = new Date(myJson.city.sunset * 1000)
  sunrise.innerHTML = `Sunrise: ${convertedSunrise.toLocaleTimeString({}, {timeStyle: 'short'})}`
  sunset.innerHTML = `Sunset: ${convertedSunset.toLocaleTimeString({}, {timeStyle: 'short'})}`
}


const fiveDayForecast = (myJson) => {
  
  const forecastObj = {}

  myJson.list.forEach((element) => {
    // Find all date and time in each element, use split to get rid of time
    const date = element.dt_txt.split(' ')[0]
    
    if (forecastObj[date]) {
      forecastObj[date].push(element)
    } else {
      forecastObj[date] = [element]
    }
  })


    // Run on each element in forecastObj, removes todays date and looks for lowest temp and highest temp in each element
    Object.entries(forecastObj).forEach((item, index) => {

      // Removes todays date, since we want to see the next five days
      if (index === 0) {
        return
      }
      
      // Start att the first date in the array
      const date = item[0]
      // Store all elements from that date to weatherValues
      const weatherValues = item[1]

      // Create a new array named temps and store all of this dates temp
      const temps = weatherValues.map((value) => value.main.temp)

      // Stores the lowest valued number from this date into minTemp
      minTemp = Math.min(...temps)
      // Stores the highest valued number from this date into maxTemp
      maxTemp = Math.max(...temps)

      // console.log(weekday[2])
      dayName = new Date(item[0])

      // Display each date and min/max temp
      console.log(`${weekday[dayName.getDay()]}: ${minTemp}`)
      console.log(`${weekday[dayName.getDay()]}: ${maxTemp}`)
      forecast.innerHTML += `<p>${weekday[dayName.getDay()]}: ${minTemp}&#176 - ${maxTemp}&#176</p>`
    })
}
