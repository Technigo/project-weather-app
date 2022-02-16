// Global DOM Selectors
const body = document.querySelector('body')
const topSection = document.getElementById('topSection')
const middleSection = document.getElementById('middleSection')
// const weatherQuip = document.createElement('h1');
const bottomSection = document.getElementById('bottomSection')
const horizontalRule = document.getElementsByClassName('horizontal-rule');

//Global variable
let weatherDescriptionObj = {}

fetch('https://api.openweathermap.org/data/2.5/forecast?q=Gothenburg,Sweden&units=metric&APPID=1d70a07080ab5151e3f54886ea0d8389')
  .then((res) => res.json())
  .then((data) => {
        console.log(`fetch forecast`, data)
        const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00')); //array with the next five days' forecast
        // console.log("filteredForecast '12:00'", filteredForecast)

        filteredForecast.forEach((dayObj) => {
          const d = new Date(dayObj.dt * 1000).toLocaleDateString("en", {
            
            weekday: "short"
          }).toLowerCase();
          
          const temp_ = Math.round(dayObj.main.temp)
          bottomSection.innerHTML += 
          `
          <div id="forecastContainer" class="forecast-container">
            <p class="weekday">${d}</p>
            <div class="forecast-container__right">
              <img class="weatherIcon--small" width="50vw" src="http://openweathermap.org/img/wn/${dayObj.weather[0].icon}@2x.png"/>
              <p class="weekdayTemp">${temp_}°</p>
            </div>
          </div>
          <hr class="horizontal-rule">
          `
        })
        if (weatherDescriptionObj["desc"] === "Clear") {
          document.querySelectorAll(".horizontal-rule").forEach(item => item.className = "horizontal-rule hr--sunny")
        } else if (weatherDescriptionObj["desc"] === "Clouds") {
          document.querySelectorAll(".horizontal-rule").forEach(item => item.className = "horizontal-rule hr--cloudy")
        } else {
          document.querySelectorAll(".horizontal-rule").forEach(item => item.className = "horizontal-rule hr--rainy")
        }
          
    });


fetch('https://api.openweathermap.org/data/2.5/weather?q=Gothenburg,Sweden&units=metric&APPID=1d70a07080ab5151e3f54886ea0d8389')
  .then((res) => res.json())
  .then((data) => {
    // console.log('weather data', data);
    // console.log(data.weather[0].main);
    const weatherDescription = data.weather[0].description
    weatherDescriptionObj["desc"] = data.weather[0].main;

    if (data.weather[0].main.includes("Clear")) {
      body.className = "sunny"
      middleSection.innerHTML = `
      <img id="weatherIcon" class="weather-icon" src="Designs/Design-2/icons/noun_Sunglasses_2055147.svg" />
      <h1 id="weatherQuip" class="weather-quip">Get your sunnies on. ${data.name} is looking rather great today.</h1>
      `
      horizontalRule.forEach((item) => item.className = "horizontal-rule hr--sunny")
    } else if (data.weather[0].main.includes("Clouds")) {
      body.className = "cloudy"
      middleSection.innerHTML = `
      <img id="weatherIcon" class="weather-icon" src="Designs/Design-2/icons/noun_Cloud_1188486.svg" />
      <h1 id="weatherQuip" class="weather-quip">Light a fire and get cosy. ${data.name} is looking grey today.</h1>
      `
      console.log(document.querySelectorAll(".horizontal-rule"))
    } else { // if the word == "Rain"
      body.className = "rainy"
      middleSection.innerHTML = `
      <img id="weatherIcon" class="weather-icon" src="Designs/Design-2/icons/noun_Umbrella_2030530.svg" />
      <h1 id="weatherQuip" class="weather-quip">Don't forget your umbrella. It's wet in ${data.name} today.</h1>
      `
    }
<<<<<<< HEAD
    
    //SUNRISE_SUNSET section
    //Converting sys sunrise in API from seconds to milliseconds  - then to local SE time HH:MM
    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString('sv-SE', {
      hour: '2-digit', 
      minute: '2-digit'
    })
    
    //Tried to apply sunriseTime to different time zones - returned the whole date string
    // const sunriseTime = new Date((data.sys.sunrise + new Date().getTimezoneOffset()
    //  * 60 + data.timezone) * 1000).toTimeString('sv-SE', {
    //   hour: '2-digit', 
    //   minute: '2-digit'
    // })

    //Converting sys sunset in API from seconds to milliseconds  - then to local SE time HH:MM
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString('sv-SE', {
      hour: '2-digit', 
      minute: '2-digit'
    })
    
    //Adding sunriseTime + SunsetTime into correct HTML ID of topsection
     topSection.innerHTML =`
     <p>sunrise ${sunriseTime}</p>
     <p>sunset ${sunsetTime}</p>`
=======
    const todayTemp = Math.round(data.main.temp)
    // middleSection.innerHTML = `
    // <h1>${data.name}</h1>
    // <p>${todayTemp}°</p>
    // <p>${weatherDescription}</p>
    // `
>>>>>>> styling
  });

// weather[0].main: Clear = Sunny, Clouds = Cloud, Rain = Rain
// Documentation from openweathermap https://openweathermap.org/weather-conditions