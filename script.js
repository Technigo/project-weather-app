const cityName = document.querySelector('.city-name')
const temperature = document.querySelector('.temperature')
const weatherContainer = document.querySelector('.weather-container')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=70b87f08f9e694d757b4dcb393cc1ec0')
.then((response) => response.json())
.then((data) => { 
    console.log('data', data)
    cityName.innerHTML = data.name
    temperature.innerHTML = `<p>The current temperature is ${data.main.temp}</p>`

    data.weather.forEach((main) => {
              weatherContainer.innerHTML += `<p>The current weather is ${main.description}</p>`
             
    });   
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