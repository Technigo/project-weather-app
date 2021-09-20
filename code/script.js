const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8bda651aba01a3b8831972e24ed1f675';
const weatherContainer = document.getElementById ('weather-container');

fetch(API_URL)
.then(res => res.json ())
.then((data) => {
    console.log('data!', data);
    weatherContainer.innerHTML = `
    <div>
    <h3>Weather in ${data.name}</h3> 
    <h3>Temperature in ${data.name} is ${data.timezone}</h3> 
</div> 
`; 

data.Temperature.forEach((main) => {
    weatherContainer.innerHTML += `
 
  <div>
    <h3> Source: ${main.temp}
    </div> 
    `;
 });
})  

.catch((error) => console.error (error)); 
