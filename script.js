const cityName = document.querySelector('.city-name')
const temperature = document.querySelector('.temperature')
const weatherContainer = document.querySelector('.weather-container')
const weatherForecast = document.querySelector('.weather-forecast')
const weatherForecast2 = document.querySelector('.weather-forecast2')
const currentDate = document.querySelector('.currentDate')



fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=70b87f08f9e694d757b4dcb393cc1ec0')
.then((response) => response.json())
.then((data) => { 
    console.log('data', data)
    cityName.innerHTML = data.name
    
    temperature.innerHTML = `<p>The current temperature is ${data.main.temp}</p>`
    weatherForecast.innerHTML = `<p>The min temperature is ${data.main.temp_min}</p>`
    weatherForecast2.innerHTML = `<p>The max temperature is ${data.main.temp_max}</p>`

    data.weather.forEach((main) => {
              weatherContainer.innerHTML += `<p>The current weather is ${main.description}</p>`
              weatherForecast.innerHTML += `<p> The min weather is ${main.temp_min}</p>`  
              weatherForecast2.innerHTML += `<p> The max temperature is ${main.temp_max}</p>`
    });   
});

//Show a forecast for the next 5 days

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=70b87f08f9e694d757b4dcb393cc1ec0')
.then((res) => res.json())
.then((data) => {
const filteredForecast = data.list.filter((item) =>
  item.dt_txt.includes('12:00')
);
  createFiveDayForecast(filteredForecast); 
})
.catch(() => {
    weatherContainer.innerHTML = ``;
    
});

  










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