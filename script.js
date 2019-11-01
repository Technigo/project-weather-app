const container = document.getElementById('weather');
//const weatherDescription = json.weather[0].description
/* const cloud {
  name: "Cloud",
  image: "assets/cloud.png",
  info: "Today there is a cloudy sky, might be smart to bring an umbrella."
}
const sun {
  name: "Sun",
  image: "assets/sunny.png",
  info: "Sky is clear and remember the sunglasses."
}
const rain {
  name: "Rain",
  iamge: "assets/rain.png",
  info: "Today's accessories are the famous rainboots and a fancy umbrella."
}
const sunCloud {
  name: "Sun & cloud",
  image: "assets/suncloud.png",
  info: "Almost a clear sky, sunny with some cute clouds."
}
const clear {
  name: "Clear",
  image: "assets/clear.png",
  info: "Vision is clear, no need for worries."
}
const snow {
  name: "Snow",
  image: "assets/snow.png",
  info: "Bring your thermo pants it's snowing today."
} */


fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=80c5dd84564bfbfbbae5184faea61c48')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    const unixTimestampSunrise = json.sys.sunrise
    const unixTimestampSunset = json.sys.sunset

    const sunrise = new Date(unixTimestampSunrise * 1000)
    const sunset = new Date(unixTimestampSunset * 1000)

    const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
    const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })

    json.weather.forEach((weatherType) => {
      container.innerHTML = `${weatherType.description}`
    })
    container.innerHTML += `<h1>Todays weather in: ${json.name}</h1>`
    container.innerHTML += `<p>Temp is ${json.main.temp.toFixed(1)} &#176</p>`
    container.innerHTML += `<p>Sunrise: ${sunriseTime}</p>`
    container.innerHTML += `<p>Sunset: ${sunsetTime}</p>`
  })

/* const apiKey = '80c5dd84564bfbfbbae5184faea61c48'
const location = 'Stockholm,SE' */


const handle5DayForecast = (json) => {

  const forecastDiv = document.getElementById('forecast')

  const dates = {}


  json.list.forEach((weather) => {
    const date = weather.dt_txt.split(' ')[0]
    if (dates[date]) {
      dates[date].push(weather)
    } else {
      dates[date] = [weather]
    }
  })

  Object.entries(dates).forEach((item, index) => {
    if (index === 0) {
      return
    }

    const date = item[0]
    const weatherValues = item[1]

    const temps = weatherValues.map((value) => value.main.temp)


    const minTemp = Math.min(...temps)
    const maxTemp = Math.max(...temps)

    const dates = new Date(item[0])
    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    forecastDiv.innerHTML += `<li>${dayName[dates.getDay()]} - min: ${minTemp.toFixed(1)}, max: ${maxTemp.toFixed(1)}</li>`
  })
}


fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&appid=80c5dd84564bfbfbbae5184faea61c48&units=metric')
  .then((res) => res.json())
  .then(handle5DayForecast)

/* 
const date = new Date()
const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

console.log(dayName[date.getDay()]) */