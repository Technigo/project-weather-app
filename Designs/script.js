const cityName = document.getElementById('city')
const temperature = document.getElementById('temperature')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const weatherInStockholm = document.getElementById('weatherinstockholm')
const stockholmContainer = document.getElementById('stockholmcontainer')
const celsius = document.getElementById('celsius')
const icon = document.getElementById('icon')
const status = document.getElementById('status')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=07e49e158145921c4197d32487c9067e')
.then((response) => {
    return response.json()
})
.then((data) => {
    console.log(data.weather[0].main) //array
    //console.log(data.main.temp_max) //object
    console.log(Math.round("3.1415"))
    //cityName.innerHTML = data.name //The city name the weather shows at
    console.log(cityName)
    const temperature = data.weather[0].main
    status.innerHTML += `${data.weather[0].main} |` //If it's cloudy, rainy or clear.
    celsius.innerHTML += ` ${data.main.temp.toFixed(1)}°` //How many degrees it is
    console.log(temperature)
    console.log(celsius)
    const sunriseNewDate = new Date(data.sys.sunrise * 1000); //These rows converts the sunrise and sunset to hours and minutes
const sunriseTime = sunriseNewDate.toLocaleTimeString([], {timeStyle: 'short'})
console.log(sunriseTime)
console.log(sunriseNewDate)
console.log(sunrise)
    sunrise.innerHTML =  `sunrise ${sunriseTime}` //The time the sun goes up
    const sunsetNewDate = new Date(data.sys.sunset * 1000); 
const sunsetTime = sunsetNewDate.toLocaleTimeString([], {timeStyle: 'short'})
    sunset.innerHTML = `sunset ${sunsetTime}` //The time the sun goes down
    console.log(data.sys.sunset)

const weatherReport = () => { //The message that will show and change depending to weather
if (temperature === 'Clear') {
weatherInStockholm.innerHTML += `Get your sunnies on. ${data.name} is looking rather great today.`
icon.innerHTML = `<src=./Designs/icons/clear.svg">`
console.log(icon)
} else if (temperature === 'Rain') {
    weatherInStockholm.innerHTML = `Don't forget your umbrella. It's wet in ${data.name} today.`
    icon.innerHTML = `<src=./Designs/icons/rain.svg">`
} else {
    weatherInStockholm.innerHTML = `Light a fire and get cosy. ${data.name} is looking quite cosy today.`
    icon.innerHTML = `<src=./Designs/icons/cloud.svg">`
}
}
weatherReport()
console.log(weatherReport)
console.log(weatherInStockholm)
});



//('en-US', {hour: '2-digit', minute: '2-digit', hour12: false})
//I did it like this: ${json.main.temp.toFixed(1)}, inside the innerHTML string.
