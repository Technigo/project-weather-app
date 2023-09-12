const city = document.getElementById('city')
const temp = document.getElementById('temp')
const weatherType = document.getElementById('weather-type')
const mainWeatherSection = document.getElementById('main-weather')
const sunSection = document.getElementById('sun')
const forecastSection = document.getElementById('forecast')


fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=bc487ba1fa4b42fcfb85443237a7774e')
.then((response)=> {
    return response.json()
})
.then ((json) => {
    console.log (json)
    console.log('-----------')
    console.log(json.name)
    console.log('-----------')
    console.log(json.main.feels_like)
    console.log('-----------')
    city.innerHTML = ` ${json.name}`
    temp.innerHTML = `<p>Temperature:${json.main.temp}</p>`
    json.weather.forEach((element) => {
        weatherType.innerHTML = `<h2> Weather: ${element.main} </h2>`
    console.log(element.main)
    })
    
    console.log('-----------')
    // const sunrise = sunSection.innerHTML += `<p>Sunrise: ${json.sys.sunrise}</p>`
    // console.log(`sunrise ${json.sys.sunrise}`)
    
    // sunSection.innerHTML += `<p>Sunset: ${json.sys.sunset}</p>`
    // console.log(`sunset ${json.sys.sunset}`)

    // Convert sunrise and sunset timestamps to hours
    const sunriseTime = new Date(json.sys.sunrise * 1000); //*1000 to convert it in to milliseconds
    const sunsetTime = new Date(json.sys.sunset * 1000);

    sunSection.innerHTML += `<p>Sunrise: ${sunriseTime.getHours()}:${String(sunriseTime.getMinutes()).padStart(2, '0')}</p>`;
    console.log(`Sunrise: ${sunriseTime.getHours()}:${String(sunriseTime.getMinutes()).padStart(2, '0')}`);

    sunSection.innerHTML += `<p>Sunset: ${sunsetTime.getHours()}:${String(sunsetTime.getMinutes()).padStart(2, '0')}</p>`;
    console.log(`Sunset: ${sunsetTime.getHours()}:${String(sunsetTime.getMinutes()).padStart(2, '0')}`);
    
    console.log('-----------')

    
    })


   


// fetch ('https://api.openweathermap.org/data/2.5/weather?q=London,GB&units=metric&APPID=bc487ba1fa4b42fcfb85443237a7774e')
// .then((response)=> {
//     return response.json()
// })
// .then ((json) => {
//     console.log (json)
//     console.log(json.name)
//     console.log(json.main.feels_like)
// })

fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=bc487ba1fa4b42fcfb85443237a7774e')
.then((response)=> {
    return response.json()
})
.then ((json) => {
    // console.log (json)
    // console.log(json.city.name)
    json.list.forEach((element)=> {
     // console.log(element.main.temp)
    }) 

})