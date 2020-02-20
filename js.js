// Weather today
const cityNameSwedish = name => {
  if (name === 'Skanoer med Falsterbo') {
    name = `Skan${String.fromCharCode(246)}r med Falsterbo`;
    return name;
  }
}

const timeFormat = (ms) => {
  let time = new Date(ms * 1000).toLocaleTimeString([], {
    hour: '2-digit', minute: '2-digit'
  })
  return time;
}

const cloudyDays = {
  name: 'Clouds',
  bColor: '#d7dfe2',
  pColor: '#F47775',
  image: 'Icons/icon_cloudy.png'
}

const sunnyDays = {
  name: 'Clear',
  bColor: '#F7E9B9',
  pColor: '#2A5510',
  image: 'Icons/icoon_sun.png'
}

const rainyDays = {
  name: "Rain",
  bColor: '#A3DEF7',
  pColor: '#164A68',
  image: 'Icons/icon_rain.png'
}

const drizzleDays = {
  name: 'Drizzle',
  bColor: '#A3DEF7',
  pColor: '#164A68',
  image: 'Icons/icon_drizzle.png'
}

const thunderDays = {
  name: 'Thunderstorm',
  bColor: '#a680a7',
  pColor: '#0c0a0c',
  image: 'Icons/icon_thunder.png'
}

const otherDays = {
  bColor: 'white',
  pColor: 'black',
  image: 'Icons/icon_other.png'
}

let container = document.getElementById('containerToday')
let sunrise = document.getElementById('sunrise')
let sunset = document.getElementById('sunset')

fetch('https://api.openweathermap.org/data/2.5/weather?id=3336568&lang=se&units=metric&appid=0f30fbe5053a599d0719ec7212d88866')
  .then((response) => {
    return response.json()
  })

  .then((json) => {
    container.innerHTML = `<h1> Dagens väder i ${cityNameSwedish(json.name)}, ${json.weather[0].description} och ${json.main.temp.toFixed(1)} °C.</h1>`

    sunrise.innerHTML = `<h2> Soluppgång ${timeFormat(json.sys.sunrise)} </h2> `
    sunset.innerHTML = `<h2> Solnedgång ${timeFormat(json.sys.sunset)}</h2>`

    if (json.weather[0].main === cloudyDays.name) {
      document.body.style.background = cloudyDays.bColor
      document.body.style.color = cloudyDays.pColor
      containerIcon.innerHTML = `<img src="${cloudyDays.image}" alt="clouds">`;
    } else if (json.weather[0].main === drizzleDays.name) {
      document.body.style.background = drizzleDays.bColor
      document.body.style.color = drizzleDays.pColor
      containerIcon.innerHTML = `<img src="${drizzleDays.image}" alt="drizzle">`;
    } else if (json.weather[0].main === thunderDays.name) {
      document.body.style.background = thunderDays.bColor
      document.body.style.color = thunderDays.pColor
      containerIcon.innerHTML = `<img src="${thunderDays.image}" alt="thunder">`;
    } else if (json.weather[0].main === rainyDays.name) {
      document.body.style.background = rainyDays.bColor
      document.body.style.color = rainyDays.pColor
      containerIcon.innerHTML = `<img src="${rainyDays.image}" alt="rain">`;
    } else if (json.weather[0].main === sunnyDays.name) {
      document.body.style.background = sunnyDays.bColor
      document.body.style.color = sunnyDays.pColor
      containerIcon.innerHTML = `<img src="${sunnyDays.image}" alt="sun">`;
    } else {
      document.body.style.background = otherDays.bcolor
      document.body.style.color = otherDays.pColor
      containerIcon.innerHTML = `<img src="${otherDays.image}" alt="weather">`;
    }
  });

cityNameSwedish('Skanoer med Falsterbo')
timeFormat()

//Five days forecast

fetch('https://api.openweathermap.org/data/2.5/forecast?id=3336568&lang=se&units=metric&appid=0f30fbe5053a599d0719ec7212d88866')
  .then((response) => {
    return response.json()
  })

  .then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('03:00'))
    filteredForecast.forEach((day) => {

      const forecast = document.getElementById('fiveDaysForecast')
      let date = new Date(day.dt * 1000);
      let dayOfWeek = date.toLocaleDateString('sv-SE', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });

      forecast.innerHTML += `<div id= 'dayByDay'> <p>${dayOfWeek}</p> 
      <p> ${day.weather[0].description} </p>
      <p>${day.main.temp.toFixed(1)}°C</p></div>`
    });
  })

