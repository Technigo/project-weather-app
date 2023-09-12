const city = document.getElementById('city')
const temp = document.getElementById('temp')
const weatherType = document.getElementById('weather-type')

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
        weatherType.innerHTML = `${element.main}`
    })

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
    console.log (json)
    console.log(json.city.name)
    json.list.forEach((element)=> {
        console.log(element.main.temp)
    }) 

})