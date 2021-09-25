//for weather forecast API URL
const FORECAST_API_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=Paris,fr&units=metric&APPID=00ceff8163f7cba27d66b6501ce70e06'
const CURRENT_API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Paris,fr&APPID=00ceff8163f7cba27d66b6501ce70e06'

//Dom selector
const forecastContainer = document.getElementById('forecast')
const currentWeather = document.getElementById ('header-styling')
const headerBackground = document.getElementById('header')

//global variables
let temperature 
let roundTemp

//for forecast 
let fiveDayForecast = {}  

//fetch function
fetch(CURRENT_API_URL)
.then((response) => {
    return response.json()
  })
.then((data) => {
    // today's forecast 
    temperature =  (data.main.temp) - 273.15
    roundTemp = temperature.toFixed(0)
  const weatherImage = bigWeatherIcons(data.weather[0].description)
  const description = toTitleCase(data.weather[0].description)
  let sunrise = convertTime(data.sys.sunrise)
  let sunset = convertTime(data.sys.sunset)

  currentWeather.innerHTML += `
    <div class= "wrapper">
      <h1 class = "temperature" >
      ${roundTemp}&#8451
      </h1>
      <h2 class = "city" >
      ${data.name}
      </h2>
      <h3 class = "description" >
      ${description}
      </h3>
      <section class="sun">
        <div class="sunrise" id="sunrise">
         Sunrise:                   
        </div>
        <div class="sunrise-time" id="sunriseTime">
          ${sunrise}
        </div>
        <div class="sunset">
        Sunset:    
        </div>
        <div class="sunset-time" id="sunsetTime">
          ${sunset}
        </div>

      </section>
    </div>
    <div class="header-image">
      <img src="${weatherImage}" alt="${description}" />
    </div>
  `
    
})
.catch((error) => console.error(error))
.then(() => console.log('Request finished'));

//for weather forecast fetch function
fetch(FORECAST_API_URL)
  .then((res) => {
    return res.json()
  })
  .then((data) => {
  
    createForecast(data) //calling CreateForecast function to create forecast for next five days with minimum temperature, maximum temperature and formatted date
    
    let forecastArray = Object.values(fiveDayForecast)
    forecastArray.shift()
    forecastArray.forEach(item => {  // in order to iterate each value of object as forEach method does not work on object directly (https://flexiple.com/loop-through-object-javascript/)
    const  {date, weatherIcon, minTemp, maxTemp}= item  
      forecastContainer.innerHTML +=`
        <div class= "js-row">
          <span> 
            ${date} 
          </span>
          <span>
            <img src="${weatherIcon}"/>
          </span>
          <span>
            ${minTemp.toFixed(0)}&#8451 / ${maxTemp.toFixed(0)}&#8451
          </span>
        </div>
    `
    })
    
  })
  .catch((error) => console.error(error))
  .then(() => console.log('Request finished'));

//----- functions for forecast-----//


// function to create object of forecast with min, max temperature and formatted date
const createForecast = (data) => {
    
  data.list.forEach((item) => {  //iterating the 'list' item of data
    const currentDate = item.dt_txt.split(" ")[0]  //creating a variable by splitting  item.dt_txt and returning the date part
    
    if (fiveDayForecast[currentDate]) { //checking if an object with key as currentDate is created, if true compare the value of min and max temperature and set values accordingly
      
      if (item.main.temp_min < fiveDayForecast[currentDate].minTemp) {
        fiveDayForecast[currentDate].minTemp = item.main.temp_min
        console.log[fiveDayForecast[currentDate].minTemp]
      }
      if (item.main.temp_max > fiveDayForecast[currentDate].maxTemp) {
        fiveDayForecast[currentDate].maxTemp = item.main.temp_max
      }

    } else {  //else create an object with currentDate as key
        let forecastDate = convertDate(item.dt) //calling convertDate function for formatting the date
        let DescriptionImage = weatherDescriptionImage(item.weather[0].description) 
        fiveDayForecast[currentDate] = {
          
          "date": forecastDate,
          "weatherIcon":DescriptionImage,
          "minTemp": item.main.temp_min,
          "maxTemp": item.main.temp_max
        }
                
      }
         
  })

}

