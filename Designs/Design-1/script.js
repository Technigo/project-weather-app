const url = 'https://api.openweathermap.org/data/2.5/weather?q=Honolulu,US&units=metric&APPID=10fda04a7a07d18a42350678faeacff1'
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Honolulu,US&units=metric&APPID=10fda04a7a07d18a42350678faeacff1'
const mainContainer = document.getElementById('main')
const city = document.getElementById('city')
const weather = document.getElementById('weather')
const temperature = document.getElementById('temperature')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const week = document.getElementById('week')


fetch(url)
.then((response) => {
    console.log(`Status: ${response.status}`);
    return response.json();
    
  })

.then((data) => {
 
  city.innerHTML += `<p> ${data.name}</p>`; 
  weather.innerHTML += ` <p>${data.weather[0].main} - ${data.weather[0].description}</p>`;
  temperature.innerHTML += `<p> ${data.main.temp.toFixed(1)} ºC</p>`;
  sunrise.innerHTML +=`${new Date((data.sys.sunrise + data.timezone) * 1000).toLocaleTimeString()}`
  sunset.innerHTML += `${new Date((data.sys.sunset + data.timezone) * 1000).toLocaleTimeString()}`
})


fetch(forecastUrl)
.then((response) => {
    console.log(`Status: ${response.status}`);
    return response.json();
    
  })
 
.then((data) => {
    const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
  
    filteredForecast.forEach(item => {
    let temperature = (item.main.temp).toFixed(1);
    let weekday = (new Date(item.dt * 1000)).toLocaleDateString("en-US", {weekday: "long"});

    week.innerHTML += `<p>${weekday} ${temperature} ºC</p>`;
  })
})
