// our API-KEY:  d4ab1d4e927071e157d6ad483d6d0ddb


const weatherWindow = document.getElementById("weatherWindow")
const cloudReport = document.getElementById("cloudReport")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const cloudImage = document.getElementById("cloudImage")
const description = document.getElementById("description")
const monday = document.getElementById("monday")
const tuesday = document.getElementById("tuesday")
const wednesday = document.getElementById("wednesday")
const thursday = document.getElementById("thursday")
const friday = document.getElementById("friday")
const saturday = document.getElementById("saturday")
const sunday = document.getElementById("sunday")

//declare variables here here
const fetchWeatherAPI = () => {
   fetch("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=d4ab1d4e927071e157d6ad483d6d0ddb")
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            console.log(json)

        cloudReport.innerHTML= `${json.weather[0].main} | ${json.main.temp}°`; 

        let timeSunrise = new Date(json.sys.sunrise*1000)       
        let timeSunset = new Date(json.sys.sunset*1000)
        //sunrise.innerHTML = `Sunrise : ${timeSunrise.getHours()}:${timeSunrise.getMinutes()}`
        //sunset.innerHTML = `Sunset : ${timeSunset.getHours()}:${timeSunset.getMinutes()}`
        sunrise.innerHTML = "Sunrise: " + timeSunrise.toLocaleString('sv-SE', { hour:'numeric', minute:'numeric', hour12:false })
        sunset.innerHTML = "Sunset: " + timeSunset.toLocaleString('sv-SE', { hour:'numeric', minute:'numeric', hour12:false })

        })
        .catch((err) => {
            console.log("error loading weatherdata", err)
        })

   
}
fetchWeatherAPI();

//fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&cnt=30&APPID=d4ab1d4e927071e157d6ad483d6d0ddb")

