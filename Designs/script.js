const weatherData = document.getElementById("weatherdata")
const weatherToday = document.getElementById("weather-today")
const weatherForecast = document.getElementById("weather-forecast")
const dropdownCities = document.getElementById("dropdown-cities")



const API_URL =
    "https://api.openweathermap.org/data/2.5/weather?q=cityname&units=metric&APPID=5caaaf25021b2d7aa4d206126b6a3351"
const API_Forecast =
    "https://api.openweathermap.org/data/2.5/forecast?q=cityname&units=metric&APPID=5caaaf25021b2d7aa4d206126b6a3351"
const getData = () => {
    //made global function so we can call from different areas in the code
   
	fetch(API_URL.replace("cityname", currentCity))
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            let now = new Date()
            now.setFullYear(2000, 1, 1)

            let sunrise = data.sys.sunrise
            sunrise = new Date(sunrise * 1000)
            sunrise.setFullYear(2000, 1, 1)
           
            let sunset = data.sys.sunset
            sunset = new Date(sunset * 1000)
            sunset.setFullYear(2000, 1, 1) //set time for specific day to compare hours and minutes
        
            let isSunRise = sunrise.getHours >= now.getUTCHours() && sunrise.getMinutes() >= now.getUTCMinutes()

            weatherToday.innerHTML = /* html */ `
                <div class="weather-container-div">
                    <p id="temp-now">${data.main.temp.toFixed(1)}°C</p>
                    <p id="city-now">${data.name}</p>
                    <p id="weather-now">${data.weather[0].description}</p>
                    <div class="sunrise-sunset">
                    <span>sunrise</span>
                    <span>${new Date((data.sys.sunrise + data.timezone) * 1000).toLocaleTimeString([], { timeStyle: "short" })}</span>
                    <span>sunset</span>
                    <span>${new Date((data.sys.sunset + data.timezone) * 1000).toLocaleTimeString([], { timeStyle: "short" })}</span>
                    </div>
                </div>
      ` // toFixed(1) rounds the temp to one decimal
            // time
            temp = data.main.temp
            var mobil = window.matchMedia("(max-width: 700px)")

            if(mobil.matches){

                const nav = document.getElementById("nav")
                const meny = document.getElementById("menu-btn")
                const ham = document.getElementsByClassName(".menu-icon")

               // makes the fontcolor change depending on the background day or night 
               const drop = document.getElementById("drop")
               const drop1 = document.getElementById("drop1")
               const drop2 = document.getElementById("drop2")
               const drop3 = document.getElementById("drop3")
               const drop4 = document.getElementById("drop4")
               const drop5 = document.getElementById("drop5")


                // background & navbar changing color depending on day/night & temperature 
                if (temp >= 25 && temp <= 65) {
                    if (sunrise) {
                        nav.style.background = "var(--dayphone)"
                        weatherToday.style.background = "var(--imgd)"
                        weatherToday.style.color = "black"
                        drop.style.color = "black"
                            drop1.style.color = "black"
                            drop2.style.color = "black"
                            drop3.style.color = "black"
                            drop4.style.color = "black"
                            drop5.style.color = "black"

                            meny.style.color = "black"


                    } else {
                        nav.style.background = "var(--nightphone)"
                        weatherToday.style.background = "var(--imgn)"
                        weatherToday.style.color = "white"
                        drop.style.color = "white"
                        drop1.style.color = "white"
                        drop2.style.color = "white"
                        drop3.style.color = "white"
                        drop4.style.color = "white"
                        drop5.style.color = "white"

                        meny.style.color = "white"
                     
                    }  } if (temp >= 0 && temp <= 24) {
                        if (sunset < now) {
                            nav.style.background = "var(--nightphone)"
                            weatherToday.style.background = "var(--imgn)"
                            weatherToday.style.color = "white"
                            drop.style.color = "white"
                            drop1.style.color = "white"
                            drop2.style.color = "white"
                            drop3.style.color = "white"
                            drop4.style.color = "white"
                            drop5.style.color = "white"
                            
                            meny.style.color = "white"

                            

                        } else {
                            nav.style.background = "var(--dayphone)"
                            weatherToday.style.background = "var(--imgd)"
                            weatherToday.style.color = "black"
                            drop.style.color = "black"
                            drop1.style.color = "black"
                            drop2.style.color = "black"
                            drop3.style.color = "black"
                            drop4.style.color = "black"
                            drop5.style.color = "black"

                            meny.style.color = "black"
                        }
                    } if (temp >= -40 && temp <= -1) {
                        if (sunrise) {
                            nav.style.background = "var(--dayphone)"
                            weatherToday.style.background = "var(--imgd)"
                            weatherToday.style.color = "black"
                            drop.style.color = "black"
                            drop1.style.color = "black"
                            drop2.style.color = "black"
                            drop3.style.color = "black"
                            drop4.style.color = "black"
                            drop5.style.color = "black"

                            meny.style.color = "black"

                        } else {
                            nav.style.background = "var(--nightphone)"
                            weatherToday.style.background = "var(--imgn)"
                            weatherToday.style.color = "white"
                            drop.style.color = "white"
                            drop1.style.color = "white"
                            drop2.style.color = "white"
                            drop3.style.color = "white"
                            drop4.style.color = "white"
                            drop5.style.color = "white"

                            meny.style.color = "white"

                        }
                    }  }  



else{ 
            if (temp >= 25 && temp <= 65) {
                if (sunrise) {
                    weatherToday.style.background = "var(--hot)"

                } else {
                    weatherToday.style.background = "var(--hotnight)"
					weatherToday.style.color = "var(--textcolornight)"
                }
            }
            if (temp >= 0 && temp <= 24) {
                if (sunset < now) {
                    weatherToday.style.background = "var(--moderatenight)"
				
                } else {
                    weatherToday.style.background = "var(--moderate)"
                }} 
                
                if (temp >= -40 && temp <= -1) {
                if (sunrise) {
                    weatherToday.style.background = "var(--cold)"
                } else {
                    weatherToday.style.background = "var(--coldnight)"
                }
            } } 
         

             } )   
        .catch((error) => console.error("Error: ", error))
        .finally(() => console.log("Request done"))
    



  fetch(API_Forecast.replace('cityname', currentCity))
    .then((res) => res.json())
    .then((forecast) => { 
        const filteredForecast = forecast.list.filter(day =>
        day.dt_txt.includes("12:00")
        )
        weatherForecast.innerHTML='';

        filteredForecast.forEach(day => {

            const date = new Date(day.dt * 1000)
            const dayName = date.toLocaleDateString("en-US", { weekday: "long" })
            const weekTemp = day.main.temp.toFixed(0)
        
            weatherForecast.innerHTML += `<p>${dayName}</p>
             <p>🌡️${weekTemp}°C</p>
            <p>Feels like ${day.main.feels_like.toFixed(1)}°C</p>
           <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"/>`      
    })  
  })
  
}


