const apiKey = 'e30ad481a3fcc72a6217c4f6edfa883d'
const lat = '59.3307'
const lon = '18.0579'
const city = 'Stockholm, Sweden'
const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`
const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${apiKey}`
const urlForecast7Days = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&APPID=${apiKey}`

function addContentForWeekdays() {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    const weekdays = document.getElementById('weekdays')

    fetch(urlForecast)
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            const days = res.list.filter(item => {
                if(item.dt_txt.endsWith('12:00:00')) {
                    if(
                        item.dt_txt.startsWith(
                            new Date().toLocaleDateString('sv')
                            
                        )
                    ){
                        return false
                    }
                    return true

                }
                return false
            })

            
            // Cleaner version with map
            weekdays.innerHTML = days.map((day) => {
                const dateObject = new Date(day.dt_txt) // Get JS date object
                const dayIndex = dateObject.getDay() // The number of the day in a week

                return `<div class="row">
                    <p>${dayNames[dayIndex]}</p>
                    <p>${Math.round(day.main.temp)}</p>
                </div>`
            }).join('')
        })
}

addContentForWeekdays()


// function functionName(yourArgument) {
//     console.log(yourArgument);
// } 

// const funtionName = (yourArgument) => {
//     console.log(yourArgument);
// } 

// (yourArgument) => {
//     console.log(yourArgument);
// } 

fetch(urlWeather)
        .then((res) => {
            return res.json()
        })
        .then((res) => {
           console.log(res);
           const weatherSlogun = document.getElementById('weather-slogun')
           const img = document.getElementById('weather-img')
            const todaysWeather = document.getElementById('todays-weather')
            const todaysSunrise = document.getElementById('todays-sunrise')
            const todaysSunset = document.getElementById('todays-sunset')
            
            todaysWeather.innerHTML =`${res.weather[0].main} | ${Math.round(res.main.temp)}&#8451;`
            console.log(todaysWeather);

            function getTimeFromDate(datetime) {
                const date = new Date(datetime * 1000)
                return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
            }

            todaysSunrise.innerHTML = `Sunrise ${getTimeFromDate(res.sys.sunrise)} `
            
            todaysSunset.innerHTML = `Sunset ${getTimeFromDate(res.sys.sunset)} ` 

            const root = document.querySelector(':root')
             //shows different weather types
            res.weather[0].main = 'Snow'
    
           if(res.weather[0].main === 'Clouds')  {
               weatherSlogun.innerHTML =`Light a fire and get cozy, ${res.name} is looking gray today`;
               img.setAttribute('src', 'icons/cloud.svg')
               root.style.setProperty('--bg-color', '#f3f7f8')
               root.style.setProperty('--font-color', '#ff7476')
               root.style.setProperty('--border-color', '#f07c7a78') 

           }
           if(res.weather[0].main === 'Clear') {
            weatherSlogun.innerHTML = `Get your sunnies on, ${res.name} is looking might fine today`;
            img.setAttribute('src', 'icons/sunglasses.svg')
            root.style.setProperty('--bg-color', '#f7e9bd')
            root.style.setProperty('--font-color', '#2c541b')
            root.style.setProperty('--border-color', '#3553237a')
           }

           if(res.weather[0].main === 'Rain') {
           weatherSlogun.innerHTML =`Don't forget your Umbrella, it's wet in ${res.name} today`;
           img.setAttribute('src', 'icons/umbrella.svg') 
           root.style.setProperty('--bg-color', '#b3e9fa')
           root.style.setProperty('--font-color', '#004b67')
           root.style.setProperty('--border-color', '#1b4b657d')
           }

           if(res.weather[0].main === 'Snow') {
            weatherSlogun.innerHTML =`Wrap up warm, ${res.name} is looking very white today`;
            img.setAttribute('src', 'icons/snowflake.svg') 
            root.style.setProperty('--bg-color', '#ffffff')
            root.style.setProperty('--font-color', '#7fd2fe')
            root.style.setProperty('--border-color', '#90d1fa7a')
            }
        })
