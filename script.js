const API = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=15c9c7801fe68566167373f16cf7590a";

const weather = document.getElementById("weather");
const city = document.getElementById("city");
const description = document.getElementById("description");
const temperature = document.getElementById("temperature");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const weekday = document.getElementById("weekday");

// const sunrise = new Date(json.sys.sunrise * 1000); 
// const sunset = new Date(json.sys.sunset *1000);

// // declare new variable to show only hh:mm
// const sunriseShort = sunrise.toLocaleTimeString([], {timeStyle: 'short'}) 
// const sunsetShort = sunset.toLocaleTimeString([], {timeStyle: 'short'})


// const sunriseNewDate = new Date(data.sys.sunrise * 1000); 
// const sunriseTime = sunriseNewDate.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: false})

fetch (API)
.then((response) => {
 return response.json()
})

.then ((json) => {
 city.innerHTML = json.name
 description.innerHTML = json.weather[0].description
 temperature.innerHTML = json.main.temp.toFixed(1)
 sunrise.innerHTML = json.sys.sunrise
 sunset.innerHTML = json.sys.sunset

 console.log(json) 
})
.catch((error) =>
console.error("There has been a problem with your fetch operation:", error)
);

