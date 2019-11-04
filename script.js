/** I wrote this code as well cuz I wanted to change the backgrunddepending on weather. But it dosent work. Can yoy help me to esplain why? Thank you:   
  if (json.weather[0].description.includes ("cloud")){
  weathercontainer.innerHTML = `<img src="Designs/Design #2/Icons/noun_Cloud_1188486.svg">`;
   }
   else if(json.weather[0].description.includes ("rain")){
  weathercontainer.innerHTML = `<img src="Designs/Design #2/Icons/noun_Umbrella_2030530.svg">`;
   }
   else {
  weathercontainer.innerHTML = `<img src="Designs/Design #2/Icons/noun_Sunglasses_2055147.svg">`;
   } */




const apiKey = 'ef7399cb41eac9ec2fe0157a2f52fe78'
//const location = 'Stockholm, SE'

const handle5dayForecast = (json) => {
const forecastDiv = document.getElementById('forecast')
const dates = {}
const dailyweather = document.getElementById('dailyweather')
const sunrisesunset = document.getElementById('sunrisesunset')

 /** The weather today **/

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ef7399cb41eac9ec2fe0157a2f52fe78')

.then((response) => {
  return response.json()
})
.then((json) => {
    dailyweather.innerHTML = `<h1>There are ${json.main.temp.toFixed(1)}&#176 in ${json.name} </h1>`
    dailyweather.innerHTML += `<img src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png" alt="" />`
    
    /**Sunrise sunset */
    
    const sunrise = new Date(json.sys.sunrise * 1000) //unixtimestamp to time
    const sunriseTime = sunrise.toLocaleTimeString([], {timeStyle: 'short'})
    
    const sunset = new Date(json.sys.sunset * 1000)
    const sunsetTime = sunset.toLocaleTimeString([], {timeStyle: 'short'})
    sunrisesunset.innerHTML =`<h2>Sunrise ${sunriseTime} Sunset ${sunsetTime}</h2>`
  
    
})


// 5 days weather-rapport 

  json.list.forEach((weather) => {
    const date = weather.dt_txt.split(' ')[0]
    if (dates[date]) {
      dates[date].push(weather)
    } else {
      dates[date] = [weather]
    }
  }) 
 



Object.entries(dates).forEach((item, index) => {
    if (index === 0) {
      return
    }

    const date = item [0]
    const weatherValues = item[1]
    
    const temps = weatherValues.map((value) => value.main.temp)
    const minTemp = Math.min(...temps)
    const maxTemp = Math.max(...temps)

    forecastDiv.innerHTML += `<li>${date} - min: ${minTemp.toFixed(1)} &#176, max: ${maxTemp.toFixed(1)} &#176</li>`

  })

  }

  fetch('http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=ef7399cb41eac9ec2fe0157a2f52fe78')
  .then((res) => res.json())
  .then(handle5dayForecast) 

 






  //Step 3-code


/**
const container = document.getElementById('rapport')
const container2 = document.getElementById('rapport2')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ef7399cb41eac9ec2fe0157a2f52fe78')

.then((response) => {
  return response.json()
})
.then((json) => {
    container.innerHTML = `<h1>There are ${json.main.temp.toFixed(1)} degrees and ${json.weather[0].description} in ${json.name} </h1>`
    const sunrise = new Date(json.sys.sunrise * 1000) //unixtimestamp to time
    const sunriseTime = sunrise.toLocaleTimeString([], {timeStyle: 'short'})
    
    const sunset = new Date(json.sys.sunset * 1000)
    const sunsetTime = sunset.toLocaleTimeString([], {timeStyle: 'short'})
    container2.innerHTML =`<h2>Sunrise ${sunriseTime} Sunset ${sunsetTime}</h2>`
  
    
}) **/

//In case of error-code

/**catch((err) => console.log(err.message))**/


