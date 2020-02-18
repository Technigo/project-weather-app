const container = document.getElementById('MarbellaWeather')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Marbella,Spain&units=metric&APPID=329f2a2705f51547d2ed78a937fa0051')
  .then((response) => {
    return response.json()

  })
  .then((json) => {

    city.innerHTML = json.name
    temp.innerHTML = `${json.main.temp.toFixed(1)}°`
    description.innerHTML = json.weather[0].description

    const clear = {
      image: 'clearsky.png'
    }
    const cloudy = {
      image: 'cloudy.png'
    }
    const bad = {
      image: 'cold.png'
    }
    const weather = () => {
      if (json.main.temp >= 19) {
        document.getElementById('weatherImage').src = clear.image
      } else if (json.main.temp >= 15) {
        document.getElementById('weatherImage').src = cloudy.image
      } else {
        document.getElementByID('weatherImage').src = bad.image
      }
    }
    weather()

    const sunriseConversion = new Date(json.sys.sunrise * 1000)
    const sunsetConversion = new Date(json.sys.sunset * 1000)

    const sunriseTime = sunriseConversion.toLocaleTimeString([], {
      timeStyle: 'short'
    })
    const sunsetTime = sunsetConversion.toLocaleTimeString([], {
      timeStyle: 'short'
    })

    sunrise.innerHTML = `Sunrise: ${sunriseTime}`
    sunset.innerHTML = `Sunset: ${sunsetTime}`
  })


fetch('https://api.openweathermap.org/data/2.5/forecast?q=marbella,spain&units=metric&appid=329f2a2705f51547d2ed78a937fa0051')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'));
    containerFiveDays.innerHTML = "";
    filteredForecast.forEach(day => {
      const date = new Date(day.dt * 1000)
      const dateString = date.toLocaleDateString('en-us', {
        weekday: 'short'
      })

      containerFiveDays.innerHTML += ` <p> ${dateString} ${day.main.temp.toFixed(1)} °</p> `
    })
  })

// const clear = {
//   image: 'clearsky.png'
// }
// const cloudy = {
//   image: 'cloudy.png'
// }
// const bad = {
//   image: 'cold.png'
// }
// const weather = () => {

//   if (json.weather.main === 'clear') {
//     document.getElementById('weatherImage').src = clear.image
//   } else if (json.weather.main === 'clouds') {
//     document.getElementById('weatherImage').src = cloudy.image
//   } else {
//     document.getElementByID('weatherImage').src = bad.image
//   }
//   weather()
//   containerFiveDays.innerHTML += ` <p> ${dateString} ${weather.image} ${day.main.temp.toFixed(1)} °</p> `
// }