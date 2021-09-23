const API_WEATHER = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8bda651aba01a3b8831972e24ed1f675';
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8bda651aba01a3b8831972e24ed1f675';
const weatherContainer = document.getElementById ('weather-container');
const topBox = document.getElementById ('top-box');
const middleBox = document.getElementById ('middle-box');
const bottomBox = document.getElementById ('bottom-box');
// const start=() => {
//   changeForcast();
// }

// let changeForcast ();

 fetch(API_WEATHER)
 .then((response) => {
   return response.json() 
 } )
 .then((json) => {
   console.log(json)
    json.weather.forEach((weather)=> {topBox.innerHTML += `<div>
       ${weather.main} | ${json.main.temp.toFixed(1)}°
      </div>`
    const rise =new Date (json.sys.sunrise * 1000);
    const up= rise.toLocaleTimeString ([], {
    timeStyle: 'short'
    })
    const set = new Date(json.sys.sunset * 1000);
    const down = set.toLocaleTimeString([], {
    timeStyle: 'short'
    }) 
    topBox.innerHTML += `<div> Sunrise: ${up} <div>
    <div>Sunset: ${down} 
    </div>`
    }); 
});

fetch(API_WEATHER)
.then((response) => {
  return response.json() 
})
.then((json) => {
  console.log(json)
}


const changeForcast = () => {
  const conditions 
  if (json.weather[0].main === "Rain") { 
  middleBox.innerHTML += ` 
  <img src="/Designs/Design-2/icons/noun_Umbrella_2030530.svg" alt="rain-icon">
  <h1>Weather in ${json.name} is rainy, don't forget your umbrella</h1> </div>`;
  document.body.style.backgroundColor = "#A3DEF7"; 
  document.body.style.color = "#164A68";

} else if (json.weather[0].main === "Clouds") {
  middleBox.innerHTML += `
  <img src="/Designs/Design-2/icons/noun_Cloud_1188486.svg" alt="cloud-icon"> 
  `;
  document.body.style.backgroundColor = "#A3DEF7";
  document.body.style.color = "#164A68";
}else if (json.weather[0].main === "Clear") {
  middleBox.innerHTML += `
  <img src="/Designs/Design-2/icons/noun_Sunglasses_2055147.svg" alt="sunglasses-icon"> 
  `;
  document.body.style.backgroundColor = "#A3DEF7";
  document.body.style.color = "#164A68";
}
 

fetch(API_URL)
.then((response) => {
  return response.json() 
} )
.then((json) => {
  const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
  filteredForecast.forEach((item) => { 
  bottomBox.innerHTML += `
    <div class="day-style" > 
      <p> ${new Date(item.dt_txt).toLocaleDateString("en-US",{weekday:'short'}) } </p> 
      <p> ${item.main.temp.toFixed(1)}°  </p> 
    </div> 
    <hr>
  `
 })
});



// .catch((error) => console.error (error)); 

// TEST FROM STACK OVERFLOW 
// if(!forecastSelector(element)) {
//   return 
// }
// const elementDate= new Date(element.dt*1000)
// const dayNode = document.createElement("P") 
// dayNode.appendChild(document.createTextNode(`${WEEKDAY_SHORT[elementDate.getDay()]}`))

// const WEEKDAY_SHORT = [
//   "Sun",
//   "Mon",
//   "Tue",
//   "Wed",
//   "Thu",
//   "Fri",
//   "Sat",
// ]