// converting date format
function convertDate(fetchedDate) {
  
  const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const date = new Date(fetchedDate * 1000)

  //converting day
  let newDay = date.getDay()
  let whatDay = week[newDay]

  //constructing the required format
  let formattedDate = ` ${whatDay}`

  //returning the formatted date
  return formattedDate 

}
const weatherDescriptionImage = (desc) => {
  
  if (desc === 'clear sky') {
    return './Designs/Design-1/assets/Group38.png'
  
  } else if (desc === 'few clouds') { 
    return './Designs/Design-1/assets/Group34.png'
  
  } else if (desc === 'scattered clouds') {
    return './Designs/Design-1/assets/Group16.png'
  
  } else if (desc === 'broken clouds') {
    return './Designs/Design-1/assets/Group16.png'

  } else if (desc === 'shower rain') {
    return './Designs/Design-1/assets/Group16.png'

  } else if (desc === 'rain') {
    return './Designs/Design-1/assets/Group16.png'

  } else if (desc === 'thunderstorm') {
    return './Designs/Design-1/assets/Group16.png'

  } else if (desc === 'snow') {
    return './Designs/Design-1/assets/Group16.png'

  } else {
    return './Designs/Design-1/assets/Group16.png'
  }
}

const bigWeatherIcons = (desc) => {
  
  if (desc === 'clear sky') {
    headerBackground.style.backgroundImage = "linear-gradient(#8b8fff,#e3e4ff)"
    return './Designs/Design-1/assets/sun_icon.png'

  } else if (desc === 'few clouds') {
    headerBackground.style.backgroundImage = "linear-gradient(#D2D5D8,#B5D7FA)"
    return './Designs/Design-1/assets/sun_cloud.png'
  
  } else if (desc === 'overcast clouds') {
    headerBackground.style.backgroundImage = "linear-gradient(#D2D5D8,#B5D7FA)"
    return './Designs/Design-1/assets/cloud.png'

  } else if (desc === 'scattered clouds') {
    headerBackground.style.backgroundImage = "linear-gradient(#D2D5D8,#B5D7FA)"
    return './Designs/Design-1/assets/sun_cloud.png'

  } else if (desc === 'broken clouds') {
    headerBackground.style.backgroundImage = "linear-gradient(#D2D5D8,#B5D7FA)"
    return './Designs/Design-1/assets/cloud.png'

  } else if (desc === 'shower rain') {
    headerBackground.style.backgroundImage = "linear-gradient(#87A1B6,#E1E7EB)"
    return './Designs/Design-1/assets/rain.png'

  } else if (desc === 'rain') {
    headerBackground.style.backgroundImage = "linear-gradient(#87A1B6,#E1E7EB)"
    return './Designs/Design-1/assets/rain.png'

  } else if (desc === 'thunderstorm') {
    headerBackground.style.backgroundImage = "linear-gradient(#87A1B6,#E1E7EB)"
    return './Designs/Design-1/assets/thunder.png'

  } else if (desc === 'snow') {
    headerBackground.style.backgroundImage = "linear-gradient(#ade8f4,#caf0f8)"
    return './Designs/Design-1/assets/snowflake.png'

  } else if (desc === 'fog') {
    headerBackground.style.backgroundImage = "linear-gradient(#87A1B6,#E1E7EB)"
    return './Designs/Design-1/assets/fog.png'

  } else if (desc === 'mist') {
    headerBackground.style.backgroundImage = "linear-gradient(#87A1B6,#E1E7EB)"
    return './Designs/Design-1/assets/mist.png'
    
  } else {
    headerBackground.style.backgroundImage = "linear-gradient(#ade8f4,#caf0f8)"
    return './Designs/Design-1/assets/cloud.png'
  }

}

const toTitleCase= (str)=> {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  )
}

function convertTime(unixTime){
  let date = new Date(unixTime * 1000)
  let hours = date.getHours()
  let minutes = "0" + date.getMinutes()
  let time = hours + ":" + minutes.substr(-2)
  return time
}

