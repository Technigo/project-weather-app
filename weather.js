const container = document.getElementById('weather')


fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,sweden&units=metric&APPID=00620bb638ed0fa5525452696e39c3ed')
  .then((response) =>{
    return response.json()
  })
  .then((json) => {
    console.log(json)
    container.innerHTML = `<h1>Weather in ${json.name}<h/1>`;
    let temperature = Math.round(json.main.temp * 10) /10;
    let feelsLike = Math.round(json.main.feels_like *10) /10;
    container.innerHTML += `${temperature}&#730; feels like ${feelsLike}&#730;`
    json.weather.forEach((sky) => {
      container.innerHTML += `<p>${sky.description}</p>`;
    })
  })

  .catch((err) => {
    console.log('cauhgt error', err)
  })