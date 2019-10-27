const myWeather = document.getElementById('container')
const myWeather2 = document.getElementById('container2')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Sóller&APPID=0873dd387b81dc473ae107f675063248')
    .then((response) => {
        return response.json()
    })

.then((json) => {


            myWeather.innerHTML += `<h1>My weather right now in ${json.name} </h1>`

            myWeather.innerHTML += `<h2>Tempurature is: ${Math.round(json.main.temp - 273.15)} degrees </h2>`

            myWeather.innerHTML += `<h2>Type of weather: ${json.weather[0].description} </h2>`

            myWeather.innerHTML += `<h2>Sunrise at: ${`${sunrise.getHours()}:${sunrise.getMinutes()}`}</h2>`

            myWeather.innerHTML += `<h2>Sunset at: ${`${sunset.getHours()}:${sunset.getMinutes()}`}</h2>`


})


const unixTimestamp = 1572069056

const unixTimestamp2 = 1572102736

let sunrise = new Date(unixTimestamp * 1000)

let sunset = new Date(unixTimestamp2 * 1000)

//console.log(`${sunrise.getHours()}:${sunrise.getMinutes()}`)




fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&cnt=5&APPID=0873dd387b81dc473ae107f675063248')
    .then((response) => {
        return response.json()
    })

    .then((json) => {


        myWeather2.innerHTML += `<h2>Temp min ${json.list[3].main.temp_min}</h2>`

        myWeather2.innerHTML += `<h2>Temp max ${json.list[3].main.temp_max}</h2>`

        //const unixTimestampMon = 1572220800

        //let myDate = new Date(unixTimestampD * 1000)

        
})