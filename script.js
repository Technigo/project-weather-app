const cityName = document.getElementById('city')
const temperature = document.getElementById('temperature')
const typeOfWeather = document.getElementById('typeOfWeather')
const icon = document.getElementById('icon')
const minTemp = document.getElementById('min-temp')
const maxTemp = document.getElementById('max-temp') 
const bottomSection = document.getElementById('bottom-section')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')


const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=147b874875d53e0e9f84cbacd0567b99'
    fetch(API_LINK)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        cityName.innerHTML = json.name
        icon.innerHTML += `<img width="150" src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png" alt="" />`
        temperature.innerHTML = `${json.main.temp.toFixed(1)}°C`
        typeOfWeather.innerHTML = json.weather[0].description

        const sunriseConvert = new Date((json.sys.sunrise) * 1000);
        const sunriseTime = sunriseConvert.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
      
          sunrise.innerHTML = `Sunrise: ${sunriseTime}`;
    
          const sunsetConvert = new Date((json.sys.sunset) * 1000);
          const sunsetTime = sunsetConvert.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
      
            sunset.innerHTML = `Sunset: ${sunsetTime}`;
    
        //   console.log(json)
        
    })

const API_LINK_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=147b874875d53e0e9f84cbacd0567b99'
    fetch(API_LINK_FORECAST)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
        console.log("Filter", filteredForecast)
        const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];
       

        filteredForecast.forEach((day) => {
            const date = new Date(day.dt * 1000) //converted numbers to right format, in this case Weekdays.
            
            bottomSection.innerHTML += `

            <div class="forecast-data">     
                <p class="forecast-day">${weekDays[date.getDay()]}</p> 
                <p class="forecast-description">${day.weather[0].description}</p>
                <img class="forecast-icon"src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"/>

                <p class="forecast-temp">Min: ${day.main.temp_min.toFixed(1)}°C</p> 
                <p class="forecast-temp">Max: ${day.main.temp_max.toFixed(1)}°C</p> 
            </div>
            `
            console.log(weekDays[date.getDay()])
 
        })

        console.log(json)
    })

    // <p>${date.toLocaleDateString('en-US', {
    //     weekday: 'short'
    // })}</p>
    
    

