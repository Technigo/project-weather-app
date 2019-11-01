const container = document.getElementById("weatherToday")
const containerCity = document.getElementById("weatherCity")
const containerWeekly = document.getElementById("weatherWeekly")


fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=60a9f45b45a7b39b290afa28477d7241')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    console.log(json)
    let mainTemp = json.main.temp.toFixed(1);
    let sunriseHour = new Date((json.sys.sunrise)*1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    let sunsetHour = new Date((json.sys.sunset)*1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    console.log(`Main temp ${mainTemp} Sunrise ${sunriseHour}, Sunset ${sunsetHour}`)

    if(mainTemp < 10) {
      document.body.style.background = 'linear-gradient(to right, rgba(97, 153, 153, 0), rgb(50, 162, 226))' 
    } else {
      document.body.style.background = 'linear-gradient(to right, rgba(228, 200, 45, 0), rgb(226, 200, 50))'
    }

    container.innerHTML = `${json.weather[0].description} | ${mainTemp} &#8451 
    <p id="infoTop">sunrise ${sunriseHour}</p> <p id="infoTop">sunset ${sunsetHour}</p>`
    
    containerCity.innerHTML = `<h2>${json.name}</h2>`
  })


  const handle5DayForecast = (json) => {
  const forecastDiv = document.getElementById('forecast')
  let weekDays = {}
  console.log(json)

  json.list.forEach((weather) => {
    let weekDay = new Date((weather.dt)*1000).toLocaleDateString("en-US", {weekday: 'short'})
    if (weekDays[weekDay]) {
      weekDays[weekDay].push(weather)
    } else {
      weekDays[weekDay] = [weather]
    }
  })

  Object.entries(weekDays).forEach((item, index) => {
    if (index === 0) {
      return 
    }
    
    let weekDay = item[0]
    const weatherValues = item[1]

    const temps = weatherValues.map((value) => value.main.temp)
    const minTemp = Math.min(...temps)
    const maxTemp = Math.max(...temps)

    forecastDiv.innerHTML += `<li>${weekDay} - max: ${maxTemp.toFixed(1)} &#8451 
    min: ${minTemp.toFixed(1)} &#8451 </li>`
  })
}

fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&cnt=39&APPID=60a9f45b45a7b39b290afa28477d7241')
  .then((res) => res.json())
  .then(handle5DayForecast)
