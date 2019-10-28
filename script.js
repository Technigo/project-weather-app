const container = document.getElementById("weather")

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=60a9f45b45a7b39b290afa28477d7241')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    console.log(json)
    // container.innerHTML = `The temperature in Stockholm is ${json.main.temp} degrees with a daily min 
    // of ${json.main.temp_min} and a daily max of ${json.main.temp_max}`
    container.innerHTML = `Today's weather in: ${json.name}
    ${json.main.temp.toFixed(1)} &#8451 ${json.weather[0].description}`
  })