//GLOBAL VARIABLES
let city = 'Stockholm, Sweden'
const apiKey = 'e30ad481a3fcc72a6217c4f6edfa883d'
let urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`
let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${apiKey}`
const weatherSlogan = document.getElementById('weather-slogan')
const img = document.getElementById('weather-img')
const todaysWeather = document.getElementById('todays-weather')
let windSpeed = document.getElementById('wind-speed')
let windDirection = document.getElementById('wind-direction')
let mainSearchBar = document.getElementById('main-searchbar');
const checkCityBtn = document.getElementById('check-city-button')



let windDirectionConverter = (degrees) => {
        let val = Math.floor((degrees / 22.5) + 0.5);
        let arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }


// This function generates all the info we need for today's weather forecast and sunrise/sunset.
function weatherToday() { 
fetch(urlWeather)
        .then((res) => {
            return res.json()
        })
        .then((res) => {
           console.log(res);
           todaysWeather.innerHTML =`${res.weather[0].main} | ${Math.round(res.main.temp)}&#8451;`
           console.log(todaysWeather);

           function getTimeFromDate(datetime) {
                const date = new Date(datetime * 1000)
                return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
            }

            let windDirectionCardinal = windDirectionConverter((res.wind.deg));
            windSpeed.innerHTML = `Wind speed | ${(res.wind.speed)} m/s`            
            windDirection.innerHTML = `Wind direction | ${(windDirectionCardinal)} ` 

// Changes the CSS appearance of the page depending on today's weather forecast.
            const root = document.querySelector(':root')
    
           if(res.weather[0].main === 'Clouds')  {
               weatherSlogan.innerHTML =`Light a fire and get cozy, ${res.name} is looking gray today`;
               img.setAttribute('src', 'icons/cloud.svg')
               root.style.setProperty('--bg-color', '#f3f7f8')
               root.style.setProperty('--font-color', '#ff7476')
               root.style.setProperty('--border-color', '#f07c7a78') 

           }
           if(res.weather[0].main === 'Clear') {
            weatherSlogan.innerHTML = `Get your sunnies on, ${res.name} is looking mighty fine today`;
            img.setAttribute('src', 'icons/sunglasses.svg')
            root.style.setProperty('--bg-color', '#f7e9bd')
            root.style.setProperty('--font-color', '#2c541b')
            root.style.setProperty('--border-color', '#3553237a')
           }

           if(res.weather[0].main === 'Rain') {
           weatherSlogan.innerHTML =`Don't forget your Umbrella, it's wet in ${res.name} today`;
           img.setAttribute('src', 'icons/umbrella.svg') 
           root.style.setProperty('--bg-color', '#b3e9fa')
           root.style.setProperty('--font-color', '#004b67')
           root.style.setProperty('--border-color', '#1b4b657d')
           }

           if(res.weather[0].main === 'Snow') {
            weatherSlogan.innerHTML =`Wrap up warm, ${res.name} is looking very white today`;
            img.setAttribute('src', 'icons/snowflake.svg') 
            root.style.setProperty('--bg-color', '#ffffff')
            root.style.setProperty('--font-color', '#7fd2fe')
            root.style.setProperty('--border-color', '#90d1fa7a')
            }
        })
    }

    //This function generates the 5-day forecast based on the urlForecast API. It fetches the midday forecast for each of the 5 days from the API.
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
                        
                    weekdays.innerHTML = days.map((day) => {
                        const dateObject = new Date(day.dt_txt) // Get JS date object
                        const dayIndex = dateObject.getDay() // The number of the day in a week
        
                        return `<div class="row">
                            <p>${dayNames[dayIndex]}</p>
                            <p>${Math.round(day.main.temp)}&#8451</p>
                        </div>`
                    }).join('')
                })
        }
        
        weatherToday()
        addContentForWeekdays()


        const updateCity = () => {
            console.log("I work!")
          city = mainSearchBar.value;
          urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=e30ad481a3fcc72a6217c4f6edfa883d`
          urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=e30ad481a3fcc72a6217c4f6edfa883d`
          weatherToday()
          addContentForWeekdays()
          }

    // Event listeners
    checkCityBtn.addEventListener('click', updateCity);
    mainSearchBar.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      checkCityBtn.click();
    }
  });