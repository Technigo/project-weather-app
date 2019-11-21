
const temperatureDescription = document.getElementById("temperature-description");
const temperatureDegree = document.getElementById("temperature-degree");
const temperatureMinMax = document.getElementById("todaysTempMinMax");
const locationTimezone = document.getElementById("location-timezone");
const theSunset = document.getElementById("sunset-time");
const theSunrise = document.getElementById("sunrise-time");
const theCurrentIcon = document.getElementById("currentIcon");

const apiKey = "b877a181a1336ffd9c5f008eac1f2132"
const city = "Gothenburg,Sweden";

//Today's weather 

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`)
.then(response => {
    return response.json();
})
.then((json) => {
    console.log(json);
    locationTimezone.innerHTML = `${json.name}`
    temperatureDegree.innerHTML = json.main.temp.toFixed(1) + " °C"
    temperatureMinMax.innerHTML = `min ${json.main.temp_min.toFixed(1)} °C  |  max ${json.main.temp_max.toFixed(1)} °C`
    theCurrentIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png"  alt="icon for weather" />`

    let theSunriseTime = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    let theSunsetTime = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    theSunrise.innerHTML = `Sunrise ${theSunriseTime}`
    theSunset.innerHTML = `Sunset ${theSunsetTime}`
    });

const dates = {}
const forecastDates = document.getElementById("forecastDates")
const forecastDescription = document.getElementById("forecastDescription")
const forecastMinMax = document.getElementById("forecastMinMax")
    

//FORECAST

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=7309e4a5829fafe809df835ad95f18ea`)
    .then((response) => {
     return response.json()
 })
    .then((json) => {
        json.list.forEach((weather) => {
    const date = weather.dt_txt.split(' ')[0]
    if (dates[date]) {
        dates[date].push(weather)
 }
    else {
        dates[date] = [weather]
 }
})
    
Object.entries(dates).forEach((item, index) => {
const date = item[0]
const weatherValues = item[1]
const temps = weatherValues.map((value) => value.main.temp)
const minTemp = Math.min(...temps)
const maxTemp = Math.max(...temps)
    
if (index === 0) {
    return
}
    
//DATES TO DAYS//

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const wholeDate = new Date(date)
const dayName = (dayNames[wholeDate.getDay()])
    
//FORECAST DAYS, ICONS, MAX-MIN-TEMP//
console.log(typeof weatherValues)

try {
forecastDescription.innerHTML += `<li id="weatherIcons">
<img src="https://openweathermap.org/img/wn/${weatherValues[3].weather[0].icon}@2x.png" alt="weathericons"/></li>`

forecastDates.innerHTML += `<li>${dayName}</li>`
forecastMinMax.innerHTML += `<li>${maxTemp.toFixed(1)} °C || ${minTemp.toFixed(1)} °C</li>`

} catch (error) {
console.log(`Next day of forecast will come soon`)
}
    
})
    
})

