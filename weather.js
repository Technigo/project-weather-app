apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Longyearbyen,Norway&units=metric&APPID=8990d7a0fe5c73c6c0fe06bb994b1035"
apiUrlForcast = "https://api.openweathermap.org/data/2.5/forecast?q=Longyearbyen,Norway&units=metric&APPID=8990d7a0fe5c73c6c0fe06bb994b1035"

const containerToday = document.getElementById('weatherMain');
const containerTempFeel = document.getElementById('weatherTempFeel');
const containerDescription = document.getElementById('weatherDescription');
const containerSunRise = document.getElementById('sunrise');
const containerSunSet = document.getElementById('sunset');
const containerForcast = document.getElementById('weatherForecast');


/// make this into a one line function instead?
/// calculating a rounded number for the temp
const roundtemp = (number) => {
    const roundtemp = Math.round(number * 10) / 10;
    return roundtemp;
}

/// calculating the time into readable format
const readableTime = (time) => {
    const readableTime = new Date(time * 1000)
    const sunTimeString = readableTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    })
    return sunTimeString;
}

/// calculating the date into readable format
const readableDate = (date) => {
    const readableDate = new Date(date)
    const dateReadableDate = readableDate.toLocaleDateString('en-US', {
        weekday: 'short',
        day: "numeric",

    })
    return dateReadableDate;
}

/// function for icon of the day
const iconDependingOnWeather = (weather) => {
   // if (weather === "Clouds")
    //console.log(iconDependingOnWeather)
    return 'http://openweathermap.org/img/wn/03d@2x.png'
}

let weatherIcon = {
    "Clear": "http://openweathermap.org/img/wn/01d@2x.png",
    "Clouds": "http://openweathermap.org/img/wn/03d@2x.png",
    "Drizzle": "http://openweathermap.org/img/wn/09d@2x.png",
    "Fog": "http://openweathermap.org/img/wn/50d@2x.png",
    "Haze": "http://openweathermap.org/img/wn/50d@2x.png",
    "Mist": "http://openweathermap.org/img/wn/50d@2x.png",
    "Rain": "http://openweathermap.org/img/wn/10d@2x.png",
    "Smoke": "http://openweathermap.org/img/wn/50d@2x.png",
    "Snow": "http://openweathermap.org/img/wn/13d@2x.png",
    "Squall": "http://openweathermap.org/img/wn/50d@2x.png",
    "Thunderstorm": "http://openweathermap.org/img/wn/11d@2x.png",
    "Tornado": "http://openweathermap.org/img/wn/50d@2x.png",
}

let weatherColor = {
    "Clear": "linear-gradient(to right, #e65c00, #F9D423)",
    "Clouds": "linear-gradient(to right, #bdc3c7, #465e76)",
    "Drizzle": "linear-gradient(to right, #D0E1E6, #8CAEAB)",
    "Fog": "linear-gradient(to right, #DECBA4, #bdc3c7)",
    "Haze": "linear-gradient(to right, #DECBA4, #bdc3c7)",
    "Mist": "linear-gradient(to right, #DECBA4, #bdc3c7)",
    "Rain": "linear-gradient(to right, #283048, #859398)",
    "Smoke": "linear-gradient(to right, #203A43, #0F2027)",
    "Snow": "linear-gradient(to right, #00B4DB, #0083B0)",
    "Squall": "linear-gradient(to right, #DCDBDF, #bdc3c7)",
    "Thunderstorm": "linear-gradient(to right, #0F2027, #203A43, #2C5364)",
    "Tornado": "linear-gradient(to right, #3E5151, #DECBA4)",
}

/*
/// function for changing background color depending on main weather
const colorDependingOnWeather = (weather) => {
    //weather = "Clear"
    if (weather === "Clear") {
        return "linear-gradient(to right, #e65c00, #F9D423)"
    } else if (weather === "Rain") {
        return "linear-gradient(to right, blue, gray)"
    }

}
*/

/// Displaying todays weather forcast 
const generatedHTMLForWeatherToday = (weatherMain) => {
    containerToday.innerHTML = `${weatherMain.weather[0].main}`



    // const weather = weatherMain.weather[0].main
    const weather = "Tornado"
    document.getElementById('backgroundColor').style.background = weatherColor[weather]
    document.getElementById('weatherImage').src = weatherIcon[weather]

    document.getElementById('weatherTemp').innerHTML = roundtemp(weatherMain.main.temp)
    containerTempFeel.innerHTML = roundtemp(weatherMain.main.feels_like)
    containerDescription.innerHTML = `${weatherMain.weather[0].description}`
    containerSunRise.innerHTML = readableTime(weatherMain.sys.sunrise)
    containerSunSet.innerHTML = readableTime(weatherMain.sys.sunset)
}

/// Display weather forecast
const generatedHTMLForWeatherForcast = (forecast) => {
    containerForcast.innerHTML += '<div class="test">'
    containerForcast.innerHTML += readableDate(forecast.dt_txt)
    containerForcast.innerHTML += "&nbsp;&nbsp;&nbsp;"
    containerForcast.innerHTML += `${roundtemp(forecast.main.temp)}&deg;`
    containerForcast.innerHTML += "</div>"
}

/// getting the API for todays weather
fetch(apiUrl).then((response) => {
    return response.json()
})
    .then((weatherMain) => {
        generatedHTMLForWeatherToday(weatherMain)
    })


/// getting the API for weather forcast
fetch(apiUrlForcast).then((response) => {
    return response.json()
})
    .then((weatherForcast) => {
        const filteredForcast = weatherForcast.list.filter(item =>
            item.dt_txt.includes('12:00'))
        // generatedHTMLForWeatherForcast(filteredForcast)
        filteredForcast.forEach((forecast) => {
            generatedHTMLForWeatherForcast(forecast)
        });

    })
