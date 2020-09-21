apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Longyearbyen,Norway&units=metric&APPID=8990d7a0fe5c73c6c0fe06bb994b1035"
const containerToday = document.getElementById('weatherMain');
const containerTemp = document.getElementById('weatherTemp');
const containerDescription = document.getElementById('weatherDescription');



const generatedHTMLForWeatherToday = (weatherMain) => {
    containerToday.innerHTML = `${weatherMain.weather[0].main}`
    console.log(containerToday)
    containerTemp.innerHTML = ` ${weatherMain.main.temp}`
    containerDescription.innerHTML = `${weatherMain.weather[0].description}`
    console.log(containerDescription)
}


fetch(apiUrl)
    .then((response) => {
        return response.json()
    })
    .then((weatherMain) => {
        generatedHTMLForWeatherToday(weatherMain)
    })
