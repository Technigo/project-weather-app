const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?"
const API_KEY = "72e635da2875c352d9f726550253e2db"

const menu = document.getElementById('hamburgerMenu')
const searchWindow = document.getElementById('searchLocationWindow')
const closeWindow = document.getElementById('closeWindow')
const searchButton = document.getElementById('searchLocationButton')
const cityInput = document.getElementById('searchCity')
const city = document.getElementById('city')
const temperature = document.getElementById('temp')
const weather = document.getElementById('weather')


// to get the weather data for the current weather
const fetchWeatherData = async (URL) => {
    try {
        const response = await fetch(URL)
        if (!response.ok) {
            throw new Error('Failed to fetch weather data')
        }
        const data = await response.json()
        console.log(data)

        return data

    } catch (error) {
        console.log("error", error)
    }
}

// Funktion zum Runden der Temperatur
const roundTemperature = (temp, method = 'round') => {
    if (method === 'round') {
        return Math.round(temp);  // Mathematisch korrektes Runden
    } else if (method === 'floor') {
        return Math.floor(temp);  // Abrunden
    } else if (method === 'ceil') {
        return Math.ceil(temp);   // Aufrunden
    }
    return temp;  // Wenn keine bekannte Methode angegeben ist, gib die originale Temperatur zurück
};

// Load weather data of Stockholm when opening the page
window.addEventListener('load', async () => {
    const defaultCity = 'Stockholm'
    const URL = `${BASE_URL}q=${defaultCity}&units=metric&APPID=${API_KEY}`

    const data = await fetchWeatherData(URL)
    if (data) {
        // shows the name of the city from the data
        city.textContent = data.name
        // gets the temperature
        const temp = data.main.temp
        // rounds temperature
        const roundedTemp = roundTemperature(temp, "round")
        // shows the rounded temperature
        temperature.textContent = `${roundedTemp}°`
        weather.textContent = data.weather[0].main
    }
})



// Event-Listener to be able to search for other cities
searchButton.addEventListener("click", async () => {
    // gets the name of the city from the input field
    const newCityName = cityInput.value
    // the new URL is set together
    const URL = `${BASE_URL}q=${newCityName}&units=metric&APPID=${API_KEY}`;

    // get's the new data
    const data = await fetchWeatherData(URL);

    // updates the city name in the HTML
    if (data) {
        city.textContent = data.name
    }
})



// Event Listener to open the search window
menu.addEventListener("click", () => {
    searchWindow.style.display = "block"
})

// To close the search window users can either click on the X or somewhere else on the window

closeWindow.addEventListener("click", () => {
    console.log("hi")
    searchWindow.style.display = "none"
})

searchWindow.addEventListener("click", (event) => {
    if (event.target == searchWindow) {
        searchWindow.style.display = "none"
    }
})


