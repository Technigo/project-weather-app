// API Key = b7874ca1c4d00ac10b0c0385176b9111
const header = document.getElementById('header')
const mainHeader = document.getElementById('main')
const weekdayWrapper = document.getElementById('schedule-weekdays')
const weekdayTemp = document.getElementById('temp')
const icon = document.getElementById('icons')
const mainH1 = document.getElementById('mainH1')
const skyState = document.getElementById('skyState')
const skyInfo = document.getElementById('skyInfo')


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
        console.log(roundedTemp)
        skyState.innerHTML =`${json.name} | ${json.weather.map((weather) => {return weather.description})} | ${roundedTemp}°C`
        
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
