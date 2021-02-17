const todaysWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f463a96f9ee6b3233c3a141a391ac3cf"
const fiveDayForecastStockholm = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&appid=f463a96f9ee6b3233c3a141a391ac3cf"
const fiveDayForecastBarcelona = "https://api.openweathermap.org/data/2.5/forecast?q=Barcelona,Spain&appid=f463a96f9ee6b3233c3a141a391ac3cf"
const mainTemperature = document.getElementById('main-temperature');
const cityName = document.getElementById('city-name');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const fiveDayForecast = document.getElementById('five-day-forecast');
const weatherDescription = document.getElementById('weather-description');
const weatherIcon = document.getElementById('weather-icon');
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={f463a96f9ee6b3233c3a141a391ac3cf}const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f463a96f9ee6b3233c3a141a391ac3cf"

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={f463a96f9ee6b3233c3a141a391ac3cf}

//Main fetch for Stockoholm weather
fetch(todaysWeatherUrl)

  .then((response) => {
      return response.json();
  })
  .then((json) => {
    console.log(json);
    cityName.innerHTML =`${json.name}`;
    mainTemperature.innerHTML = `${json.main.temp} ºC`;
    sunrise.innerHTML = `Sunrise: ${json.sunrise}`;
    sunset.innerHTML = `Sunset: ${json.sunset}`;
      const sunriseValue = json.sys.sunrise; //Sunrise and Sunset times in UNIX
      const sunsetValue = json.sys.sunset;
      /* Multiply by 1000 because the data is given to us in UNIX which is in seconds, but Javascript uses milliseconds. */
      const sun = new Date(sunriseValue * 1000);
      const set = new Date(sunsetValue * 1000);
      const sunriseHour = sun.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: false,});
      const sunsetHour = set.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: false,});
      sunrise.innerHTML = `Sunrise: ${sunriseHour}`;
      sunset.innerHTML = `Sunset: ${sunsetHour}`;
      weatherDescription.innerHTML +=`${json.weather[0].description}`;
      weatherIcon.innerHTML += //full link beause we do not have the image ourselves and to fetch the specific icon for today
      `<img src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png" alt="${json.weather[0].description} icon" />`
  })


 // to get the description for the weather... ?  
  //  const weatherInfo = json.list.forEach((day)=>{
  //   weatherDescription.innerHTML += `<p> The overal weather: ${day.weather[0].description}. </p>`
  // }


    // fetch(todaysWeatherUrl)

  // .then((response) => {
  //     return response.json();
  // })
  // .then((json) => {
  //   weatherDescription.innerHTML =`${json.weather.description}`;
  //   weatherIcon.innerHTML = `${json.weather.icon}`;
  // })
  //New fetch for 5 days forecast

  //const fiveDayForecast = document.getElementById('five-day-forecast')

//   fetch(fiveDayForecastStockholm)
//   .then((response) => {
//     return response.json();
// })
//   .then((json) => {
//     const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
//     filteredForecast.forEach((json.list) => {
//     fiveDayForecast.innerHTML += forecast.innerHTML
//     }
//   })

//We need to create a variable that takes the value for each day and generates the 5 days in a nice forma


//playing around with getting the 5 days 

// 
//   const firstDayList = json.list.filter(item => item.dt_txt.includes("12:00"))
//   //Whenever you call the API, just create an array of dateStrings and then, (where list is the array returned from the API and dateStringList is the array of dateStrings) var firstDayList = list.filter(item -> item.dt_text.includes(dateStringList[0]) 


