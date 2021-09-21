// const API_URL = 'api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=00ceff8163f7cba27d66b6501ce70e06'
const test = document.getElementById('test')
let temperature 
let roundTemp
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

console.log ("just for checking that branch forecast is behaving the way it should be")
