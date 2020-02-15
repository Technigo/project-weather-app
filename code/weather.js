// My variables
const forecast = []
const weather = {}
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const feels = document.getElementById("feels")
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const week = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
const forecastDiv = document.getElementById('weekday')
const fiveDayForecast = document.getElementById("fiveDayForecast")
const weatherIcon = document.getElementById("whatWeather")
const icons = {
  cold: "img/Group16.png",
  both: "img/Group34.png",
  warm: "img/Group37.png"
}


// My API links with API keys
const weatherNow = "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=01b7bdc37404b6f3860ddce923c61a11"
const weatherForecast = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=01b7bdc37404b6f3860ddce923c61a11"


// Todays weather 
fetch(weatherNow)
  .then(response => {
    return response.json()
  
  .then(json => {
    console.log(json)
    console.log(weather.sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { timeStyle: 'short' }))
    console.log(weather.sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { timeStyle: 'short' }))
    console.log(weather.temp = (Math.round(json.main.temp * 10) / 10))
    console.log(weather.feels_like = (Math.round(json.main.feels_like * 10) / 10))
    console.log(weather.city = json.name)
    city.innerHTML = weather.city
    temp.innerHTML = weather.temp
    feels.innerHTML = weather.feels_like
    sunrise.innerHTML = weather.sunrise
    sunset.innerHTML = weather.sunset

    // if(weather.temp > 5) {
    //   weatherIcon.src = icons.warm
    // } else if(weather.temp > 0) {
    //   weatherIcon.src = icons.both
    // } else {
    //   weatherIcon.src = icons.cold
        // document.getElementById("whatWeather") = 
    // }
  })

  })

// 5 day forecast
fetch(weatherForecast) 
  .then(response => {
    return response.json()

  .then(json => {
    console.log(json)
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
    console.log(filteredForecast)
    
    filteredForecast.forEach(day => {
      let temperature = (Math.round(day.main.temp * 10) / 10)
      let feelsLike = (Math.round(day.main.feels_like * 10) / 10)
      const date = new Date(day.dt * 1000)
      let whatDay = week[date.getDay()]
      console.log(whatDay)
      fiveDayForecast.innerHTML += `<p>${whatDay}: ${temperature}°C // feels like: ${feelsLike}°C`
  })
  })
  })
  
  // let whatDay = day.getDay()
  // console.log(week[whatDay])

  // const filteredForecast = json.list.filter(item => item.dt_txt.includes('03:00'));
  // containerFiveDays.innerHTML = "";
  // filteredForecast.forEach(day => {
  //  const date = new Date(day.dt * 1000)
  //  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  //  let dayOfWeek = weekdays[date.getDay()];
  // containerFiveDays.innerHTML += `<p> ${dayOfWeek} ${day.main.temp.toFixed(0)} °C </p>`
  //   })

// fetch(weatherForecast)
//   .then(response => {
//     return response.json()
//   })

//   .then(handle5DayForecast)
    // const filteredForecast = json.list.filter(item => item.dt_txt.includes('15:00'))
    // console.log(filteredForecast)

    // console.log(Object.values(filteredForecast)[0]);


// let today = new Date().toISOString().slice(0, 10)
// date.innerHTML = today

// console.log(today)


// const handle5DayForecast = (json) => {
//   const dates = {}

//   // Iterate over each of these ungrouped weather objects.
//   json.list.forEach((weather) => {
//       const date = weather.dt_txt.split(' ')[0]
//       if (dates[date]) {

//           dates[date].push(weather)
//       } else {
//           dates[date] = [weather]
//       }
//   })

//   Object.entries(dates).forEach((item, index) => {
//       if (index === 0) {
//           return
//       }

//       const date = item[0]
//       const weatherValues = item[1]

//       const temps = weatherValues.map((value) => value.main.temp)
//       const minTemp = Math.min(...temps)
//       const maxTemp = Math.max(...temps)

//       forecastDiv.innerHTML += `<p>${date} - min: ${Math.round(minTemp)}, max: ${Math.round(maxTemp)}</p>`
//   })
// }

// fetch(weatherForecast)
//   .then(response => {
//     return response.json()
//   })

//   .then(handle5DayForecast)
    // const filteredForecast = json.list.filter(item => item.dt_txt.includes('15:00'))
    // console.log(filteredForecast)

    // console.log(Object.values(filteredForecast)[0]);
  // })

  