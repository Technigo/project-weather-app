const url = 'https://api.openweathermap.org/data/2.5/weather?q=Honolulu,US&units=metric&APPID=10fda04a7a07d18a42350678faeacff1'
const mainContainer = document.getElementById('main')
const city = document.getElementById('city')
const weather = document.getElementById('weather')
const temperature = document.getElementById('temperature')


fetch(url)
.then((response) => {
    console.log(`Status: ${response.status}`);
    return response.json();   
  })

.then((data) => {
  city.innerHTML += ` ${data.name}`; 
  weather.innerHTML += ` ${data.weather[0].main} - ${data.weather[0].description}`;
  temperature.innerHTML +=  ` ${data.main.temp.toFixed(1)}`;
})  