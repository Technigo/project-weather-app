// const weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=b875a4e82ea7797a6ff76c50f02a0b8b'
let cityName = "Stockholm" 
// const city = document.getElementById('city')
// const dayOne = document.getElementById('day-one')
// const dayTwo = document.getElementById('day-two')
// const dayThree = document.getElementById('day-three')
// const dayFour = document.getElementById('day-four')
// const dayFive = document.getElementById('day-five')
const allDays = document.getElementById('all-days')
const dayOrNight = document.getElementById('dayOrNight')




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
            const time = (new Date(data.dt * 1000).getHours());
                if (time >= 7 && time <= 17) {
                dayOrNight.style.backgroundImage = "url('./Designs/icons/day.jpg')";
                } else if (time >= 18) {
                    dayOrNight.style.backgroundImage = "url('./Designs/icons/night.jpg')";
                } else {
                    dayOrNight.style.backgroundImage = "url('./Designs/icons/night.jpg')"; 
                }
            }
        changeBackground()  
        
        console.log(new Date(data.dt * 1000).getHours(),new Date(data.dt * 1000).getMinutes())
       

        city.innerHTML += `<p> ${data.name}</p>`
        city.innerHTML += `<p> ${cityTemp}</p>`
        city.innerHTML += `<p> ${data.weather[0].description}</p><img src="./Designs/icons/snowy.svg"/>`

        city.innerHTML += `<p>${hourSunRise}:${minutesSunRise}</p><img src="./Designs/icons/sunrise.svg"/>`
        city.innerHTML += `<p>${hourSunSet}:${minutesSunSet}</p><img src="./Designs/icons/sunset.svg"/>`
       
    })

    //forcast 5 days

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName},Sweden&units=metric&APPID=b875a4e82ea7797a6ff76c50f02a0b8b`)
        .then((response) => {
            return response.json();
        }).then((data) => {
            const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
            
                filteredForecast.forEach((day) => {
                    allDays.innerHTML += `<div> Temperature: ${day.main.temp} Feels like: ${day.main.feels_like}</div>`
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
            })
        })
          