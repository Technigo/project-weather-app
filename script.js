//for weather forecast API URL
const FORECAST_API_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=London,uk&units=metric&APPID=00ceff8163f7cba27d66b6501ce70e06'

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

fetch('https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=00ceff8163f7cba27d66b6501ce70e06')
.then((response) => {
    return response.json()
  })
.then((data) => {
    // today's forecast 
  console.log('DATA', data)
    temperature =  (data.main.temp) - 273.15
    roundTemp = temperature.toFixed(1)
  const weatherImage = bigWeatherIcons(data.weather[0].description)
  const description = toTitleCase(data.weather[0].description)

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

        </div>
        <div class="sunset">
        Sunset:    
        </div>
        <div class="sunset-time" id="sunsetTime">
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
    console.log('Forecast DATA', data) // just for testing purpose 
   
    createForecast(data) //calling CreateForecast function to create forecast for next five days with minimum temperature, maximum temperature and formatted date
    console.log (typeof(fiveDayForecast)) //for test purpose
    Object.values(fiveDayForecast).forEach(item => {  // in order to iterate each value of object as forEach method does not work on object directly (https://flexiple.com/loop-through-object-javascript/)
     const  {date, weatherIcon, minTemp, maxTemp}= item  
      forecastContainer.innerHTML +=`
      <div class= "html-row">
        <span> 
         ${date} 
        </span>
        <span>
        <img src="${weatherIcon}"/>
        </span>
        <span>
        ${minTemp.toFixed(1)}&#8451 / ${maxTemp.toFixed(1)}&#8451
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
    console.log(currentDate)
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
function convertDate (fetchedDate)  {
  const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const month = ['JAN', 'FEB','MAR', 'APR', 'MAY','JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC' ]
  const date = new Date(fetchedDate * 1000)
  //converting month
  let newMonth = date.getMonth()
  let whatMonth = month[newMonth]
  console.log(whatMonth)
  //converting day
  let newDay = date.getDay()
  let whatDay = week[newDay]
  console.log(whatDay)
  //constructing the required format
  //let formattedDate = ` ${whatDay} ${date.getDate()} ${whatMonth}`
   let formattedDate = ` ${whatDay}`
  //returning the formatted date
  return formattedDate 

}
const weatherDescriptionImage = (desc) => {
  
  if (desc === 'clear sky') {
    return './Designs/Design-1/assets/Group38.png';
  } else if (desc === 'few clouds') {
    return './Designs/Design-1/assets/Group34.png';
  } else if (desc === 'scattered clouds') {
    return './Designs/Design-1/assets/Group16.png';
  } else if (desc === 'broken clouds') {
    return './Designs/Design-1/assets/Group16.png';
  } else if (desc === 'shower rain') {
    return './Designs/Design-1/assets/rain.png';
  } else if (desc === 'rain') {
    return './Designs/Design-1/assets/rain.png';
  } else if (desc === 'thunderstorm') {
    return './Designs/Design-1/assets/NA.png';
  } else if (desc === 'snow') {
    return './Designs/Design-1/assets/NA.png';
  } else {
    return './Designs/Design-1/assets/NA.png';
  }
}

const bigWeatherIcons = (desc) => {
  
  if (desc === 'clear sky') {
    headerBackground.style.backgroundImage = "linear-gradient(#ade8f4,#caf0f8)"
    return './Designs/Design-1/assets/sun-icon.png';
  } else if (desc === 'few clouds') {
    headerBackground.style.backgroundImage = "linear-gradient(#ade8f4,#caf0f8)"
    return './Designs/Design-1/assets/Group34.png';
  } else if (desc === 'scattered clouds') {
    headerBackground.style.backgroundImage = "linear-gradient(#ade8f4,#caf0f8)"
    return './Designs/Design-1/assets/sun-cloud2.png';
  } else if (desc === 'broken clouds') {
    headerBackground.style.backgroundImage = "linear-gradient(#333,#caf0f8)"
    return './Designs/Design-1/assets/cloud.png';
  } else if (desc === 'shower rain') {
    headerBackground.style.backgroundImage = "linear-gradient(#ade8f4,#caf0f8)"
    return './Designs/Design-1/assets/rain.png';
  } else if (desc === 'rain') {
    headerBackground.style.backgroundImage = "linear-gradient(#ade8f4,#caf0f8)"
    return './Designs/Design-1/assets/rain.png';
  } else if (desc === 'thunderstorm') {
    headerBackground.style.backgroundImage = "linear-gradient(#ade8f4,#caf0f8)"
    return './Designs/Design-1/assets/NA.png';
  } else if (desc === 'snow') {
    headerBackground.style.backgroundImage = "linear-gradient(#ade8f4,#caf0f8)"
    return './Designs/Design-1/assets/NA.png';
  } else {
    headerBackground.style.backgroundImage = "linear-gradient(#ade8f4,#caf0f8)"
    return './Designs/Design-1/assets/NA.png';
  }
}


const toTitleCase= (str)=> {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

