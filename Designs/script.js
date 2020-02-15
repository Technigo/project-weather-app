const container =  document.getElementById('someText')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=69828f6ac304f247815bc18fa686b778')
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    console.log(myJson)
    container.innerHTML = `<h1>${myJson.name} ${myJson.main.temp} c and ${myJson.weather[0].description}</h1>` //name.description.temperature
  })
 

 