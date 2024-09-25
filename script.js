const API_KEY = "248332e11aac477643699fc267736540"
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?"
const city = "Stockholm,Sweden"
const URL = `${BASE_URL}q=${city}&units=metric&APPID=${API_KEY}`

fetch(URL)
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })