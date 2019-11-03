const API_KEY = "ad96db07a123e6ca29acb372e202f428" // Should be put in a file that is not committed to Github but let's skip it for now.
let cityName = "Stockholm"
let countryCode = "se"

// function to test the API, not used
let testFunction = () => {
    console.log("Started testFunction.")
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName},${countryCode}&appid=${API_KEY}`).then((response) => {
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