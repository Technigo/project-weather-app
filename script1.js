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

const theForecast = document.getElementById("forecast-section");




fetch("https://api.openweathermap.org/data/2.5/weather?q=Malm%C3%B6&units=metric&APPID=8cbd9193bf1986e2387d169ac2d73a9e")
    .then(response => {
        return response.json();
    })
    .then((json) => {
        console.log(json);
        locationTimezone.innerHTML = json.name
        temperatureDegree.innerHTML = json.main.temp.toFixed(1) + " C"
        temperatureMinMax.innerHTML = `min ${json.main.temp_min.toFixed(1)} C / max ${json.main.temp_max.toFixed(1)} C`
        temperatureDescription.innerHTML = `It's ${json.weather[0].description}`

        let theSunriseTime = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        let theSunsetTime = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        theSunset.innerHTML = `The sun goes down: ${theSunsetTime}`
        theSunrise.innerHTML = `The sun rises: ${theSunriseTime}`

    });



fetch("https://api.openweathermap.org/data/2.5/forecast?q=Malm%C3%B6&units=metric&APPID=8cbd9193bf1986e2387d169ac2d73a9e")
    .then(response => {
        return response.json();
    })
    .then((json) => {
        console.log(json);
        //Trying to loop all dates and temps in the array
        json.list.forEach(forecast => {

                theForecast.innerHTML += `${forecast.main.dt} <br> ${forecast.main.temp.toFixed(1)} `

            })
            // Day and Time forecast
        let dayOneForecast = json.list[0].dt_txt
        let dayTwoForecast = json.list[8].dt_txt
        let dayThreeForecast = json.list[16].dt_txt
        let dayFourForecast = json.list[24].dt_txt
        let dayFiveForecast = json.list[32].dt_txt
        console.log(dayOneForecast)
        console.log(dayTwoForecast)
        console.log(dayThreeForecast)
        console.log(dayFourForecast)
        console.log(dayFiveForecast)

        // Show in HTML
        theDayDate.innerHTML = dayOneForecast + dayTwoForecast + dayThreeForecast + dayFourForecast + dayFiveForecast

        // Temperature forecast
        let tempOneForecast = json.list[0].main.temp.toFixed(1)
        let tempTwoForecast = json.list[8].main.temp.toFixed(1)
        let tempThreeForecast = json.list[16].main.temp.toFixed(1)
        let tempFourForecast = json.list[24].main.temp.toFixed(1)
        let tempFiveForecast = json.list[32].main.temp.toFixed(1)
        console.log(tempOneForecast)
        console.log(tempTwoForecast)
        console.log(tempThreeForecast)
        console.log(tempFourForecast)
        console.log(tempFiveForecast)

        // Show in HTML
        theDayTemp.innerHTML = tempOneForecast + tempTwoForecast + tempThreeForecast + tempFourForecast + tempFiveForecast

    });