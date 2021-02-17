//////// TO-DO ///////
//[X] [_] färgerna 
//[_] ikoner för väder + animation
//[_] 0:a framför 7 etc.
//[_] responsiveness
//[_] Fixa formen och lägga till text för användaren 
//[_] Lägga till land också i rubrik  
//[_] fixa så att default location hämtas från browserns GPS grejsimojs

const city = document.getElementById('city')
let apiUrl_1 = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=43ee05c8ec60084b95ea75a9da28cc5f'
let apiUrl_2 = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=43ee05c8ec60084b95ea75a9da28cc5f'
let apiForecast_1 = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=43ee05c8ec60084b95ea75a9da28cc5f'
let apiForecast_2 = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=43ee05c8ec60084b95ea75a9da28cc5f'
const generalUrl = "https://api.openweathermap.org/data/2.5/weather?q=metric&APPID=43ee05c8ec60084b95ea75a9da28cc5f"
const submit = document.getElementById('submit')
const form = document.getElementById('form')
const selectedCountry = document.getElementById('country')
const selectedCity = document.getElementById('selected-city')
const typeAndTemperature = document.getElementById('temperature')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')

const start = () => {
    weatherApp()
    forecastWeather()
}

const selectCity = (country, city) => {
    let cityChosen = `${city},${country}` 

    apiUrl_2 = `https://api.openweathermap.org/data/2.5/weather?q=${cityChosen}&units=metric&APPID=43ee05c8ec60084b95ea75a9da28cc5f`
    apiForecast_2 = `https://api.openweathermap.org/data/2.5/forecast?q=${cityChosen}&units=metric&APPID=43ee05c8ec60084b95ea75a9da28cc5f`
    weatherApp() 
    forecastWeather() 
 }


const weatherApp = () => {      //flytta ut printandet av forecast och temperatur så att det kan hända utan att behöva trycka
    console.log("innan första fetchen lyckades")
    fetch (apiUrl_2)
    .then ((response) => {
        return response.json()
    })
    .then ((weather) => {
      city.innerHTML = weather.name
      typeAndTemperature.innerHTML = ` ${weather.weather[0].main} | ${weather.main.temp.toFixed(1)}&#176C` 
      console.log(typeAndTemperature)
      changeColor(weather.main.temp)  
      const sunriseTime = new Date (weather.sys.sunrise * 1000)
      //const currentHours = 10
      //const fixedSunriseTime = if (currentHours < 10) {currentHours = '0'+currentHours}
      sunrise.innerHTML = `${sunriseTime.getHours()}.${sunriseTime.getMinutes()}`
      const sunsetTime = new Date (weather.sys.sunset* 1000)
      sunset.innerHTML = `${sunsetTime.getHours()}.${sunsetTime.getMinutes()}`
      console.log(sunsetTime)  
    })

    
}

const forecastWeather = () => {
    document.getElementById('container').innerHTML = ``
    fetch (apiForecast_2)
    .then ((response) => {
        return response.json()
    })
    .then ((forecast) => {
        const filteredForecast = forecast.list.filter(item => item.dt_txt.includes('12:00'))

        /* const icon = filteredForecast.weather[0].icon */
        
        filteredForecast.forEach((day) => {
            console.log('here is day:')
            console.log(day)
            const icon = day.weather[0].icon
            forecastDay = new Date (day.dt_txt)

       
          document.getElementById('container').innerHTML += `
          <li>
          <div class="day">${forecastDay.toLocaleString('en-us', { weekday: 'short'})}</div><div class="temp"><img src="https://openweathermap.org/img/wn/${icon}@2x.png" />${day.main.temp.toFixed(1)} &#176C</div></li>`
        })      //                                                                                           ^put sun/cloud symbol inside this div
    })
}

const changeColor = (temperature) => {

    /* temperature = -20 //DEBUG BECOME GOD MAKE HOT */

    if (temperature >= 20) {
        document.querySelector('body').style.background = 'var(--hot)'
    }
    else if (temperature >= 10) {
      document.querySelector('body').style.background = 'var(--kindaHot)'
    }
    else if (temperature >= 0) {
        document.querySelector('body').style.background = 'var(--lessHot)'
    }
    else if (temperature >= -10) {
        document.querySelector('body').style.background = 'var(--aLittleCold)'
    }
    else if (temperature <= -20) {
        document.querySelector('body').style.background  = 'var(--okayItsCold)'
    }
  }


// This function to start 
start()

//Event Listeners
submit.addEventListener('click', (e) => {
    e.preventDefault()
    // console.log(selectedCountry.options[selectedCountry.selectedIndex].value)
    // console.log(selectedCity)
    // console.log(selectedCity.options[selectedCity.selectedIndex].value)
    console.log(selectedCity.value)
    selectCity (selectedCountry.value, selectedCity.value)
    
    //selectCity (selectedCountry.options[selectedCountry.selectedIndex].value, selectedCity.options[selectedCity.selectedIndex].value)
})


/* const city = document.getElementById('city')
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=43ee05c8ec60084b95ea75a9da28cc5f'
const apiForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=43ee05c8ec60084b95ea75a9da28cc5f'
const typeAndTemperature = document.getElementById('temperature')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')

const weatherApp = () => {
    fetch (apiUrl)
    .then ((response) => {
        return response.json()
    })
    .then ((weather) => {
      city.innerHTML = weather.name
      typeAndTemperature.innerHTML = ` ${weather.weather[0].description} | ${weather.main.temp.toFixed(1)} °`   
      const sunriseTime = new Date (weather.sys.sunrise * 1000)
      //const currentHours = 10
      //const fixedSunriseTime = if (currentHours < 10) {currentHours = '0'+currentHours}
      sunrise.innerHTML = `sunrise ${sunriseTime.getHours()}.${sunriseTime.getMinutes()}`
      const sunsetTime = new Date (weather.sys.sunset* 1000)
      sunset.innerHTML = `sunset ${sunsetTime.getHours()}.${sunsetTime.getMinutes()}`
     
     console.log(sunsetTime)
      
    })
}
weatherApp()

const forecastWeather = () => {
    fetch (apiForecast)
    .then ((response) => {
        return response.json()
    })
    .then ((forecast) => {
      const filteredForecast = forecast.list.filter(item => item.dt_txt.includes('12:00'))
      //console.log(filteredForecast)

      filteredForecast.forEach((anka) => {
         forecastDay = new Date (anka.dt_txt)
         //console.log(forecastDay)
            console.log("anka:")
            console.log(anka)
            document.getElementById('container').innerHTML += `<li>${forecastDay.toLocaleString('en-us', {  weekday: 'short' })} ${anka.main.temp.toFixed(1)} °</li>`
            console.log("forecastDay:")
            console.log(forecastDay)
            console.log(new Date());
        })
        
    })
}
forecastWeather() */

