const cityName = document.getElementById('city')
const temperature = document.getElementById('temperature')
const forecast = document.getElementById('forecast')
const dayInForecast = document.getElementById('weekday')
const temperaturesInForecast = document.getElementById('temperature-this-day')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const weatherInStockholm = document.getElementById('weatherinstockholm')
const stockholmContainer = document.getElementById('stockholmcontainer')
const celsius = document.getElementById('celsius')
const icon = document.getElementById('icon')
const weatherStatus = document.getElementById('status')

//APIs
const apiWeather = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=07e49e158145921c4197d32487c9067e'
const apiForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=07e49e158145921c4197d32487c9067e'


fetch(apiWeather)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data.weather[0].main) //array
        //console.log(data.main.temp_max) //object
        console.log(Math.round("3.1415"))
        //cityName.innerHTML = data.name //The city name the weather shows at
        console.log(cityName)
        const temperature = data.weather[0].main
        weatherStatus.innerHTML += `${data.weather[0].main} | ` //If it's cloudy, rainy or clear.
        celsius.innerHTML += ` ${data.main.temp.toFixed(0)}°` //How many degrees it is
        console.log(temperature)
        console.log(celsius)
        const sunriseNewDate = new Date(data.sys.sunrise * 1000); //These rows converts the sunrise and sunset to hours and minutes
        const sunriseTime = sunriseNewDate.toLocaleTimeString([], { timeStyle: 'short' })
        console.log(sunriseTime)
        console.log(sunriseNewDate)
        console.log(sunrise)
        sunrise.innerHTML = `sunrise ${sunriseTime}` //The time the sun goes up
        const sunsetNewDate = new Date(data.sys.sunset * 1000);
        const sunsetTime = sunsetNewDate.toLocaleTimeString([], { timeStyle: 'short' })
        sunset.innerHTML = `sunset ${sunsetTime}` //The time the sun goes down
        console.log(data.sys.sunset)

        const weatherReport = () => { //The message that will show and change depending to weather
            if (temperature === 'Clear') {
                weatherInStockholm.innerHTML += `Get your sunnies on. ${data.name} is looking rather great today.`
                icon.innerHTML = `<src=./Designs/icons/clear.svg">`
                console.log(icon)
            } else if (temperature === 'Rain') {
                weatherInStockholm.innerHTML = `Don't forget your umbrella. It's wet in ${data.name} today.`
                icon.innerHTML = `<src=./Designs/icons/rain.svg">`
            } else {
                weatherInStockholm.innerHTML = `Light a fire and get cosy. ${data.name} is looking quite cosy today.`
                icon.innerHTML = `<src=./Designs/icons/cloud.svg">`
            }
        }
        weatherReport()
        console.log(weatherReport)
        console.log(weatherInStockholm)
    });

fetch(apiForecast)
    .then((response) => {
        return response.json()
    })
    .then((weatherData) => {
        const filteredForecast = weatherData.list.filter(weatherItem => weatherItem.dt_txt.includes('12:00'))
        filteredForecast.forEach(day => {
            const date = new Date(day.dt * 1000)
            let dayName = date.toLocaleDateString("en-US", { weekday: "short" }).toLowerCase()//.split(" ")[0]
            if (date !== dayName) {
                dayInForecast.innerHTML += `<p>${dayName}</p>`
                temperaturesInForecast.innerHTML += `<p>${day.main.temp.toFixed(0)}°</p>`
                console.log(day.main.temp.toFixed(1), date)
            }
        })
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

// const sunrise = document.getElementById('sunrise')
// const sunset = document.getElementById('sunset')
// const weatherInStockholm = document.getElementById('weatherinstockholm')
// const stockholmContainer = document.getElementById('stockholmcontainer')
// const celsius = document.getElementById('celsius')
// const icon = document.getElementById('icon')
// const status = document.getElementById('status')

// fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=07e49e158145921c4197d32487c9067e')
// .then((response) => {
//     return response.json()
// })
// .then((data) => {
//     console.log(data.weather[0].main) //array
//     //console.log(data.main.temp_max) //object
//     console.log(Math.round("3.1415"))
//     //cityName.innerHTML = data.name //The city name the weather shows at
//     console.log(cityName)
//     const temperature = data.weather[0].main
//     status.innerHTML += `${data.weather[0].main} |` //If it's cloudy, rainy or clear.
//     celsius.innerHTML += ` ${data.main.temp.toFixed(1)}°` //How many degrees it is
//     console.log(temperature)
//     console.log(celsius)
//     const sunriseNewDate = new Date(data.sys.sunrise * 1000); //These rows converts the sunrise and sunset to hours and minutes
// const sunriseTime = sunriseNewDate.toLocaleTimeString([], {timeStyle: 'short'})
// console.log(sunriseTime)
// console.log(sunriseNewDate)
// console.log(sunrise)
//     sunrise.innerHTML =  `sunrise ${sunriseTime}` //The time the sun goes up
//     const sunsetNewDate = new Date(data.sys.sunset * 1000); 
// const sunsetTime = sunsetNewDate.toLocaleTimeString([], {timeStyle: 'short'})
//     sunset.innerHTML = `sunset ${sunsetTime}` //The time the sun goes down
//     console.log(data.sys.sunset)

// const weatherReport = () => { //The message that will show and change depending to weather
// if (temperature === 'Clear') {
// weatherInStockholm.innerHTML += `Get your sunnies on. ${data.name} is looking rather great today.`
// icon.innerHTML = `<src=./Designs/icons/clear.svg">`
// console.log(icon)
// } else if (temperature === 'Rain') {
//     weatherInStockholm.innerHTML = `Don't forget your umbrella. It's wet in ${data.name} today.`
//     icon.innerHTML = `<src=./Designs/icons/rain.svg">`
// } else {
//     weatherInStockholm.innerHTML = `Light a fire and get cosy. ${data.name} is looking quite cosy today.`
//     icon.innerHTML = `<src=./Designs/icons/cloud.svg">`
// }
// }
// weatherReport()
// console.log(weatherReport)
// console.log(weatherInStockholm)
// });



// //('en-US', {hour: '2-digit', minute: '2-digit', hour12: false})
// //I did it like this: ${json.main.temp.toFixed(1)}, inside the innerHTML string.
// >>>>>>> sunrise
