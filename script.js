// const weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=b875a4e82ea7797a6ff76c50f02a0b8b'
let cityName = "Stockholm" 
const city = document.getElementById('city')
const showSunRise = document.getElementById('sunRise')
const showSunSet = document.getElementById('sunSet')
const allDays = document.getElementById('all-days')
const weatherDescDiv = document.getElementById('weather-container__info')
const currentWeather = document.getElementById('currentWeather')
const body = document.getElementById('body')
const icons = document.getElementById('icons')
const weekday = document.getElementById('weekday')
const temp = document.getElementById('temp')
const dayOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let minMax, currentDate, minTemp, maxTemp


fetch (`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=b875a4e82ea7797a6ff76c50f02a0b8b`)
    .then((response) => {
        return response.json();
    }).then ((data) => {
        
        
        let cityTemp = data.main.temp.toFixed(1)
        let sunRise = new Date(data.sys.sunrise * 1000)
        let sunSet =new Date(data.sys.sunset * 1000)

        //Adds a 0 
        const hourAndMinutes = (i) =>{
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }
        
        let hourSunRise = hourAndMinutes(sunRise.getHours())
        let minutesSunRise = hourAndMinutes(sunRise.getMinutes())

        let hourSunSet = hourAndMinutes(sunSet.getHours())
        let minutesSunSet = hourAndMinutes(sunSet.getMinutes())

        const changeBackground = () => {
            // const time = (new Date(data.dt * 1000).getHours());
            const time=9;
                if (time >= 7 && time <= 17) {
                    weatherDescDiv.classList.add('day')
                    body.classList.add('day-time')
                    console.log("day")
                } else if (time >= 18) {
                    console.log("night")
                    weatherDescDiv.classList.add('night')
                    body.classList.add('night-time')
                } else {
                    weatherDescDiv.classList.add('night')
                    body.classList.add('night-time')
                }
            }
        changeBackground()  
        
        console.log(new Date(data.dt * 1000).getDay())
       
        
        city.innerHTML += `<p class="current-city"> ${data.name}</p>`
        city.innerHTML += `<p class="current-temp"> ${cityTemp} &#8451</p>`

            const weatherDescription = ()=>{
        currentWeather.innerHTML += `<p> ${data.weather[0].description}</p>`
        if (data.weather[0].id >= 200 && data.weather[0].id <= 299) {
            currentWeather.innerHTML += `<img src="./Designs/icons/thunderstorm.svg"/>`
        } else if (data.weather[0].id >= 300 && data.weather[0].id <= 399) {
            currentWeather.innerHTML += `<img src="./Designs/icons/drizzle.svg"/>`
        } else if (data.weather[0].id >= 500 && data.weather[0].id <= 599) {
            currentWeather.innerHTML += `<img src="./Designs/icons/rainy.svg"/>`
        } else if (data.weather[0].id >= 600 && data.weather[0].id <= 699) {
            currentWeather.innerHTML += `<img src="./Designs/icons/snowy.svg"/>`
        } else if (data.weather[0].id >= 700 && data.weather[0].id <= 799) {
            currentWeather.innerHTML += `<img src="./Designs/icons/atmosphare.svg"/>`
        } else if (data.weather[0].id == 800 ) 
            {currentWeather.innerHTML += `<img src="./Designs/icons/sunny.svg"/>`
        } else if (data.weather[0].id >= 801 && data.weather[0].id <= 899) {
            currentWeather.innerHTML += `<img src="./Designs/icons/cloudy.svg"/>`   
        }
    }
        showSunRise.innerHTML += `<p>${hourSunRise}:${minutesSunRise}</p><img src="./Designs/icons/sunrise.svg"/>`
        showSunSet.innerHTML += `<p>${hourSunSet}:${minutesSunSet}</p><img src="./Designs/icons/sunset.svg"/>`
        weatherDescription(); 
    })

    //forcast 5 days
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName},Sweden&units=metric&APPID=b875a4e82ea7797a6ff76c50f02a0b8b`)
        .then((response) => {
            return response.json();
        }).then((data) => {
            
            //forecast including 5 days
            const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))

            // finding out min and max temprature for each day
            const updateMinMaxTemps = () => {
            minMax = {};
            data.list.forEach((day) => {
            currentDate = day.dt_txt.split(" ")[0];

            if (minMax[currentDate]) {
                if (day.main.temp_min < minMax[currentDate].minTemp) {
                    minMax[currentDate].minTemp = day.main.temp_min;
                }
                if (day.main.temp_max > minMax[currentDate].maxTemp) {
                    minMax[currentDate].maxTemp = day.main.temp_max;
                }
            } else {
                minMax[currentDate] = { 
                    minTemp: day.main.temp_min, 
                    maxTemp: day.main.temp_max,
                }
    
            }
        }) 

        return minMax

        }

        updateMinMaxTemps()
            
            
                filteredForecast.forEach((day) => {
                    currentDate = day.dt_txt.split(" ")[0];
                    const dateIndex = (new Date(day.dt * 1000)).getDay();
                    
                    allDays.innerHTML += `<div class="weekday"><p>${dayOfTheWeek[dateIndex]}</p></div>`
                    if (day.weather[0].id >= 200 && day.weather[0].id <= 299) {
                        allDays.innerHTML += `<img src="./Designs/icons/thunderstorm.svg"/>`
                    } else if (day.weather[0].id >= 300 && day.weather[0].id <= 399) {
                        allDays.innerHTML += `<img src="./Designs/icons/drizzle.svg"/>`
                    } else if (day.weather[0].id >= 500 && day.weather[0].id <= 599) {
                        allDays.innerHTML += `<img src="./Designs/icons/rainy.svg"/>`
                    } else if (day.weather[0].id >= 600 && day.weather[0].id <= 699) {
                        allDays.innerHTML += `<img src="./Designs/icons/snowy.svg"/>`
                    } else if (day.weather[0].id >= 700 && day.weather[0].id <= 799) {
                        allDays.innerHTML += `<img src="./Designs/icons/atmosphare.svg"/>`
                    } else if (day.weather[0].id == 800 ) {
                        allDays.innerHTML += `<img src="./Designs/icons/sunny.svg"/>`
                    } else if (day.weather[0].id >= 801 && day.weather[0].id <= 899) {
                        allDays.innerHTML += `<img src="./Designs/icons/cloudy.svg"/>`   
                    }
                    allDays.innerHTML += `<div class="forcast-temp"> <p>${minMax[currentDate].minTemp.toFixed(0)} &#8451 / ${minMax[currentDate].maxTemp.toFixed(0)} &#8451</p></div>`
                })
        })
          