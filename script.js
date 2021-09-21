//for weather forecast API URL
const FORECAST_API_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=London,uk&units=metric&APPID=00ceff8163f7cba27d66b6501ce70e06'

//Dom selector
const test = document.getElementById('test')

//global variables
let temperature 
let roundTemp
 
//fetch function

fetch('https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=00ceff8163f7cba27d66b6501ce70e06')
.then((response) => {
    return response.json()
  })
.then((data) => {
    // today's forecast 
    console.log('DATA', data)
    test.innerHTML += `
    ${data.name}
    `
    temperature =  (data.main.temp) - 273.15
    roundTemp = temperature.toFixed(1)
    test.innerHTML += `The temperature is ${roundTemp}
    `
    test.innerHTML += `${data.weather[0].description}
    `
})
.catch((error) => console.error(error))
.then(() => console.log('Request finished'));

//for weather forecast fetch function
fetch(FORECAST_API_URL)
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    console.log('Forecast DATA', data)
    const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
    console.log('filtered forecast', filteredForecast)
    filteredForecast.forEach(item => {
      
      test.innerHTML +=`
      <div class= "forecast">
        <p class= "forecast-date">
         ${item.dt_txt}
        </p>
        <p class= "forecast-temp">${item.main.temp} </p>
      </div>
    `

    })
    
  })
  .catch((error) => console.error(error))
  .then(() => console.log('Request finished'));

