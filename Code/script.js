const containerBody = document.getElementById("body")

const containerTodayCity = document.getElementById("todaysweathercity")
const containerTodayCelsius = document.getElementById("todaysweathercelsius")
const containerSunrise = document.getElementById("sunrise")
const containerSunset = document.getElementById("sunset")

const containerDayOne = document.getElementById("dayone")
const containerFiveDays = document.getElementById("forecast")   


fetch("https://api.openweathermap.org/data/2.5/weather?q=stockholm,Sweden&units=metric&APPID=8ba6b8f613b670c947149eaad6fdfef7")
  .then((response) => {
    return response.json();
  })
  .then ((json) => {
    // Display city name
    containerTodayCity.innerHTML = `<h1> ${json.name} </h1>`
    //Display current temp and current weather description
    containerTodayCelsius.innerHTML = `<h1>  ${json.main.temp.toFixed(0)}<sup>°C</sup> and ${json.weather[0].description} </h1>`

    // Display sunrise and sunset times

    let sunrise = new Date(json.sys.sunrise * 1000)
    let sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' });

    containerSunrise.innerHTML = `<h2> Sunrise: ${sunriseTime} </h2>`

    const sunset = new Date(json.sys.sunset * 1000)
    const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' });

    containerSunset.innerHTML = `<h2> Sunset: ${sunsetTime} </h2>`

    //Change color of the background

    const weatherId = json.main.temp

    if (weatherId === 2 ) {
      containerBody.style.background = "#DFDCD4"
    }
    else if (weatherId >= 4 ) {
      containerBody.style.background = "#FFF7EE"
    }
    else if (weatherId <= 1,9 ) {
      containerBody.style.background = "#FBBDAF"
    }

  })
  .catch((err) =>{
    console.log("caught error", err)
  })


  fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8ba6b8f613b670c947149eaad6fdfef7")
    .then((response) => {
    return response.json();
    })

    .then ((json) => {

      //Display current 5 days
      const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'));

      //console.log(filteredForecast);
      containerFiveDays.innerHTML = "";
      filteredForecast.forEach(day => {
        const date = new Date(day.dt * 1000)
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let dayOfWeek = weekdays[date.getDay()];
        
        containerFiveDays.innerHTML += `<h2> ${dayOfWeek} ${day.main.temp.toFixed(0)} <sup>°C</sup> </h2>`
      })
    })

    .catch((err) =>{
    })
