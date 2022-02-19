//DOM selectors
const cityName = document.querySelector('.city-name')
const temperature = document.querySelector('.temperature')
const weatherContainer = document.querySelector('.weather-container')
const currentDate = document.querySelector('.currentDate')
const sunriseTimeX = document.querySelector('.sunrise-time')
const sunsetTimeX = document.querySelector('.sunset-time')
const fiveDaysForecast = document.querySelector('.five-days-weather');
const weatherDescription = document.querySelector('.weather-description')

//variables for the API:s
const currentWeather = 'https://api.openweathermap.org/data/2.5/weather?q=Perth,Australia&units=metric&appid=70b87f08f9e694d757b4dcb393cc1ec0'
const fiveDays = 'https://api.openweathermap.org/data/2.5/forecast?q=Perth,Australia&units=metric&appid=70b87f08f9e694d757b4dcb393cc1ec0'


//function for current weather in Perth
fetch(currentWeather)
.then((response) => response.json())
.then((data) => { 
  console.log('data', data)
  
  
  let num = data.main.temp
  let n = num.toFixed(1)
    let timeZone = data.timezone
    let sunriseAPI = data.sys.sunrise
    let sunsetAPI = data.sys.sunset
    const sunriseTime = new Date((sunriseAPI + timeZone + (new Date().getTimezoneOffset() * 60)) * 1000).toLocaleTimeString([], {timeStyle: 'short'});
    const sunsetTime = new Date((sunsetAPI + timeZone + (new Date().getTimezoneOffset() * 60)) * 1000).toLocaleTimeString([], {timeStyle: 'short'});
  

    temperature.innerHTML += `<p>${n}°C</p>`

    cityName.innerHTML += data.name
    
      
    
    sunriseTimeX.innerHTML +=`<p>sunrise ${sunriseTime}</P>`
    sunsetTimeX.innerHTML+=`<p>sunset ${sunsetTime}</p>`
    
    data.weather.forEach((main) => {
      weatherDescription.innerHTML += `<p>${main.description}</p>`
    });
            
});


//create an array with our weekdays
 
   const daysOfTheWeek = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
   ];
  
//Getting the forecast and filter out min-max temp for every day.
   fetch(fiveDays)
   .then((response) => { return response.json(); })
   .then((data) => { updateMinMaxTemps(data); });
  
   const updateMinMaxTemps = (data) => {
    let minMaxTemps = {};
  
    data.list.forEach((item) => {
        const currentDate = item.dt_txt.split(" ")[0];

        if (minMaxTemps[currentDate]) {
            if (item.main.temp_min < minMaxTemps[currentDate].minTemp) {
                minMaxTemps[currentDate].minTemp = item.main.temp_min;
            }
            if (item.main.temp_max > minMaxTemps[currentDate].maxTemp) {
                minMaxTemps[currentDate].maxTemp = item.main.temp_max;
            }
        } else {
            //object list to be used to inject the forecast elements in HTML
            const date = new Date(item.dt*1000);
            minMaxTemps[currentDate] = { 
                minTemp: item.main.temp_min, 
                maxTemp: item.main.temp_max,
                dayOfWeek: daysOfTheWeek[date.getDay()],
                icon: item.weather[0].icon
            };
        }
    });
                   //Nabeel - icon: item.weather in the function above checks weathericon from the data from API. img src below use that code to fetch the icon. Use it to change to your icon if you can.
    //Presenting 5 days forecast
    for (const date in minMaxTemps) { 
      fiveDaysForecast.innerHTML += `
      <div class="five-day-forecast">
      <p class= "weekdays">${minMaxTemps[date].dayOfWeek}</p> 
      <img src="http://openweathermap.org/img/wn/${minMaxTemps[date].icon}@2x.png"></img>
      <p class= "weekdays">${minMaxTemps[date].minTemp.toFixed(0)} °C / ${minMaxTemps[date].maxTemp.toFixed(0)} °C</p>
      </div>`
    };
  }


    const weatherIcon = (day) => {
    let main = day.weather[0].main;

    if (
      day.weather[0].description === 'broken clouds' || 
      day.weather[0].description === 'scattered clouds' ||
      day.weather[0].description === 'few clouds'
    ) {
      return partlycloudyIcon;
  } else if (main === "Clouds") {
    return cloudyIcon;
  } else if (main === "Rain") {
    return rainIcon;
  } else if (main === "Thunderstorm") {
    return stormIcon;
  } else if (main === "Drizzle") {
    return rainIcon;
  } else if (main === "Fog" || main === "Mist") {
    return fogIcon;
  } else if (main === "Snow") {
    return snowIcon;
  } else if (main === "Clear") {
    return sunIcon;
  } else {
    return atmosphereIcon;
  }
    
  }


  // <div class= "emojis"> ${emojis}</div>
  /*
  
     // const emojis = [
     // "☀️", 
      //"🌤️", 
     // "🌩️",
    //  "🌧️",
    //  "☁️",
    //  ];

  .then((data) => {
    const filteredForecast = data.list.filter((item) =>
    item.dt_txt.includes('12:00')
    );
    //   createFiveDayForecast(filteredForecast); 
    // })
// .catch(() => {
//     weatherContainer.innerHTML = ``;

// });

*/

//loop and extra html for an array
// data.Ratings.forEach(item => {
  //     movieContainer.innerHTML+= `
  //     <div>
  //     <span>Source: ${item.Source}</span>
  //     <span>Value: ${item.Value}</span>
  //     </div>
  //     `
  //     }) 
  
  // data.base.forEach((base) => {
    //          temperature.innerHTML = `<p>The current temperature is ${main.temp}</p>`

    // weatherForecast.innerHTML += `<p>The min temperature is ${data.main.temp_min}</p>`
    // weatherForecast2.innerHTML += `<p>The max temperature is ${data.main.temp_max}</p>`