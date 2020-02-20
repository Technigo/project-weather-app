let city = 'tokyo'


///// GET LOCATION /////

/* 
// getLocation()

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.")
  }
}
// const latitude = ""
// const longitude = ""

function showPosition(position) {
  latitude = position.coords.latitude
  longitude = position.coords.longitude
  console.log(position.coords.latitude)
  console.log(position.coords.longitude)
}

*/

//console.log("Defult city: " + city)



///// City from HTML form /////
const chooseCity = () => {
  city = document.getElementById("city").value;
  console.log("City from form: " + city)
}



///// WEATHER MAIN /////

const weather = (otherCity) => {

  const currentContainer = document.getElementById("current");
  const forecastContainer = document.getElementById("forecast");

  if (otherCity) {
    city = otherCity
  }
  //console.log(city)




  ///// CURRENT /////

  fetch(
      //`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=c333ad1637e15b11d381a890076be47b`
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c333ad1637e15b11d381a890076be47b`
    )
    .then((response) => {
      return response.json();
    })
    .then((json) => {

      //console.log(json);

      const cityName = json.name
      const temprature = json.main.temp
      const tempratureFeels = json.main.feels_like
      const wind = json.wind.speed
      const clouds = json.clouds.all
      const mainWeather = json.weather[0].main
      const descWeather = json.weather[0].description
      const warmCold = (json.main.feels_like >= 0) ? "warm" : "cold" // degrees warm or cold

      //const conditions = ["few", "clear", "thunderstorm"]

      const pre = (descWeather.includes("few") || descWeather.includes("clear") || descWeather.includes("thunderstorm")) ? "a" : "some" // if pre and descWeather      

      //returns "good" or "bad" or ""
      const goodBad = goodOrBad(mainWeather, clouds, wind, temprature)

      // changing class on body to good or bad 
      document.body.className = goodBad

      currentContainer.innerHTML = `<h1>I spot ${pre} ${descWeather} in ${cityName} right now<h1>`
      currentContainer.innerHTML += `<h1>— and it feels like it's about ${round(tempratureFeels, 0)} degrees ${warmCold}<h1>`
      currentContainer.innerHTML += `<h1>This will be a ${goodBad} day!<h1>`

      sunrise = localTime(json.sys.sunrise, json.timezone)
      sunset = localTime(json.sys.sunset, json.timezone)

      //console.log(sunset + sunrise)

      currentContainer.innerHTML += `<h3>The sun was rising at ${sunrise} this morning and will be setting at ${sunset} tonight</h3>`


      console.log(`Main weather:${mainWeather}, Cloud:${clouds}, Wind:${wind}, Temp:${temprature}`)
      console.log("Good or bad: " + goodBad)

    });




  ///// FORECAST /////

  fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=c333ad1637e15b11d381a890076be47b`
    )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      //console.log(json);
      const filterTime = 12 // What time to forcast
      const timeZone = json.city.timezone / 3600 //timezone difference from UTC in hours
      const localFilterTime = timeFilter(filterTime, timeZone) // Converts to local time in 3hour steps

      console.log(`UTC forcast time: ${localFilterTime}:00`)
      console.log(`Local forcast time: ${localFilterTime+timeZone}:00`)

      //filters the list using UTC time, closest 3 hour to 12:00 local time 
      const filteredForecast = json.list.filter(item => item.dt_txt.includes(`${localFilterTime}:00`))

      //const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))

      forecastContainer.innerHTML = `<h1>Be prepered! </h1>`



      ///// PRINTING EACH DAY /////

      for (let index = 0; index < filteredForecast.length; index++) {

        const date = new Date(filteredForecast[index].dt * 1000)

        // Just getting weekday
        const options = {
          weekday: 'long',
          //month: 'long',
          //day: 'numeric'
        };

        // getting day
        const day = date.toLocaleDateString('en-GB', options)

        const temp = round(filteredForecast[index].main.temp, 1)
        const weather = filteredForecast[index].weather[0].description
        const iconType = filteredForecast[index].weather[0].icon
        const iconFile = "https://openweathermap.org/img/wn/" + iconType + ".png"
        const pre = (weather === "clear sky" || weather === "few clouds") ? "a" : "some" // if pre and descWeather

        //const image = ""

        // Printing each day
        forecastContainer.innerHTML += `<div class="day"> <h2>${day} will bring you ${pre} ${weather}</h2><img src="${iconFile}">  <h3>${temp} &#176;C</h3></div>`
        // <div id="day${index}"></div>
      }

    });
}


