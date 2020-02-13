const container = document.getElementById("weather")
const sunStatus = document.getElementById("sunstatus")

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,se&units=metric&APPID=44527f8be39feab9d034d48604c6b81d&lang=en')
  .then((response) => {
    return response.json()
  })
  .then((json) => {

    console.log(json) // checking the json from open weather

    container.innerHTML = `<h1>${json.name}, Temp is: ${json.main.temp}°C </h1>`

    json.weather.forEach((sky) => {
      container.innerHTML += `<p>Weather is: ${sky.description} </p>`
    });

    sunStatus.innerHTML = `<h1>Sunrise: ${json.sys.sunrise} and Sunset: ${json.sys.sunset}</h1>`

  })