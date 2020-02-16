// Todays weather
fetch('https://api.openweathermap.org/data/2.5/weather?q=Malmo,Sweden&units=metric&APPID=302165d90858a8a500d4198d9bc63d2b')
  .then((response) => {
    return response.json()
  })
  .then((json) => {

    // Convert milliseconds to HH:MM
    const timeFormat = (ms) => {
      let time = new Date(ms * 1000).toLocaleTimeString([], {
        timeStyle: 'short'
      })
      return time;
    }

    // Geolocation test
    const geoBtn = document.getElementById("geo");

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        geoBtn.innerHTML = "Geolocation is not supported by this browser.";
      }
    }

    function showPosition(position) {
      let coordLat = position.coords.latitude
      let coordLong = position.coords.longitude
      let apiString = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordLat}&lon=${coordLong}&appid=302165d90858a8a500d4198d9bc63d2b`
      console.log(apiString)
    }

    getLocation()


    // Print out to DOM
    document.querySelector('#city').innerHTML = json.name
    document.querySelector('#description').innerHTML = json.weather[0].description
    document.querySelector('#temperature').innerHTML = `${json.main.temp.toFixed(1)}°`
    document.querySelector('#wind').innerHTML = `${json.wind.speed.toFixed(1)} m/s`

    document.querySelector('#sunrise').innerHTML = timeFormat(json.sys.sunrise)
    document.querySelector('#sunset').innerHTML = timeFormat(json.sys.sunset)

  })
  .catch((err) => {
    console.log("oops error", err)
  })

// 5 day forecast
fetch('https://api.openweathermap.org/data/2.5/forecast?q=Malmo&units=metric&appid=302165d90858a8a500d4198d9bc63d2b')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    // Filter the forecast list array to get info from 06:00 each day
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('06:00'))

    // Return weekday
    const getDayOfWeek = (param) => {

      let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let date = new Date(param * 1000);
      let specificDay = date.getDay();

      return weekdays[specificDay]
    }

    // Loops through filteredForecast
    filteredForecast.forEach(day => {
      document.querySelector('#forecast').innerHTML += `<p>${getDayOfWeek(day.dt)} ${day.main.temp.toFixed(1)}° ${day.wind.speed.toFixed(1)}m/s</p>`
    })

  })
  .catch((err) => {
    console.log("oops error", err)
  })