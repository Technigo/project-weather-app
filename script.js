const tempToday = document.getElementById(`tempToday`)
const city = document.getElementById(`city`)
const description = document.getElementById(`description`)
const sun = document.getElementById(`sun`)
const forecast = document.getElementById(`forecast`)
const weatherAPI = `http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=d1862226e2bf07d0d8d418921e586230`



fetch(weatherAPI)
  .then((respons) => {
    return respons.json()
  })

  .then((json) => {
    //City, Temp and type of weather

    tempToday.innerHTML = `<h1>${json.main.temp.toFixed(1)}&deg;C</h1>`
    city.innerHTML = `<h2>${json.name}</h2>`
    description.innerHTML = `<h3>${json.weather[0].description}</h3>`

    if (json.weather[0].description.includes("sun")) {
      document.getElementById("weatherIcon").src = "sunny-1.png"
    }
    else if (json.weather[0].description.includes("clear")) {
      document.getElementById("weatherIcon").src = "sunny-1.png"
    }
    else if (json.weather[0].description.includes("rain")) {
      document.getElementById("weatherIcon").src = "rain.png"
    }
    else if (json.weather[0].description.includes("clouds")) {
      document.getElementById("weatherIcon").src = "clouds.png"
    }
    else if (json.weather[0].description.includes("mist")) {
      document.getElementById("weatherIcon").src = "foog.png"
    }
    else if (json.weather[0].description.includes("snow")) {
      document.getElementById("weatherIcon").src = "snow.png"
    }
    else {
      document.getElementById("weatherIcon").src = "cloudysun.png"
    }
  })


fetch(weatherAPI)
  .then((respons) => {
    return respons.json()

      .then((json) => {

        const unixTimestampSunrise = json.sys.sunrise;
        const unixTimestampSunset = json.sys.sunset;

        const sunrise1 = new Date(unixTimestampSunrise * 1000);
        const sunset1 = new Date(unixTimestampSunset * 1000);

        const sunriseTime = sunrise1.toLocaleTimeString([], { timeStyle: "short" });
        const sunsetTime = sunset1.toLocaleTimeString([], { timeStyle: "short" });

        sun.innerHTML = `<h4>Sunrise ${sunriseTime} & Sunset ${sunsetTime}</h4>`

      })
  })


//5 Days forecast

const handle5DayForecast = (json) => {

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


    forecast.innerHTML += `<li>${date} |  min ${minTemp.toFixed(1)}&deg;  | max ${maxTemp.toFixed(1)}&deg; </li>`

  })

}

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,SE&appid=d1862226e2bf07d0d8d418921e586230&units=metric`)

  .then((res) => res.json())

  .then(handle5DayForecast)
