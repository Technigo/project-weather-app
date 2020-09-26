
const apiWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=3d0d86970b5aff224fe8f40e9b4e2e78'
const container = document.getElementById('main');
const weatherElement = document.getElementById('weatherInfo');
const filteredForecast = document.getElementById('weatherFiveDays');

fetch(apiWeatherUrl)

.then((response) => {
  return response.json();
})
.then((weatherArray) => {
  
  console.log(weatherArray)

  // Step **2 - Present city, temp, description, data on your web app.**

  weatherElement.innerHTML = weatherArray.name;

  const temperatureElement = document.getElementById('temperature'); 
  const y = weatherArray.main.temp;
  const x = Math.round(y);
  temperatureElement.innerText = x; 
  
  const  weatherTypeElement = document.getElementById('weatherType');
  weatherTypeElement.innerText = weatherArray.weather[0].description;

 // Show the time for sunrise and sunset in a readable time format for today.
// Sunrise 
  const sunriseElement = document.getElementById('sunrise');
  const sunriseUnix = weatherArray.sys.sunrise * 1000
  const sunriseDate = new Date (sunriseUnix)
  const sunriseHour = sunriseDate.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: false,})
  sunriseElement.innerText = sunriseHour;
  console.log(sunriseHour)

  //  Sunset 
  const sunsetElement = document.getElementById('sunset');
  const sunsetUnix = weatherArray.sys.sunset * 1000
  const sunsetDate = new Date (sunsetUnix)
  const sunsetHour = sunsetDate.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: false,})
  sunsetElement.innerText = sunsetHour;
  console.log(sunsetHour)

});  

//Step 4 - Show a forecast for the next 5 days. Show the min and max temperature for each day.

const apiWeatherFiveDaysUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=3d0d86970b5aff224fe8f40e9b4e2e78'

fetch(apiWeatherFiveDaysUrl)

.then((response) => {
  return response.json();
})
.then((item) => {
  
  const filteredForecast = item.list.filter(item => item.dt_txt.includes('12:00')) 
  console.log(filteredForecast)


  // minimum temperature
  const minTemp = filteredForecast[0].main.temp_min
  const minTempElement = document.getElementById('minTemp')
  minTempElement.innerText = minTemp
  console.log(minTemp)

  // maximnum temperature
  const maxTemp = filteredForecast[0].main.temp_max
  const maxTempElement = document.getElementById('maxTemp')
  maxTempElement.innerText = maxTemp
  console.log(maxTemp)

  const dayOne = document.getElementById('dayOne');
  const dayOneUnix = filteredForecast[0].dt * 1000
  const dayOneDate = new Date (dayOneUnix)
  const commingFiveDays = dayOneDate.toLocaleDateString('en-US', {weekday: 'long'})
  dayOne.innerText = commingFiveDays
  console.log(commingFiveDays) 

})

  // Hur får jag till en funktion som visar alla fem dagar samt ders min/max temp? varför visar den samma siffra?

    //  // map
    //  const fiveDaysinfo = items.map( => {
    //   const days = weekdays
    //   const minTemp = filteredForecast[0].main.temp_min;
    //   const maxTemp = filteredForecast[0].main.temp_max;

    //   return { weekday, minTemp, maxTemp };

    //  }


// const listArray = filteredForecast[0].dt;
//  filteredForecast.innerText = commingFiveDays;
// console.log(`List of weather forecast: ${commingFiveDays}`);


// })


// //  //extract element called list which is an array, from the object. Get info from array called list!

// //  // Next 5 days but for every third hour. info from 12:00 each day. 
  
  // console.log(`Filtered array: ${filteredForecast}`);

// });




