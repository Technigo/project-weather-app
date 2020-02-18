// http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ed2d4804e9f1b16e037cdf4e25100bc4

const container = document.getElementById('city') 
const containerWeather = document.getElementById('weather')
const containerCelcius = document.getElementById('celsius')
const containerSunsetRise = document.getElementById('sunsetSunrise')
const containerForecast = document.getElementById('forecast')
const currentCondition = document.getElementById('weather')
const conditionImg = document.getElementById('weatherImage')




fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ed2d4804e9f1b16e037cdf4e25100bc4')
.then((response) => {
  return response.json()
})

.then((json) => {
  container.innerHTML = `<h1>${json.name}</h1>`
  let tempAsJSON = json.main.temp.toFixed(1)
  containerCelcius.innerHTML += `<h1> ${tempAsJSON}${'&#730;'}<sup>C</sup>  </h1>`
  json.weather.forEach( (report)=> {
  containerWeather.innerHTML += `<h2>${report.description}</h2>`  

});


if (tempAsJSON <= 0) {
  document.getElementById("backgroundColor").style.backgroundColor = 'rgb(112, 112, 114)';
} else if (tempAsJSON >= 0 && tempAsJSON <= 10) {
  document.getElementById("backgroundColor").style.backgroundColor = "rgb(107, 144, 247)";
} else if (tempAsJSON >= 10.1 && tempAsJSON <= 20) {
  document.getElementById("backgroundColor").style.backgroundColor = "rgb(234, 243, 105)";
} else {
  document.getElementById("backgroundColor").style.backgroundColor = "rgb(240, 186, 85)";
}





const weatherToday = () => {
  let windSpeed = json.wind.speed
  conditionImg.innerHTML += `<img id="weatherPicToday" src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png" alt="" />`;
  let sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], {timeStyle:'short'})
  let sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], {timeStyle:'short'})
 containerSunsetRise.innerHTML += `<h4> Sunrise: ${sunrise} </h4> <h4>Sunset: ${sunset} </h4>`
 

 var now = new Date();
 var short = now.toLocaleTimeString([], {timeStyle:'short'})
 if (short >= sunrise && short <= sunset) {
  document.getElementById("backgroundColor").style.backgroundColor = "rgb(107, 144, 247)"
 } else {
  document.getElementById("backgroundColor").style.backgroundColor = "rgb(45, 43, 131)";
 }

}



weatherToday()


})



fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=ed2d4804e9f1b16e037cdf4e25100bc4')
.then((response) => {
  return response.json()
})

.then((json) => {
  
  const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
  
  


//This Works
filteredForecast.forEach((temp) => {
  let temperature = temp.main.temp 
  console.log(temperature)
  console.log(temp)
  const temperatureDays = new Date (temp.dt_txt)
  const correctDayFormat = temperatureDays.toLocaleDateString('en-US', {weekday:'short'})
  const pictures =  `<img id="picsForecast" src="https://openweathermap.org/img/wn/${temp.weather[0].icon}@2x.png" alt="" />`
  document.getElementById('forecast').innerHTML += `<h6> ${correctDayFormat}  ${temperature} ${'&#730;'} c ${pictures} </h6>`
  
})





  
  })
   

