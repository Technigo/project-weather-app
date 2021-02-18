const containerWeather = document.querySelector("#container-weather")
const innerContainerWeather = document.querySelector("#inner-container-weather")
const containerForecast = document.querySelector("#container-forecast")
const hamburger = document.querySelector("#hamburger")
const menu = document.querySelector("#menu")
const stockholmButton = document.querySelector("#stockholm-button")
const barcelonaButton = document.querySelector("#barcelona-button")
const sydneyButton = document.querySelector("#sydney-button")

hamburger.addEventListener("click", () => {
    toggle()
})

const toggle = () => {
    menu.classList.toggle("hidden")
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const getWeather = (location) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=bb54e9dec92e93ad760de1e57539382a`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
            let sunrise = new Date(data.sys.sunrise * 1000)
            let sunset = new Date(data.sys.sunset * 1000)
            console.log(data.sys.sunrise)
            innerContainerWeather.innerHTML = `
        <img class="image-weather" src="./assets/${data.weather[0].main.toLowerCase()}.png">
        <h1>${Math.round(data.main.temp)}<span>°C</span></h1>
        <h2>${data.name}</h2>
        <h3>${data.weather[0].description}</h3>
        <h3 class="sun">
            <span>sunrise</span>
            <span>${sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span>sunset</span>
            <span>${sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </h3>
        `
            if (Date.now() > (data.sys.sunset * 1000)) {
                console.log("late")
                containerWeather.style.background = "linear-gradient(0deg, rgba(104,104,171,1) 0%, rgba(12,11,91,1) 100%)"
            } else {
                console.log("early")
            }
        })
}

console.log((Date.now()))

// const getForecast = (location) => {
//     fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&APPID=bb54e9dec92e93ad760de1e57539382a`)
//         .then((response) => {
//             return response.json()
//         })
//         .then((data) => {
//             console.log(data)
//             const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
//             console.log(filteredForecast)
//             containerForecast.innerHTML = ""
//             for (let i = 0; i < filteredForecast.length; i++) {
//                 let weekday = new Date(filteredForecast[i].dt * 1000)
//                 let description = filteredForecast[i].weather[0].main.toLowerCase()
//                 containerForecast.innerHTML += `
//             <div class="weekdays">
//                 <span>${days[weekday.getDay()]}</span>
//                 <span class="temperature">
//                     <img src="./assets/${description}.png">
//                     <span>${Math.round(filteredForecast[i].main.temp)}°C</span>
//                 </span>
//             </div>
//             `
//             }
//         })
// }


const getForecast = (location) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&APPID=bb54e9dec92e93ad760de1e57539382a`)
        .then(response => response.json())
        .then((data) => {
            containerForecast.innerHTML = ""
            // these variables are declared outside of the loops because we will need to access them later
            let fiveDaysTempsMax = []
            let fiveDaysTempsMin = []
            let eachDayTempsMax = []
            let eachDayTempsMin = []
            let today = new Date(Date.now()).getDate()
            let measureDay = today + 1
            // this loop fills the fiveDaysTempsMax and the fiveDaysTempsMin arrays with 5 arrays,
            // consisting of the all measurements for max and min temperature for each day
            // it checks the date of each measurement (listedDay) and compares that to the day it's measuring (measureDay)
            for (let i = 0; i < data.list.length; i++) {
                let listedDay = new Date(data.list[i].dt * 1000).getDate()
                // this makes sure that the loop doesn't start capturing today's measurement (as it's a forecast, we want to start with tomorrow's measurements)
                if (listedDay !== today) {
                    // this code will read when the day changes
                    // it will push the arrays with a full day's measurement into the five days temps arrays, and empty them to start with the new day
                    // then it sets the day to measure (measureDay) as the new day that just started (listedDay)
                    if (listedDay !== measureDay) {
                        fiveDaysTempsMax.push(eachDayTempsMax)
                        fiveDaysTempsMin.push(eachDayTempsMin)
                        eachDayTempsMax = []
                        eachDayTempsMin = []
                        measureDay = listedDay
                    }
                    // this will always run, this is where the min / max temps measurements get pushed into each day's array
                    eachDayTempsMax.push(data.list[i].main.temp_max)
                    eachDayTempsMin.push(data.list[i].main.temp_min)
                }
            }
            // this pushes the last day's measurements into the big array
            fiveDaysTempsMax.push(eachDayTempsMax)
            fiveDaysTempsMin.push(eachDayTempsMin)

            // this loop reduces the max temperatures of all five day's of measurement to one max temperature for each day, rounded
            let maxTemps = []
            for (let eachDay of fiveDaysTempsMax) {
                let dailyMaxTemp = eachDay.reduce((accumulator, currentValue) => {
                    return (accumulator > currentValue ? accumulator : currentValue);
                })
                maxTemps.push(Math.round(dailyMaxTemp))
            }
            // this loop reduces the min temperatures of all five day's of measurement to one min temperature for each day, rounded
            let minTemps = []
            for (let eachDay of fiveDaysTempsMin) {
                let dailyMinTemp = eachDay.reduce((accumulator, currentValue) => {
                    return (accumulator < currentValue ? accumulator : currentValue);
                })
                minTemps.push(Math.round(dailyMinTemp))
            }
            console.log(maxTemps)
            console.log(minTemps)

            //this loop captures the weekday and the main description of the weather for each day of the five-day-forecast at 9am
            let weekdays = []
            let descriptionWeather = []
            const filteredForecast = data.list.filter(item => item.dt_txt.includes('09:00'))
            for (let i = 0; i < filteredForecast.length; i++) {
                weekdays.push(days[new Date(filteredForecast[i].dt * 1000).getDay()])
                descriptionWeather.push(filteredForecast[i].weather[0].main.toLowerCase())
            }

            //finally, this loop creates the HTML and fills in the weekday, the main description of the weather,
            // and the max and min temperatures for each day
            console.log(weekdays)
            console.log(descriptionWeather)
            for (let i = 0; i < 5; i++) {
                containerForecast.innerHTML += `
                    <div class="weekdays">
                        <span>${weekdays[i]}</span>
                        <span class="temperature">
                            <img src="./assets/${descriptionWeather[i]}.png">
                            <span>max ${maxTemps[i]}°C / min ${minTemps[i]}°C</span>
                        </span>
                    </div>
                `
            }
        })
}


stockholmButton.addEventListener("click", () => {
    getWeather("Stockholm,Sweden")
    getForecast("Stockholm,Sweden")
    toggle()
})
barcelonaButton.addEventListener("click", () => {
    getWeather("Barcelona,Spain")
    getForecast("Barcelona,Spain")
    toggle()
})
sydneyButton.addEventListener("click", () => {
    getWeather("Sydney,Australia")
    getForecast("Sydney,Australia")
    toggle()
})