const theLocation = document.getElementById("location")
const theTemperature = document.getElementById("temperature")
const minMax = document.getElementById("todaysMinMax")
const wind = document.getElementById("todaysWind")
const theDescription = document.getElementById("description")
const sunriseTime = document.getElementById("sunrise")
const sunsetTime = document.getElementById("sunset")

let todaysDate = new Date()

fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=7309e4a5829fafe809df835ad95f18ea")
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        theLocation.innerHTML = json.name


        //COLD OR WARM TEXT-SHADOW//
        let temperatureRounded = Math.round(json.main.temp * 10) / 10
        theTemperature.innerHTML = `${temperatureRounded} C°`
        if (Math.sign(temperatureRounded) === 0 || Math.sign(temperatureRounded) === -1) {
            theTemperature.style.textShadow = "4px 4px 6px teal"
        }

        //ICON FOR TODAYS WEATHER//
        if (json.weather[0].description === "scattered clouds") {
            theDescription.src = "./icons/scattered_cloud.png"
        } else if (json.weather[0].description === "overcast clouds") {
            theDescription.src = "./icons/overcast_cloud.png"
        }
        console.log(json.weather)

        //MIN-MAX TEMP OF TODAY//
        let minRounded = Math.round(json.main.temp_min * 10) / 10
        let maxRounded = Math.round(json.main.temp_max * 10) / 10

        minMax.innerHTML = `${maxRounded} C° / ${minRounded} C°`
        todaysWind.innerHTML = `${Math.round(json.wind.speed)} m/s`

        //SUNRISE SUNSET//
        let sunriseHoursMinutes = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        let sunsetHoursMinutes = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        sunriseTime.innerHTML = `Sun rises at ${sunriseHoursMinutes}`
        sunsetTime.innerHTML = `Sun sets at ${sunsetHoursMinutes}`

        //WHICH BACKGROUND-IMG TO SHOW//
        let timeNow = todaysDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        if (timeNow >= sunriseHoursMinutes && timeNow <= sunsetHoursMinutes) {
            document.getElementById("today").style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(stockholm_day.jpeg)"

        }


    })

const tomorrow = document.getElementById("day2temp")
const day3forecast = document.getElementById("day3temp")
const day4forecast = document.getElementById("day4temp")
const day5forecast = document.getElementById("day5temp")
const day6forecast = document.getElementById("day6temp")

const day2weekday = document.getElementById("day2")
const day3weekday = document.getElementById("day3")
const day4weekday = document.getElementById("day4")
const day5weekday = document.getElementById("day5")
const day6weekday = document.getElementById("day6")

const day2descr = document.getElementById("day2description")
const day3descr = document.getElementById("day3description")
const day4descr = document.getElementById("day4description")
const day5descr = document.getElementById("day5description")

fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=7309e4a5829fafe809df835ad95f18ea")
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        tomorrow.innerHTML += ` ${Math.round(json.list[8].main.temp * 10) / 10} C°`
        day3forecast.innerHTML += ` ${Math.round(json.list[16].main.temp * 10) / 10} C°`
        day4forecast.innerHTML += ` ${Math.round(json.list[24].main.temp * 10) / 10} C°`
        day5forecast.innerHTML += ` ${Math.round(json.list[32].main.temp * 10) / 10} C°`

        day2descr.innerHTML = `${json.list[8].weather[0].description}`
        day3descr.innerHTML = `${json.list[16].weather[0].description}`
        day4descr.innerHTML = `${json.list[24].weather[0].description}`
        day5descr.innerHTML = `${json.list[32].weather[0].description}`

    })
const findWeekday = () => {
    let numberDay = todaysDate.getDay()

    if (numberDay === 1) {
        day2weekday.innerHTML = "Tuesday:"
        day3weekday.innerHTML = "Wednesday:"
        day4weekday.innerHTML = "Thursday:"
        day5weekday.innerHTML = "Friday:"
    } else if (numberDay === 2) {
        day2weekday.innerHTML = "Wednesday:"
        day3weekday.innerHTML = "Thursday:"
        day4weekday.innerHTML = "Friday:"
        day5weekday.innerHTML = "Saturday:"
    } else if (numberDay === 3) {
        day2weekday.innerHTML = "Thursday:"
        day3weekday.innerHTML = "Friday:"
        day4weekday.innerHTML = "Saturday:"
        day5weekday.innerHTML = "Sunday:"
    } else if (numberDay === 4) {
        day2weekday.innerHTML = "Friday:"
        day3weekday.innerHTML = "Saturday:"
        day4weekday.innerHTML = "Sunday:"
        day5weekday.innerHTML = "Monday:"
    } else if (numberDay === 5) {
        day2weekday.innerHTML = "Saturday:"
        day3weekday.innerHTML = "Sunday:"
        day4weekday.innerHTML = "Monday:"
        day5weekday.innerHTML = "Tuesday:"
    } else if (numberDay === 6) {
        day2weekday.innerHTML = "Sunday:"
        day3weekday.innerHTML = "Monday:"
        day4weekday.innerHTML = "Tuesday:"
        day5weekday.innerHTML = "Wednesday:"
    } else if (numberDay === 7) {
        day2weekday.innerHTML = "Monday:"
        day3weekday.innerHTML = "Tuesday:"
        day4weekday.innerHTML = "Wednesday:"
        day5weekday.innerHTML = "Thursday:"
    }
}
findWeekday()

//const showKalmar = () => {
 //   document.getElementById("switchCity").onclick
//}