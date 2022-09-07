// API Key = b7874ca1c4d00ac10b0c0385176b9111
const header = document.getElementById('header')
const mainHeader = document.getElementById('main')
const weekdayWrapper = document.getElementById('schedule-weekdays')
const weekdayTemp = document.getElementById('temp')
const icon = document.getElementById('icons')
const mainH1 = document.getElementById('mainH1')
const skyState = document.getElementById('skyState')
const skyInfo = document.getElementById('skyInfo')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')

const apiUrlSthlm = "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=b7874ca1c4d00ac10b0c0385176b9111"
//const ApiXXX other cities? =


//create some consts for the fetch function and different properties from the Json so we can use it easier below? 

// const fetchData = (apiURLCity, callback) => {
//    fetch(apiURLCity)
//     .then((response) => {
//        return response.json()
//    })
//      .then((json) => {
//       callback(json)
//  })
// } 

// how to round to 1 decimal:
   // const numExample = 5.566;
    // const result = Math.round(numExample * 10) / 10;
   // console.log(result): will show 5.6


 // create if/and statements depending on different weather conditions for the styling with different innerHTLM for icons, color and text ?

 fetch(apiUrlSthlm)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        const currentTemp = `${json.main.temp}` 
        const roundedTemp = Math.round(currentTemp*10)/10
        let sunriseTime = json.sys.sunrise
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(sunriseTime * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();
        // Will display time in 10:30:23 format
        var formattedTimeSunrise = hours + ':' + minutes.substr(-2)
        
        let sunsetTime = json.sys.sunset
        var date = new Date(sunsetTime * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTimeSunset = hours + ':' + minutes.substr(-2)

        console.log(roundedTemp)
        skyState.innerHTML =`${json.name} | ${json.weather.map((weather) => {return weather.description})} | ${roundedTemp}°C`
        sunrise.innerHTML = `Sunrise at: ${formattedTimeSunrise}`
        sunset.innerHTML = `Sunset at: ${formattedTimeSunset}`
    })


 fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=b7874ca1c4d00ac10b0c0385176b9111')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log('weatherforecast', json)

        const filteredForecast = json.list.filter(item => item.dt) 
        console.log('filtered forecast', filteredForecast)

        const filteredTemp = json.list.filter(item => item.dt_txt.includes('12:00'))
        console.log('filtered temp', filteredTemp)

        filteredTemp.map((item) => {
            weekdayName = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
            const date = new Date(item.dt * 1000)
            let dayName = weekdayName[date.getDay()]
            weekdayWrapper.innerHTML += `
            <div class="weekdays" id="weekdayWrapper"> 
              <div class="weekday-rows" id="weekdayRows">
                      <p>${dayName}<p>
                      <p>${item.main.temp.toFixed(1)} °C</p>
                  </div>
              </div>`
          })

        })
