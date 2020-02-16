
const city = document.getElementById('city')
const temp = document.getElementById('temperature')
const coord = document.getElementById('coord')
const sunRise = document.getElementById('sun')
const sunSet = document.getElementById('sun')
const weekdaysTemp = document.getElementById('weekdays')

//TODAYS DATE
const today = new Date()
console.log(today)

//JSON
fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=b09042e161870e44988114035ff61156')
  .then((response) => {
    return response.json()
  })
  .then((json) => {

    console.log(json)
    //CITY
    city.innerHTML = json.name

    //LONG/LAT
    coord.innerHTML = `Longitud: ${json.coord.lon}, Latitud: ${json.coord.lat}`

    //TODAYS TEMPERATURE
    temp.innerHTML = `${json.main.temp} ºC, `
    temp.innerHTML += json.weather[0].description

    // TODAYS SUNRISE/SUNSET

    const sunRiseTime = new Date(json.sys.sunrise * 1000)
    sunRise.innerHTML = `Sunrise: ${sunRiseTime.toLocaleTimeString([], { timeStyle: 'short' })}, `

    const sunSetTime = new Date(json.sys.sunset * 1000)
    sunSet.innerHTML += `Sunset: ${sunSetTime.toLocaleTimeString([], { timeStyle: 'short' })}`


    //WEATHER FOR THE REST OF THE WEEK
    weekdaysTemp.innerHTML = json.sys
  });



