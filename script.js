const container = document.getElementById("weather")
const tempContainer = document.getElementById("temp")
const descriptionContainer = document.getElementById("weatherDescription")
fetch("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f4893e301384d5deeafa555ccaa61aaa")
.then((response) => {
return response.json()
})
.then((json) => {
    console.log(json)
  container.innerHTML = `<h1>Today's weather in ${json.name} </h1>` 
  tempContainer.innerHTML = `<h2> ${json.main.temp}   ${json.weather[0].description}</h2>`
  descriptionContainer.innerHTML = `<h2>  </h2>`

  
})


