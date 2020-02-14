const containerTodayCity = document.getElementById("todaysweathercity")
const containerTodayCelsius = document.getElementById("todaysweathercelsius")
const containerTodayCloud = document.getElementById("containertodaycloud")
const containerSunrise = document.getElementById("sunrise")
const containerSunset = document.getElementById("sunset")
    


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

    let sunset = new Date(json.sys.sunset * 1000)
    let sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' });

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
    })

    .catch((err) =>{
      console.log("caught error", err)
    })

