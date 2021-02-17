const dtable = document.getElementById('dynamic');


// Global variable
let weather, daysWeek, comboArray,
dWeek,
 tempPoints

// convert datetime from API to hours and min
const hrsMinConverter = (param) => {
    const date = new Date(param * 1000)
    const hours = date.getHours()
    const min = date.getMinutes()
    hoursMin = `${hours}:${min}`
    return hoursMin
}

// convert datetime from API to days and months
const dayMonthConverter = (param) => {
    const date = new Date(param * 1000)
    const day = date.getDate()
    const month = date.getMonth()
    dayMonth = `${day}/${month+1}`
    return dayMonth
}

// convert datatime from API to day of the week
const dayWeekConverter = (param) => {
  const date = new Date(param * 1000)
  const dayOfWeek = date.getDay()
  return dayOfWeek
}

/************ TODAY WEATHER FORECAST ***************/
const weatherData = () => {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=1b672b9c637e28dafe516793b1e9bf96")
  .then((response) => {
    return response.json().then((json) => {
      weather = json
      console.log(weather)
      console.log("today", dayWeekConverter(weather.dt))
      city.innerHTML= weather.name
      dayCurrent.innerHTML += dayMonthConverter(weather.dt)
      timeCurrent.innerHTML += hrsMinConverter(weather.dt)
      sky.innerHTML += weather.weather[0].main
      temperature.innerHTML += `${Math.round(weather.main.temp)}C` 
      feelsTemp.innerHTML += `${Math.round(weather.main.feels_like)}C`
      sunrise.innerHTML += hrsMinConverter(weather.sys.sunrise)
      sunset.innerHTML += hrsMinConverter(weather.sys.sunset)
    });
  });
};
weatherData();

/********** 5 DAYS FORECAST ***********/
const weatherForecast = () => {
  fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=1b672b9c637e28dafe516793b1e9bf96")
  .then((response) => {
    return response.json().then((json) => {
      const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
      console.log("filtered data",filteredForecast)
      
      filteredForecast.map((elem) => {
        //console.log(elem.dt)
        //console.log(dayWeekConverter(elem.dt))
        dw= dayWeekConverter(elem.dt)  
        //console.log("dw", dw)
        //console.log(dayWeekConverter(elem.dt), elem.main.feels_like)
        if (dw === 0) {
          
          dtable.innerHTML += `
          <tr>
            <td>Sun ${Math.round(elem.main.feels_like)}C</td>
            <td>${elem.weather[0].description}</td>

          </tr>
          `
        } else if (dw === 1) {
          dtable.innerHTML += `
          <tr>
            <td>Mon ${Math.round(elem.main.feels_like)}C</td>
            <td>${elem.weather[0].description}</td>

          </tr>
          `
        } else if (dw === 2) {
          dtable.innerHTML += `
          <tr>
            <td>Tue ${Math.round(elem.main.feels_like)}C</td>
            <td>${elem.weather[0].description}</td>

          </tr>
          `
        } else if (dw === 3) {
          dtable.innerHTML += `
          <tr>
            <td>Wed ${Math.round(elem.main.feels_like)}C</td>
            <td>${elem.weather[0].description}</td>

          </tr>
          `
        } else if (dw === 4) {
          dtable.innerHTML += `
          <tr>
            <td>Thu ${Math.round(elem.main.feels_like)}C</td>
            <td>${elem.weather[0].description}</td>

          </tr>
          `
        } else if (dw === 5) {
          dtable.innerHTML += `
          <tr>
            <td>Fri ${Math.round(elem.main.feels_like)}C</td>
            <td>${elem.weather[0].description}</td>

            </tr>
            `
        } else if (dw === 6) {
          dtable.innerHTML += `
          <tr>
            <td>Sat ${Math.round(elem.main.feels_like)}C</td>
            <td>${elem.weather[0].description}</td>

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
  fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=1b672b9c637e28dafe516793b1e9bf96")
  .then((response) => {
    return response.json().then((json) => {
      const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
      console.log("filtered data graph",filteredForecast)
      const tempPoints = filteredForecast.map((elem) => {
        //daysWeek = dayWeekConverter(elem.dt)  
        return elem.main.temp
      })  
      console.log("temperature",tempPoints)
      
      const Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

      const datePoints = filteredForecast.map((elem) => {
        return dayWeekConverter(elem.dt)
      })  
      console.log(datePoints)
        
      const dWeek = datePoints.map((day) => {
        return Days[day]
      })
      console.log(dWeek)

      
      const comboArray = dWeek.map((e,i) => {
        return [e, tempPoints[i]]

      })
      console.log(comboArray)
      
      new Chart(document.getElementById("line-chart"), {
        type: 'line',
        data: {
          labels: dWeek,
          datasets: [{ 
              data:tempPoints,
              label: "actual temperature at noon",
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
            display: true,
            text: 'actual temperature at noon'
          }
        }
      });
  })  
})
}
tempGraph()

