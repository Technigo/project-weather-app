const myWeather = document.getElementById('container')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm&APPID=0873dd387b81dc473ae107f675063248')
    .then((response) => {
        return response.json()
    })

.then((json) => {


    console.log(json)

    json.weather.forEach((test) => {

        myWeather.innerHTML += `My weather right now is ${test.main} `

    })
})