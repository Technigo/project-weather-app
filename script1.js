// FIRST API LINK - Malmö Current Weather
const temperatureDescription = document.getElementById("temperature-description");
const temperatureDegree = document.getElementById("temperature-degree");
const temperatureMinMax = document.getElementById("todaysTempMinMax");
const locationTimezone = document.getElementById("location-timezone");
const theSunset = document.getElementById("sunset-time");
const theSunrise = document.getElementById("sunrise-time");

// SECOND API LINK - Forecast 5 days
const theDayDate = document.getElementById("day-date");
const theDayTemp = document.getElementById("day-temp");

const forecastDiv = document.getElementById('forecast-section')

// TESTING ICON PICTURE
const theCurrentIcon = document.getElementById("currentIcon");



fetch("https://api.openweathermap.org/data/2.5/weather?q=Malm%C3%B6&units=metric&APPID=8cbd9193bf1986e2387d169ac2d73a9e")
    .then(response => {
        return response.json();
    })
    .then((json) => {
        console.log(json);
        locationTimezone.innerHTML = json.name
        temperatureDegree.innerHTML = json.main.temp.toFixed(1) + " °C"
        temperatureMinMax.innerHTML = `min ${json.main.temp_min.toFixed(1)} °C / max ${json.main.temp_max.toFixed(1)} °C`
        temperatureDescription.innerHTML = `It's ${json.weather[0].description}`
        theCurrentIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png"  alt="icon for weather" />`

        let theSunriseTime = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        let theSunsetTime = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        theSunset.innerHTML = `The sun goes down: ${theSunsetTime}`
        theSunrise.innerHTML = `The sun rises: ${theSunriseTime}`

        // Change background color depending on if its hot or cold temperature. 
        //less than 10 degree = blue background. 11-20 degree green background. 20+ yellow backround.
        let todaysTemp = json.main.temp.toFixed(1)
        const theBodyBackground = document.getElementById("backgroundColor")
        if (todaysTemp <= 10) {
            theBodyBackground.style.background = "linear-gradient(to right bottom, #065fa3, #0d74ae, #2a88b6, #499cbd, #68afc4)"
        } else if (todaysTemp >= 11 && todaysTemp <= 20) {
            theBodyBackground.style.background = "linear-gradient(to right bottom, #157116, #3a8e30, #5aac4a, #79ca64, #99ea7f)"
        } else {
            theBodyBackground.style.background = "linear-gradient(to right bottom, #dc831e, #e29929, #e7af37, #ebc548, #eeda5c)"
        }
    });

// FORECAST SECTION
const handle5DayForecast = (json) => {
    console.log(json)
    const dates = {}

    json.list.forEach((weather) => {
            // splits dt_txt into date and time, [0] is date, [1] is time.
            const date = weather.dt_txt.split(' ')[0]
            if (dates[date]) {
                dates[date].push(weather)
            } else {
                dates[date] = [weather]
            }
        })
        // entries = turn objects into an array and each of those items have two items (0:keys(date) and 1:values(array with objects)). 
        // Doing this we can now loop it! 
    Object.entries(dates).forEach((item, index) => {
        if (index === 0) {
            return
        }

        const weatherValues = item[1]

        //Fixing dates to days
        const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const date = (item[0])
        const todaysDate = new Date(date)
        const weekdayName = `${weekDays[todaysDate.getDay()]}`

        //map = almost same as forEach, it executes a function for each value/item in the array, 
        //difference is this one collects what ever we return (this case - "value.main.temp"). 
        //Map goes over each objects in this array and sucks out the temperature value and creates a new array of temp.values.
        const temps = weatherValues.map((value) => value.main.temp)

        const minTemp = Math.min(...temps)
        const maxTemp = Math.max(...temps)

        //get the weather descritopn for the forecast 
        const descriptions = weatherValues[0].weather[0].description
        const icons = weatherValues[0].weather[0].icon

        forecastDiv.innerHTML += `<li>${weekdayName} - min: ${minTemp.toFixed(1)} °C, max: ${maxTemp.toFixed(1)} °C <img src="https://openweathermap.org/img/wn/${weatherValues[0].weather[0].icon}@2x.png" id="icon" alt="icons for weather" /> </li>`
    })
}

fetch("https://api.openweathermap.org/data/2.5/forecast?q=Malm%C3%B6&units=metric&APPID=8cbd9193bf1986e2387d169ac2d73a9e")
    .then((res) => res.json())
    .then(handle5DayForecast)
    .catch((err) => alert(err.message))