const topSection = document.getElementById('topSection')
const main = document.getElementById('main')
const degrees = document.getElementById('degrees')
const city = document.getElementById('city')
const condition = document.getElementById('condition')
const sunriseSunset = document.getElementById('sunriseSunset')
const button = document.getElementById('button')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Reykjavik&appid=fa2755c779ce094fc80f2fa365eea704&units=metric')
.then((response) => {
    return response.json()
})
.then((json) => {
    //started to add first details to our topsection
    degrees.innerHTML = `${json.main.temp.toFixed(1)}°C`;
    city.innerHTML = json.name;
    condition.innerHTML = json.weather[0].description;
    console.log(json)
    //Below the current UNIX time of sunrise/sunset times will be converted to HH:MM
    const sunriseData = new Date(json.sys.sunrise * 1000)
    console.log(sunriseData)
    const sunsetData = new Date(json.sys.sunset * 1000)
    console.log(sunsetData)
    //Here I used the option argument to customize the result of the toLocaleTimeString method
    const sunriseTime = sunriseData.toLocaleTimeString('en-SE', {
        hour: '2-digit',
        minute: '2-digit'
    })
    console.log(sunriseTime)
    const sunsetTime = sunsetData.toLocaleTimeString('en-SE', {
        hour: '2-digit',
        minute: '2-digit'
    })
    console.log(sunsetTime)
    //Added the converted time for sunrise/sunset to section sunriseSunset
    sunriseSunset.innerHTML = `<h3>sunrise</h3>`;
    sunriseSunset.innerHTML += `<h3>${sunriseTime}</h3>`;
    sunriseSunset.innerHTML += `<h3>sunset</h3>`;
    sunriseSunset.innerHTML += `<h3>${sunsetTime}</h3>`;
    console.log(json.sys)
    })

    

    






































