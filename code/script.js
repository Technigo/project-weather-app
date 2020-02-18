const city = document.getElementById("city")
const temp = document.getElementById("temp")
const wind = document.getElementById("wind")
const description = document.getElementById("description")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const forecast = document.getElementById("forecast")
const img = document.getElementById("show-img")
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


const weatherKey = "3c481a17ec1c4b275eed746ad29d58b1" 
const stockholm = "2673730"
const units = "metric"
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?id=${stockholm}&units=${units}&appid=${weatherKey}`
console.log(weatherUrl)

const getWeatherForecast = async (url) => {
  await fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((myJson) => {

      todayForecast(myJson)
      fiveDayForecast(myJson)

    })
    .catch((err) => {
      console.log(err)
    })
}

getWeatherForecast(weatherUrl);

const todayForecast = (myJson) => {
  city.innerHTML = `${myJson.city.name}`
  temp.innerHTML = `${myJson.list[0].main.temp}&#176`
  wind.innerHTML = `${myJson.list[0].wind.speed} m/s`
  description.innerHTML = `${myJson.list[0].weather[0].description}`
  img.src = `https://openweathermap.org/img/wn/${myJson.list[0].weather[0].icon}.png`

  let convertedSunrise = new Date(myJson.city.sunrise * 1000) 
  let convertedSunset = new Date(myJson.city.sunset * 1000)
  sunrise.innerHTML = `${convertedSunrise.toLocaleTimeString({}, {timeStyle: 'short'})}`
  sunset.innerHTML = `${convertedSunset.toLocaleTimeString({}, {timeStyle: 'short'})}`
}


const fiveDayForecast = (myJson) => {
  
  const forecastObj = {}

  myJson.list.forEach((element) => {

    const date = element.dt_txt.split(' ')[0]
    
    if (forecastObj[date]) {
      forecastObj[date].push(element)
    } else {
      forecastObj[date] = [element]
    }
  })

    Object.entries(forecastObj).forEach((item, index) => {

      if (index === 0) {
        return
      }
      
      const date = item[0]
      const weatherValues = item[1]

      const temps = weatherValues.map((value) => value.main.temp)

      minTemp = Math.min(...temps)
      maxTemp = Math.max(...temps)

      dayName = new Date(item[0])

      forecast.innerHTML += `<span id="test"><p class="icon day">${weekday[dayName.getDay()]}</p> <p class="icon min-max-temp"> ${minTemp}&#176 - ${maxTemp}&#176</p></span>`
    })

}
