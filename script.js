//for weather forecast API URL
const FORECAST_API_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=London,uk&units=metric&APPID=00ceff8163f7cba27d66b6501ce70e06'

//Dom selector
const test = document.getElementById('test')

//global variables
let temperature 
let roundTemp
//for forecast 
let fiveDayForecast = {}  

//fetch function
// TEST!
fetch('https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=00ceff8163f7cba27d66b6501ce70e06')
.then((response) => {
    return response.json()
  })
.then((data) => {
    // today's forecast 
    console.log('DATA', data)
    test.innerHTML += `
    ${data.name}
    `
    temperature =  (data.main.temp) - 273.15
    roundTemp = temperature.toFixed(1)
    test.innerHTML += `The temperature is ${roundTemp}
    `
    test.innerHTML += `${data.weather[0].description}
    `
})
.catch((error) => console.error(error))
.then(() => console.log('Request finished'));

//END TEST

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
      test.innerHTML +=`
      <div class= "forecast">
        <p class= "forecast-date">
         ${date} ${minTemp}/ ${maxTemp}
        </p>
      <img src="http://openweathermap.org/img/w/${weatherIcon}.png"/>
      </div>
    `
    })
    
  })
  .catch((error) => console.error(error))
  .then(() => console.log('Request finished'));

//----- functions for forecast-----//


// function to create object of forecast with min, max temperature and formatted date
const createForecast = (data) => {
  console.log ("i am here")
  
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
        fiveDayForecast[currentDate] = {
          "date": forecastDate,
          "weatherIcon":item.weather[0].icon,
          "minTemp": item.main.temp_min,
          "maxTemp": item.main.temp_max
        }
                
      }
         
  })

}
// converting date format
function convertDate (fetchedDate)  {
  const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
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
  let formattedDate = ` ${whatDay} ${date.getDate()} ${whatMonth}`
  //returning the formatted date
  return formattedDate 

}