//console.log('hej hej')
const StockholmAPI = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=1f53b6ca8e6cbcf1c51848ca6c257778'
const StockholmForecastAPI = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=1f53b6ca8e6cbcf1c51848ca6c257778'
const cityName = document.getElementById('cityName')
const weatherContainer = document.getElementById('weatherContainer')
const sydneyApi = 'https://api.openweathermap.org/data/2.5/weather?q=Sydney&appid=2430dd2cc5de1b93bed8a082b8dda9c5'
const chicagoApi = 'https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=2430dd2cc5de1b93bed8a082b8dda9c5'
const hongKongApi = 'https://api.openweathermap.org/data/2.5/weather?q=Johannesburg&appid=2430dd2cc5de1b93bed8a082b8dda9c5'
const johannesburgApi = 'https://api.openweathermap.org/data/2.5/weather?q=HongKong&appid=2430dd2cc5de1b93bed8a082b8dda9c5'
const quitoApi = 'https://api.openweathermap.org/data/2.5/weather?q=Quito&appid=2430dd2cc5de1b93bed8a082b8dda9c5'

console.log('API fetch starting')

const weekday = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

fetch(StockholmAPI)
  .then((response) => {
//    console.log(`Response ok? ${response.ok}`) //take away later
//    console.log(`Response status: ${response.status}`) //take away later
//    console.log('API Response Received');
    return response.json()
  })
    .then((data) => {
//      console.log(data);   //take away later?
    
    const num = data.main.temp
    const n = Math.round(num * 10) / 10

      weatherContainer.innerHTML += `<div>
        <h1>Today's weather in: ${data.name}<h1/>
        <h2>${n}</h2>
        <h3>${data.weather[0].description}</h3>
        
        </div>`
    }) 
/*
var number = 12.3456789
var rounded = Math.round(number * 10) / 10

function myFunction() {
  var num = 5.56789;
  var n = num.toFixed(2);
  document.getElementById("demo").innerHTML = n;
}
*/

fetch(StockholmForecastAPI)
  .then((response) => {

    return response.json()
  })

  .then((json) => {
    //console.log(json)
  const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
    console.log(filteredForecast)
    filteredForecast.forEach((day) => {
        let min = day.main.temp_min
        let max = day.main.temp_max //change these two to fells like and temp instead? No difference btw max and min from this API. 
        console.log(min, max)

        let nextDays = new Date(day.dt_txt)
        let weekdayInteger = nextDays.getDay()
        console.log(day.dt_txt)
        console.log(weekday[weekdayInteger])
    })
  })

// fetch the data from the API. Then if you console.log the json
// you'll see that we only care about the array called list.

//const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
// filteredForecast is now an array with only the data from 12:00 each day.