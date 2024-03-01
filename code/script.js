const weatherContainer = document.getElementById('weather-container')
const imgContainer = document.getElementById('img-container')
const cityContainer = document.getElementById('city-container')
const forecastContainer = document.getElementById('forecast-container')

const showWeather = () => {
weatherContainer.innerHTML = `
<p>hello world<p>`
cityContainer.innerHTML = `
<p>hello world<p>`
forecastContainer.innerHTML = `
<p>mon</p>
`
console.log(imgContainer)

}
showWeather()