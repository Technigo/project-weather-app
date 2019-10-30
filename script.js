const container = document.getElementById("weatherNow")

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

    const sunriseUTC = json.sys.sunrise
    const newSunriseDate = new Date(sunriseUTC * 1000).getHours()
    document.getElementById("sunrise").innerHTML += `Sunrise: ${newSunriseDate}.00`
    const sunsetUTC = json.sys.sunset
    const newSunsetDate = new Date(sunsetUTC * 1000).getHours()
    document.getElementById("sunset").innerHTML += `Sunset: ${newSunsetDate}.00`
  })


  const containerTwo = document.getElementById("weatherFiveDays")
  fetch('http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&cnt=7&APPID=b913ce9c82eec1ad0ab3597f17f5d5db')
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(json)
      
      
  
      json.list.forEach((timeSet) => {
      new Date (timeSet * 1000).toLocaleTimeString()
      containerTwo.innerHTML += `<p>${json.list[0].dt} </p>`
    })
  
     
      // Time interval One
      const getDayOne = json.list[0].dt
      const dayOne = new Date(getDayOne * 1000).getHours()
      document.getElementById("timeOne").innerHTML += `${dayOne}.00`

      
      document.getElementById("descriptionOne").innerHTML += `${json.list[0].weather[0].description}`

      const minTempOne = json.list[0].main.temp_min
      const maxTempOne = json.list[0].main.temp_max
      const minTemp = minTempOne.toFixed(0.1)
      const maxTemp = maxTempOne.toFixed(0.1)
      document.getElementById("tempOne").innerHTML += `${minTemp} ° / ${maxTemp} °C`

      // Time interval Two
      const getDayTwo = json.list[1].dt
      const dayTwo = new Date(getDayTwo * 1000).getHours()
      document.getElementById("timeTwo").innerHTML += `${dayTwo}.00`

      const description2 = json.list[1].weather[0].description
      document.getElementById("descriptionTwo").innerHTML += `${description2}`

      const minTempTwo = json.list[1].main.temp_min
      const maxTempTwo = json.list[1].main.temp_max
      const minTem = minTempTwo.toFixed(0.1)
      const maxTem = maxTempTwo.toFixed(0.1)
      document.getElementById("tempTwo").innerHTML += `${minTem} ° / ${maxTem} °C`
    
       // Time interval Three
      const getDayThree = json.list[2].dt
      const dayThree = new Date(getDayThree * 1000).getHours()
      document.getElementById("timeThree").innerHTML += `${dayThree}.00 `

      const description3 = json.list[2].weather[0].description
      document.getElementById("descriptionThree").innerHTML += `${description3}`
     
      const minTempThree = json.list[1].main.temp_min
      const maxTempThree = json.list[1].main.temp_max
      const minTem3 = minTempThree.toFixed(0.1)
      const maxTem3 = maxTempThree.toFixed(0.1)
      document.getElementById("tempThree").innerHTML += `${minTem3} ° / ${maxTem3} °C`


      //const getDay = json.list[0]
      //const dayByName = new Date(getDay * 1000).toString().split(' ')[0]
     
    })
    
     