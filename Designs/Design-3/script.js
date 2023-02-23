//DOM-selectors
const cityName = document.getElementById('city-name')
const currentTemp = document.getElementById('current-temp')
const weekDays = document.getElementById('weekdays')
const weekTemp = document.getElementById('week-temp')
const windSpeed = document.getElementById('wind-speed')
const weatherDesc = document.getElementById('weather-description')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const weatherSymbolBox = document.getElementById('big-weather-symbol-container')

//---------------------------------------------1ST FETCH REQUEST----------------------------------------
fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=26c922535e2ba939d3ff0d8af53d90a2')
.then((response) => {
    return response.json()
})
.then((json) => {
    //this variable contains the temperature and with the math.round the decimals where removed
    let temp = json.main.temp.toFixed(1) //use math-thing instead!! Andreas Axelsson Säger:${(Math.round(json.wind.speed))} 

    //Variables for getting the first word in the description capitalized
    const description = json.weather[0].description
    const firstLetter = description.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = description.slice(1)
    const capitalizeWord = firstLetterCap + remainingLetters //This variable is displaying the weather description
    const rise = new Date(json.sys.sunrise * 1000)
    const up = rise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const set = new Date(json.sys.sunset * 1000)
    const down = set.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    //--------------DISPLAY---------------

    cityName.innerHTML = `${json.name}`//displays the city name
    currentTemp.innerHTML = `${temp}°`//displays the current temperature using the temp variable 
    weatherDesc.innerHTML = `${capitalizeWord}`
    sunrise.innerHTML = `${up}`
    sunset.innerHTML = `${down}`

    //------------------FUNCTION WITH IF-STATEMENTS FOR DISPLAYING ICONS----------------------------   
    const currentWeather = json.weather[0].main //variable checking what the current weather is using the main-property in the json
    
    const changeWeatherIcon = () => {
        if (currentWeather === "Snow") {
            weatherSymbolBox.innerHTML = `<img class = "big-weather-symbol" 
            id="big-weather-symbol" 
            src="./Weather-Icons/Weather-Icons-IOS7-Style-PIXEDEN/SVG/snow-alt.svg"/>`
        }

        else if (currentWeather === "Clear") {
            weatherSymbolBox.innerHTML = `<img class = "big-weather-symbol" 
            id="big-weather-symbol" 
            src="./Weather-Icons/Weather-Icons-IOS7-Style-PIXEDEN/SVG/sun.svg"/>`
        }

        else if (currentWeather === "Thunderstorm") {
            weatherSymbolBox.innerHTML = `<img class = "big-weather-symbol" 
            id="big-weather-symbol" 
            src="./Weather-Icons/Weather-Icons-IOS7-Style-PIXEDEN/SVG/lightning-rain.svg"/>`
        }

        else if (currentWeather === "Drizzle") {
            weatherSymbolBox.innerHTML = `<img class = "big-weather-symbol" 
            id="big-weather-symbol" 
            src="./Weather-Icons/Weather-Icons-IOS7-Style-PIXEDEN/SVG/drizzle.svg"/>`
        }

        else if (currentWeather === "Rain") {
            weatherSymbolBox.innerHTML = `<img class = "big-weather-symbol" 
            id="big-weather-symbol" 
            src="./Weather-Icons/Weather-Icons-IOS7-Style-PIXEDEN/SVG/rain.svg"/>`
        }

        else if (currentWeather === "Clouds") {
            weatherSymbolBox.innerHTML = `<img class = "big-weather-symbol" 
            id="big-weather-symbol" 
            src="./Weather-Icons/Weather-Icons-IOS7-Style-PIXEDEN/SVG/cloud.svg"/>`
        }

        else if (currentWeather === "Fog") {
            weatherSymbolBox.innerHTML = `<img class = "big-weather-symbol" 
            id="big-weather-symbol" 
            src="./Weather-Icons/Weather-Icons-IOS7-Style-PIXEDEN/SVG/fog.svg"/>`
        }

        else {
            weatherSymbolBox.innerHTML = `<img class = "big-weather-symbol" 
            id="big-weather-symbol" 
            src="./Weather-Icons/Weather-Icons-IOS7-Style-PIXEDEN/SVG/cloud-sun.svg"/>`
        }
    }
changeWeatherIcon(currentWeather); //Calling the function changeWeatherIcon with currentWeather variable

})


//------------------------2ND FETCH FOR FORECAST---------------------------------------------------
fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=26c922535e2ba939d3ff0d8af53d90a2')
.then((response) => {
    return response.json()
})
.then((json) => {
    console.log(json)

    console.log(json.list[0].wind.speed)
    windspeed = json.list[0].wind.speed 

    //Filtered forcast for weekdays + foreach-loop that displays the weekdays of the dates
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00')) 
    console.log(filteredForecast)
    filteredForecast.forEach((day) => {
        const date = new Date(day.dt * 1000)
        let dayName = date.toLocaleDateString("en-US", {weekday: "short"})
        weekDays.innerHTML += `<h6>${dayName}</h6>`
        })
//Solution to above was found here: https://stackoverflowteams.com/c/technigo/questions/786 

//forEach-loop for getting the temperatures of each day. Here the array variable is a let because we want to modify it later
    let forecastTemp = filteredForecast.map((temp) => {
        return temp.main.temp.toFixed(0)
        //the above returns the temperature at 12:00 but with only one decimal
    })
    forecastTemp = forecastTemp.join('° ')
    //the above removes the commas for the forecastTemp-array and adds the Celsius sign. not for the last one though, this is added in the innerHTML below

    weekTemp.innerHTML += `<p>${forecastTemp}°</p>`
    windSpeed.innerHTML = `<p>${windspeed} m/s</p>`

    //This displays the temperatures, adding the Celsius sign to the last one.

        
})

