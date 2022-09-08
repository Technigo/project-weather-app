//DOM selectors
const body = document.getElementById('body')
const header = document.getElementById('header')
const currentWeather = document.getElementById('currentWeather')
const temperature = document.getElementById('temperature')
const city = document.getElementById('city')
const clearOrClody = document.getElementById('clearOrCloudy')
const sunriseSunset = document.getElementById('sunriseSunset')
const weatherWeek = document.getElementById('weatherWeek')
const weekday = document.getElementById('weekday')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=98bd2fbedad0f13ae05ed8e49698fda1')
    .then((response) => {
        return response.json()
    })
    .then ((json) => {
        //console.log(json)
        city.innerHTML += json.name
    })
    .catch((err) => {
        console.log('caught error', err)
    })


//Array displaying the days of the week
/*const dayOfTheWeek = ['Today', 'Tomorrow', 'Day after tomorrow', 'Three days from now', 'Four days from now']
for (let i = 0; i < dayOfTheWeek.length; i++) { // a for-loop function allowing me to loop through the items in the array. 
    //console.log(dayOfTheWeek[i])
    //här måste kanske flyttas in i dayOfTheWeek? så att man kan använda sig av materialet från API:n och ersätta tomorrow osv med datumet... eller nåt
}*/

//Fetching the API for the weekly forecast
fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=98bd2fbedad0f13ae05ed8e49698fda1')
    .then((response) => {
        return response.json()
    })

    .then ((data) => {
        console.log(data)
        const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00')) //here we have made an array where only the weather at 12.00 will show. 
        console.log(filteredForecast)

        // This loop prints the days of the weeks and the temperatures belonging to each day (not correct)
       for (let i=0; i < filteredForecast.length; i++) {
        console.log(i)
        
        const dailyTemp = filteredForecast[i].main.temp.toFixed(0)
        const currentWeather = filteredForecast[i].weather[0].main
        const feelsLike = filteredForecast[i].main.feels_like.toFixed(0)
        const dayOfTheWeek = [`${filteredForecast[i].dt}`, `${filteredForecast[i].dt}`, `${filteredForecast[i].dt}`, `${filteredForecast[i].dt}`, `${filteredForecast[i].dt}`]
        
        
        let day
        day = new Date(filteredForecast[i].dt * 1000)
        console.log(day)
        
        weatherWeek.innerHTML += 
            `<div class = "weekday id="weekday">
                <p class = "day"> ${day} </p>
                <p class = "rain-or-sun" id="rainOrSun${i}"> ${currentWeather} </p>
                <p class = "day-temp"> ${dailyTemp}°C </p>     
                <p class = "feels-like"> Feels like: ${feelsLike}°C</p>
            </div>`

             const rainOrSun = document.getElementById(`rainOrSun${i}`) // kolla upp ${i}
             const showWeatherIcon = () => { // this functions replaces the currentWeather (which from the API could be displayed as "Rain" or "Clouds") with a suitable icon. 
              if (currentWeather === "Clear") { // lägg till några fler if else-statements och ikoner
                  rainOrSun.innerHTML = `<img class="weather-icon" src="https://img.icons8.com/office/2x/sun.png">`
                } 
                
                else if (currentWeather === "Rain") {
                rainOrSun.innerHTML = `<img class="weather-icon" src="https://img.icons8.com/fluency/2x/rain.png">`
                } 
                
                else {
                  rainOrSun.innerHTML = `<img class="weather-icon" src="https://img.icons8.com/ultraviolet/2x/cloud.png">`
                }
            }
            showWeatherIcon()
          } 
    })

    .catch((err) => {
        console.log('caught error', err)
    })

        //never use the same id in several places! understand what daniel means