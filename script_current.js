const container = document.getElementById("forcast");

let city = 'tokyo'
city = 'stockholm'

fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e6dd4de800de3576c7c23ef944a736c4`
  )
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);
    container.innerHTML = `<h1>I spot some ${json.weather[0].description}<h1>`
    container.innerHTML += `<h1>in ${json.name}<h1>`
    container.innerHTML += `<h1>and it feels like it's ${round(json.main.feels_like)} degrees<h1>`

    sunrise = localTime(json.sys.sunrise, json.timezone)
    sunset = localTime(json.sys.sunset, json.timezone)

    console.log(sunset + sunrise)

    container.innerHTML += `<p>The sun was rising at ${sunrise}<p>`
    container.innerHTML += `<p>The sun was setting at ${sunset}<p>`

  });

const round = (number) => {
  const rounded = Math.round(number * 10) / 10
  return rounded
}

const localTime = (timeSeconds, timeZone) => {

  const timeInLocal = new Date(timeSeconds * 1000) //sunrise in local time
  const localOffset = timeInLocal.getTimezoneOffset() * 60 //local offset in seconds
  const cityOffset = timeZone //city time zone offset from UTC in seconds

  console.log(timeInLocal)

  seconds = timeInLocal.getSeconds()
  timeInLocal.setSeconds(seconds + cityOffset + localOffset)

  console.log(timeInLocal)

  return timeInLocal.toLocaleDateString([], {
    timeStyle: 'short',
  })

}