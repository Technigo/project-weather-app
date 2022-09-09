//DOM selectors
const body = document.getElementById('body');
const header = document.getElementById('header');
const currentWeather = document.getElementById('currentWeather');
const temperature = document.getElementById('temperature');
const city = document.getElementById('city');
const clearOrClody = document.getElementById('clearOrCloudy');
const weatherWeek = document.getElementById('weatherWeek');
const weekday = document.getElementById('weekday');
/*const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');*/
const containerSunrise = document.getElementById("sunrise")
const containerSunset = document.getElementById("sunset")



fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=455f64f6a8511735296b1b7919c56f46')
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

    
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=455f64f6a8511735296b1b7919c56f46')
    .then((response) => {
        return response.json()
    })
    .then ((json) => {
        console.log(json)
       
        let sunrise = json.sys.sunrise;
        let sunriseDate = new Date(sunrise*1000);

        containerSunrise.innerHTML = `<h2> Sunrise: ${sunriseDate} </h2>`
    
        let sunset = json.sys.sunset;
        let sunsetDate = new Date(sunset*1000);

        containerSunset.innerHTML = `<h2> Sunset:${sunsetDate} </h2>`

      
    })
    
    


//Fetching the API for the weekly forecast
fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=98bd2fbedad0f13ae05ed8e49698fda1')
    .then((response) => {
        return response.json()
    })

    .then ((data) => {
        console.log(data)
        const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00')) //here we have made an array where only the weather at 12.00 will show. 
        console.log(filteredForecast)

        //This loop prints the days of the weeks and the temperatures belonging to each day 
       for (let i=0; i < filteredForecast.length; i++) {
        //console.log(i)
        
        const dailyTemp = filteredForecast[i].main.temp.toFixed(0)
        const currentWeather = filteredForecast[i].weather[0].main
        const feelsLike = filteredForecast[i].main.feels_like.toFixed(0)
        let day
          day = new Date(filteredForecast[i].dt * 1000).toLocaleDateString("en-US", {weekday: 'long'})
          //console.log(day)
        
        weatherWeek.innerHTML += 
            `<div class = "weekday id="weekday">
                <p class = "day"> ${day} </p>
                <p class = "rain-or-sun" id="rainOrSun${i}"> ${currentWeather} </p>
                <p class = "day-temp"> ${dailyTemp}°C </p>     
                <p class = "feels-like"> Feels like ${feelsLike}°C</p>
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
