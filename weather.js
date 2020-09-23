apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Longyearbyen,Norway&units=metric&APPID=8990d7a0fe5c73c6c0fe06bb994b1035"
apiUrlForcast = "https://api.openweathermap.org/data/2.5/forecast?q=Longyearbyen,Norway&units=metric&APPID=8990d7a0fe5c73c6c0fe06bb994b1035"

const containerToday = document.getElementById('weatherMain');
const containerTemp = document.getElementById('weatherTemp');
const containerTempFeel = document.getElementById('weatherTempFeel');
const containerDescription = document.getElementById('weatherDescription');
const containerSunRise = document.getElementById('sunrise');
const containerSunSet = document.getElementById('sunset');
const containerForcast = document.getElementById('weatherForecast');
//const containerForcastTemp = document.getElementById('forecasttemp');

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

/// Displaying todays weather forcast 
const generatedHTMLForWeatherToday = (weatherMain) => {
    containerToday.innerHTML = `${weatherMain.weather[0].main}`
    containerTemp.innerHTML = roundtemp(weatherMain.main.temp)
    containerTempFeel.innerHTML = roundtemp(weatherMain.main.feels_like)
    containerDescription.innerHTML = `${weatherMain.weather[0].description}`
    containerSunRise.innerHTML = readableTime(weatherMain.sys.sunrise)
    containerSunSet.innerHTML = readableTime(weatherMain.sys.sunset)
}

/// Display weather forecast
const generatedHTMLForWeatherForcast = (forecast) => {
    containerForcast.innerHTML += "<div>"
    containerForcast.innerHTML += readableDate(forecast.dt_txt)
    containerForcast.innerHTML += "&nbsp;&nbsp;&nbsp;"
    containerForcast.innerHTML += roundtemp(forecast.main.temp)
    containerForcast.innerHTML += "</div>"
    
    console.log(roundtemp(forecast.main.temp)) // this works
    console.log(readableDate(forecast.dt_txt)) // this work

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
