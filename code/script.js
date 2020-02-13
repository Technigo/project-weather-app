const container = document.getElementById('weatherAPI')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Reykjavik,Iceland&units=metric&APPID=3ecdc5b9e327b76e7806233ffc0a935f')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    
    container.innerHTML = `<p>${json.weather[0].description} | ${json.main.temp.toFixed(1)}°c</p>`
    container.innerHTML += `<p>feels like: ${json.main.feels_like.toFixed(1)}°c</p>`
    container.innerHTML += `<p>The temperature in ${json.name} is currently ${json.main.temp.toFixed(1)}°c, feels like ${json.main.feels_like.toFixed(1)}°c</p>`
  
  })