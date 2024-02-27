//https://api.openweathermap.org/data/2.5/weather?q=Zurich,Switzerland&units=metric&appid=b34ca1ebc43d2420cd2a70a7d29aa6c4

const BASE_URL ="https://api.openweathermap.org/data/2.5/weather"
const API_KEY ="b34ca1ebc43d2420cd2a70a7d29aa6c4"
const place ="Zurich,Switzerland"
const units ="units=metric"

const URL = `${BASE_URL}?q=${place}&${units}&appid=${API_KEY}`

const mainWeather = document.getElementById("main-weather")
const title = document.getElementById("title")

const changeContainer = (json) => {
    mainWeather.innerHTML = `${json.weather[0].main} | ${Math.round(json.main.temp)}`
    title.innerText = json.name
}

const fetchPlace = () => {
    fetch(URL)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            changeContainer(json)
        })
        .catch((error) => {
            console.log(error)
        })
}

fetchPlace()

