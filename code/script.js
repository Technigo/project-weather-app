// URL (rename to URL and capitals)
const URLDAILYWEATHER = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=2ecf28ca2c29fa0578cb610c6c66c223'
const URLWEEKLYWEATHER = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=2ecf28ca2c29fa0578cb610c6c66c223'

// All the DOM selectors stored as short variables
const containerDailyWeather = document.getElementById('containerDailyWeather')
const dailyTemp = document.getElementById('dailyTemp') 
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const city = document.getElementById('location')
const iconDailyWeather = document.getElementById('iconDailyWeather')
const mainWeather = document.getElementById('mainWeather')

// fetch URL for daily weather (can make it shorter - one line)
fetch (URLDAILYWEATHER)
    // recive the response and unpack it
    .then((response) => {
        return response.json()
    })
    // recive the unpacked response and do something with the data
    .then((data) => {
        console.log("daily URL", data)

        // round up todays temperature, no decimal
        const temp = data.main.temp
        const roundedTemp = temp.toFixed()
        dailyTemp.innerHTML = `Todays temperature: ${roundedTemp}`

        // sunrise and sunset
        const sunriseHour = new Date((data.sys.sunrise)*1000).toLocaleTimeString('se-SE', {hour:'numeric', minute: 'numeric'})
            
            sunrise.innerHTML = `Sunrise: ${sunriseHour}`
        
        const sunsetHour = new Date(data.sys.sunset*1000).toLocaleTimeString('se-SE', {hour:'numeric', minute: 'numeric'})
            sunset.innerHTML = `Sunset: ${sunsetHour}`

        // get todays weather in weatehr-array using map to iterate and find right object and then return the value
        const fetchDailyWeather = data.weather.map(
            (weatherData) => {
            return weatherData.description
            })
            city.innerHTML = `The weather in + ${data.name}:`
            mainWeather.innerHTML = `${fetchDailyWeather}`

        // icon 
        //const fetchIconDailyWeather = data.weather.map(
          //  (weatherIcon) => {
          //  return weatherIcon.icon
          //  })
          //  iconDailyWeather.innerHTML += `<img src="${fetchIconDailyWeather}" alt="icon">`

            let fetchIconDailyWeather = 'http://openweathermap.org/img/wn/' + data.weather[0].icon +'@2x.png'
            {
                iconDailyWeather.innerHTML += `<img src="${fetchIconDailyWeather}" alt="weather icon">`
            }    
    })
        

    //.cath(error => {}) always something we should do. Add if else to first .then() depending on what to return
    .catch( err => {
        //console.error(err)
        containerDailyWeather.innerHTML = 'error!' + err
    })    
    .finally(() => console.log('Request finished'))
    //.finally(() => console.log(Request finished)) always executed, dont have to do it this week.

    // fetch URL for weekly forecast
    fetch (URLWEEKLYWEATHER)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log("weekly URL",data)
            //copied from step 4
            //const filteredForcast = data.list.filter(item => item.dt_txt.includes('12:00'))
            //console.log(filteredForcast)
        })