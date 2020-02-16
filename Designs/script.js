const container = document.getElementById('astros')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Marbella,Spain&units=metric&APPID=329f2a2705f51547d2ed78a937fa0051')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    container.innerHTML = `<h1> vädret i ${json.name} </h1>`
    json.weather.forEach((vader) => {
      container.innerHTML += `<p>dagarna är ${vader.main}</p>`
    })
    // console.log(json)
  })