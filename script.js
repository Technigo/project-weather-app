const myWeather = document.getElementById('container')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm&APPID=0873dd387b81dc473ae107f675063248')
    .then((response) => {
        return response.json()
    })

.then((json) => {


    //console.log(json)


    myWeather.innerHTML += `<h1>My weather right now in ${json.name} </h1>`

    myWeather.innerHTML += `<h2>Tempurature is: ${Math.round(json.main.temp - 273.15)} degrees </h2>`

    myWeather.innerHTML += `<h2>Type of weather: ${json.weather[0].description} </h2>`


})