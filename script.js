
const city = document.getElementById('city')
const temp = document.getElementById('temperature')
const coord = document.getElementById('coord')
const sunRise = document.getElementById('sun')
const sunSet = document.getElementById('sun')
const todayPlus1 = document.getElementById('todayPlus1')
const todayPlus2 = document.getElementById('todayPlus2')
const todayPlus3 = document.getElementById('todayPlus3')
const todayPlus4 = document.getElementById('todayPlus4')
const todayPlus5 = document.getElementById('todayPlus5')



//TODAYS DATE
const today = new Date()
// console.log(today)

//JSON STOCKHOLM WEATHER FOR TODAY
fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=b09042e161870e44988114035ff61156')
  .then((response) => {
    return response.json()
  })
  .then((json) => {

    // console.log(json)
    //CITY
    city.innerHTML = json.name

    //LONG/LAT
    coord.innerHTML = `Longitude: ${json.coord.lon}, Latitude: ${json.coord.lat}`

    //TODAYS TEMPERATURE
    temp.innerHTML = Math.round(json.main.temp)
    temp.innerHTML += `ºC, ${json.weather[0].description}`

    // FOR COLD WEATHER
    if (json.main.temp < 5) {
      body.classList.toggle('cold')
    } else if (json.main.temp > 20) {
      body.classList.toggle('warm')
    }

    // TODAYS SUNRISE/SUNSET
    const sunRiseTime = new Date(json.sys.sunrise * 1000)
    sunRise.innerHTML = `Sunrise: ${sunRiseTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, `

    const sunSetTime = new Date(json.sys.sunset * 1000)
    sunSet.innerHTML += `Sunset: ${sunSetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} `
  });


//JSON STOCKHOLM WEATHER FOR THE UPCOMMING DAYS
fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=b09042e161870e44988114035ff61156')
  .then((response) => {
    return response.json()
  })
  .then((json) => {

    // console.log(json)

    //WEATHER AT 12AM
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))

    // TOMORROWS WEATHER
    const date1 = new Date(filteredForecast[0].dt_txt.replace(" ", "T"))
    const day1 = date1.toLocaleDateString('en-US', { weekday: "short" })
    todayPlus1.innerHTML = day1
    todayPlus1.innerHTML += `: ${Math.round(filteredForecast[0].main.temp)} ºC, `
    todayPlus1.innerHTML += filteredForecast[0].weather[0].description

    //DAY AFTER TOMORROW
    const date2 = new Date(filteredForecast[1].dt_txt.replace(" ", "T"))
    const day2 = date2.toLocaleDateString('en-US', { weekday: "short" })
    todayPlus2.innerHTML = day2
    todayPlus2.innerHTML += `: ${Math.round(filteredForecast[1].main.temp)} ºC, `
    todayPlus2.innerHTML += filteredForecast[1].weather[0].description

    // 2 DAYS AFTER TOMORROW
    const date3 = new Date(filteredForecast[2].dt_txt.replace(" ", "T"))
    const day3 = date3.toLocaleDateString('en-US', { weekday: "short" })
    todayPlus3.innerHTML = day3
    todayPlus3.innerHTML += `: ${Math.round(filteredForecast[2].main.temp)} ºC, `
    todayPlus3.innerHTML += filteredForecast[2].weather[0].description

    //AND SO ON..
    const date4 = new Date(filteredForecast[3].dt_txt.replace(" ", "T"))
    const day4 = date4.toLocaleDateString('en-US', { weekday: "short" })
    todayPlus4.innerHTML = day4
    todayPlus4.innerHTML += `: ${Math.round(filteredForecast[3].main.temp)} ºC, `
    todayPlus4.innerHTML += filteredForecast[3].weather[0].description

    // AND SO ON
    const date5 = new Date(filteredForecast[4].dt_txt.replace(" ", "T"))
    const day5 = date5.toLocaleDateString('en-US', { weekday: "short" })
    todayPlus5.innerHTML = day5
    todayPlus5.innerHTML += `: ${Math.round(filteredForecast[4].main.temp)} ºC, `
    todayPlus5.innerHTML += filteredForecast[4].weather[0].description



    // console.log(filteredForecast[0].dt_txt)
    // console.log(filteredForecast)













  });

