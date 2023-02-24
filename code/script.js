/* Variables for selected DOM elements*/ 
const weatherContainer = document.getElementById('weather-container')
const header = document.getElementById('header')
const forecast = document.getElementById ('forecastContainer')


const API_KEY ='1e44a1eb4b1cc06a35110dc386aa96bd';


  //fetches todays weather for user's location (placed in the weather-container div)
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=Barcelona,Spain&units=metric&appid=${API_KEY}`)
  .then((response) => {
      return response.json()
  })
  .then((data) => {
     console.log(data)
     header.innerHTML += `
     <div> 
     <p>${data.weather[0].main} | ${(Math.round(data.main.temp))}°</p>
    </div>

    <div>
      <p>sunrise ${new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})} </p>
    </div>
      
    <div>
      <p>sunset ${new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})} </p>
    </div>
    `
  })


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Barcelona,Spain&units=metric&appid=${API_KEY}`)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
  // / If/else statement that displays different designs depending on what weather it is.
  const change = () => {
    if (json.weather[0].main === "Clouds") {
      weatherContainer.innerHTML =`<img src="./images/noun_Cloud_.svg" alt="cloud"/>`;
      weatherContainer.innerHTML += ` 
      <h1>Light a fire and get cosy. ${json.name} is looking grey today.</h1> `;
      document.body.style.backgroundColor = "#F4F7F8";
      document.body.style.color = "#F47775";
    } else if (json.weather[0].main === "Rain") {
      weatherContainer.innerHTML = `<img src="./images/noun_Umbrella.svg" alt="umbrella"/>`;
      weatherContainer.innerHTML += `
      <h1>Don't forget your umbrella. It's wet in ${json.name} today.</h1> `;
      document.body.style.backgroundColor = "#A3DEF7";
      document.body.style.color = "#164A68";
    } else if (json.weather[0].main === "Clear") {
      weatherContainer.innerHTML = `<img src="./images/Sunglasses.svg" alt="sunglasses"/>`;
      weatherContainer.innerHTML += `
      <h1>Get your sunnies on. ${json.name} is looking rather great today.</h1>`;
      document.body.style.backgroundColor = "#F7E9B9";
      document.body.style.color = "#2A5510";
    } else 
      weatherContainer.innerHTML += `<div>
    <h1> Not any special weather in ${json.name} today, you could expect anything</h1> </div>`;
      };
    
change();
    })

//Gets the days for the forecast weather
const getDay = (weekday) => {
    const dates = new Date(weekday * 1000); 
    return dates.toLocaleDateString('en', {weekday: 'short'}); 
    }

     //fetches weather forecast for next 5 days (placed in the forecastContainer)
const fetchWeatherForecast = () => {
    fetch (`https://api.openweathermap.org/data/2.5/forecast?q=Barcelona,Spain&units=metric&APPID=${API_KEY}`)
        .then ((response) => {
        return response.json()
        })
        .then((json) => {
            console.log(json)
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))   //filters so that we only get the temp from 12 o'clock

        forecast.innerHTML += `
        <div class = "weekdays">
            <div class="day">${getDay(filteredForecast[0].dt)}</div>
            <div class="temp">${filteredForecast[0].main.temp.toFixed(0)}°</div>
        </div>
        
        <div class = "weekdays">
            <div class="day">${getDay(filteredForecast[1].dt)}</div>
            <div class="temp">${filteredForecast[1].main.temp.toFixed(0)}°</div>
        </div>
        
        <div class = "weekdays">
            <div class="day">${getDay(filteredForecast[2].dt)}</div>
            <div class="temp">${filteredForecast[2].main.temp.toFixed(0)}°</div>
        </div>
        
        <div class = "weekdays">
            <div class="day">${getDay(filteredForecast[3].dt)}</div>
            <div class="temp">${filteredForecast[3].main.temp.toFixed(0)}°</div>
        </div>
        
        <div class = "weekdays">
            <div class="day">${getDay(filteredForecast[4].dt)}</div>
            <div class="temp">${filteredForecast[4].main.temp.toFixed(0)}°</div>
        </div>`
        })
    }
    fetchWeatherForecast ()
