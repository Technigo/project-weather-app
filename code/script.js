const container = document.getElementById("weatherNow")
const weather_icon = document.getElementById("weather_icon")
const forecastIcon = document.getElementById("icon")
const containerTwo = document.getElementById("weatherFiveDays")
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]


fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=b913ce9c82eec1ad0ab3597f17f5d5db')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    console.log(json)
    const temp = json.main.temp
    const tempOneDec = temp.toFixed(0.1)
    document.getElementById("temperature").innerHTML += `${tempOneDec}°`
    document.getElementById("city").innerHTML = `${json.name}`
    
    const newDate = new Date(json.dt * 1000)
    const todayDate = newDate.toDateString()
    document.getElementById("date").innerHTML = `${todayDate}`

    const description = json.weather[0].description
    document.getElementById("description").innerHTML += `${description}`

   
    weather_icon.src = `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`

    const sunriseUTC = json.sys.sunrise
    const sunsetUTC = json.sys.sunset

    const sunrise = new Date(sunriseUTC * 1000).getHours()
    document.getElementById("sunrise").innerHTML += `Sunrise: ${sunrise}.00`
    
    const sunset = new Date(sunsetUTC * 1000).getHours()
    document.getElementById("sunset").innerHTML += `Sunset: ${sunset}.00`


    const id = json.weather[0].id
    if (id >= 200 && id <= 232) {
      document.getElementById("weatherNow").classList.add("rain") 
    } else if (id >= 801 && id <= 803) {
      document.getElementById("weatherNow").classList.add("littleCloudy") 
    } else if (id === 804) {
      document.getElementById("weatherNow").classList.add("cloudy") 
    } else if (id >= 701 && id <= 781) {
      document.getElementById("weatherNow").classList.add("mist")
    } else if (id === 800) {
      document.getElementById("weatherNow").classList.add("clear")
    }else if (id >= 600 && id <= 622) {
      document.getElementById("weatherNow").classList.add("snow")
    }
    
  })



  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&appid=b913ce9c82eec1ad0ab3597f17f5d5db&units=metric`)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(json)
      json.list.forEach(time => {
        const times = new Date (time.dt_txt)
        if (times.getHours() != "12") return

       const day = `<li>${weekdays[times.getDay()]}</li>`
       const icon = `<img src="http://openweathermap.org/img/wn/${time.weather[0].icon}.png"`
       const temp = `<p>${Math.round(time.main.temp)} ° </p>`

       containerTwo.innerHTML += `<ul>${day} ${icon} ${temp}</ul>`
     
      })

    })

