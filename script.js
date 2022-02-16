// Global DOM Selectors
const body = document.querySelector('body')
const topSection = document.getElementById('topSection')
const middleSection = document.getElementById('middleSection')
// const weatherQuip = document.createElement('h1');
const bottomSection = document.getElementById('bottomSection')

// Testing Testing
fetch('https://api.openweathermap.org/data/2.5/weather?q=Gothenburg,Sweden&units=metric&APPID=1d70a07080ab5151e3f54886ea0d8389')
  .then((res) => res.json())
  .then((data) => {
    console.log('data', data);
    console.log(data.sys.sunrise);
    console.log(data.sys.sunset);
    console.log(data.weather[0].main);
    console.log(data.dt);
    const weatherDescription = data.weather[0].description
    if (data.weather[0].main.includes("Clear")) {
      body.classList.add("sunny")
      body.classList.remove("cloudy")
      body.classList.remove("rainy")
    } else if (data.weather[0].main.includes("Clouds")) {
      body.classList.remove("sunny")
      body.classList.add("cloudy")
      body.classList.remove("rainy")
    } else {
      body.classList.remove("sunny")
      body.classList.remove("cloudy")
      body.classList.add("rainy")
    }
    const todayTemp = Math.round(data.main.temp)
    middleSection.innerHTML = `
    <h1>${data.name}</h1>
    <p>${todayTemp}°</p>
    <p>${weatherDescription}</p>
    `
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
  });

// weather[0].main: Clear = Sunny, Clouds = Cloud, Rain = Rain
// Documentation from openweathermap https://openweathermap.org/weather-conditions