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
        const temperature = Math.round(json.main.temp * 10 ) / 10
        json.weather.forEach((el) => {
            const desc = el.description
            console.log(desc)
            title.innerHTML = `<p class="main-temp">${temperature} <span>&#176;C</span></p>`
            title.innerHTML += `<h1>${json.name}</h1>`
            title.innerHTML += `<p>${desc}</p>`

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

        })

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
            let theDayWeekday
            let month = dayConverted.getMonth()
            let theMonth
            
            if (dayMin < 10 ) { 
                dayMin = '0' + dayMin;
                } else {
                dayMin = dayMin + '';
            }
            
            if (dayWeekday === 0) {theDayWeekday= "Sun"} 
            else if (dayWeekday === 1) { theDayWeekday= "Mon"} 
            else if (dayWeekday === 2) {theDayWeekday= "Tue"} 
            else if (dayWeekday === 3) {theDayWeekday= "Wed"} 
            else if (dayWeekday === 4) {theDayWeekday= "Thu"} 
            else if (dayWeekday === 5) {theDayWeekday= "Fri"} 
            else if (dayWeekday === 6) {theDayWeekday= "Sat"} 

           if(month === 0){ theMonth = 1}
           else if(month === 1){ theMonth = 2}
           else if(month === 2){ theMonth = 3}
           else if(month === 3){ theMonth = 4}
           else if(month === 4){ theMonth = 5}
           else if(month === 5){ theMonth = 6}
           else if(month === 6){ theMonth = 7}
           else if(month === 7){ theMonth = 8}
           else if(month === 8){ theMonth = 9}
           else if(month === 9){ theMonth = 10}
           else if(month === 10){ theMonth = 11}
           else if(month === 11){ theMonth = 12}
           

            const temperaturemin = Math.round(item.main.temp_min * 10 ) / 10
            const temperaturemax = Math.round(item.main.temp_max * 10 ) / 10

            if(dayHours === 13){
                
                item.weather.forEach((el) => {
                    const desc = el.description

                    if(desc.includes("clear")) {
                        theTypeWeather.innerHTML += `<img class="imageBottom" src="./img/sun1.png">`
                    } else if (desc.includes('few')) {                      
                        theTypeWeather.innerHTML += `<img class="imageBottom" src="./img/sunbehind1.png">`
                    } else if (desc.includes('clouds') && !desc.includes('few')) {
                        theTypeWeather.innerHTML += `<img class="imageBottom" src="./img/clouds1.png">`
                    } else if (desc.includes('rain')) {
                        theTypeWeather.innerHTML += `<img class="imageBottom" src="./img/rain2.png">`
                    } else if (desc.includes('thunderstorm')) {
                        theTypeWeather.innerHTML += `<img class="imageBottom" src="./img/thunder1.png">`
                    } else if (desc.includes('snow')) {
                        theTypeWeather.innerHTML += `<img class="imageBottom" src="./img/snow1.png">`
                    }

                    theDate.innerHTML += `<p>${theDayWeekday} ${dayConverted.getDate()}/${theMonth}</p>`
                   
                    theMaxtemp.innerHTML += `<p>&nbsp;${temperaturemax}&#176;C</p>`    
                   
                
                }) 
            }

            if(dayHours === 7){
                theMintemp.innerHTML += `<p>${temperaturemin} /</p>`
            }

        })  
    })