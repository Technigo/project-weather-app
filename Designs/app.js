const weatherToday = 'http://api.openweathermap.org/data/2.5/weather?q=Gamleby,Sweden&units=metric&APPID=6ce5bf72d646ddeec36c25915a5c0762'
const weatherForecast = 'http://api.openweathermap.org/data/2.5/forecast?q=Gamleby,Sweden&units=metric&APPID=6ce5bf72d646ddeec36c25915a5c0762'

const city = document.getElementById('city')
const description = document.getElementById('description')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const temp = document.getElementById('temp')
const icon = document.getElementById('icon')

const day2 = document.getElementById('day2')
const day3 = document.getElementById('day3')
const day4 = document.getElementById('day4')
const day5 = document.getElementById('day5')

fetch(weatherToday)
    .then((response) => {
        return response.json()
    })                          //Tells what the weather is today.
    .then((json) => {
        updateWeatherToday(json)

    })

fetch(weatherForecast)
    .then((response) => {
        return response.json()
    })                          // Tells the forecast the next 5 days
    .then((json) => {
        console.log(json)
        updateWeatherForecast(json)

    })

//Todays weather
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

    sunrise.innerHTML = `Sunrise ${sunriseTimeString}`
    sunset.innerHTML = `Sunset ${sunsetTimeString}`
    temp.innerHTML = `${Math.round(todayWeatherJson.main.temp)}° `

    const icon = document.getElementById('icon')
    icon.src = `images/${todayWeatherJson.weather[0].icon}.png`

}

// the forecast 


const updateWeatherForecast = (weatherForecastJson) => { 

    // FIltered the data so it only picks the 12:00 data everyday.
    const filteredForecast = weatherForecastJson.list.filter(item => item.dt_txt.includes('12:00'))
    console.log(filteredForecast)


    filteredForecast.forEach((day, index) => { 
        console.log(`day${index+1}-name`)
        
        //The loop gives the ID a new name so it matches the one in the HTML file so it is shown on the site
        const dayName = document.getElementById(`day${index+1}-name`)

        //Calculates the new date from milliseconds to a readeble day date...
        const dayDate = new Date(day.dt * 1000)
        
        // ... and calculate witch day it is and gives it a shorter name
        const dayString = dayDate.toLocaleDateString('en-US', {
            weekday: 'short'
        
        })
        
        // Show the name of the day on the site
        dayName.innerHTML = dayString

        //the icon is selected from the API. 
        const dayIcon = document.getElementById(`day${index+1}-icon`)


        dayIcon.src = `images/${day.weather[0].icon}.png`

        
        const tempDay = document.getElementById(`day${index+1}-temp`)


        tempDay.innerHTML = `${Math.round(day.main.temp)}°`

        
    })

    
    





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