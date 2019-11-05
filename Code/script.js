const theCity = document.getElementById("city")
const theTemperature = document.getElementById("temperature")
const thePic = document.getElementById("weatherPic")


fetch(`http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=0cd5fdd065f4fb92c2718ca6e5aa8e02`)

.then((response) => {
    return response.json();
})
.then((json) => {
    
   const theTodaysWeather = document.getElementById("todaysWeather")
   
   const unixTimeStampSunrise = json.sys.sunrise
   const unixTimeStampSunset = json.sys.sunset

   const sunrise = new Date(unixTimeStampSunrise * 1000)
   console.log()
   const sunset = new Date(unixTimeStampSunset * 1000)
   console.log()

   const sunriseHour = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
   console.log(sunriseHour)
   const sunsetHour = sunset.toLocaleTimeString([], { timeStyle: 'short'})
   console.log(sunsetHour)

  //condition = 'clear sky'
  const condition = json.weather[0].description
  if (condition === 'clear sky') {
     thePic.innerHTML = '<img src="/img/sun.png" />'
   } else if (condition === 'cloud') {
       thePic.innerHTML = 'img src="/img/clouds.png />'
   } else if (condition === 'rain') {
       thePic.innerHTML === 'img src"/img/umbrella.png'
   }
   

  console.log(json)

   theCity.innerHTML = `<h2> ${json.name}<h2/>`
   theTemperature.innerHTML += `<h2>${Math.floor(json.main.temp)}°C</h2>`
   theTodaysWeather.innerHTML += `<h2>${json.weather[0].description}</h2>`
   theTodaysWeather.innerHTML += `<p>${sunriseHour}`
   theTodaysWeather.innerHTML += `<p>${sunsetHour}`

})

.catch((err) => {
    console.log('caught error', err)
})
//Forecast

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=0cd5fdd065f4fb92c2718ca6e5aa8e02`)
  .then(response => {
    return response.json();
  })
  .then(json => {
      console.log(json)
    
        const forecastDiv = document.getElementById("weeklyForecast")
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
      
       
          forecastDiv.innerHTML += `<li>${date} - min: ${minTemp.toFixed(1)}, max: ${maxTemp.toFixed(1)}</li>`
          
          //DATES to DAYS
          //const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
          //console.log(dayNames)
          
          //new Date('2019-11-04')
          //new messages
          //const date = new Date('2019-11-04')
          //date.getDay()
        
        })
      
  });

