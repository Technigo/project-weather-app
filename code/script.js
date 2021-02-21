const url = 'https://api.openweathermap.org/data/2.5/weather?q=Honolulu,US&units=metric&APPID=10fda04a7a07d18a42350678faeacff1'
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Honolulu,US&units=metric&APPID=10fda04a7a07d18a42350678faeacff1'
const mainContainer = document.getElementById('main')
const city = document.getElementById('city')
const weather = document.getElementById('weather')
const temperature = document.getElementById('temperature')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const week = document.getElementById('week')
const header = document.getElementById('header')
const weatherIcon = document.getElementById('weather-icon')
const otherLocationsContainer = document.getElementById('other-locations-container')

fetch(url)
.then((response) => (response.json()))
.then((data) => {
 
  let currentWeatherPic = `<img src=https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png></img>`; 
  
  weatherIcon.innerHTML = `${currentWeatherPic}`; 
  city.innerHTML += ` ${data.name}`; 
  temperature.innerHTML += ` ${data.main.temp.toFixed(1)} ºC`;
  weather.innerHTML += `${data.weather[0].description}`;
  sunrise.innerHTML +=`${new Date((data.sys.sunrise + data.timezone) * 1000).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12:false,})}`
  sunset.innerHTML += `${new Date((data.sys.sunset + data.timezone) * 1000).toLocaleTimeString('en-US',{hour: '2-digit', minute:'2-digit', hour12:false,})}`

 
 if( data.weather[0].description.indexOf('rain') > 0 ) {
  	document.body.className = 'rainy';
  } else if( data.weather[0].description.indexOf('cloud') > 0 ) {
  	document.body.className = 'cloudy';
  } else if( data.weather[0].description.indexOf('sunny') > 0 ) {
  	document.body.className = 'sunny';
  } else {
  	document.body.className = 'clear';
  }
})

.catch((error)=>{
  mainContainer.innerHTML = `<h2>Ooops, an error has occurred! Please try again later.<h2>`
})

fetch(forecastUrl)
.then((response) => (response.json())) 
.then((data) => {
  const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))

  filteredForecast.forEach(item => {
  let temperature = (item.main.temp).toFixed(1);
  let weekday = (new Date(item.dt * 1000)).toLocaleDateString("en-US", {weekday: "long"});
  let weatherPicture = `<img src=https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png></img>`;

  week.innerHTML += `
    <p>${weekday}${weatherPicture}${temperature} ºC</p>
    `;
})
})

.catch((error)=>{
  mainContainer.innerHTML = `<h2>Ooops, an error has occurred! Please try again later.<h2>`
})



//Fetching weather for Mexico city, Mexico

fetch('https://api.openweathermap.org/data/2.5/weather?id=3530597&units=metric&appid=10fda04a7a07d18a42350678faeacff1')
.then((response) => (response.json()))
.then(data => {
  otherLocationsContainer.innerHTML += otherLocations(data);
  console.log(data);
});


//Fetching weather for Stockholm, Sweden

fetch('https://api.openweathermap.org/data/2.5/weather?id=2673730&units=metric&appid=10fda04a7a07d18a42350678faeacff1')
.then((response) => (response.json()))
.then(data => {
  otherLocationsContainer.innerHTML += otherLocations(data);
  
})

//Fetching weather for Tokyo, Japan 

fetch('https://api.openweathermap.org/data/2.5/weather?id=1850147&units=metric&appid=10fda04a7a07d18a42350678faeacff1')
.then((response) => (response.json()))
.then(data => {
  otherLocationsContainer.innerHTML += otherLocations(data);
})

//Fetching weather for ?



// Function for other cities current weather

  const otherLocations = city => {
  const cityTemp = city.main.temp.toFixed(1);
  const cityName = city.name;
  const cityWeather = city.weather[0].description;
  const cityWeatherIcon = `<img src=https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png></img>`;
  

  let otherLocations = '';
  
  otherLocations += `<div class="city">`;
  otherLocations += `<h1>${cityTemp}ºC</h1>`;
  otherLocations += `<h2>${cityName}</h2>`;
  otherLocations += `<span>${cityWeatherIcon}</span>`
  otherLocations += `<h3>${cityWeather}</h3>`;
  otherLocations += `</div>`;
  return otherLocations;
 
}  