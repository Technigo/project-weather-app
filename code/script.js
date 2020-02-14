const city = document.querySelector('#city')
const temperature = document.querySelector('#temperature')
const description = document.querySelector('#description')
const sunrise = document.querySelector('#sunrise')
const sunset = document.querySelector('#sunset')



fetch('http://api.openweathermap.org/data/2.5/weather?q=Malmo,Sweden&units=metric&APPID=302165d90858a8a500d4198d9bc63d2b')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    city.innerHTML = json.name
    description.innerHTML = json.weather[0].description
    temperature.innerHTML = `${json.main.temp.toFixed(1)}°`

    const getHoursAndMinutes = (milliseconds) => {
      let date = new Date(milliseconds * 1000)
      let hours = date.getHours()
      hours = (`0${hours}`).slice(-2)
      let minutes = date.getMinutes()
      minutes = (`0${minutes}`).slice(-2)

      return `${hours}:${minutes}`
    }

    sunrise.innerHTML = getHoursAndMinutes(json.sys.sunrise)
    sunset.innerHTML = getHoursAndMinutes(json.sys.sunset)



  })
  .catch((err) => {
    console.log("oops error", err)
  })

fetch('http://api.openweathermap.org/data/2.5/forecast?q=Malmo&units=metric&appid=302165d90858a8a500d4198d9bc63d2b')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    // console.log(json.name)
  })
  .catch((err) => {
    console.log("oops error", err)
  })