//DOM selectors
const body = document.getElementById('body')
const header = document.getElementById('header')
const currentWeather = document.getElementById('currentWeather')
const temperature = document.getElementById('temperature')
const city = document.getElementById('city')
const clearOrClody = document.getElementById('clearOrCloudy')
const sunriseSunset = document.getElementById('sunriseSunset')
const weatherWeek = document.getElementById('weatherWeek')
const rainOrSun = document.getElementById('rainOrSun')
const weekday = document.getElementById('weekday')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=98bd2fbedad0f13ae05ed8e49698fda1')
    .then((response) => {
        return response.json()
    })
    .then ((json) => {
        console.log(json)
        city.innerHTML += json.name
    })
    .catch((err) => {
        console.log('caught error', err)
    })


//Array displaying the days of the week
const dayOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
for (let i = 0; i < dayOfTheWeek.length; i++) { // a for-loop function allowing me to loop through the items in the array. 
    //console.log(dayOfTheWeek[i])
}

//Fetching the API for the weekly forecast
fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=98bd2fbedad0f13ae05ed8e49698fda1')
    .then((response) => {
        return response.json()
    })

    .then ((data) => {
        // console.log(data)
        const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00')) //here we have made an array where only the weather at 12.00 will show. The array contains 5 objects (Mon-Fri) of which themselves are arrays. 
        console.log(filteredForecast)

        // This loop prints the days of the weeks and the temperatures belonging to each day. 
       for (let i=0; i < filteredForecast.length; i++) {
        //console.log(i)
        
        const dailyTemp = filteredForecast[i].main.temp.toFixed(0)
        const currentWeather = filteredForecast[i].weather[0].main
        const feelsLike = filteredForecast[i].main.feels_like.toFixed(0)
        
        const showWeatherIcon = () => {
            if (currentWeather === "Clear") {
                weatherWeek.innerHTML += `<div☀️</div>`
              } 
              
              else if (currentWeather === "Rain") {
              weatherWeek.innerHTML += `<div>🌧</div>`
              } 
              
              else {
                weatherWeek.innerHTML += `<div>☁️</div>`
              }
        }
        showWeatherIcon()
         //varför kan jag inte lägga in detta
        
        weatherWeek.innerHTML += 
            `<div class = "weekday id="weekday">
                <p class = "day"> ${dayOfTheWeek[i]} </p>
                <p class="rain-or-sun" id="rainOrSun"> ${currentWeather} </p>
                <p class = "day-temp"> ${dailyTemp}°C </p>     
                <p class = "feels-like"> Feels like: ${feelsLike}°C</p>
            </div>`
             //Tanken är att Clouds/rain ska ersättas av emojin som i dagsläget ligger utanför div:en. 
        } 
    })

    .catch((err) => {
        console.log('caught error', err)
    })
      