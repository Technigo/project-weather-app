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
    let sunrise = convertTime(data.sys.sunrise)
    test.innerHTML += `The sun rises at (sunrise)
    `
    let sunset = convertTime(data.sys.sunset)
    test.innerHTML += `The sun sets at ${sunset}
    `
})


function convertTime(unixTime){
  let date = new Date(unixTime * 1000)
  let hours = date.getHours()
  let minutes = "0" + date.getMinutes()
  let time = hours + ":" + minutes.substr(-2)
  console.log(time)
};
