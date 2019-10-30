const tempToday = document.getElementById(`tempToday`)
const city = document.getElementById(`city`)
const description = document.getElementById(`description`)
const sun = document.getElementById(`sun`)
const forecast = document.getElementById(`forecast`)
const weatherAPI = `http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=d1862226e2bf07d0d8d418921e586230`



fetch(weatherAPI)
  .then((respons) => {
    return respons.json()
  })

  .then((json) => {

    //City, Temp and type of weather
    tempToday.innerHTML = `<h1>${json.main.temp.toFixed(1)}&deg;C</h1>`
    city.innerHTML = `<h2>${json.name}</h2>`
    description.innerHTML = `<h3>${json.weather[0].description}</h3>`

  })


fetch(weatherAPI)
  .then((respons) => {
    return respons.json()

      .then((json) => {

        const unixTimestampSunrise = json.sys.sunrise;
        const unixTimestampSunset = json.sys.sunset;

        const sunrise1 = new Date(unixTimestampSunrise * 1000);
        const sunset1 = new Date(unixTimestampSunset * 1000);

        const sunriseTime = sunrise1.toLocaleTimeString([], { timeStyle: "short" });
        const sunsetTime = sunset1.toLocaleTimeString([], { timeStyle: "short" });

        sun.innerHTML = `<h4>Sunrise ${sunriseTime} Sunset ${sunsetTime}</h4>`

      })
  })

//5 Days forecast


fetch(`http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=d1862226e2bf07d0d8d418921e586230`)
  .then((respons) => {
    return respons.json()

      .then((json) => {

        forecast.innerHTML = `<p>  ${json.list[1].main.temp_max.toFixed()}&deg; / ${json.list[1].main.temp_min.toFixed()} &deg;C</p>`

      })
  })
