const dtable = document.getElementById('dynamic');
const selectCity = document.getElementById('selectCity');
let colorWidget = document.getElementById("weather-widget");
const coverImage = document.getElementById("page-body");

// Global variable
let weather, daysWeek, dWeek, value, tempPoints, cityImage, cityName,
NEW_1URL = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=1b672b9c637e28dafe516793b1e9bf96",
NEW_5URL = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=1b672b9c637e28dafe516793b1e9bf96"

// convert datetime from API to hours and min
// we have to subtract extra 1hr from msec data otherwise we are referring everything to UTC time zone
const hrsMinConverter = (param) => {
  const date = new Date(param * 1000-3600000)
  const hours = date.getHours()
  const min = date.getMinutes()
  hoursMin = `${hours}:${min}`
  return hoursMin
}

// convert datetime from API to days and months
const dayMonthConverter = (param) => {
    const date = new Date(param * 1000-3600000)
    const day = date.getDate()
    const month = date.getMonth()
    dayMonth = `${day}/${month+1}`
    return dayMonth
}

// convert datatime from API to day of the week
const dayWeekConverter = (param) => {
  const date = new Date(param* 1000-3600000)
  const dayOfWeek = date.getDay()
  return dayOfWeek
}

/************ TODAY WEATHER FORECAST ***************/
const weatherData = () => {
  fetch(NEW_1URL)
  .then((response) => {
    return response.json().then((json) => {
      weather = json
      city.innerHTML += weather.name
      
      // making a background image    
      let cityName = weather.name
      if (cityName === "Stockholm") {
       coverImage.style.backgroundImage = "url('./images/stockholm.jpg')";
      } else if (cityName === "Bangkok") {
        coverImage.style.backgroundImage = "url('./images/bangkok1.jpg')"; 
      } else if (cityName === "Hanoi") {
        coverImage.style.backgroundImage = "url('./images/hanoi.jpg')"; 
      } else if (cityName === "Moscow") {
        coverImage.style.backgroundImage = "url('./images/moscow.jpg')"; 
      } else if (cityName === "Malé") {
        coverImage.style.backgroundImage = "url('./images/male.jpg')"; 
      } else if (cityName === "Oslo") {
        coverImage.style.backgroundImage = "url('./images/oslo.jpg')"; 
      } else if (cityName === "Paris") {
        coverImage.style.backgroundImage = "url('./images/paris.jpg')"; 
      } else if (cityName === "Tokyo") {
        coverImage.style.backgroundImage = "url('./images/tokyo.jpg')"; 
      }

      dayCurrent.innerHTML+= `<strong>${dayMonthConverter(weather.dt + weather.timezone)}</strong>`
      timeCurrent.innerHTML += `${hrsMinConverter(weather.dt + weather.timezone)}`
      sky.innerHTML += `
        <tr>
        <!-- <td> ${weather.weather[0].main}</td> -->
        <td><img class="big-icon" src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png"/></td>
        </tr>  
        `
      temperature.innerHTML += `${Math.round(weather.main.temp)}°C` 
      feelsTemp.innerHTML+= `Feels like: ${Math.round(weather.main.feels_like)}°C`

      sunrise.innerHTML += `<img src="./images/sunrise_cart2.jpg" width="44" height="30"/>`
      sunset.innerHTML += `<img src="./images/sunset_cart1.jpg" width="44" height="30"/>`
     
      sundata.innerHTML += `${hrsMinConverter(weather.sys.sunrise+ weather.timezone)} &emsp;&emsp;&emsp;
      ${hrsMinConverter(weather.sys.sunset + weather.timezone)}`

      // fetching temperature- dependent background color
      const tm = Math.round(weather.main.temp) 
      
      if (tm <= -10) {
        colorWidget.style.background = "rgb(209,204,249)";
      } else if (tm > -10 && tm <= -5) {
        colorWidget.style.background = "rgb(204,228,249)";

      } else if (tm > -5 && tm <= 0) {
        colorWidget.style.background = "rgb(204,241,249)";

      } else if (tm > 0 && tm <= 5) {
        colorWidget.style.background = "rgb(204,249,240)";

      }else if (tm > 5 && tm <= 10) {
        colorWidget.style.background = "rgb(204,249,218)";

      } else if (tm > 10 && tm <= 15) {
        colorWidget.style.background = "rgb(216,249,204)";

      } else if (tm > 15 && tm <= 20) {
        colorWidget.style.background = "rgb(215,237,182)";

      } else if (tm > 20 && tm <= 25) {
        colorWidget.style.background = "rgb(228,234,161)";
      
      } else if (tm > 25 && tm <= 30) {
        colorWidget.style.background = "rgb(249,236,204)";
      
      } else if (tm > 30) {
        colorWidget.style.background = "rgb(249,207,204)";
      }
    });
  });
};
weatherData();

