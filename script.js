const apiKey = '79a5016dc063fba5a823f15d23b3fb1f'

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

let city = document.getElementById('location').value

function toggle() {
    this.classList.toggle("active")
}

const clearData = () => {
    document.getElementById("city").innerHTML = ''
    document.getElementById("summary").innerHTML = ''
    document.getElementById("icon").style.display = 'none'
    document.getElementById("forecast").innerHTML = ''
    document.getElementById('sunrise-sunset').innerHTML = ''
}

const getWeather = () => {
    if (document.getElementById('location').value === '') {
        alert('Please type in a city.')
    } else {
        city = document.getElementById('location').value
        refreshWeather()
        document.getElementById('search-bar').reset()
    }
}

const refreshWeather = () => {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            if (json.cod === 200) {
                clearData()
                let sunrise = new Date(0)
                let sunset = new Date(0)
                sunrise.setUTCSeconds(json.sys.sunrise)
                sunset.setUTCSeconds(json.sys.sunset)
                document.getElementById("city").innerHTML = `${json.name}, ${json.sys.country}`
                document.getElementById("summary").innerHTML += `<p class="temperature">${json.main.temp.toFixed(1)}°</p>${json.weather[0].main.toLowerCase()}`
                document.getElementById("sunrise-sunset").innerHTML = `sunrise ${("0" + sunrise.getHours()).slice(-2)}:${("0" + sunrise.getMinutes()).slice(-2)} | sunset: ${("0" + sunset.getHours()).slice(-2)}:${("0" + sunset.getMinutes()).slice(-2)}`
                document.getElementById("icon").style.display = 'block'
                document.getElementById("icon").src = `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`
            } else {
                alert(`City not found.`)
            }
        })
        .catch((err) => {
            console.log('caught error', err)
            return err
        })

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=5&units=metric&APPID=${apiKey}`)
        .then((response) => {
            return response.json()
        })
        .then((json => {
            console.log(json)
            index = 1
            json.list.forEach(weather => {
                let dt = new Date(0)
                dt.setUTCSeconds(weather.dt)
                document.getElementById("forecast").innerHTML += `<div class="main-forecast" id="section${index}"><div>${dt.getDate()} ${monthShortNames[dt.getMonth()]} ${("0" + dt.getHours()).slice(-2)}:${("0" + dt.getMinutes()).slice(-2)}</div><div class="forecast-info">${weather.main.temp.toFixed(0)}°<img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}.png" alt="Weather representation"> &#x25BA;</div></div><div class="detail"><p>This</p></div>`
                index++;
            })

            document.getElementById("section1").onclick = toggle
            document.getElementById("section2").onclick = toggle
            document.getElementById("section3").onclick = toggle
            document.getElementById("section4").onclick = toggle
            document.getElementById("section5").onclick = toggle
        }))
        .catch((err) => {
            console.log('caught error', err)
        })
}

if (document.getElementById('location').value === '') {
    city = 'Stockholm'
    refreshWeather()
}

