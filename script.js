const container = document.getElementById("weathers");
const sunriseContainer = document.getElementById("sunrise");
const sunsetContainer = document.getElementById("sunset");

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=45a10c27e52d21ffc58df69a934778b7"
)
  .then(response => {
    return response.json();
  })
  .then(json => {
    //const container2 = document.getElementById("description");
    weathers.innerHTML = `<h1> ${json.name} </h1>`;
    description.innerHTML = `<h1>${json.main.temp.toFixed(1)}°c </h1><h2>${
      json.weather[0].description
      }</h2>`;

    const unixTimestampSunrise = json.sys.sunrise;
    let sunrise = new Date(unixTimestampSunrise * 1000);
    let sunriseTime = sunrise.toLocaleString([], { timeStyle: "short" });
    sunriseContainer.innerHTML = `<h3> Sunrise ${sunriseTime}</h3>`;

    /* TO BE UPDATED 
    const icon = `<img src="https://openweathermap.org/img/wn/${time.weather[0].icon}.png"`
    /*json.main.weather.description // 'partly cloudy'
    const currentWeather = json.main.weather.description

    if (currentWeather === 'coudy') {
      document.getElementById('imageContainer').innerHTML = '<img src="/images/couds.jpg" />'
    }*/


    const unixTimestampSunset = json.sys.sunset;
    let sunset = new Date(unixTimestampSunset * 1000);
    let sunsetTime = sunset.toLocaleString([], { timeStyle: "short" });
    sunsetContainer.innerHTML = `<h3> Sunset ${sunsetTime}</h3>`;

    console.log(json);
    console.log(weatherAsJSON)
  });

//// FORECAST ////
fetch(
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&cnt=&APPID=45a10c27e52d21ffc58df69a934778b7"
)
  .then(response => {
    return response.json();
  })
  .then(json => {

    const dates = {}
    json.list.forEach((weather) => {

      const date = weather.dt_txt.split(' ')[0]

      if (dates[date]) {
        dates[date].push(weather)

      } else {
        dates[date] = [weather]
      }
    })

    Object.entries(dates).forEach((item, index) => {
      // The first item in our dates list is going to be today, so we can skip it (we're showing the current
      // weather at the top of our weather app)
      if (index === 0) {
        return
      }

      const date = item[0]
      const weatherValues = item[1]
      const temps = weatherValues.map((value) => value.main.temp)

      const minTemp = Math.min(...temps)
      const maxTemp = Math.max(...temps)

      // 2019-11-05
      const dateAsObject = new Date(date)
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

      // Finally! Now we have the date, along with the min and max temp for that day. We can add it to
      // the list of <li> elements in the forecastDiv.
      forecast.innerHTML += `<li>${dayNames[dateAsObject.getDay()]} ${minTemp.toFixed(1)}°C | ${maxTemp.toFixed(1)}°C</li>`
    })
  })
  .catch(err => {
    console.log("caught error", err);
  });

let weatherAsJSON = JSON;
console.log(weatherAsJSON)

