const topSection = document.getElementById('topSection')
const main = document.getElementById('main')
const degrees = document.getElementById('degrees')
const city = document.getElementById('city')
const condition = document.getElementById('condition')
const sunriseSunset = document.getElementById('sunriseSunset')
const button = document.getElementById('button')
const forecast = document.getElementById('forecast')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Reykjavik&appid=fa2755c779ce094fc80f2fa365eea704&units=metric')
.then((response) => {
    return response.json()
})
.then((json) => {
    degrees.innerHTML = `${json.main.temp.toFixed(1)}°C`;
    city.innerHTML = json.name;
    condition.innerHTML = json.weather[0].description;
    })
















































































fetch('https://api.openweathermap.org/data/2.5/forecast?q=Reykjavik&appid=fa2755c779ce094fc80f2fa365eea704&units=metric')
.then((response) => {
    return response.json()
})
.then((fiveDay) => {
    console.log(fiveDay);
    const filteredFiveDay = fiveDay.list.filter(item => item.dt_txt.includes('12:00'));

filteredFiveDay.forEach((item) => {
    const date = new Date(item.dt * 1000)
    let dayName = date.toLocaleDateString("en-US", {weekday: "long"})
    forecast.innerHTML += `<p>${dayName} ${item.weather[0].main} ${item.main.temp.toFixed(1)} °C</p>`
})
    console.log(new Date);
    console.log(filteredFiveDay);
    })