/********** 5 DAYS FORECAST ***********/
const weatherForecast = () => {
  fetch(NEW_5URL)
  .then((response) => {
    return response.json().then((json) => {
      const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
      console.log("filtered data",filteredForecast)
      filteredForecast.map((elem) => {
        dw= dayWeekConverter(elem.dt)  
        if (dw === 0) {
          dtable.innerHTML += `
          <tr>
            <td>Sun ${Math.round(elem.main.feels_like)}°C</td>
            <td>${elem.weather[0].description}</td>
            <td><img class="forecast-icon" src="https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png"></td>
          </tr>
          `
        } else if (dw === 1) {
          dtable.innerHTML += `
          <tr>
            <td>Mon ${Math.round(elem.main.feels_like)}°C</td>
            <td>${elem.weather[0].description}</td>
            <td><img class="forecast-icon" src="https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png"></td>
          </tr>
          `
        } else if (dw === 2) {
          dtable.innerHTML += `
          <tr>
            <td>Tue ${Math.round(elem.main.feels_like)}°C</td>
            <td>${elem.weather[0].description}</td>
            <td><img class="forecast-icon" src="https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png"></td>
          </tr>
          `
        } else if (dw === 3) {
          dtable.innerHTML += `
          <tr>
            <td>Wed ${Math.round(elem.main.feels_like)}°C</td>
            <td>${elem.weather[0].description}</td>
            <td><img class="forecast-icon" src="https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png"></td>
          </tr>
          `
        } else if (dw === 4) {
          dtable.innerHTML += `
          <tr>
            <td>Thu ${Math.round(elem.main.feels_like)}°C</td>
            <td>${elem.weather[0].description}</td>
            <td><img class="forecast-icon" src="https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png"></td>
          </tr>
          `
        } else if (dw === 5) {
          dtable.innerHTML += `
          <tr>
            <td>Fri ${Math.round(elem.main.feels_like)}°C</td>
            <td>${elem.weather[0].description}</td>
            <td><img class="forecast-icon" src="https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png"></td>
            </tr>
            `
        } else if (dw === 6) {
          dtable.innerHTML += `
          <tr>
            <td>Sat ${Math.round(elem.main.feels_like)}°C</td>
            <td>${elem.weather[0].description}</td>
            <td><img class="forecast-icon" src="https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png"></td>
          </tr>
          `
        }
      })
    })
  })
}
weatherForecast()

/*************************WEATHER GRAPH *******************/
const tempGraph = () => {
  fetch(NEW_5URL)
  .then((response) => {
    return response.json().then((json) => {
      const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
      const tempPoints = filteredForecast.map((elem) => {
        return elem.main.temp
      })  
      const Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      const datePoints = filteredForecast.map((elem) => {
        return dayWeekConverter(elem.dt)
      })  
              
      const dWeek = datePoints.map((day) => {
        return Days[day]
      })
      
      new Chart(document.getElementById("line-chart"), {
        type: 'line',
        data: {
          labels: dWeek,
          datasets: [{ 
              data:tempPoints,
              //label: "actual temperature at noon",
              borderColor: "#3e95cd",
              fill: false
            }, 
          ]
        },
        options: {
          legend: {
            display: false
          },
          title: {
            display: false,
            text: 'actual temperature at noon'
          }
        }
      });
  })  
})
}
tempGraph()

const myCity = () => {
  const value = selectCity.options[selectCity.selectedIndex].value
  NEW_1URL = `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&APPID=1b672b9c637e28dafe516793b1e9bf96`
  NEW_5URL = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&units=metric&APPID=1b672b9c637e28dafe516793b1e9bf96`
  
  weatherData()
  weatherForecast()
  tempGraph()
}

selectCity.addEventListener("change", () => {
  city.innerHTML = ""
  dayCurrent.innerHTML = ""
  timeCurrent.innerHTML = ""
  sky.innerHTML = ""
  temperature.innerHTML = ""
  feelsTemp.innerHTML = ""
  sunrise.innerHTML = ""
  sunset.innerHTML = ""
  sundata.innerHTML =""
  dtable.innerHTML = ""
  myCity(selectCity.value)
})


