
//Global variables 
const apiKey = '43ee05c8ec60084b95ea75a9da28cc5f'
let APIURL_1 = ''
let apiForecast_1 = ''
const yourCity = document.getElementById('city')
const submit = document.getElementById('submit')
const selectedCity = document.getElementById('selected-city')
const typeAndTemperature = document.getElementById('temperature')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')


//Website start here 
const start = () => {
   
    getLocation()
    weatherApp()
}

//Activates once Search button is pressed and assigns the city to the fetch url
const selectCity = (city) => {
    
    APIURL_1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`
    apiForecast_1 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${apiKey}`
    weatherApp() 
}

 
//Daily weather 
const weatherApp = () => {
    document.querySelector('.weather').style.display = 'block'
    document.querySelector('.current-weather-text').style.display = 'block'

    fetch (APIURL_1)
    .then ((response) => {
        return response.json()
    })
    .then ((weather) => {
      yourCity.innerHTML = `${weather.name}`

      typeAndTemperature.innerHTML = `${weather.weather[0].main} | ${weather.main.temp.toFixed(1)}&#176C` 
      changeColor(weather.main.temp)  
      const timezoneOffset = new Date ().getTimezoneOffset() * 60
      const sunriseTime = new Date ((weather.sys.sunrise + weather.timezone + timezoneOffset) * 1000)
      
      const sunsetTime = new Date ((weather.sys.sunset + weather.timezone + timezoneOffset) * 1000)
      sunrise.innerHTML = `
        <p> 
            ${sunriseTime.getHours() > 9 ? sunriseTime.getHours(): '0' + sunriseTime.getHours()}.${sunriseTime.getMinutes() > 9 ? sunriseTime.getMinutes(): '0' + sunriseTime.getMinutes()}
        </p>`
        sunset.innerHTML = `
        <p>
            ${sunsetTime.getHours()}.${sunsetTime.getMinutes()} 
        </p>`
    }).catch(err => {

        document.querySelector('body').style.height = '79vh'
        document.querySelector('.weather').style.display = 'none'
        document.querySelector('.current-weather-text').style.display = 'none'
    }) 

    forecastWeather() //starts forecast
}

//Forecast weather 
const forecastWeather = () => {
    document.getElementById('forecast-container').innerHTML = `` 
    document.querySelector('.forecast__list ').style.display = 'block'

    fetch (apiForecast_1)
    .then ((response) => {
        return response.json()
    })
    .then ((forecast) => {
      const filteredForecast = forecast.list.filter(item => item.dt_txt.includes('12:00'))     
      filteredForecast.forEach((day) => {
        const icon = day.weather[0].icon
        forecastDay = new Date (day.dt_txt).toLocaleString('en-us',{ weekday:'short'})
        document.getElementById('forecast-container').innerHTML += `
        <div class="forecast-day-wrapper">
            <div class="forecast__day">
                ${forecastDay}
            </div>
            <div class="forecast__icon">
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" />
            </div>
            <div class="forecast__temp">
                ${day.main.temp.toFixed(1)} &#176C
            </div>
        </div>
        `
        document.querySelector('html').style.height = '1500px'
        }) 
                                                                                             
    }).catch(err => {
        document.querySelector('.forecast__list ').style.display = 'none'

    }) 
}

const getLocation = () => {
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(geographicUrl)
    } else (
        alert ("Your browser doesn't support the geolocation feature")
    )
}

//fetch city based on position
const geographicUrl = (position) => {
    if (position !== undefined){
        APIURL_1 = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`
        apiForecast_1 = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`
    }
    
    //fetches the weather, now that the fetch URL:s are geolocation-based
    weatherApp()
}

const changeColor = (temperature) => {

    if (temperature >= 20) {
        document.querySelector('html').style.background = 'var(--hot)'
    }
    else if (temperature >= 10) {
      document.querySelector('html').style.background = 'var(--kindaHot)'
    }
    else if (temperature >= 0) {
        document.querySelector('html').style.background = 'var(--lessHot)'
    }
    else if (temperature >= -10) {
        document.querySelector('html').style.background = 'var(--aLittleCold)'
    }
    else {
        document.querySelector('html').style.background  = 'var(--okayItsCold)'
    } 
  }

// Function to start 
start()

//Event Listener
submit.addEventListener('click', (event) => {
    event.preventDefault()

    if (selectedCity.value === '') {
        alert('Please enter your city name')
    } 
    selectCity (selectedCity.value)

})




