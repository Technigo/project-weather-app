const container = document.getElementById("weatherNow")
const weather_icon = document.getElementById("weather_icon")
const forecastIcon = document.getElementById("icon")
const forecastIcon2 = document.getElementById("iconTwo")
const forecastIcon3 = document.getElementById("iconThree")
const containerTwo = document.getElementById("weatherFiveDays")
const theImage = document.getElementById("weatherImage")
const theFiveDaysDiv = document.getElementById("fiveDays")
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


    const description = json.weather[0].description
    document.getElementById("description").innerHTML += `${description}`

   
    weather_icon.src = `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`

    const sunriseUTC = json.sys.sunrise
    const sunrise = new Date(sunriseUTC * 1000).getHours()
    document.getElementById("sunrise").innerHTML += `Sunrise: ${sunrise}.00`
    const sunsetUTC = json.sys.sunset
    const sunset = new Date(sunsetUTC * 1000).getHours()
    document.getElementById("sunset").innerHTML += `Sunset: ${sunset}.00`

  const now = new Date(Date.now())

  const nightTime = now < sunrise || now > sunset

  if (nightTime) {
    document.getElementById("mainContainer").classList.add("night")
   
  }

  const id = json.weather[0].id
  if (id >= 200 && id <= 232) {
    document.getElementById("weatherNow").classList.add("rain") 
  } else if (id >= 801 && id <= 804) {
    document.getElementById("weatherNow").classList.add("cloudy") 
  } else if (id >= 701 && id <= 781) {
    document.getElementById("weatherNow").classList.add("mist")
    if (nightTime) {
      document.getElementById("weatherNow").classList.add("nightMist")
      document.getElementById("mainContainer").classList.add("night")
    }
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

      /*
      // Time interval One
      const getDayOne = json.list[0].dt
      const dayOne = new Date(getDayOne * 1000).getHours()
      document.getElementById("timeOne").innerHTML += `${dayOne}.00`

      //document.getElementById("descriptionOne").innerHTML += `${json.list[0].weather[0].description}`
      forecastIcon1.src = `http://openweathermap.org/img/wn/${json.list[0].weather[0].icon}@2x.png`

      const minTempOne = json.list[0].main.temp_min
      const maxTempOne = json.list[0].main.temp_max
      const minTemp = minTempOne.toFixed(0.1)
      const maxTemp = maxTempOne.toFixed(0.1)
      document.getElementById("tempOne").innerHTML += `${minTemp} ° / ${maxTemp} °C`

      // Time interval Two
      const getDayTwo = json.list[1].dt
      const dayTwo = new Date(getDayTwo * 1000).getHours()
      document.getElementById("timeTwo").innerHTML += `${dayTwo}.00`

      //const description2 = json.list[1].weather[0].description
      //document.getElementById("descriptionTwo").innerHTML += `${description2}`
      forecastIcon2.src = `http://openweathermap.org/img/wn/${json.list[1].weather[0].icon}@2x.png`
 
      const minTempTwo = json.list[1].main.temp_min
      const maxTempTwo = json.list[1].main.temp_max
      const minTem = minTempTwo.toFixed(0.1)
      const maxTem = maxTempTwo.toFixed(0.1)
      document.getElementById("tempTwo").innerHTML += `${minTem} ° / ${maxTem} °C`
  
       // Time interval Three
      const getDayThree = json.list[2].dt
      const dayThree = new Date(getDayThree * 1000).getHours()
      document.getElementById("timeThree").innerHTML += `${dayThree}.00 `

      //const description3 = json.list[2].weather[0].description
      //document.getElementById("descriptionThree").innerHTML += `${description3}`
      forecastIcon3.src = `http://openweathermap.org/img/wn/${json.list[2].weather[0].icon}@2x.png`

      const minTempThree = json.list[2].main.temp_min
      const maxTempThree = json.list[2].main.temp_max
      const minTem3 = minTempThree.toFixed(0.1)
      const maxTem3 = maxTempThree.toFixed(0.1)
      document.getElementById("tempThree").innerHTML += `${minTem3} ° / ${maxTem3} °C`
   
 // Four
      const getDayFour = json.list[3].dt
      const dayThree = new Date(getDayThree * 1000).getHours()
      document.getElementById("timeThree").innerHTML += `${dayThree}.00 `

      //const description3 = json.list[2].weather[0].description
      //document.getElementById("descriptionThree").innerHTML += `${description3}`
      forecastIcon3.src = `http://openweathermap.org/img/wn/${json.list[2].weather[0].icon}@2x.png`

      const minTempThree = json.list[2].main.temp_min
      const maxTempThree = json.list[2].main.temp_max
      const minTem3 = minTempThree.toFixed(0.1)
      const maxTem3 = maxTempThree.toFixed(0.1)
      document.getElementById("tempThree").innerHTML += `${minTem3} ° / ${maxTem3} °C`

      //const getDay = json.list[0]
      //const dayByName = new Date(getDay * 1000).toString().split(' ')[0]
     */

    })
    
