const container = document.getElementById('astros')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Marbella,Spain&units=metric&APPID=329f2a2705f51547d2ed78a937fa0051')
  .then((response) => {
    return response.json()

  })
  .then((json) => {
    city.innerHTML = json.name
    temp.innerHTML = `${json.main.temp.toFixed(1)} °`
    description.innerHTML = json.weather[0].description
  })