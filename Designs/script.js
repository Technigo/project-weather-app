document.addEventListener('DOMContentLoaded', () => {

    const dayInForecast = document.getElementById('weekday')
    const temperaturesInForecast = document.getElementById('temperature-this-day')
    const sunrise = document.getElementById('sunrise')
    const sunset = document.getElementById('sunset')
    const weatherInStockholm = document.getElementById('weather-in-stockholm')
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
            const weatherOfTheDay = data.weather[0].main
            console.log(weatherOfTheDay)
            weatherStatus.innerHTML += `${weatherOfTheDay} `
            //If it's cloudy, rainy or clear.
            const degreesThisDay = data.main.temp.toFixed(0)
            celsius.innerHTML += ` | ${degreesThisDay}°` //How many degrees it is
            const sunriseNewDate = new Date(data.sys.sunrise * 1000); //These rows converts the sunrise and sunset to hours and minutes
            const sunriseTime = sunriseNewDate.toLocaleTimeString([], { timeStyle: 'short' })
            sunrise.innerHTML += `sunrise ${sunriseTime}` //The time the sun goes up

            const sunsetNewDate = new Date(data.sys.sunset * 1000);
            const sunsetTime = sunsetNewDate.toLocaleTimeString([], { timeStyle: 'short' })
            sunset.innerHTML += `sunset ${sunsetTime}` //The time the sun goes down

            if (weatherOfTheDay === 'Clear') {
                icon.innerHTML += `<img src="icons/clear.svg"/>`
                weatherInStockholm.innerHTML += `Get your sunnies on. ${data.name} is looking rather great today.`
                console.log('clear')
            } else if (weatherOfTheDay === 'Rain') {
                icon.innerHTML += `<img src="icons/rain.svg">`
                weatherInStockholm.innerHTML = `Don't forget your umbrella. It's wet in ${data.name} today.`
                console.log('rain')
            } else {
                icon.innerHTML += `<img src="icons/cloud.svg">`
                weatherInStockholm.innerHTML = `Light a fire and get cosy. ${data.name} is looking grey today.`
                console.log('cloud')
            }
        })

    fetch(apiForecast)
        .then((response) => {
            return response.json()
        })
        .then((weatherData) => {
            //filters to only get the data from dt_text that includes 12:00
            const filteredForecast = weatherData.list.filter(weatherItem => weatherItem.dt_txt.includes('06:00'))
            filteredForecast.forEach(day => {
                //variabel that shows which date it is
                const date = new Date(day.dt * 1000)
                //variable that shows which day of the week it is
                let dayName = date.toLocaleDateString("en-US", { weekday: "short" }).toLowerCase()
                //if the date is NOT the day of the week it is (to not get the current day in the forecast): 
                if (date !== dayName) {
                    dayInForecast.innerHTML += `<p>${dayName}</p>`
                    temperaturesInForecast.innerHTML += `<p>${day.main.temp.toFixed(0)}°</p>`
                }
            })
        })

})