//DOM selectors
let cityName = document.getElementById('cityname')
let temperature = document.getElementById('temperature')
let typeOfWeather = document.getElementById('type-of-weather')
let sunriseAndSunset = document.getElementById('sunrise-and-sunset')
let shortForecast = document.getElementById('three-day-forecast')
let longForecast = document.getElementById('five-day-forecast')
let backgroundImage = document.getElementById('img-background')
let dayOfWeek = document.getElementById('day-of-week')

// Functions
/* getting time from unix format*/
let time = (unix) => {
        let milliseconds = new Date(unix * 1000) /*changing unix unit to milliseconds and using new Date to transformt to date*/
        let hours = milliseconds.getUTCHours() /*using method getUTCHours to get the time*/
        let minutes = milliseconds.getUTCMinutes() /*using method getUTCMinutes to get the time*/
        let clock = hours.toString() + ':' + minutes.toString() /*adding the two together to get a clock*/
        return clock
    }
    /* getting day of week from unix format*/
let daysOfWeek = (millisec) => {
        var x = new Date(millisec * 1000);
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var dayOfWeek = days[x.getDay()]
        return dayOfWeek
    }
    // Global variables
let APIurl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=7d9c815de89c599852c7f57690e69d99'
let forecastAPIUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=7d9c815de89c599852c7f57690e69d99'

/*first fetch-function which fetches information for Sthlm currently*/
fetch(APIurl)
    .then((response) => {
        return response.json()
    })
    .then((weatherData) => {
        let sthlmDay = daysOfWeek(weatherData.dt)
        console.log(dayOfWeek)

        /* entering data from the API into HTML*/
        cityName.innerHTML = `${weatherData.name}`
        dayOfWeek.innerHTML = `${sthlmDay}`
        temperature.innerHTML = `${(weatherData.main.temp).toFixed(1)}&#8451`
        typeOfWeather.innerHTML = `${weatherData.weather[0].description}`

        /*using API data to declare times*/
        let sunriseTime = time(weatherData.sys.sunrise) /*calling the time function with each sunrise and sunset time*/
        let sunsetTime = time(weatherData.sys.sunset)

        /* entering data from the API into HTML*/
        sunriseAndSunset.innerHTML = `
        <h4>Sunrise: ${sunriseTime}</h4>
        <h4>Sunset: ${sunsetTime}</h4>
        `
            /*if-string which specifies which background image to use based off of the current temperature*/
            // weatherData.main.temp = 20 /*use for testing of if-string since temperature is almost always below 0 now :)*/
        if (weatherData.main.temp < 0) {
            backgroundImage.innerHTML += `
            <img id="img-background" class="img-background" alt="" src="/assets/foggy.png">
            `
        } else if (weatherData.main.temp > 0 && weatherData.main.temp < 3) {
            backgroundImage.innerHTML += `
            <img id="img-background" class="img-background" alt="" src="/assets/windy.png">
            `
        } else if (weatherData.main.temp > 3 && weatherData.main.temp < 10) {
            backgroundImage.innerHTML += `
            <img id="img-background" class="img-background" alt="" src="/assets/clear.png">
            `
        } else if (weatherData.main.temp >= 10 && weatherData.main.temp <= 20) {
            backgroundImage.innerHTML += `
            <img id="img-background" class="img-background" alt="" src="/assets/rainy.png">
            `
        } else {
            backgroundImage.innerHTML += `
            <img id="img-background" class="img-background" alt="" src="/assets/sunny3.png">
            `
        }
    })

/*second fetch which fetches forecast data for Sthlm weather for 5-days*/
fetch(forecastAPIUrl)
    .then((response) => {
        return response.json()
    })
    .then((forecastData) => {
        const fiveDayForecast = forecastData.list.filter(item => item.dt_txt.includes('12:00')) /*function taken from hint-section to filter out forecasts from 12:00 PM*/
        const threeDayForecast = fiveDayForecast.slice(0, 3) //Forecast for three days (mobile view)


        /*a forEach that interates through the filtered array extracting the min and max temp of the comming 3 days*/
        threeDayForecast.forEach((forecastSingle, index) => {
            shortForecast.innerHTML += `
                <div class="forecast">
                <div class="forecast-elements">
                <p class="days-of-week">${daysOfWeek(forecastSingle.dt)}</p>
                <img class="icons" id="icons-short-${index}" src="/assets/snow.png">
                <p class="forecast-temp">${(forecastSingle.main.temp_max).toFixed(0)}&#8451 </p>
                </div>
                </div>
            `
        })

        /*a forEach that interates through the filtered array extracting the min and max temp of the comming 5 days*/
        fiveDayForecast.forEach((forecastSingle, index) => {
            longForecast.innerHTML += `
                    <div class="forecast">
                    <div class="forecast-elements">
                    <p class="days-of-week">${daysOfWeek(forecastSingle.dt)}</p>
                    <img class="icons" id="icons-long-${index}" alt="" src=/assets/rain.png>
                    <p class="forecast-temp">${(forecastSingle.main.temp_max).toFixed(0)} &#8451 </p>
                    </div>
                    </div>
                `
        })


        let longFcstDescriptions = fiveDayForecast.map(forecastObject => { /*a function to create a new array of the descriptions for the forecast. These will be used to enter icons fro the fcst*/
            return forecastObject.weather[0].main
        })
        console.log(longFcstDescriptions)

        let shortForecastDescriptions = longFcstDescriptions.slice(0, 3)
        console.log(shortForecastDescriptions)


        /*if-string that specifies which icon to use depending on what word is given in the weather.main*/
        let icons = (fsctDescription, iconID) => {
            let fcstIcons = document.getElementById(iconID)
            console.log(fcstIcons)
            if (fsctDescription === "Clouds") {
                fcstIcons.src = "/assets/clouds.png"
            } else if (fsctDescription === "Snow") {
                fcstIcons.src = "/assets/snow.png"
            } else if (fsctDescription === "Rain") {
                fcstIcons.src = "/assets/rain.png"
            } else if (fsctDescription === "Sunny") {
                fcstIcons.src = "/assets/sun.png"
            } else {
                fcstIcons.src = "/assets/sun.png"
            };
        }

        longFcstDescriptions.forEach((longForecastDescription, index) => {
            icons(longForecastDescription, `icons-long-${index}`)
        })
        shortForecastDescriptions.forEach((shortForecastDescription, index) => {
            icons(shortForecastDescription, `icons-short-${index}`)
        })



    })