// API
const apiToday = 'https://api.openweathermap.org/data/2.5/weather?q=Gothenburg&units=metric&APPID=22db637cf647bcd1513c052513b7d54c';
const apiForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=Gothenburg&appid=22db637cf647bcd1513c052513b7d54c';

// OTHER
const weatherToday = document.getElementById("weatherToday");
const weatherForecast = document.getElementById("weatherForecast"); 
const sunriseSunset = document.getElementById("sunriseSunset");
const weatherIcon = document.getElementById("weatherIcon");



// FETCH
fetch(apiToday)
    .then((response) => {
    return response.json()
    })
    .then(json => {
        const cloudsImg = {
            image: 'icons/clouds.svg'
        }
        const rainImg = {
            image: 'icons/rain.svg'
        }
        const sunImg = {
            image: 'icons/sun.svg'
        }
        
        // DISPLAYED WEATHER ICON ON TOP
        const weatherImg = () => {
            if(json.weather[0].main === 'Clear'){
                weatherIcon.innerHTML = `<img src="${sunImg.image}" height="150" alt="sun">`
            } else if (json.weather[0].main === 'Clouds'){
                weatherIcon.innerHTML = `<img src="${cloudsImg.image}" height="150" alt="clouds">`
            } else if (json.weather[0].main === 'Rain'){
                weatherIcon.innerHTML = `<img src="${rainImg.image}" height="150" alt="rain">`
            }
        }
        weatherImg()

      
        // TEMP IN GOTHENBURG
        weatherToday.innerHTML = `${json.name} ${json.main.temp.toFixed(1)} C<br> ${json.weather[0].description} `;
            const timestampSunrise = json.sys.sunrise
            const timestampSunset = json.sys.sunset

        let sunrise = new Date(timestampSunrise * 1000)
        let sunset = new Date(timestampSunset * 1000)

        let sunriseTime = sunrise.toLocaleTimeString('is',{ timeStyle: 'short',hour12: false})
        let sunsetTime = sunset.toLocaleTimeString('is',{timeStyle: 'short', hour12: false})
        sunriseSunset.innerHTML = `<p>Sunrise: ${sunriseTime} Sunset: ${sunsetTime}</p>`
    });

fetch(apiForecast)
    .then((response) => {
        return response.json()
        })
        .then(json => {
            const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
            
        })