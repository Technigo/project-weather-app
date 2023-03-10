// our API-KEY:  d4ab1d4e927071e157d6ad483d6d0ddb


const weatherWindow = document.getElementById("weatherWindow")
const cityName = document.getElementById("city")
const cloudReport = document.getElementById("cloudReport")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const weatherImage = document.getElementById("weatherImageBox")
const img = document.getElementById("weather-img")
const vid = document.getElementById("weathervideo")
const description = document.getElementById("middleSection")
const day1 = document.getElementById("day+1")
const day2 = document.getElementById("day+2")
const day3 = document.getElementById("day+3")
const day4 = document.getElementById("day+4")
const day5 = document.getElementById("day+5")
const colorTheme = document.querySelector(":root")
const dropmenu = document.getElementById("drop-menu")

// change so that API-key is inside a variable instead straight into the functions
let city = "Stockholm"
let country = "Sweden"
//functions here

function roundDecimal(num) {
    return Math.round(num * 10) / 10;
}


const fetchWeatherAPI = (City,Country) => {
    let APIlink = `https://api.openweathermap.org/data/2.5/weather?q=${City},${Country}&units=metric&APPID=d4ab1d4e927071e157d6ad483d6d0ddb` 
    fetch(APIlink)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            console.log(json)

            cityName.innerHTML = json.name;
            cloudReport.innerHTML = `${json.weather[0].description} | ${roundDecimal(json.main.temp)}°`;

            let timeSunrise = new Date(json.sys.sunrise * 1000)
            let timeSunset = new Date(json.sys.sunset * 1000)

            sunrise.innerHTML = "Sunrise: " + timeSunrise.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false })
            sunset.innerHTML = "Sunset: " + timeSunset.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false })


            changeWeatherDescription(json.weather[0].description, json.name);

            //json.weather[0].description

        })
        .catch((err) => {
            console.log("error loading weatherdata", err)
        })


}

// create function to show the desciption the daily weather
const changeWeatherDescription = (weatherDescription, city) => {

    if (weatherDescription.includes("cloud")) {

        description.innerHTML = `Light a fire and get cozy, ${city} is looking gray today`
        colorTheme.style.setProperty('--basecolor', getComputedStyle(colorTheme).getPropertyValue('--pink'))
        img.setAttribute('src', './Designs/Design-2/icons/noun_Cloud_1188486.svg')
        vid.setAttribute('src', './Designs/Design-2/icons/cloudvid.mp4')
        weatherWindow.style.backgroundColor = "#FCE2DB";


    } else if (weatherDescription.includes("clear")) {
        description.innerHTML = `Get your sunnies on, ${city} is looking mighty fine today`
        colorTheme.style.setProperty('--basecolor', getComputedStyle(colorTheme).getPropertyValue('--yellow'))
        img.setAttribute('src', './Designs/Design-2/icons/sun.png')
        vid.setAttribute('src', './Designs/Design-2/icons/clearvid.mp4')
        weatherWindow.style.backgroundColor = "#8AB6D6";
       

    } else if (weatherDescription.includes("rain")) {
        description.innerHTML = `Don't forget your Umbrella, it's wet in ${city} today`
        colorTheme.style.setProperty('--basecolor', getComputedStyle(colorTheme).getPropertyValue('--grayish'))
        img.setAttribute('src', './Designs/Design-2/icons/droplet.png')
        vid.setAttribute('src', './Designs/Design-2/icons/rainvid.mp4')
        weatherWindow.style.backgroundColor = "#6096B4";
       
    } else if (weatherDescription.includes("snow")) {
        description.innerHTML = `Wrap up warm, ${city} is looking very white today`
        colorTheme.style.setProperty('--basecolor', getComputedStyle(colorTheme).getPropertyValue('--lightblue'))
        img.setAttribute('src', './Designs/Design-2/icons/snowflake.png')
        vid.setAttribute('src', './Designs/Design-2/icons/snowvid.mp4')
        weatherWindow.style.backgroundColor = "#929AAB";


    }


}

// create function to fetch next five days weatherforecast.
const fetchWeekdaysAPI = (City,Country) => {
    let APIlink = `https://api.openweathermap.org/data/2.5/forecast?q=${City},${Country}&units=metric&cnt=80&APPID=d4ab1d4e927071e157d6ad483d6d0ddb`
    fetch(APIlink)
        .then((response) => {
            return response.json()
        })
        .then((json) => {

            const options = { weekday: 'short' };
            let dayTime

            console.log(json)
            const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))

            dayTime = new Date(filteredForecast[0].dt_txt)
            day1.innerHTML = dayTime.toLocaleString('en-US', options) + `<span>${roundDecimal(filteredForecast[0].main.temp)}°</span>`

            dayTime = new Date(filteredForecast[1].dt_txt)
            day2.innerHTML = dayTime.toLocaleString('en-US', options) + `<span>${roundDecimal(filteredForecast[1].main.temp)}°</span>`

            dayTime = new Date(filteredForecast[2].dt_txt)
            day3.innerHTML = dayTime.toLocaleString('en-US', options) + `<span>${roundDecimal(filteredForecast[2].main.temp)}°</span>`

            dayTime = new Date(filteredForecast[3].dt_txt)
            day4.innerHTML = dayTime.toLocaleString('en-US', options) + `<span>${roundDecimal(filteredForecast[3].main.temp)}°</span>`

            dayTime = new Date(filteredForecast[4].dt_txt)
            day5.innerHTML = dayTime.toLocaleString('en-US', options) + `<span>${roundDecimal(filteredForecast[4].main.temp)}°</span>`


            console.log(dayTime.toLocaleString('en-US', options));
            console.log(filteredForecast)

        })

        .catch((err) => {
            console.log("error loading weatherdata", err)
        })
}




const moreCityWeather = () =>{

    const value = dropmenu.options[dropmenu.selectedIndex].value
    const arr = value.split(",");
    city = arr[0]
    country = arr[1]
    start()
   //fetchWeatherAPI(arr[0],arr[1])
   //fetchWeekdaysAPI(arr[0],arr[1])

}

const start = () => {
    fetchWeatherAPI(city,country);
    fetchWeekdaysAPI(city,country);
}


//navigator.geolocation.getCurrentPosition(showPosition);
// console.log(navigator.geolocation.getCurrentPosition(showPosition))
// function showPosition(position) {
//     console.log(position)
//     console.log( "Latitude: " + position.coords.latitude +
//     "<br>Longitude: " + position.coords.longitude)
    
    
//   }

start()
dropmenu.addEventListener("change",moreCityWeather)
