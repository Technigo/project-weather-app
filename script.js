const container = document.getElementById('weather')
const title = document.getElementById('weatherTitle')
const sunRiseSet = document.getElementById('weatherSun')
const theImageTitle = document.getElementById('imageTitle')
const theWeatherBottom = document.getElementById('weatherBottom')
const theImage = document.querySelector('.image')

const theImageBottom = document.querySelectorAll('.imageBottom')
const theDate = document.getElementById('date')
const theTypeWeather = document.getElementById('typeOfWeather')
const theMintemp = document.getElementById('tempMin')
const theMaxtemp = document.getElementById('tempMax')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=5f6b7ccb276fd894a3dd4d64416ecac9')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
    
        json.weather.forEach((el) => {
            const temperature = Math.round(json.main.temp * 10 ) / 10
            const id = el.id
            const desc = el.description

                if(id === 800) {
                    theImage.src = `./Images/sun.png`
                } else if (id === 801) {
                    theImage.src = `./Images/cloudy.png`
                } else if (id >= 802 && id <= 804) {
                    theImage.src = `./Images/clouds.png`
                } else if (id >= 500 && id <= 531) {
                    theImage.src = `./Images/rain.png`
                } else if (id >= 200 && id <= 232) {
                    theImage.src = `./Images/lightning.png`
                } else if (id >= 600 && id <= 622) {
                    theImage.src = `./Images/snow.png`
                } else if (id >= 300 && id <= 321) {
                    theImage.src = `./Images/rain.png`
                } else {
                    theImage.src = `./Images/fog.png`
                }

            title.innerHTML = `<p class="main-temp">${temperature} <span>&#176;C</span></p>`
            title.innerHTML += `<h1>${json.name}</h1>`
            title.innerHTML += `<p id="type">${desc}</p>`   
        })

        // sunrise and sunset
        const aboutRiseandSet = () => {
            const sunrise = json.sys.sunrise
            const sunset = json.sys.sunset
            const sunriseConverted = new Date(sunrise * 1000);
            const sunsetConverted = new Date(sunset * 1000);
            let sunriseMin = sunriseConverted.getMinutes()
            let sunsetMin = sunsetConverted.getMinutes()

            //Add 0 in front of a number if minutes are less than 10
            if (sunriseMin < 10 ) { 
                sunriseMin = '0' + sunriseMin;
                } else {
                sunriseMin = sunriseMin + '';
                }
            if (sunsetMin < 10) {
                sunsetMin = '0' + sunsetMin;
            }   else {
                sunsetMin = sunsetMin + '';
            }
            
            title.innerHTML += `<div id="weatherSun"><p>sunrise  ${sunriseConverted.getHours()}:${sunriseMin}</p><p>sunset  ${sunsetConverted.getHours()}:${sunsetMin}</p></div>`
        }
        aboutRiseandSet()
    })

    fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&cnt=40&APPID=5f6b7ccb276fd894a3dd4d64416ecac9')
    .then((response) => {
        return response.json()
    })
    .then((json) => {

        json.list.forEach((item) => {
            
            const day = item.dt
            const dayConverted = new Date(day * 1000);
            let dayHours = dayConverted.getHours()
            let dayWeekday = dayConverted.getDay()
            let theDayWeekdayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            let month = dayConverted.getMonth() + 1
            const temperaturemin = Math.round(item.main.temp_min * 10 ) / 10
            const temperaturemax = Math.round(item.main.temp_max * 10 ) / 10

            //Pick data from all the days at 13:00 
            if(dayHours === 13){

                //Assign the number that specifies a day to a day in theDayWeekdayaArr
                theDayWeekdayArr.forEach((el, index) => {
                    if(dayWeekday === index) {
                        theDate.innerHTML += `<p>${el} ${dayConverted.getDate()}/${month}</p>`
                    }
                })
                
                item.weather.forEach((el) => {
                    const id = el.id

                    if(id === 800) {
                        theTypeWeather.innerHTML += `<img class="imageBottom" src="./Images/sun.png">`
                    } else if (id === 801) {                      
                        theTypeWeather.innerHTML += `<img class="imageBottom" src="./Images/cloudy.png">`
                    } else if (id >= 802 && id <= 804) {
                        theTypeWeather.innerHTML += `<img class="imageBottom" src="./Images/clouds.png">`
                    } else if (id >= 500 && id <= 531) {
                        theTypeWeather.innerHTML += `<img class="imageBottom" src="./Images/rain.png">`
                    } else if (id >= 200 && id <= 232) {
                        theTypeWeather.innerHTML += `<img class="imageBottom" src="./Images/lightning.png">`
                    } else if (id >= 600 && id <= 622) {
                        theTypeWeather.innerHTML += `<img class="imageBottom" src="./Images/snow.png">`
                    } else if (id >= 300 && id <= 321) {
                        theTypeWeather.innerHTML += `<img class="imageBottom" src="./Images/rain.png">`
                    } else {
                        theTypeWeather.innerHTML += `<img class="imageBottom" src="./Images/fog.png">`
                    }
       
                    theMaxtemp.innerHTML += `<p>&nbsp;${temperaturemax}&#176;C</p>`
                }) 
            }
            //Pick min temperature for all days at 7:00 
            if(dayHours === 7){
                theMintemp.innerHTML += `<p>${temperaturemin} /</p>`
            }

        })  
    })