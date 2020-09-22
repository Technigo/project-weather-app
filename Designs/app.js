const weatherToday = 'http://api.openweathermap.org/data/2.5/weather?q=Gamleby,Sweden&units=metric&APPID=6ce5bf72d646ddeec36c25915a5c0762'
const weatherForecast = 'http://api.openweathermap.org/data/2.5/forecast?q=Gamleby,Sweden&units=metric&APPID=6ce5bf72d646ddeec36c25915a5c0762'

const city = document.getElementById('city')
const description = document.getElementById('description')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const temp = document.getElementById('temp')

const day2 = document.getElementById('day2')
const day3 = document.getElementById('day3')
const day4 = document.getElementById('day4')
const day5 = document.getElementById('day5')

fetch(weatherToday)
    .then((response) => {
        return response.json()
    })                          //Tells what the weather is now.
    .then((json) => {
        updateWeatherToday(json)

    })

fetch(weatherForecast)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        updateWeatherForecast(json)

    })


const updateWeatherToday = (todayWeatherJson) => {
    city.innerHTML = todayWeatherJson.name
    description.innerHTML = todayWeatherJson.weather[0].description

    const sunriseTime = new Date(todayWeatherJson.sys.sunrise * 1000)
    const sunriseTimeString = sunriseTime.toLocaleTimeString('en-US', {
        timestyle: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false

    })

    const sunsetTime = new Date(todayWeatherJson.sys.sunset * 1000)
    const sunsetTimeString = sunsetTime.toLocaleTimeString('en-US', {
        timestyle: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false

    })

    sunrise.innerHTML = sunriseTimeString
    sunset.innerHTML = sunsetTimeString
    temp.innerHTML = `${Math.round(todayWeatherJson.main.temp)} ° `

}

const updateWeatherForecast = (weatherForecastJson) => {
    const filteredForecast = weatherForecastJson.list.filter(item => item.dt_txt.includes('12:00'))
    console.log(filteredForecast)

    const day1Data = filteredForecast[0]

    // Set day 1 name
    const day1Name = document.getElementById('day1-name')
    const day1Date = new Date(day1Data.dt * 1000)
    const dayString = day1Date.toLocaleDateString('en-US', {
        weekday: 'short'
    })

    day1Name.innerHTML = dayString

    // Update icon
    const day1Icon = document.getElementById('day1-icon')
    day1Icon.src = `images/${day1Data.weather[0].icon}.png`

    //Update temp day 1 
    const tempDay1 = document.getElementById('day1-temp')
    tempDay1.innerHTML = `${Math.round(day1Data.main.temp)} °`
    


    //day2 
    // day3  
    // day4  
    // day5  





}










// Your task is to present the data: the city name, the temperature (rounded to 1 decimal place), and what type of weather it is (the "description" in the JSON)



// const apiUrl = "https://api.spacexdata.com/v3/launches/past"
// const container = document.getElementById('main')
// const launchCountHeader = document.getElementById('launchCountHeader')

// fetch(apiUrl).then((response) => {
//     return response.json()
// })
//     .then((launchArray) => {
//         launchCountHeader.innerHTML = launchArray.length
//         console.log(launchArray)


//         launchArray.forEach((launch) => {
//             container.innerHTML += generateHTMLForLaunch(launch)
//         })
//     })
//     const generateHTMLForLaunch = (launch) => {
//         console.log(launch)
//         const launchDate = new Date(launch.launch_date_utc)
//         const launchTimeString = launchDate.toLocaleTimeString('en-US', {
//             timestyle: 'short', 
//             hour12: false, 
//         }) 
//         const launchDateString = launchDate.toLocaleDateString('en-US', {
//             weekday: 'short',
//         })

//         const launchOutcome = launch.launch_success
//         const launchOutcomeImageUrl = launchOutcome 
//             ? './up.png' 
//             : './down.png'

//         return `<img src= ${launchOutcomeImageUrl} >`, `<p>${launch.flight_number}, ${launch.mission_name} 
//         - ${launchDateString}, ${launchTimeString}</p>`
//     }