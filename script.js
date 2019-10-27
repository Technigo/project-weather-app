const myWeather = document.getElementById('container')
const myWeather2 = document.getElementById('container2')
const myWeather3 = document.getElementById('container3')
const myWeather4 = document.getElementById('container4')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm&APPID=0873dd387b81dc473ae107f675063248')
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




fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&cnt=30&&APPID=0873dd387b81dc473ae107f675063248')
    .then((response) => {
        return response.json()
    })

    .then((json) => {

       

        myWeather2.innerHTML += `<h2>Monday: Temp min: ${json.list[3].main.temp_min} <br>Temp max: ${json.list[7].main.temp_max}</h2>`

        myWeather3.innerHTML += `<h2>Tuesday: Temp min: ${json.list[11].main.temp_min} <br>Temp max: ${json.list[15].main.temp_max}</h2>`
      
        myWeather4.innerHTML += `<h2>Wednesday: Temp min: ${json.list[19].main.temp_min} <br>Temp max: ${json.list[23].main.temp_max}</h2>`

       
        //const unixTimestampMon = 1572220800

        //let myDate = new Date(unixTimestampD * 1000)

        
})