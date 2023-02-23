// our API-KEY:  d4ab1d4e927071e157d6ad483d6d0ddb


const weatherWindow = document.getElementById("weatherWindow")
const cityName = document.getElementById("city")
const cloudReport = document.getElementById("cloudReport")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const weatherImage = document.getElementById("weatherImage")
const middleSection = document.getElementById("middleSection")
const day1 = document.getElementById("day+1")
const day2 = document.getElementById("day+2")
const day3 = document.getElementById("day+3")
const day4 = document.getElementById("day+4")
const day5 = document.getElementById("day+5")

// change so that API-key is inside a variable instead straight into the functions

//functions here

function roundDecimal(num) {
    return Math.round(num*10)/10;
}

const fetchWeatherAPI = () => {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=d4ab1d4e927071e157d6ad483d6d0ddb")
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            console.log(json)

            cityName.innerHTML = json.name;
            cloudReport.innerHTML = `${json.weather[0].description} | ${Number(json.main.temp).toFixed(1)} C°`;

            let timeSunrise = new Date(json.sys.sunrise * 1000)
            let timeSunset = new Date(json.sys.sunset * 1000)
            
            sunrise.innerHTML = "Sunrise: " + timeSunrise.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false })
            sunset.innerHTML = "Sunset: " + timeSunset.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false })

        })
        .catch((err) => {
            console.log("error loading weatherdata", err)
        })


}
fetchWeatherAPI();

// create function to fetch weekday's weather api.
const fetchWeekdaysAPI = () => {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&cnt=40&APPID=d4ab1d4e927071e157d6ad483d6d0ddb")
        .then((response) => {
            return response.json()
        })
        .then((json) => {

            const options = { weekday: 'short'};
            let dayTime

            console.log(json)
            const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))

            dayTime = new Date(filteredForecast[0].dt_txt)
            day1.innerHTML = `<span>${dayTime.toLocaleString('en-US', options)}</span>` + `<span>${roundDecimal(filteredForecast[0].main.temp)}C°</span>`

            dayTime = new Date(filteredForecast[1].dt_txt)
            day2.innerHTML = `<span>${dayTime.toLocaleString('en-US', options)}</span>` + `<span>${roundDecimal(filteredForecast[1].main.temp)}C°</span>`

            dayTime = new Date(filteredForecast[2].dt_txt)
            day3.innerHTML = `<span>${dayTime.toLocaleString('en-US', options)}</span>` + `<span>${roundDecimal(filteredForecast[2].main.temp)}C°</span>`

            dayTime = new Date(filteredForecast[3].dt_txt)
            day4.innerHTML = `<span>${dayTime.toLocaleString('en-US', options)}</span>` + `<span>${roundDecimal(filteredForecast[3].main.temp)}C°</span>`

            dayTime = new Date(filteredForecast[4].dt_txt)
            day5.innerHTML = `<span>${dayTime.toLocaleString('en-US', options)}</span>` + `<span>${roundDecimal(filteredForecast[4].main.temp)}C°</span>`

            /* dayTime = new Date(filteredForecast[5].dt_txt)
            day5.innerHTML = `<span>${dayTime.toLocaleString('en-US', options)}</span>` + `<span>${roundDecimal(filteredForecast[5].main.temp)}C°</span>`

            dayTime = new Date(filteredForecast[6].dt_txt)
            day5.innerHTML = `<span>${dayTime.toLocaleString('en-US', options)}</span>` + `<span>${roundDecimal(filteredForecast[6].main.temp)}C°</span>` */
            
            //let dayTime = new Date(filteredForecast[0].dt_txt)
            console.log(dayTime.toLocaleString('en-US', options));
          
            
            //console.log(filteredForecast[0].dt_txt)
            console.log(filteredForecast)
            // console.log(filteredForecast[0].main.temp
            


        })


       

        .catch((err) => {
            console.log("error loading weatherdata", err)
        })
}
fetchWeekdaysAPI();

