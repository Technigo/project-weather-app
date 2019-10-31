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


fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=9c5547207014dca2db40f4f51bbb601a')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
    
        json.weather.forEach((el) => {
            const temperature = Math.round(json.main.temp * 10 ) / 10
            const desc = el.description
            
            const chooseWeather = () => {   
                if(desc.includes("clear")) {
                    theImage.src = `./img/sun1.png`
                } else if (desc.includes('few')) {
                    theImage.src = `./img/sunbehind1.png`
                } else if (desc.includes('clouds') && !desc.includes('few')) {
                    theImage.src = `./img/clouds1.png`
                } else if (desc.includes('rain')) {
                    theImage.src = `./img/rain2.png`
                } else if (desc.includes('thunderstorm')) {
                    theImage.src = `./img/thunder1.png`
                } else if (desc.includes('snow')) {
                    theImage.src = `./img/snow1.png`
                }
            }
            chooseWeather()

            title.innerHTML = `<p class="main-temp">${temperature} <span>&#176;C</span></p>`
            title.innerHTML += `<h1>${json.name}</h1>`
            title.innerHTML += `<p>${desc}</p>`   
        })

        const aboutRiseandSet = () => {
            const sunrise = json.sys.sunrise
            const sunset = json.sys.sunset
            const sunriseConverted = new Date(sunrise * 1000);
            const sunsetConverted = new Date(sunset * 1000);
            let sunriseMin = sunriseConverted.getMinutes()
            let sunsetMin = sunsetConverted.getMinutes()

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
            
            sunRiseSet.innerHTML += `<p>sunrise  ${sunriseConverted.getHours()}:${sunriseMin}</p>`
            sunRiseSet.innerHTML += `<p>sunset  ${sunsetConverted.getHours()}:${sunsetMin}</p>` 
        }
        aboutRiseandSet()

        
    })

    fetch('http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&cnt=40&APPID=9c5547207014dca2db40f4f51bbb601a')
    .then((response) => {
        return response.json()
    })
    .then((json) => {

        json.list.forEach((item) => {
            
            const day = item.dt
            const dayConverted = new Date(day * 1000);
            let dayMin = dayConverted.getMinutes()
            let dayHours = dayConverted.getHours()
            let dayWeekday = dayConverted.getDay()
            let theDayWeekdayArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            let month = dayConverted.getMonth() + 1
            const temperaturemin = Math.round(item.main.temp_min * 10 ) / 10
            const temperaturemax = Math.round(item.main.temp_max * 10 ) / 10
            
            if (dayMin < 10 ) { 
                dayMin = '0' + dayMin;
                } else {
                dayMin = dayMin + '';
            }

            if(dayHours === 13){

                theDayWeekdayArr.forEach((el, index) => {
                    if(dayWeekday === index) {
                        theDate.innerHTML += `<p>${el} ${dayConverted.getDate()}/${month}</p>`
                    }
                })
                
                item.weather.forEach((el) => {
                    const id = el.id

                    if(id === 800) {
                        theTypeWeather.innerHTML += `<img class="imageBottom" src="./img/sun1.png">`
                    } else if (id === 801) {                      
                        theTypeWeather.innerHTML += `<img class="imageBottom" src="./img/sunbehind1.png">`
                    } else if (id >= 802 && id <= 804) {
                        theTypeWeather.innerHTML += `<img class="imageBottom" src="./img/clouds1.png">`
                    } else if (id >= 500 && id <= 531) {
                        theTypeWeather.innerHTML += `<img class="imageBottom" src="./img/rainstrong.png">`
                    } else if (id >= 200 && id <= 232) {
                        theTypeWeather.innerHTML += `<img class="imageBottom" src="./img/thunder1.png">`
                    } else if (id >= 600 && id <= 622) {
                        theTypeWeather.innerHTML += `<img class="imageBottom" src="./img/snow1.png">`
                    } else if (id >= 300 && id <= 321) {
                        theTypeWeather.innerHTML += `<img class="imageBottom" src="./img/drizzle.png">`
                    } else {
                        theTypeWeather.innerHTML += `<img class="imageBottom" src="./img/fog.png">`
                    }
       
                    theMaxtemp.innerHTML += `<p>&nbsp;${temperaturemax}&#176;C</p>`                       
                
                }) 
            }

            if(dayHours === 7){
                theMintemp.innerHTML += `<p>${temperaturemin} /</p>`
            }

        })  
    })