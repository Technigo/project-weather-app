
const weatherWrap = document.getElementById('weather-show');
const weeklyForecastList = document.getElementById('weekly-forecast-list');
const mainSection = document.getElementById('main_section')
const fiveDays = document.getElementById('five-days')

const key = "c2f405a9535aecc5e2d5897453e84d25";

 fetch('https://api.openweathermap.org/data/2.5/forecast?lat=67.13&lon=20.65&appid=c2f405a9535aecc5e2d5897453e84d25')
    .then((response) => {
     return response.json()
    })
    .then((json) => {
     weatherWrap.innerHTML = `<h1>${json.city.name}, ${json.city.sunrise}, ${json.main.temp} </h1>`

     console.log(json)
   });

// fetch('https://api.openweathermap.org/data/2.5/forecast?lat=67.13&lon=20.65&appid=c2f405a9535aecc5e2d5897453e84d25')
//    .then((response) => {
//       return response.json()
//    })
//    .then((json) => {
//       weeklyForecastList.innerHTML = `<li>${}
//       </li>`
//    })

// city.sun.rise
// city.sun.set
// main.temp
    // console.log(json)
  
    // ${json.sun.rise}, ${json.sun.set}
// city.sun.rise
// city.sun.set
// main.temp
  
    // ${json.sun.rise}, ${json.sun.set}
// city.sun.rise
// city.sun.set
