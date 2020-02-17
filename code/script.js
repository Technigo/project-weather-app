const city = document.getElementById("city")
const temp = document.getElementById("temp")
const wind = document.getElementById("wind")
const description = document.getElementById("description")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const forecast = document.getElementById("forecast")
const img = document.getElementById("show-img")
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]




// Fetch weather url
const weatherKey = "3c481a17ec1c4b275eed746ad29d58b1" //Should be hidden in .gitignore
const stockholm = "2673730"
const units = "metric"
const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?id=${stockholm}&units=${units}&appid=${weatherKey}`
console.log(weatherUrl)

const getWeatherForecast = async (url) => {
  await fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((myJson) => {
      // Update weather in Stockholm
      todayForecast(myJson)
      // Update weather 5 day forecast
      fiveDayForecast(myJson)
    })
    .catch((err) => {
      console.log(err)
    })
}

getWeatherForecast(weatherUrl);

const todayForecast = (myJson) => {
  // Add icon depending on myJson.list[0].weather.id, rain, cloudy, sunny etc.
  city.innerHTML = `${myJson.city.name}`
  temp.innerHTML = `${myJson.list[0].main.temp}&#176`
  wind.innerHTML = `${myJson.list[0].wind.speed} m/s`
  description.innerHTML = `${myJson.list[0].weather[0].description}`
  img.src = `http://openweathermap.org/img/wn/${myJson.list[0].weather[0].icon}.png`

  // Convert sunrise and sunset from unix timestamp
  let convertedSunrise = new Date(myJson.city.sunrise * 1000) 
  let convertedSunset = new Date(myJson.city.sunset * 1000)
  sunrise.innerHTML = `🌇 ${convertedSunrise.toLocaleTimeString({}, {timeStyle: 'short'})}`
  sunset.innerHTML = `🌆 ${convertedSunset.toLocaleTimeString({}, {timeStyle: 'short'})}`
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

      // Create new date based on items date, then later converting that to getDay()
      dayName = new Date(item[0])

      // Display each date and min/max temp
      console.log(`${weekday[dayName.getDay()]}: ${minTemp}`)
      console.log(`${weekday[dayName.getDay()]}: ${maxTemp}`)
      forecast.innerHTML += `<span><p class="icon day">${weekday[dayName.getDay()]}</p> <p class="icon min-max-temp"> ${minTemp}&#176 - ${maxTemp}&#176</p></span>`
    })
}
