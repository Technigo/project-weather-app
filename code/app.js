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
const weatherFeelsLike = document.getElementById('weather-feels-like');


//Main fetch for Stockoholm weather
fetch(todaysWeatherUrl)

  .then((response) => {
      return response.json();
  })
  // .then((json) => {
  //   console.log(json);
  //   cityName.innerHTML =`<h2>${json.name}</h2>`;
  //   mainTemperature.innerHTML = `<h3>${json.main.temp} ºC</h3>`;
  //   sunrise.innerHTML = `Sunrise: ${json.sunrise}`;
  //   sunset.innerHTML = `Sunset: ${json.sunset}`;
  //     const sunriseValue = json.sys.sunrise; //Sunrise and Sunset times in UNIX
  //     const sunsetValue = json.sys.sunset;
  //     /* Multiply by 1000 because the data is given to us in UNIX which is in seconds, but Javascript uses milliseconds. */
  //     const sun = new Date(sunriseValue * 1000);
  //     const set = new Date(sunsetValue * 1000);
  //     const sunriseHour = sun.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: false,});
  //     const sunsetHour = set.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: false,});
  //     sunrise.innerHTML = `<h3> Sunrise: ${sunriseHour}</h3>`; //lets try to find  nice pics instead of text
  //     sunset.innerHTML = `<h3>Sunset: ${sunsetHour}</h3>`;
  //     weatherIcon.innerHTML += //full link beause we do not have the image ourselves and to fetch the specific icon for today
  //     `<img src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png" height="150px" alt="${json.weather[0].description} icon" />`
  //     weatherDescription.innerHTML +=`${json.weather[0].description}`;
  //     weatherFeelsLike.innerHTML += `<h4>(Feels like: ${json.main.feels_like}ºC)</h4>`; 
  //     //fiveDayForecast += `${forecastDate.toLocalDateString('en-US', {weekday: })}`
  
  // })
  .catch(error => {
    container.innerHTML = error;
})
  .finally(() => console.log('Finished!'));

     // fetch(todaysWeatherUrl)

  // .then((response) => {
  //     return response.json();
  // })
  
  //New fetch for 5 days forecast

 

  fetch(fiveDayForecastStockholm)

  .then((response) => {
    return response.json();
})
  .then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
    filteredForecast.forEach((json.list) => {
    fiveDayForecast.innerHTML += `<div>${forecastDate.toLocaleString}{weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})} </div>`
    
    }
  })
const forecastDate = new Date((data.dt + data.timezone) * 1000);
forecastDate.innerHTML += `<div>${forecastDate.toLocaleString}{weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})} </div>`;
forecastDate.innerHTML += `<p>${specificWeekday}</p>`


//playing around with getting the 5 days 

// 
//   const firstDayList = json.list.filter(item => item.dt_txt.includes("12:00"))
//   //Whenever you call the API, just create an array of dateStrings and then, (where list is the array returned from the API and dateStringList is the array of dateStrings) var firstDayList = list.filter(item -> item.dt_text.includes(dateStringList[0]) 


/*
advanced test of geo location


if("geolocation" in navigator) {
  navigator.geolocation.getLocation(setPosition, error);

  else{
    alert ('Browser do not support geolocation')
  }
}

let api = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=f463a96f9ee6b3233c3a141a391ac3cf";


*/