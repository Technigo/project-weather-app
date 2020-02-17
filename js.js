// Weather today
const cloudyDays = {
  name: 'Clouds',
  bColor: '#F4F7F8',
  pColor: '#F47775'
}

const sunnyDays = {
  name: 'Clear',
  bColor: '#F7E9B9',
  pColor: '#2A5510'
}

const rainyDays = {
  name: "Rain",
  bColor: '#A3DEF7',
  pColor: '#164A68'
}

const drizzleDays = {
  name: 'Drizzle',
  bColor: '#A3DEF7',
  pColor: '#164A68'
}

const thunderDays = {
  name: 'Thunderstorm',
  bColor: '#a680a7',
  pColor: '#0c0a0c'
}

const otherDays = {
  bColor: 'white',
  pColor: 'black'
}

let container = document.getElementById('containerToday')
let sunrise = document.getElementById('sunrise')
let sunset = document.getElementById('sunset')

const timeFormat = (ms) => {
  let time = new Date(ms * 1000).toLocaleTimeString([], {
    timeStyle: 'short'
  })
  return time;
}



fetch('http://api.openweathermap.org/data/2.5/weather?id=3336568&lang=se&units=metric&appid=0f30fbe5053a599d0719ec7212d88866')
  .then((response) => {
    return response.json()
  })

  .then((json) => {
    container.innerHTML = `<h1> Vädret idag i ${json.name}, ${json.weather[0].description}. Temperaturen under dagen kommer att vara ${json.main.temp.toFixed(1)} °C.</h1>`

    sunrise.innerHTML = `<h2> Soluppgång ${timeFormat(json.sys.sunrise)} </h2> `
    sunset.innerHTML = `<h2> Solnedgång ${timeFormat(json.sys.sunset)}</h2>`

    //test av bakgrundsfärg
    console.log(json.weather[0].main)
    if (json.weather[0].main === cloudyDays.name) {
      document.body.style.background = cloudyDays.bColor
    } else if (json.weather[0].main === drizzleDays.name) {
      document.body.style.background = drizzleDays.bColor
    } else if (json.weather[0].main === thunderDays.name) {
      document.body.style.background = thunderDays.bColor
    } else if (json.weather[0].main === rainyDays.name) {
      document.body.style.background = rainyDays.bColor
    } else if (json.weather[0].main === sunnyDays.name) {
      document.body.style.background = sunnyDays.bColor
    } else {

      document.body.style.background = otherDays.bcolor
    }
  });

timeFormat()


//Five days forecast


fetch('http://api.openweathermap.org/data/2.5/forecast?id=3336568&lang=se&units=metric&appid=0f30fbe5053a599d0719ec7212d88866')
  .then((response) => {
    return response.json()
  })

  .then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('03:00'))
    filteredForecast.forEach((day) => {

      const forecast = document.getElementById('5daysForecast')
      let date = new Date(day.dt * 1000);
      let dayOfWeek = date.toLocaleDateString('sv-SE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

      forecast.innerHTML += `<div id= 'dayByDay'> <p>${dayOfWeek}</p> 
      <p> ${day.weather[0].description} </p>
      <p>${day.main.temp.toFixed(1)}°C</p></div>`
    });
  })


