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
    console.log(json.name)
    console.log(json.main.feels_like)
    city.innerHTML = ` ${json.name}`
    temp.innerHTML = `<p>Temperature:${json.main.temp}</p>`
    json.weather.forEach((element) => {
        weatherType.innerHTML = `<h2> Weather: ${element.main} </h2>`
    })

})

//Fetch for weather in London
// fetch ('https://api.openweathermap.org/data/2.5/weather?q=London,GB&units=metric&APPID=bc487ba1fa4b42fcfb85443237a7774e')
// .then((response)=> {
//     return response.json()
// })
// .then ((json) => {
//     console.log (json)
//     console.log(json.name)
//     console.log(json.main.feels_like)
// })

//Fetch for 5 days forecast in Stockholm
fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=bc487ba1fa4b42fcfb85443237a7774e')
.then((response)=> {
    return response.json()
})
.then ((json) => {
    console.log (json)
    console.log(json.city.name)
    json.list.forEach((element)=> {
        console.log(element.main.temp)
    }) 
    const weatherAt12 = json.list.map((el)=> {
        return el.main.temp
    })
    console.log(weatherAt12)
    //const newTypes = json.types.map((element)=> element.type.name)
   // console.log(newTypes[0])


})


const animals = ['bear', 'rabbit', 'panda']
console.log (animals)
const name = "Emmy"
console.log (name)