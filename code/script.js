//console.log('hej hej')
const StockholmAPI = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=1f53b6ca8e6cbcf1c51848ca6c257778'
const StockholmForecastAPI = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=1f53b6ca8e6cbcf1c51848ca6c257778'
const cityName = document.getElementById('cityName') //TA BORT om vi aldrig använder den
const weatherContainer = document.getElementById('weatherContainer')
const forecastContainer = document.getElementById('forecastContainer')
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
    
    const temp = data.main.temp
    const tempRounded = Math.round(temp * 10) / 10 //eller toFixed()
    const date = new Date((data.dt) * 1000); //amount of milliseconds passed since January 1st 1970
    const sunriseDate = new Date((data.sys.sunrise) * 1000);
    const sunsetDate = new Date((data.sys.sunset) * 1000);
    
      weatherContainer.innerHTML += `<div>
        <h1>Today's weather in: ${data.name}<h1/>
        <h2>${tempRounded}°</h2>
        <h3>${data.weather[0].description}</h3>
        <h3>${data.name}</h3>                
        <h5>Date: ${date.toLocaleDateString('sv-SE', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</h5>
        <h5>Time: ${date.getHours()}:${date.getMinutes()}</h5>
        <h5>Sunrise: ${sunriseDate.getHours()}:${sunriseDate.getMinutes()}</h5>
        <h5>Sunset: ${sunsetDate.getHours()}:${sunsetDate.getMinutes()}</h5>
        </div>`
    }) 

fetch(StockholmForecastAPI)
  .then((response) => {
    return response.json()
  })

  .then((data) => {
    //console.log(data)
  const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
    console.log(filteredForecast)
    filteredForecast.forEach((day) => {
        let temp = day.main.temp
        let feelsLike = day.main.feels_like //change these two to fells like and temp instead? No difference btw max and min from this API. 
        const image = feelsLike 
        if (feelsLike =< 0) {
          'Group16.png'
        } else if (feelsLike <= 5) {
          'Group34.png'
        } else if (feelsLike > 5) {
          'Group36.png'
        } else (feelsLike > 15) { //kan tas bort senare, stå endast else
          'Group37.png'
        }

        console.log(temp, feelsLike)

        let nextDays = new Date(day.dt_txt)
        let weekdayInteger = nextDays.getDay()
        console.log(day.dt_txt)
        console.log(weekday[weekdayInteger])

        forecastContainer.innerHTML += `<div>
        <h3>${weekday[weekdayInteger]}<h3>
        <h3>Temp: ${temp}°</h3>
        <h3>Feels like: ${image} ${feelsLike}°</h3>
        </div>
        `

    })
  })

// fetch the data from the API. Then if you console.log the json
// you'll see that we only care about the array called list.

//const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
// filteredForecast is now an array with only the data from 12:00 each day.