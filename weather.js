apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Longyearbyen,Norway&units=metric&APPID=8990d7a0fe5c73c6c0fe06bb994b1035"
const containerToday = document.getElementById('weatherMain');
const containerTemp = document.getElementById('weatherTemp');
const containerTempFeel = document.getElementById('weatherTempFeel');
const containerDescription = document.getElementById('weatherDescription');

/// make this into a one line function instead?
/// calculating a rounded number for the temp
const roundtemp = (number) => {
    const roundtemp = Math.round(number * 10) / 10;
    return roundtemp;
}

/// Displaying todays weather forcast 
const generatedHTMLForWeatherToday = (weatherMain) => {
    containerToday.innerHTML = `${weatherMain.weather[0].main}`
    containerTemp.innerHTML = roundtemp(weatherMain.main.temp)
    containerTempFeel.innerHTML = roundtemp(weatherMain.main.feels_like)
    containerDescription.innerHTML = `${weatherMain.weather[0].description}`
}

/// getting the API
fetch(apiUrl)
    .then((response) => {
        return response.json()
    })
    .then((weatherMain) => {
        generatedHTMLForWeatherToday(weatherMain)
    })
