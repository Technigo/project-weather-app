//DOM selectors
const header = document.getElementById('header');
const temperature = document.getElementById('temperature');
const city = document.getElementById('city');
const clearOrCloudy = document.getElementById('clearOrCloudy');
const weatherWeek = document.getElementById('weatherWeek');
const weekday = document.getElementById('weekday');
const containerSunrise = document.getElementById("sunrise")
const containerSunset = document.getElementById("sunset")
const menuBtn = document.getElementById("menuIcon")

//The fetch-request for the data in the header
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
    let sunriseDate = new Date(sunrise * 1000).toLocaleTimeString([], {
        hour: '2-digit', minute: '2-digit' //converts time to only show hours and minutes 
    })
    containerSunrise.innerHTML = `<h2> sunrise ${sunriseDate} </h2>`
    
    let sunset = json.city.sunset;
    let sunsetDate = new Date(sunset*1000).toLocaleTimeString([], {
        hour: '2-digit', minute: '2-digit' 
    })
    containerSunset.innerHTML = `<h2> sunset ${sunsetDate} </h2>`

    //This function changes the backgorund in the header depending on the current weather
    const changeBackground = (() => {
        if (currentWeather === "Clouds") {
            header.style.backgroundImage = `url(https://images.pexels.com/photos/209845/pexels-photo-209845.jpeg?auto=compress&cs=tinysrgb&w=1700)`
        } 
        
        else if (currentWeather === "Rain") {
            header.style.backgroundImage = `url(https://images.pexels.com/photos/2259232/pexels-photo-2259232.jpeg?auto=compress&cs=tinysrgb&w=1700)`
        } 
        
        else if (currentWeather === "Clear") {
            header.style.backgroundImage = `url(https://images.pexels.com/photos/96622/pexels-photo-96622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`
        }
        
        else if (currentWeather === "Thunderstorm") {
            header.style.backgroundImage = `url(https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`
        }

        else if (currentWeather === "Snow") {
            header.style.backgroundImage = `url(https://images.pexels.com/photos/954710/pexels-photo-954710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`
            header.style.color = "black"
        }
        
        else {
            header.style.backgroundImage = `url(https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`
        }
      })
    changeBackground()
    })

    
//The fetch-request for the data in the weekly forecast
fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=98bd2fbedad0f13ae05ed8e49698fda1')
    .then((response) => {
        return response.json()
    })

    .then ((data) => {
    console.log(data)
    const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00')) //here we have made an array where only the weather at 12.00 GMT will be shown. 
    console.log(filteredForecast)

    //A loop for the five day forecast showing weather/temperature and "feels like" for each day 
    for (let i=0; i < filteredForecast.length; i++) {
    //console.log(i)
    
    //Variables for the temperature, weather and "feels like", "to fixed" rounds the temperature to two digits.
    const dailyTemp = filteredForecast[i].main.temp.toFixed(0)
    const dailyWeather = filteredForecast[i].weather[0].main
    const feelsLike = filteredForecast[i].main.feels_like.toFixed(0)
    
    // Converted date data from the json to readable format, and en-US = language and "short" shortens the weekdays to three letters
    let day
    day = new Date(filteredForecast[i].dt * 1000).toLocaleDateString("en-US", {weekday: 'short'})
        //console.log(day)
        
    weatherWeek.innerHTML += 
        `<div class = "weekday id="weekday">
            <p class = "day"> ${day} </p>
            <p class = "rain-or-sun${i}"> ${dailyWeather} </p>
            <p class = "day-temp"> ${dailyTemp}°C </p>     
             <p class = "feels-like"> Feels like ${feelsLike}°C</p>
        </div>`

    // This functions replaces the currentWeather with a suitable icon
    const rainOrSun = document.querySelector(`.rain-or-sun${i}`)
        const showWeatherIcon = () => { 
            if (dailyWeather === "Clear") { 
                rainOrSun.innerHTML = `<img class="weather-icon" src="https://img.icons8.com/offices/344/sun.png">`
            } 
                
            else if (dailyWeather === "Rain" || dailyWeather === "Drizzle") {
                rainOrSun.innerHTML = `<img class="weather-icon" src="https://img.icons8.com/offices/344/rain.png">`
            } 

            else if (dailyWeather === "Thunderstorm") {
                rainOrSun.innerHTML = `<img class="weather-icon" src="https://img.icons8.com/offices/344/cloud-lighting.png">`
            }

            else if (dailyWeather === "Snow") {
                rainOrSun.innerHTML = `<img class="weather-icon" src="https://img.icons8.com/offices/344/snow.png">`
                header.style.color = "black"
            }
                
            else if (dailyWeather === "Clouds") {
                rainOrSun.innerHTML = `<img class="weather-icon" src="https://img.icons8.com/offices/344/clouds.png">`
            }

            else {
                rainOrSun.innerHTML = `<img class="weather-icon" src="https://img.icons8.com/offices/344/fog-night.png">`
            }
            }
        showWeatherIcon()
          } 
    })

.catch((err) => {
    console.log('caught error', err)
    })

// Eventlistener for the menu button. If we had more time the user could have had the choice to look at the weather in a different city
//using the menu button.
menuBtn.addEventListener('click', (event) => {
    console.log("i'm clicking")
})