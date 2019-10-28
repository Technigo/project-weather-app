const container = document.getElementById('weathers')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Miami,%20USA&units=metric&APPID=804400298ac4f45795306a8ea7ab8f5e')
.then((response) => {
  return response.json()
})
.then((json) => {
  container.innerHTML = `<h1>It is ${Math.round(json.main.temp)} ${json.weather[0].description} in ${json.name} today :-)</h1>`

  console.log(json)

  /*const container = document.getElementById('suntimes')

  fetch('http://api.openweathermap.org/data/2.5/weather?q=Miami,%20USA&units=metric&APPID=804400298ac4f45795306a8ea7ab8f5e')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
  container.innerHTML = `<h2>Sunrise at: ${`${json.sys.sunrise}:${json.sys.sunrise}`}</h2>`

  /*container.innerHTML = `<h2>Sunset at: ${`${sunset.getHours()}:${sunset.getMinutes()}`}</h2>`*/


const unixTimestamp = 1572261986

const unixTimestamp2 = 1572302548

let sunrise = new Date(unixTimestamp * 1000)

let sunset = new Date(unixTimestamp2 * 1000)

/*console.log(`${sunrise.getHours()}:${sunrise.getMinutes()}`)*/


})