//Forecast is showing the upcoming 5 days
const handleWeatherApiResponse = (forecastForCity) => {
    console.log(forecastForCity)
    weatherToday.innerHTML = `
  <p>City: ${forecastForCity.name}</p>
  <p>Temp: ${forecastForCity.main.temp.toFixed(1)}°C</p>
  <p>Weather: ${forecastForCity.weather[0].description}</p>
  `
}

//Activating the Hamburger Menu to select another city
const onCityChanged = (event) => {
    document.querySelector(".menu-btn").checked = false 
    
    
    console.log(event.target.dataset.cityname)
    currentCity = event.target.dataset.cityname
    getData()
   
}

//Setting the default city
const getDefaultCity = () => {
   
    let cities = document.querySelectorAll("[data-cityname]")
  
    return cities[0].dataset.cityname //dataset is an object with all data attributes inside https://www.w3schools.com/tags/att_global_data.asp
}

//choose a city in the Hamburger Menu on click
const initializeCitySelector = () => {
    console.log("begin initializeCitySelector")
    let cities = document.querySelectorAll("[data-cityname]")
    cities.forEach((element) => {
        console.log("adding event listener")
        element.addEventListener("click", onCityChanged)
        
    })
    console.log("finished initializeCitySelector")
    
}


initializeCitySelector()
let currentCity = getDefaultCity() //a function to get default city
getData()