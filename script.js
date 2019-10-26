const apiKey = '79a5016dc063fba5a823f15d23b3fb1f'

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

let city = document.getElementById('location').value

const clearData = () => {
    document.getElementById("city").innerHTML = ''
    document.getElementById("summary").innerHTML = ''
    document.getElementById("forecast").innerHTML = ''
}

const getWeather = () => {
    if (document.getElementById('location').value === '') {
        alert('Please type in a city.')
    } else {
        refreshWeather()
    }
}

const refreshWeather = () => {

    console.log(city)
    clearData()
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            console.log(json)
            let sunrise = new Date(0)
            let sunset = new Date(0)
            sunrise.setUTCSeconds(json.sys.sunrise)
            sunset.setUTCSeconds(json.sys.sunset)
            document.getElementById("city").innerHTML = `${json.name}, ${json.sys.country}`
            document.getElementById("summary").innerHTML += `${json.weather[0].main.toLowerCase()} | ${json.main.temp.toFixed(1)}°<br>
        sunrise ${("0" + sunrise.getHours()).slice(-2)}:${("0" + sunrise.getMinutes()).slice(-2)}<br>
        sunset: ${("0" + sunset.getHours()).slice(-2)}:${("0" + sunset.getMinutes()).slice(-2)}`

            document.getElementById("message").src = `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`
        })
        .catch((err) => {
            console.log('caught error', err)
        })

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=7&units=metric&APPID=${apiKey}`)
        .then((response) => {
            return response.json()
        })
        .then((json => {
            console.log(json)

            json.list.forEach(weather => {
                let dt = new Date(0)
                dt.setUTCSeconds(weather.dt)
                document.getElementById("forecast").innerHTML += `<p>${dt.getDate()} ${monthShortNames[dt.getMonth()]} ${("0" + dt.getHours()).slice(-2)}:${("0" + dt.getMinutes()).slice(-2)} ${weather.main.temp.toFixed(0)}° ${weather.weather[0].description}
            <img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}.png" alt="Weather representation"></p>`
            })
        }))
        .catch((err) => {
            console.log('caught error', err)
        })
}

if (document.getElementById('location').value === '') {
    city = 'Stockholm'
    refreshWeather()
}