const API_KEY = "ad96db07a123e6ca29acb372e202f428" // Should be put in a file that is not committed to Github but let's skip it for now.
const FORECAST_URL = "http://api.openweathermap.org/data/2.5/forecast?q="
let cityName = "Norsjö"
const URL_SUFFIX = `&units=metric&appid=${API_KEY}`

// The weather URL is made up of FORECAST_URL + cityName + URL_SUFFIX

let weatherObject
// function to test the API, not used
let testFunction = (requestTypeUrl) => {
    console.log("Started testFunction.")
    fetch(`${requestTypeUrl}${cityName}${URL_SUFFIX}`).then((response) => {
        console.log("1.")
        return response.json()
    }).then((json) => {
        console.log("2.")
        console.log(json)
    }).catch ((err) => {
        console.error("Error.", json)
    })
    console.log("Finished testFunction.")
}
testFunction(FORECAST_URL)

