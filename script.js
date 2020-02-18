let city = 'tokyo'
console.log(city)

const chooseCity = () => {
  city = document.getElementById("city").value;
  console.log(city)
}

const weather = (otherCity) => {

  const currentContainer = document.getElementById("current");
  const forecastContainer = document.getElementById("forecast");

  if (otherCity) {
    city = otherCity
  }
  console.log(city)


  // CURRENT

  fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e6dd4de800de3576c7c23ef944a736c4`
    )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      //console.log(json);
      currentContainer.innerHTML = `<h1>I spot some ${json.weather[0].description}<h1>`
      currentContainer.innerHTML += `<h1>in ${json.name}<h1>`
      currentContainer.innerHTML += `<h1>and it feels like it's ${round(json.main.feels_like)} degrees<h1>`

      sunrise = localTime(json.sys.sunrise, json.timezone)
      sunset = localTime(json.sys.sunset, json.timezone)

      //console.log(sunset + sunrise)

      currentContainer.innerHTML += `<p>The sun was rising at ${sunrise}<p>`
      currentContainer.innerHTML += `<p>The sun was setting at ${sunset}<p>`

      const temprature = json.main.temp
      const wind = json.wind.speed
      const clouds = json.clouds.all
      const rain = (json.weather[0].main === 'Snow' || json.weather[0].main === 'Rain') ? true : false;

      document.body.className = goodOrBad(rain, clouds, wind, temprature)
      console.log(goodOrBad(rain, clouds, wind, temprature))
      console.log(rain, clouds, wind, temprature)
      console.log(json.weather[0].main)


    });

  currentContainer.innerHTML += `<p>One more line<p>`

  // FORECAST

  fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=e6dd4de800de3576c7c23ef944a736c4`
    )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      const filterTime = 12 // What time to forcast
      const timeZone = json.city.timezone / 3600 //timezone difference from UTC in hours
      const localFilterTime = timeFilter(filterTime, timeZone) // Converts to local time in 3hour steps

      console.log(localFilterTime)

      //filters the list using UTC time, closest 3 hour to 12:00 local time 
      const filteredForecast = json.list.filter(item => item.dt_txt.includes(`${localFilterTime}:00`))

      //const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))

      forecastContainer.innerHTML = `Here is the 5 day forcast for ${json.city.name}`

      for (let index = 0; index < filteredForecast.length; index++) {

        const date = new Date(filteredForecast[index].dt * 1000)
        const day = date.toLocaleDateString(['en-GB'], {
          dateStyle: 'full',
        })

        const temp = round(filteredForecast[index].main.temp)
        const weather = filteredForecast[index].weather[0].description
        const iconType = filteredForecast[index].weather[0].icon
        const iconFile = "http://openweathermap.org/img/wn/" + iconType + ".png"

        const image = ""

        forecastContainer.innerHTML += `<div id="day${index}"> <h1>${day}</h1><p>${localFilterTime+timeZone}:00 local time<p> <p>${temp} &#176;C</p> <p>${weather}</p> <img src="${iconFile}"></div>`

      }



      // container.innerHTML += `<h1>in ${json.name}<h1>`
      // container.innerHTML += `<h1>and it feels like it's ${round(json.main.feels_like)} degrees<h1>`

      // sunrise = localTime(json.sys.sunrise, json.timezone)
      // sunset = localTime(json.sys.sunset, json.timezone)

      // console.log(sunset + sunrise)

      // container.innerHTML += `<p>The sun was rising at ${sunrise}<p>`
      // container.innerHTML += `<p>The sun was setting at ${sunset}<p>`

    });
}

const round = (number) => {
  const rounded = Math.round(number * 10) / 10
  return rounded
}

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


const goodOrBad = (rain, clouds, wind, temprature) => {
  if (!rain && clouds < 20 && wind < 10 && temprature >= 18) {
    return "good"
  } else if (rain || clouds > 80 && wind > 50 || temprature < 5) {
    return "bad"
  } else {

  }
}

// Function to filter local time closest to 12 in 3 hour steps 

const timeFilter = (filterTime, timezone) => {
  let result = filterTime - timezone
  console.log(result)
  result = result + ((result + result % 3) % 3) // result - (result % 3) turns the result to a divider of 3 by removing the remainder
  console.log(result)
  return result
}

const goodCities = []

const goodWeather = () => {

  // fetch(
  //     `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e6dd4de800de3576c7c23ef944a736c4`
  //   )
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((json) => {
  //     console.log(json);
  //   })

  const cities = ["stockholm", "helsinki", "las vegas", "los angeles", "sidney", "madrid", "oman"]

  cities.forEach(element => {
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${element}&units=metric&appid=e6dd4de800de3576c7c23ef944a736c4`
      )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        const temprature = json.main.temp
        const wind = json.wind.speed
        const clouds = json.clouds.all
        const rain = (json.weather[0].main === 'Snow' || json.weather[0].main === 'Rain') ? true : false;
        console.log(element)
        console.log(goodOrBad(rain, clouds, wind, temprature))
        if (goodOrBad(rain, clouds, wind, temprature) === "good") {
          goodCities.push(element)
        }
        console.log('list ' + goodCities)
      })

  });
  randomCity = goodCities[Math.floor(Math.random() * goodCities.length)];
  console.log('list ' + goodCities)
  console.log('random ' + randomCity)
}