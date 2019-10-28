const container = document.getElementById("weather")

fetch("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f4893e301384d5deeafa555ccaa61aaa")
.then((response) => {
return response.json()
})
.then((json) => {
  console.log(json)  
})
