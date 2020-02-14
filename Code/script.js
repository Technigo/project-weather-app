const containerTodayCity = document.getElementById("todaysweathercity")
const containerTodayCelsius = document.getElementById("todaysweathercelsius")
const containerTodayCloud = document.getElementById("containertodaycloud")
const containerSunrise = document.getElementById("sunrise")
const containerSunset = document.getElementById("sunset")

const containerDayOne = document.getElementById("dayone")
const containerFiveDays = document.getElementById("forecast")
    


fetch("https://api.openweathermap.org/data/2.5/weather?q=stockholm,Sweden&units=metric&APPID=8ba6b8f613b670c947149eaad6fdfef7")
  .then((response) => {
    return response.json();
  })
  .then ((json) => {
    console.log(json);
    containerTodayCity.innerHTML = `<h1>  City: ${json.name} </h1>`
    containerTodayCelsius.innerHTML = `<h1> °C ${json.main.temp.toFixed(0)} </h1>`
    containerTodayCloud.innerHTML = `<h1> Feels like ${json.weather[0].main}</h1>`

    //let sunrise = json.sys.sunrise;
    //let sunriseDate = new Date(sunrise*1000);

    let sunrise = new Date(json.sys.sunrise * 1000)
    let sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' });

    containerSunrise.innerHTML = `<h2> 🔝 ${sunriseTime} </h2>`

    //let sunset = json.sys.sunset;
    //let sunsetDate = new Date(sunset*1000);

    const sunset = new Date(json.sys.sunset * 1000)
    const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' });

    containerSunset.innerHTML = `<h2> 🔙 ${sunsetTime} </h2>`
    })
  .catch((err) =>{
    console.log("caught error", err)
  })



  fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8ba6b8f613b670c947149eaad6fdfef7")
    .then((response) => {
    return response.json();
    })

    .then ((json) => {
      console.log(json);
      const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'));

      console.log(filteredForecast);
      containerFiveDays.innerHTML = "";
      filteredForecast.forEach(day => {
        const date = new Date(day.dt * 1000)
        const dayOfWeek = date.getDay()
        console.log(day)
        containerFiveDays.innerHTML += `<p> ${dayOfWeek} ${day.main.temp.toFixed(0)} °C </p>`
      
      })
      
    })

    .catch((err) =>{
      console.log("caught error", err)
    })

