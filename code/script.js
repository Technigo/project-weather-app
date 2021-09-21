const API_WEATHER = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8bda651aba01a3b8831972e24ed1f675';
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8bda651aba01a3b8831972e24ed1f675';
const weatherContainer = document.getElementById ('weather-container');

 fetch(API_WEATHER)
 .then((response) => {
   return response.json() 
 } )
 .then((json) => {
   console.log(json)
    weatherContainer.innerHTML = `
    <div> <h3>Weather in ${json.name}</h3> 
    <h3> To day the temperatur is ${json.main.temp.toFixed(1)} </h3> 
    </div>`
    json.weather.forEach((weather)=> {weatherContainer.innerHTML += 
      `<h3> The weather conditions are ${weather.description}</h3> `
    
    const rise =new Date (json.sys.sunrise * 1000);
    const up= rise.toLocaleTimeString ([], {
    timeStyle: 'short'
    })
    weatherContainer.innerHTML += `<h3> Sunrise: ${up} `
    })
    
});

fetch(API_URL)
.then((response) => {
  return response.json() 
} )
.then((json) => {
 
  const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
  console.log(filteredForecast)
  filteredForecast.map((item) => {
  weatherContainer.innerHTML += 
  ` <div>
 <h3>In ${item.dt_txt} ${json.city.name} is the temp ${item.main.temp.toFixed(1)}</h3> 
   
    </div> 
  `
 })
});
 

// .catch((error) => console.error (error)); 

  