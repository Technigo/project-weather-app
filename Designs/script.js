const cityName = document.getElementById('city')
const temperature = document.getElementById('temperature')
const forecast = document.getElementById('forecast')
const dayInForecast = document.getElementById('weekday')
const temperaturesInForecast = document.getElementById('temperature-this-day')

//APIs
const apiWeather = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=07e49e158145921c4197d32487c9067e'
const apiForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=07e49e158145921c4197d32487c9067e'


fetch(apiWeather)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        //console.log(data.weather[0].main) //array
        //console.log(data.main.temp_max) //object
        const today = new Date();
        cityName.innerHTML = data.name
        temperature.innerHTML = data.main.temp.toFixed(1)
    });



let now = new Date()

fetch(apiForecast)
    .then((response) => {
        return response.json()
    })
    .then((weatherData) => {
        // Filter out all days that are NOT today
        // "weatherItem" is an object in the Array named "list" which is in the object "weatherData"
        //One weatherItem starts with "dt" and ends with "dt_text"

        // All weatherItems that DO NOT match this will get filtered out
        //new Date(weatherItem.dt.temp).getDay() !== now.getDay()


        // let getWeekdayName = (dt) => {

        //     return new Date(dt * 1000).toLocaleDateString("en-gb", { weekday: "short" }).toLowerCase().split(" ")[0]
        //     console.log('Hej')
        // }
        const filteredForecast = weatherData.list.filter(weatherItem => weatherItem.dt_txt.includes('12:00'))
        filteredForecast.forEach(day => {
            const date = new Date(day.dt * 1000)
            let dayName = date.toLocaleDateString("en-US", { weekday: "short" }).toLowerCase()//.split(" ")[0]
            dayInForecast.innerHTML += `<p>${dayName}</p>`
            temperaturesInForecast.innerHTML += `<p>${day.main.temp.toFixed(0)}°</p>`
            console.log(day.main.temp.toFixed(1), date)
        })


        //filteredForecast.forEach((day) => {



        //const week = ['sun', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat']
        //const date = new Date(day.dt * 1000)
        // Make a Date object for right now
        // Compare the forecast's day with the day right now
        //     const isTodaysForecast = date.getDay() === now.getDay();
        //     let dayName = week[date.getDay()]
        //     //We don't want to include this forecast if it is for today
        //     if (!isTodaysForecast) {
        //         dayInForecast.innerHTML += `<p>${dayName}</p>`
        //         temperaturesInForecast.innerHTML += `<p>${day.main.temp.toFixed(0)}°</p>`
        //         //dayInForecast.innerHTML += `<p>${dayName}:</p>`
        //         //temperaturesInForecast.innerHTML += `<p>${day.main.//temp.toFixed(0)}°C</p>`

        //     }
        //     //  forecast.innerHTML += `<p>The forecast: ${day.main.temp.toFixed(0)}°C</p>`
        //     console.log(day.main.temp.toFixed(1), date)
        // })
    })

        // -------

        //     // const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))

        //     // "Hållare för våra excelark"
        //     const forecasts = {}

        //     filteredForecast.forEach(weatherItem => {
        //         const date = new Date(weatherItem.dt * 1000)
        //         // If this day does not have an Array in the "forecasts" object
        //         // we create one for it

        //         // "Om vi inte har ett excelark för kvittona"
        //         // "Så skapar vi ett excelark för att stoppa in dem"
        //         const dayString = date.getDay() + "a"
        //         if (!forecasts[dayString]) {
        //             forecasts[dayString] = []
        //         }

        //         // "Stoppa in kvittona i excelarket"
        //         // Put the temperature in that days Array
        //         forecasts[dayString].push(weatherItem)
        //     })

        //     // "För varje excelark"
        //     // "For every "day" in forecasts"
        //     for (const day in forecasts) {

        //         // const temps = forecasts[day]
        //         const weatherItems = forecasts[day]
        //         // console.log(temps);

        //         // Convert to integers
        //         const tempSum = weatherItems.map(item => parseInt(item.main.temp)).reduce((pv, cv) => pv + cv, 0);


        //         const newDay = { day: day, dayTxt: getWeekdayName(weatherItems[0].dt), temp: Math.ceil(tempSum / weatherItems.length) }
        //         console.log(newDay)

        //         dayInForecast.innerHTML += `<p>${newDay.dayTxt}</p>`
        //         temperaturesInForecast.innerHTML += `<p>${newDay.temp}°</p>`
        //     }

    //})