//Selectors
const cityName = document.querySelector('.city-name')
const temperature = document.querySelector('.temperature')
const weatherContainer = document.querySelector('.weather-container')
const weatherForecast = document.querySelector('.weather-forecast')
const weatherForecast2 = document.querySelector('.weather-forecast2')
const currentDate = document.querySelector('.currentDate')
const sunriseTimeX = document.querySelector('.sunrise-time')
const sunsetTimeX = document.querySelector('.sunset-time')
const fiveDaysForecast = document.querySelector('.five-days');
const fiveDays = 'https://api.openweathermap.org/data/2.5/forecast?q=Perth,Australia&units=metric&appid=70b87f08f9e694d757b4dcb393cc1ec0'


fetch('https://api.openweathermap.org/data/2.5/weather?q=Perth,Australia&units=metric&appid=70b87f08f9e694d757b4dcb393cc1ec0')
.then((response) => response.json())
.then((data) => { 
    console.log('data', data)
    cityName.innerHTML = data.name
    
    let num = data.main.temp
    let n = num.toFixed(1)
    let timeZone = data.timezone
    let sunriseAPI = data.sys.sunrise
    let sunsetAPI = data.sys.sunset
    const sunriseTime = new Date((sunriseAPI + timeZone + (new Date().getTimezoneOffset() * 60)) * 1000).toLocaleTimeString([], {timeStyle: 'short'});
    const sunsetTime = new Date((sunsetAPI + timeZone + (new Date().getTimezoneOffset() * 60)) * 1000).toLocaleTimeString([], {timeStyle: 'short'});
  

    temperature.innerHTML = `<p>The current temperature is ${n}</p>`
    sunriseTimeX.innerHTML +=`<p>The sun rises at ${sunriseTime}</P>`
    sunsetTimeX.innerHTML+=`<p>The sun sets at ${sunsetTime}</p>`

    weatherForecast.innerHTML = `<p>The min temperature is ${data.main.temp_min}</p>`
    weatherForecast2.innerHTML = `<p>The max temperature is ${data.main.temp_max}</p>`

    data.weather.forEach((main) => {
              weatherContainer.innerHTML += `<p>The current weather is ${main.description}</p>`
            //   weatherForecast.innerHTML += `<p> The min weather is ${main.temp_min}</p>`  
            //   weatherForecast2.innerHTML += `<p> The max temperature is ${main.temp_max}</p>`
   
   
          });   
});


//Show a forecast for the next 5 days

fetch(fiveDays)
.then((res) => res.json())
.then((fiveDaysWeather) => {
  const filterWeather = fiveDaysWeather.list.filter((item) =>
      item.dt_txt.includes("12:00")
    );
    //create an array with our weekdays
    const weekdays = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];

    filterWeather.forEach((item) => {
      const d = new Date(item.dt * 1000);

      const weekdayNumber = d.getDay();
      console.log(`${weekdays[weekdayNumber]}`);

      const roundedTemperature = Math.floor(item.main.temp)
      console.log(roundedTemperature);

      fiveDaysForecast.innerHTML += `
      <div class="daily-forecast"> 
       <p> ${weekdays[weekdayNumber]}</p> 
       <p> ${roundedTemperature}°C </p>
      </div> 
      `
    })
})
/*
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