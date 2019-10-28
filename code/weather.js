const container = document.getElementById('weathers')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Miami,%20USA&units=metric&APPID=804400298ac4f45795306a8ea7ab8f5e')
.then((response) => {
  return response.json()
})
.then((json) => {
  container.innerHTML = `<h1>It is ${json.main.temp} ${json.weather[0].description} ${Math.round(json.main.temp)} in ${json.name} today :-)</h1>`
  console.log(json)


/*json.base((status) => {
  container.innerHTML += `<p>${status.main}</p>`
});*/

})