//DOM selectors
const body = document.getElementById('body');
const header = document.getElementById('header');
//const currentWeather = document.getElementById('currentWeather');
const temperature = document.getElementById('temperature');
const city = document.getElementById('city');
const clearOrCloudy = document.getElementById('clearOrCloudy');
const weatherWeek = document.getElementById('weatherWeek');
const weekday = document.getElementById('weekday');
/*const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');*/
const containerSunrise = document.getElementById("sunrise")
const containerSunset = document.getElementById("sunset")

    fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=98bd2fbedad0f13ae05ed8e49698fda1')
    .then((response) => {
        return response.json()
    })
    .then ((json) => {
        console.log(json)
        
        //Current temperature
        const currentTemp = json.list[0].main.temp.toFixed(0)
        temperature.innerHTML += `${currentTemp}°c `

        //Name of city
        city.innerHTML += json.city.name
        
        //Current weather (clody/rainy etc)
        const currentWeather = json.list[0].weather[0].main
        clearOrCloudy.innerHTML += `${currentWeather}`

        //Sunrise and sunset //*1000 because it is milliseconds
        let sunrise = json.city.sunrise;
        let sunriseDate = new Date(sunrise * 1000).toLocaleString().split(", ").slice(0).join(", ") //get the slice-method to work

        containerSunrise.innerHTML = `<h2> Sunrise: ${sunriseDate} </h2>`
    
        let sunset = json.city.sunset;
        let sunsetDate = new Date(sunset*1000).toLocaleString().split(", ").slice(0).join(", ") //get the slice-method to work

        containerSunset.innerHTML = `<h2> Sunset: ${sunsetDate} </h2>`

      const changeBackground = (() => {
        if (currentWeather === "Clouds") {
            header.style.backgroundImage = `url(https://images.pexels.com/photos/96622/pexels-photo-96622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`
        
        } else if (currentWeather === "Rain") {
            header.style.backgroundImage = `url(https://images.pexels.com/photos/96622/pexels-photo-96622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`
        
        } else {
            header.style.backgroundImage = `url(https://images.pexels.com/photos/96622/pexels-photo-96622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`
        }
      })
      changeBackground()
   
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
        const dailyWeather = filteredForecast[i].weather[0].main
        const feelsLike = filteredForecast[i].main.feels_like.toFixed(0)
        let day
          day = new Date(filteredForecast[i].dt * 1000).toLocaleDateString("en-US", {weekday: 'long'})
          //console.log(day)
        
        weatherWeek.innerHTML += 
            `<div class = "weekday id="weekday">
                <p class = "day"> ${day} </p>
                <p class = "rain-or-sun" id="rainOrSun${i}"> ${dailyWeather} </p>
                <p class = "day-temp"> ${dailyTemp}°C </p>     
                <p class = "feels-like"> Feels like ${feelsLike}°C</p>
            </div>`

             const rainOrSun = document.getElementById(`rainOrSun${i}`) // kolla upp ${i}
             const showWeatherIcon = () => { // this functions replaces the currentWeather (which from the API could be displayed as "Rain" or "Clouds") with a suitable icon. 
              if (dailyWeather === "Clear") { // lägg till några fler if else-statements och ikoner
                  rainOrSun.innerHTML = `<img class="weather-icon" src="https://img.icons8.com/office/2x/sun.png">`
                } 
                
                else if (dailyWeather === "Rain") {
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
