const container = document.getElementById('rapport')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ef7399cb41eac9ec2fe0157a2f52fe78')
.then((response) => {
  return response.json()
})
.then((json) => {
    container.innerHTML = `<h1>There are ${json.main.temp.toFixed(1)} and ${json.weather[0].description} in ${json.name} </h1>`
    
    json.weather.forEach(() => {
        container.innerHTML += `<p></p>`
    })
})