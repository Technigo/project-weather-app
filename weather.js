apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Longyearbyen,Norway&units=metric&APPID=8990d7a0fe5c73c6c0fe06bb994b1035"
const containerToday = document.getElementById('weatherMain');
const containerTemp = document.getElementById('weatherTemp');
const containerTempFeel = document.getElementById('weatherTempFeel');
const containerDescription = document.getElementById('weatherDescription');
const containerSunRise = document.getElementById('sunrise');
const containerSunSet = document.getElementById('sunset');

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
    });
    console.log(readableTime)
    return sunTimeString
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

/// getting the API
fetch(apiUrl)
    .then((response) => {
        return response.json()
    })
    .then((weatherMain) => {
        generatedHTMLForWeatherToday(weatherMain)
    })