///// ROUND TO SPECIFIC DECIMAL //////

const round = (number, decimal) => {
  const rounded = Math.round(number * (Math.pow(10, decimal))) / (Math.pow(10, decimal))
  return rounded
}


///// CONVERTING TO LOCAL TIME //////

const localTime = (timeSeconds, timeZone) => {

  const timeInLocal = new Date(timeSeconds * 1000) //sunrise in local time
  const localOffset = timeInLocal.getTimezoneOffset() * 60 //local offset in seconds
  const cityOffset = timeZone //city time zone offset from UTC in seconds

  //console.log(timeInLocal)

  seconds = timeInLocal.getSeconds()
  timeInLocal.setSeconds(seconds + cityOffset + localOffset)

  //console.log(timeInLocal)

  return timeInLocal.toLocaleDateString([], {
    timeStyle: 'short',
  })

}

// Filter local time closest to 12:00 in 3 hour steps 

const timeFilter = (filterTime, timezone) => {
  let result = filterTime - timezone
  //console.log(result)
  result = result + ((result + result % 3) % 3) // result - (result % 3) turns the result to a divider of 3 by removing the remainder
  //console.log(result)
  return result
}


////// GOD OR BAD ALGO /////

const goodOrBad = (main, clouds, wind, temprature) => {
  const bad = ["Thunderstorm", "Drizzle", "Rain", "Snow", "Mist", "Smoke", "Haze", "Dust", "Fog", "Sand", "Ash", "Squall", "Tornado"]

  //const badWeather = (main === bad) ? true : false;

  // badWeather is true if main can be found in bad
  const badWeather = bad.includes(main)

  // console.log("main: " + main)
  // console.log("bad weather: " + badWeather)

  if (!badWeather && clouds <= 25 && wind <= 10 && temprature >= 20) {
    return "good"
  } else if (badWeather || (clouds >= 85 && wind >= 50) || temprature <= 5) {
    return "bad"
  } else {

  }
}



///// FIND GOOD WEATHER /////

const findGoodWeather = () => {

  // List of cities
  const cities = ["stockholm", "las vegas", "los angeles", "sydney", "madrid", "dubai", "cape town", "havana", "nice", "hawaii", "loja", "sao paulo", "canary islands", "malaga", "san diego", "cyprus", "morocco"]
  //const cities = []


  ///// USING JSON LIST OF CITIES /////

  /* 
  fetch(
      `https://raw.githubusercontent.com/mahemoff/geodata/master/cities_with_countries.txt`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      console.log(json[0].city);

      generate random number from array lenght
      check if it's already been checked, is on index list
      if generate new number
        if not check if it has good weather 
      if good weather 
        weather(city)
      if not add index number to array 
        and check new number
      if not found on 40 tries return, not found try again

      json.forEach(element => {
        cities.push(element.city)
      })
      console.log(cities)
  */

  const goodWeatherCities = []
  let randomCity = "No good weather found"
  let i = 0

  cities.forEach(element => {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${element}&units=metric&appid=c333ad1637e15b11d381a890076be47b`
      )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        const cityName = json.name
        const temprature = json.main.temp
        const wind = json.wind.speed
        const clouds = json.clouds.all
        const mainWeather = json.weather[0].main
        const goodBad = goodOrBad(mainWeather, clouds, wind, temprature)

        //console.log("Search name: " + element)
        console.log("City name: " + cityName)
        console.log("Good or bad weather: " + goodBad)
        if (goodBad === "good") {
          goodWeatherCities.push(element)
        }
        // console.log('good list: ' + goodWeatherCities)

        return goodWeatherCities
      })
      .then((list) => {
        i++
        console.log("City number: " + i)

        if (i === cities.length) {
          randomCity = random(list)
          console.log('List before random: ' + list)
          console.log('Random result: ' + randomCity)
          weather(randomCity)
        }
      })

  })

  // })

}

///// Random position in array /////

const random = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}