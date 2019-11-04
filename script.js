const container = document.getElementById('weather');
const sunContainer = document.getElementById('sunUpDown');
const currentSky = document.getElementById('sky')


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



    const showConditionIcon = () => {
      const currentWeather = json.weather[0].icon
      console.log(currentWeather)

      if (json.weather[0].icon === "01d") {
        currentSky.innerHTML = `<p>Sky is clear and remember the sunglasses.</p> <img src="assets/sun.png" alt="Sunny">`
      } else if (json.weather[0].icon === "01n") {
        currentSky.innerHTML = `<img src="assets/clear.png" alt="Clear">`
      } else if (json.weather[0].icon === "02d") {
        currentSky.innerHTML = `<p>Almost a clear sky, sunny with some cute clouds.</p> <img src="assets/smallclouds.png" alt="Small clouds">`
      } else if (json.weather[0].icon === "02n") {
        currentSky.innerHTML = `<img src="assets/smallcloudsn.png" alt="Small clouds night">`
      } else if (json.weather[0].icon === "03d") {
        currentSky.innerHTML = ` <img src="assets/suncloud.png" alt="Sun and cloud">`
      } else if (json.weather[0].icon === "04d") {
        currentSky.innerHTML = `<p>Today there is a cloudy sky, might be smart to bring an umbrella.</p> <img src="assets/cloud.png" alt="Cloudy">`
      } else if (json.weather[0].icon === "03n" && json.weather[0].icon === "04n") {
        currentSky.innerHTML = `<img src="assets/cloudn.png" alt="Cloudy night">`
      } else if (json.weather[0].icon === "09d" && json.weather[0].icon === "10d") {
        currentSky.innerHTML = `<p>Today's accessories are the famous rainboots and a fancy umbrella.</p> <img src="assets/rain.png" alt="Rain">`
      } else if (json.weather[0].icon === "09n" && json.weather[0].icon === "10n") {
        currentSky.innerHTML = `<img src="assets/rainn.png" alt="Rain night">`
      } else if (json.weather[0].icon === "11d") {
        currentSky.innerHTML = `<img src="assets/thunder.png" alt="Thunder">`
      } else if (json.weather[0].icon === "11n") {
        currentSky.innerHTML = `<img src="assets/thundern.png" alt="Thunder night">`
      } else if (json.weather[0].icon === "13d") {
        currentSky.innerHTML = `<p>Bring your thermo pants it's snowing today.</p> <img src="assets/snow.png" alt="Snow">`
      } else if (json.weather[0].icon === "13n") {
        currentSky.innerHTML = `<img src="assets/snown.png" alt="Snow night">`
      } else if (json.weather[0].icon === "50d") {
        currentSky.innerHTML = `<img src="assets/mist.png" alt="Mist">`
      } else if (json.weather[0].icon === "50n") {
        currentSky.innerHTML = `<img src="assets/mistn.png" alt="Mist night">`
      } else {
        currentSky.innerHTML = `<img src="assets/weatherapp.png" alt="Weatherapp">`
      }
    }
    showConditionIcon();


    container.innerHTML += `<h1>Todays weather in: <br>${json.name}</h1>`
    container.innerHTML += `<p>Temp is ${json.main.temp.toFixed(1)} &#176</p>`
    sunContainer.innerHTML += `<p>Sunrise: ${sunriseTime} <image src="sunrise.png"></p>`
    sunContainer.innerHTML += `<p>Sunset: ${sunsetTime}<image src="sunset.png"></p>`
  })


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

    forecastDiv.innerHTML += `<li>${dayName[dates.getDay()]} : ${minTemp.toFixed(1)} &#176 - ${maxTemp.toFixed(1)} &#176</li>`
  })
}


fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&appid=80c5dd84564bfbfbbae5184faea61c48&units=metric')
  .then((res) => res.json())
  .then(handle5DayForecast)